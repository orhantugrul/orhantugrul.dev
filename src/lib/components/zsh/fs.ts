import { writings } from "$lib/writings";

export type Dir = { dirs: string[]; files: Record<string, string> };

/* the filesystem a guest is allowed to believe exists */
const FS: Record<string, Dir> = {
  "~": {
    dirs: ["writing"],
    files: {
      "resume.pdf": "binary",
      ".plan": "1. ship the redesign\n2. write more\n3. touch grass",
    },
  },
  "~/writing": {
    dirs: ["drafts"],
    files: Object.fromEntries(writings.map((w) => [`${w.slug}.md`, "post"])),
  },
  "~/writing/drafts": {
    dirs: [],
    files: {
      "untitled.md":
        "# untitled\n\nevery good idea starts as a bad note.\nthis one is still a bad note.",
    },
  },
};

const EMPTY: Dir = { dirs: [], files: {} };
const dayOne = writings.length === 0;

export function dirOf(path: string): Dir | null {
  const d = FS[path];
  if (!d) return null;
  return dayOne && path.startsWith("~/writing") ? EMPTY : d;
}

/** Resolves `arg` against `cwd`; null once it leaves the fake tree. */
export function resolvePath(cwd: string, arg: string): string | null {
  if (!arg || arg === "~" || arg === "~/") return "~";
  let here = cwd.split("/");
  if (arg.startsWith("~/")) {
    here = ["~"];
    arg = arg.slice(2);
  } else if (arg[0] === "/") return null;
  for (const p of arg.split("/")) {
    if (!p || p === ".") continue;
    if (p === "..") {
      if (here.length > 1) here.pop();
      continue;
    }
    const d = dirOf(here.join("/"));
    if (!d || !d.dirs.includes(p)) return null;
    here.push(p);
  }
  return here.join("/");
}

export function findFile(cwd: string, arg: string) {
  const idx = arg.lastIndexOf("/");
  const dirPath = idx < 0 ? cwd : resolvePath(cwd, arg.slice(0, idx) || "~");
  const base = idx < 0 ? arg : arg.slice(idx + 1);
  const d = dirPath && dirOf(dirPath);
  if (!d || !Object.prototype.hasOwnProperty.call(d.files, base)) return null;
  return { name: base, content: d.files[base] };
}
