import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import { dirOf, findFile, resolvePath } from "./fs";
import { macDate, pad2, type Command, type Shell } from "./shell.svelte";

/* Everything a guest can type. Anything else — `help` included — is
   `command not found`, on purpose. */

function slugOf(name: string) {
  return name.replace(/\.md$/, "");
}

function openFile(sh: Shell, cmd: "cat" | "open", arg: string) {
  if (!arg) {
    if (cmd === "cat") sh.enter("cat");
    else sh.out("usage: open file");
    return;
  }
  const f = findFile(sh.cwd, arg) || findFile(sh.cwd, arg + ".md");
  if (!f) {
    sh.out(
      arg.includes(sh.requested.split("/").pop() ?? " ")
        ? "cat: no such file or directory · not this again"
        : `${cmd}: ${arg}: No such file or directory`
    );
  } else if (f.content === "post") {
    sh.out(`opening ${f.name} …`);
    sh.later(
      () => goto(resolve("/writing/[slug]", { slug: slugOf(f.name) })),
      450
    );
  } else if (f.content === "binary") {
    sh.out(`${cmd}: ${f.name}: binary file — it does exist, though:`);
    sh.out("/resume.pdf", "/resume.pdf");
  } else {
    f.content.split("\n").forEach((l) => sh.out(l));
  }
}

export const commands: Record<string, Command> = {
  ls(sh, _arg, parts) {
    const all = parts.some((t) => t[0] === "-" && t.includes("a"));
    const pathArg = parts.slice(1).find((t) => t[0] !== "-");
    const target = pathArg ? resolvePath(sh.cwd, pathArg) : sh.cwd;
    const d = target && dirOf(target);
    if (!d) return sh.out(`ls: ${pathArg}: No such file or directory`);
    const names = d.dirs
      .map((x) => x + "/")
      .concat(Object.keys(d.files).filter((f) => all || f[0] !== "."));
    if (!names.length) return sh.out("total 0");
    for (const n of names) {
      if (d.files[n] === "post")
        sh.out(n, resolve("/writing/[slug]", { slug: slugOf(n) }));
      else sh.out(n);
    }
  },
  cd(sh, arg) {
    if (!arg || arg === "~") return void (sh.cwd = "~");
    const t = resolvePath(sh.cwd, arg);
    if (arg[0] === "/") sh.out(`cd: permission denied: ${arg}`);
    else if (!t) sh.out(`cd: no such file or directory: ${arg}`);
    else sh.cwd = t;
  },
  cat: (sh, arg) => openFile(sh, "cat", arg),
  open: (sh, arg) => openFile(sh, "open", arg),
  pwd: (sh) => sh.out(sh.cwd.replace("~", "/Users/guest")),
  whoami: (sh) => sh.out("guest"),
  echo: (sh, arg) => sh.out(arg),
  date(sh) {
    const now = new Date();
    const off = -now.getTimezoneOffset() / 60;
    const sign = off >= 0 ? "+" : "-";
    sh.out(
      `${macDate(now)} ${sign}${pad2(Math.abs(off))} ${now.getFullYear()}`
    );
  },
  uptime(sh) {
    const now = new Date();
    const up = Math.floor((Date.now() - sh.boot) / 1000);
    const since = up < 60 ? `${up} secs` : `${Math.floor(up / 60)} mins`;
    sh.out(
      `${pad2(now.getHours())}:${pad2(now.getMinutes())}  up ${since}, 1 user, load averages: 1.52 1.68 1.72`
    );
  },
  history(sh) {
    sh.history.forEach((h, i) => sh.out(`  ${i + 1}  ${h}`));
  },
  neofetch(sh) {
    const up = Math.floor((Date.now() - sh.boot) / 1000);
    const light = document.documentElement.classList.contains("light");
    const info = [
      "guest@orhantugrul.dev",
      "---------------------",
      "OS: orhantugrul.dev 2.0 (console)",
      "Shell: zsh (as far as you know)",
      `Uptime: ${Math.floor(up / 60)}m ${up % 60}s`,
      `Theme: ${light ? "light" : "dark"}`,
      "404s survived: 1 (this one)",
    ];
    for (let y = 0; y < info.length; y++) {
      let art = "";
      for (let x = 0; x < 16; x++) {
        const v = Math.sin(x * 0.5 + y * 0.9) + Math.sin(y * 0.6 - x * 0.2);
        art +=
          v > 1.1 ? "#" : v > 0.4 ? "+" : v > -0.3 ? ":" : v > -1.1 ? "·" : " ";
      }
      sh.out(`${art}   ${info[y]}`);
    }
  },
  ping(sh, arg) {
    const host = arg || "orhantugrul.dev";
    if (host.includes("orhantugrul") || host === "localhost")
      sh.startPing(host, host === "localhost" ? "127.0.0.1" : "76.76.21.21");
    else sh.out(`ping: cannot resolve ${host}: Unknown host`);
  },
  vim(sh, arg) {
    sh.enter("vim");
    sh.out(`"${arg || "[No Name]"}" -- INSERT --`);
  },
  man(sh, arg) {
    sh.out(
      arg ? `No manual entry for ${arg}` : "What manual page do you want?"
    );
  },
  sudo(sh) {
    sh.enter("sudo");
    sh.out("Password:");
  },
  rm: (sh, arg) => sh.out(`rm: ${arg}: Permission denied`),
  clear: (sh) => sh.clear(),
  exit(sh) {
    sh.out("logout");
    sh.out("[Process completed]");
    sh.later(() => goto(resolve("/")), 700);
  },
};

commands.vi = commands.nano = commands.vim;
commands.logout = commands.exit;
