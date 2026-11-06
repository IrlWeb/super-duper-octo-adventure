const KW = new Set("and break do else elseif end false for function if in local nil not or repeat return then true until while continue".split(" "));
const RE = /(--.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)(?=\s*\()|([A-Za-z_]\w*)|(\s+)|(.)/g;

export function tokenize(line) {
  const out = [];
  let m;
  RE.lastIndex = 0;
  while ((m = RE.exec(line))) {
    if (m[1]) out.push(["c", m[1]]);
    else if (m[2]) out.push(["s", m[2]]);
    else if (m[3]) out.push(["n", m[3]]);
    else if (m[4]) out.push([KW.has(m[4]) ? "k" : "f", m[4]]);
    else if (m[5]) out.push([KW.has(m[5]) ? "k" : "p", m[5]]);
    else out.push(["p", m[0]]);
  }
  return out;
}

export const TOKEN_CLASS = {
  c: "italic text-[#82828B]",
  s: "text-[#A9A9B3]",
  n: "text-[#FF8A4C]",
  k: "font-medium text-white",
  f: "text-[#E4E4E7]",
  p: "text-[#C9C9D1]",
};
