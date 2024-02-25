import { useState } from "react";

export default function SyntaxChecker() {
  interface SyntaxCheckResult {
    isValid: boolean;
    message: string;
  }

  interface SymbolMapping {
    [key: string]: string;
  }

  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<SyntaxCheckResult>();

  const openingSymbols: SymbolMapping = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  const closingSymbols: SymbolMapping = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  const checkSyntax = (code: string) => {
    const stack: Array<{ char: string; index: number }> = [];
    let inString: string | null = null; // Tracks the type of quote we're inside

    for (let i = 0; i < code.length; i++) {
      const char = code[i];

      //checks if we're entering or exiting a string
      if (inString) {
        //code[i - 1] !== "\\" checks if the character before quote is \\
        //if it is then it's part of the string so we need not to consider it
        //that's why we need !==
        if (char === inString && code[i - 1] !== "\\") {
          // Ignore escaped quotes
          inString = null; // Exiting the string
        }
        continue; // Skip processing while inside the string
      } else if (char === '"' || char === "'" || char === "`") {
        inString = char; // Entering a string
        continue;
      }

      if (openingSymbols[char]) {
        stack.push({ char, index: i });
      } else if (closingSymbols[char]) {
        //everything else matches and there's an extra closing symbol at the last
        if (stack.length === 0) {
          setResult({
            isValid: false,
            message: `Unexpected closing ${char} at position ${i}`,
          });
          return;
        }
        const last = stack.pop();
        if (last) {
          //general mismatch between the symbols
          if (openingSymbols[last.char] !== char) {
            setResult({
              isValid: false,
              message: `Mismatched ${last.char} at position ${last.index} with ${char} at position ${i}`,
            });
            return;
          }
        }
      }
    }
    //everthing else matches and there's an extra opening symbol in the beginning
    if (stack.length > 0) {
      const lastUnmatched = stack.pop();
      if (lastUnmatched) {
        setResult({
          isValid: false,
          message: `Unmatched ${lastUnmatched.char} at position ${lastUnmatched.index}`,
        });
        return;
      }
    }

    setResult({ isValid: true, message: "All brackets correctly matched" });
  };
  return (
    <div className="w-full h-[100%] flex justify-evenly">
      <div className="syntax-checker w-[40%]">
        <textarea
          rows={20}
          onChange={(e) => setText(e.target.value)}
          className=" bg-slate-100 p-6 w-full"
        ></textarea>
        <div className="flex gap-4 items-center">
          <button
            className="bg-blue-950 text-slate-300 w-fit px-4 py-2 rounded-sm"
            onClick={() => checkSyntax(text)}
          >
            {" "}
            Check syntax
          </button>
          <p
            className={`${
              result?.isValid ? " text-green-600" : "text-red-500"
            }`}
          >
            {result?.message}
          </p>
        </div>
      </div>
      <div className="w-[40%] h-[80%] self-center overflow-y-auto flex flex-col">
        <div className=" flex flex-col">
          <p className="font-bold mb-4 text-lg">Syntax checker</p>
          <p className="mb-2">It does the following things: </p>
          <p>1. Checks your code for {`{} () []`} brackets.</p>
          <p>2. Ignores the brackets if they are part of a string.</p>
          <p className="mt-4 mb-2">
            It uses <span className="font-bold">Stack</span> data structure to
            do this. This is how it works:
          </p>
          <p>
            1. Each opening bracket is pushed into the stack with its position.
          </p>
          <p>
            2. If it is a closing bracket, then it should match the top/last
            correspoding opening bracket. If it does the comparision continues.
          </p>
          <p>
            3. If the stack is empty and we still receive an closing bracket
            then it gives "Unexpected closing bracket at position x" error.
          </p>
          <p>
            4. If comparision is completed and stack is not empty then it gives
            "Unmatched opening bracket at position x" error.
          </p>
          <p>
            5. If the comparision is completed and stack is empty then it gives
            "All brackets correctly matched" confirmation.
          </p>
          <p className="my-4">
            For knowing how it ignores string containing brackets and Source
            code, visit the GitHub Repo
          </p>
          <p className="mb-4">Scroll for code samples to test.</p>
        </div>
        <div className=" flex flex-col justify-center items-center gap-4">
          <iframe
            src="https://carbon.now.sh/embed?bg=rgba%28171%2C+184%2C+195%2C+1%29&t=seti&wt=none&l=application%2Ftypescript&width=482&ds=false&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=0px&ph=0px&ln=false&fl=1&fm=Hack&fs=10px&lh=188%25&si=false&es=2x&wm=false&code=function%2520findMax%28values%253A%2520number%255B%255D%29%253A%2520number%2520%257B%250A%2520%2520%2520%2520let%2520max%2520%253D%2520values%255B0%255D%253B%250A%2520%2520%2520%2520for%2520%28let%2520i%2520%253D%25201%253B%2520i%2520%253C%2520values.length%253B%2520i%252B%252B%29%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520if%2520%28values%255Bi%255D%2520%253E%2520max%29%2520max%2520%253D%2520values%255Bi%253B%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520return%2520max%253B%250A%257D"
            style={{
              width: "600px",
              height: "200px",
              border: "0",
              transform: "scale(1)",
              overflow: "hidden",
            }}
            sandbox="allow-scripts allow-same-origin"
          />
          <iframe
            src="https://carbon.now.sh/embed?bg=rgba%28171%2C+184%2C+195%2C+1%29&t=seti&wt=none&l=application%2Ftypescript&width=482&ds=false&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=0px&ph=0px&ln=false&fl=1&fm=Hack&fs=10px&lh=188%25&si=false&es=2x&wm=false&code=function%2520nestedString%28%29%253A%2520string%2520%257B%250A%2520%2520%2520%2520return%2520%2522This%2520%257Bis%257D%2520a%2520string%2520with%2520%2560nested%2560%2520brackets%252C%2520including%2520some%2520%2560escaped%2520%255C%255C%2560%2520backticks%2560.%2522%253B%250A%257D"
            style={{
              width: "616px",
              height: "150px",
              border: "0",
              transform: "scale(1)",
              overflow: "hidden",
            }}
            sandbox="allow-scripts allow-same-origin"
          />
          <iframe
            src="https://carbon.now.sh/embed?bg=rgba%28171%2C+184%2C+195%2C+1%29&t=seti&wt=none&l=application%2Ftypescript&width=482&ds=false&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=0px&ph=0px&ln=false&fl=1&fm=Hack&fs=10px&lh=188%25&si=false&es=2x&wm=false&code=function%2520templateStringExample%28%29%253A%2520string%2520%257B%250A%2520%2520%2520%2520return%2520%28%2560Template%2520string%2520with%2520a%2520variable%253A%2520%2524%257Bvariable%257D%2520and%2520an%2520escaped%2520%255C%2524%257B%2520not%2520a%2520variable%257D.%2560%253B%250A%257D"
            style={{
              width: "604px",
              height: "150px",
              border: "0",
              transform: "scale(1)",
              overflow: "hidden",
            }}
            sandbox="allow-scripts allow-same-origin"
          />
          <iframe
            src="https://carbon.now.sh/embed?bg=rgba%28171%2C+184%2C+195%2C+1%29&t=seti&wt=none&l=application%2Ftypescript&width=482&ds=false&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=0px&ph=0px&ln=false&fl=1&fm=Hack&fs=10px&lh=188%25&si=false&es=2x&wm=false&code=function%2520complexLogic%28%29%253A%2520void%2520%257B%250A%2520%2520%2520%2520console.log%28%2522An%2520example%2520with%2520%257Bunmatched%2520brackets%2520and%2520%255C%2522escaped%2520quotes%255C%2522.%2522%29%253B%250A%257D"
            style={{
              width: "514px",
              height: "150px",
              border: "0",
              transform: "scale(1)",
              overflow: "hidden",
            }}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
