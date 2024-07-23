import processMath from "./math.ts";

const mathChar = "`";

type Mode = {
  m: "text";
} | {
  m: "math";
};

export default function asciimath(src: string): string {
  let mode: Mode = { m: "text" };
  let mathBuffer = [] as string[];
  const rv = [] as string[];
  const iter = src[Symbol.iterator]();

  parsing:
  while (true) {
    const { value: ch, done } = iter.next();
    if (done) break;
    switch (mode.m) {
      case "text": {
        if (ch === mathChar) {
          mode = {
            m: "math",
          };
          continue parsing;
        }
        rv.push(ch);
        break;
      }
      case "math": {
        if (ch === mathChar) {
          rv.push(processMath(mathBuffer.join("")));
          mode = { m: "text" };
          mathBuffer = [];
          continue parsing;
        }
        mathBuffer.push(ch);
        break;
      }
    }
  }

  return rv.join("");
}

if (import.meta.main) {
  const stdin = [] as string[],
    buf = new Uint8Array(1024),
    decoder = new TextDecoder();
  let n: number | null;
  while ((n = await Deno.stdin.read(buf)) !== null) {
    stdin.push(decoder.decode(buf.subarray(0, n)));
  }
  console.log("%s", asciimath(stdin.join("")));
}
