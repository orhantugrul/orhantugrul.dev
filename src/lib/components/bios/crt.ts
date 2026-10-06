// Shows a source canvas through a CRT: a curved face with rounded corners,
// scanlines, an aperture grille, phosphor bloom and a little colour fringe.
// Flicker, grain and a slow rolling band only run when motion is allowed.
const VERTEX = `attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAGMENT = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uSrc;
uniform float uTime;
uniform float uDpr;
uniform float uMotion;

const vec3 BEZEL = vec3(0.0);

vec2 curve(vec2 p) {
  p = p * 2.0 - 1.0;
  vec2 o = abs(p.yx) / vec2(5.0, 4.0);
  p += p * o * o;
  return p * 0.5 + 0.5;
}

float rand(vec2 c) { return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 q = curve(gl_FragCoord.xy / uRes);

  // The face is a rounded rectangle whose soft edge sits just inside the
  // curve, so it never meets the bezel in a jagged line.
  vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
  vec2 d = abs(q - 0.5) * aspect - (0.5 * aspect - 0.035);
  float edge = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - 0.035;
  float face = 1.0 - smoothstep(-0.006, 0.0, edge);
  if (face <= 0.0) {
    gl_FragColor = vec4(BEZEL, 1.0);
    return;
  }

  vec2 px = 1.0 / uSrc;
  vec3 col;
  col.r = texture2D(uTex, q + vec2(px.x, 0.0)).r;
  col.g = texture2D(uTex, q).g;
  col.b = texture2D(uTex, q - vec2(px.x, 0.0)).b;
  vec3 glow = vec3(0.0);
  for (int i = 0; i < 8; i++) {
    float a = float(i) * 0.7854;
    glow += texture2D(uTex, q + vec2(cos(a), sin(a)) * px * 5.0).rgb;
  }
  col += glow / 8.0 * 0.5;

  float scan = 0.72 + 0.28 * sin(gl_FragCoord.y / uDpr * 2.0944);
  float m = mod(gl_FragCoord.x / uDpr, 3.0);
  vec3 mask = vec3(0.85);
  if (m < 1.0) mask.r = 1.0; else if (m < 2.0) mask.g = 1.0; else mask.b = 1.0;
  col *= scan * mask * 1.25;
  col *= pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 0.28);
  col += 0.018 * smoothstep(0.55, 0.0, length(q - vec2(0.28, 0.8)));

  if (uMotion > 0.5) {
    col *= 1.0 + 0.015 * sin(uTime * 110.0);
    col += (rand(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) * 0.03;
    col += 0.02 * smoothstep(0.12, 0.0, abs(fract(uTime * 0.09) - q.y));
  }
  gl_FragColor = vec4(mix(BEZEL, col, face), 1.0);
}`;

export type Tube = {
  /** `fresh` means the source changed since the last frame. */
  draw(
    source: HTMLCanvasElement,
    fresh: boolean,
    seconds: number,
    motion: boolean,
  ): void;
  dispose(): void;
};

export function tube(canvas: HTMLCanvasElement): Tube {
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
  return gl ? crt(canvas, gl) : flat(canvas);
}

function fit(canvas: HTMLCanvasElement) {
  const pixelRatio = Math.min(devicePixelRatio, 2);
  const width = Math.round(canvas.clientWidth * pixelRatio);
  const height = Math.round(canvas.clientHeight * pixelRatio);
  const resized = canvas.width !== width || canvas.height !== height;
  if (resized) {
    canvas.width = width;
    canvas.height = height;
  }
  return { resized, pixelRatio };
}

function flat(canvas: HTMLCanvasElement): Tube {
  const context = canvas.getContext("2d")!;
  return {
    draw(source, fresh) {
      const { resized } = fit(canvas);
      if (fresh || resized) {
        context.drawImage(source, 0, 0, canvas.width, canvas.height);
      }
    },
    dispose() {},
  };
}

function crt(canvas: HTMLCanvasElement, gl: WebGLRenderingContext): Tube {
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
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const resolutionUniform = gl.getUniformLocation(program, "uRes");
  const sourceSizeUniform = gl.getUniformLocation(program, "uSrc");
  const timeUniform = gl.getUniformLocation(program, "uTime");
  const pixelRatioUniform = gl.getUniformLocation(program, "uDpr");
  const motionUniform = gl.getUniformLocation(program, "uMotion");

  return {
    draw(source, fresh, seconds, motion) {
      const { resized, pixelRatio } = fit(canvas);
      if (!motion && !fresh && !resized) return;
      if (resized) gl.viewport(0, 0, canvas.width, canvas.height);
      if (fresh) {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          source,
        );
      }
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      gl.uniform2f(sourceSizeUniform, source.width, source.height);
      gl.uniform1f(timeUniform, seconds);
      gl.uniform1f(pixelRatioUniform, pixelRatio);
      gl.uniform1f(motionUniform, motion ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose() {
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteProgram(program);
    },
  };
}
