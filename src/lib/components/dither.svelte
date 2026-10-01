<script lang="ts">
  import type { Attachment } from "svelte/attachments";

  // The net of light a rippling surface throws on a pool floor, thresholded
  // against an 8x8 Bayer matrix so it reads as dot density rather than
  // shading. The canvas is one pixel per cell, scaled up without smoothing, so
  // every dot is shaded once and stays crisp. The falloff is part of the
  // field, not a CSS mask, so dots thin out toward the text instead of fading.
  const VERTEX = `attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

  const FRAGMENT = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uSize;
uniform float uTime;
uniform vec3 uInk;

float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

void main() {
  vec2 uv = gl_FragCoord.xy / uSize;
  vec2 p = vec2(uv.x * uSize.x / uSize.y, uv.y) * 6.28318 * 0.9 - 250.0;
  float time = uTime * 0.22 + 23.0;

  // Iterated wave interference: each pass bends the sample point, and the
  // places where the passes agree focus into bright filaments.
  vec2 i = p;
  float c = 1.0;
  float inten = 0.005;
  for (int n = 0; n < 5; n++) {
    float t = time * (1.0 - (3.5 / float(n + 1)));
    i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
  }
  c /= 5.0;
  c = 1.17 - pow(c, 1.4);
  float v = clamp(pow(abs(c), 8.0), 0.0, 1.0) * 1.4;

  // Covers the whole header, thinning from right to left so the copy sits on
  // the sparsest part of the field.
  v *= mix(0.2, 1.0, smoothstep(0.0, 1.0, uv.x));

  float a = v > bayer8(gl_FragCoord.xy) ? 1.0 : 0.0;
  gl_FragColor = vec4(uInk * a, a);
}`;

  const CELL_SIZE = 2;

  const dither: Attachment<HTMLCanvasElement> = (canvas) => {
    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return;

    const program = gl.createProgram();
    const shaders = (
      [
        [gl.VERTEX_SHADER, VERTEX],
        [gl.FRAGMENT_SHADER, FRAGMENT],
      ] as const
    ).map(([type, source]) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      gl.attachShader(program, shader);
      return shader;
    });
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const position = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const sizeUniform = gl.getUniformLocation(program, "uSize");
    const timeUniform = gl.getUniformLocation(program, "uTime");
    const inkUniform = gl.getUniformLocation(program, "uInk");

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    // Start mid-drift so the first frame is already a composed field.
    let elapsed = 40;
    let last = 0;
    let frame = 0;
    let visible = false;

    const draw = () => {
      gl.uniform1f(timeUniform, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // The ink is the canvas's own `color`, so it follows the theme tokens.
    // Painting it onto a 1×1 canvas resolves any CSS color (oklch included)
    // to sRGB bytes.
    const probe = document.createElement("canvas").getContext("2d", {
      willReadFrequently: true,
    })!;
    const ink = () => {
      probe.fillStyle = getComputedStyle(canvas).color;
      probe.fillRect(0, 0, 1, 1);
      const [red, green, blue] = probe.getImageData(0, 0, 1, 1).data;
      gl.uniform3f(inkUniform, red / 255, green / 255, blue / 255);
      draw();
    };

    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth / CELL_SIZE));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight / CELL_SIZE));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(sizeUniform, canvas.width, canvas.height);
      draw();
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (last) elapsed += (now - last) / 1000;
      last = now;
      draw();
    };

    const sync = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (visible && !document.hidden && !motion.matches) {
        frame = requestAnimationFrame(tick);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersection.observe(canvas);
    const theme = new MutationObserver(ink);
    theme.observe(document.documentElement, { attributeFilter: ["class"] });
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);

    resize();
    ink();
    canvas.dataset.ready = "";

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      theme.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      gl.deleteBuffer(buffer);
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteProgram(program);
    };
  };
</script>

<canvas
  {@attach dither}
  class="pointer-events-none absolute inset-0 size-full text-subtle-foreground opacity-0 transition-opacity duration-1000 [image-rendering:pixelated] data-ready:opacity-60"
  aria-hidden="true"
></canvas>
