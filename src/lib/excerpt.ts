/** A cited line is often a whole paragraph: open it at the words the answer used, so the callout shows them.
 * Shared by the build (the static source list) and the hero script. */
export function excerpt(line: string, said: string) {
  const w = said.replace(/[‘’]/g, "'").trim().split(/\s+/), tt = line.replace(/[‘’]/g, "'");
  for (let k = 0; k < Math.min(4, w.length - 3); k++) {
    const i = tt.indexOf(w.slice(k, k + 4).join(' '));
    if (i > -1) return i > 30 ? '…' + line.slice(i) : line;
  }
  return line;
}
