import processMath from "./math.ts";

const mathChar = "¨";

type Mode = {
  m: "text";
} | {
  m: "math";
  delim: "none" | "parens";
};

export default function asciimath(src: string): string {
  let mode: Mode = { m: "text" };
  let parenStack = 0;
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
          const peek = iter.next().value;
          const delim = peek === "(" ? "parens" : "none";
          if (delim === "parens") parenStack = 1;
          else mathBuffer.push(peek);
          mode = {
            m: "math",
            delim,
          };
          continue parsing;
        }
        rv.push(ch);
        break;
      }
      case "math": {
        if (mode.delim === "parens") {
          if (ch === "(") parenStack++;
          if (ch === ")") parenStack--;
        }

        mathBuffer.push(ch);

        let endOfMath = false;
        endOfMath ||= mode.delim === "none" && ch.match(/\s/) !== null;
        endOfMath ||= mode.delim === "parens" && parenStack === 0;

        if (endOfMath) {
          if (mode.delim === "parens") mathBuffer.pop();
          rv.push(processMath(mathBuffer.join("")));
          mode = { m: "text" };
          mathBuffer = [];
          continue parsing;
        }
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
