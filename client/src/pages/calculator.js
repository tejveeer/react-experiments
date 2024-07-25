import { useState } from "react";

const Calculator = () => {
  const [numbers, setNumbers] = useState("");
  const [expression, setExpression] = useState("");

  const setDisplay = (char) => {
    const ops = ["/", "x", "+", "-"];
    if (ops.includes(char)) {
      if (ops.includes(expression[expression.length - 1])) {
        if (char === ".") {
          return;
        }

        setExpression(expression + " " + numbers + " " + char);
        setNumbers("");
      } else {
        setExpression(expression + numbers + " " + char);
        setNumbers("");
      }
    } else {
      if (char === "." && numbers.includes(".")) {
        return;
      }
      setNumbers(numbers + char);
    }
  };

  const clear = () => {
    setExpression("");
    setNumbers("");
  };

  const submit = () => {
    if (numbers[numbers.length - 1] === ".") {
      return;
    }

    setNumbers(eval((expression + numbers).replaceAll("x", "*")));
    setExpression("");
  };

  return (
    <div className="flex flex-col justify-center box-border mx-auto w-[20rem] h-screen">
      <div className="overflow-hidden grid gap-1 grid-cols-4 grid-rows-6 mx-0 h-[30rem] border-solid border-[4px] rounded-3xl">
        <div className="text-[2.3rem] pr-1 flex flex-col justify-between text-right relative col-span-4 bg-gray-400">
          <div className="font-normal italic pt-2 text-[1rem] w-[97%] h-[20%]">
            {expression}
          </div>
          {numbers}
        </div>
        <button
          className="col-span-3 border-0 rounded-md text-xl"
          onClick={() => clear()}
        >
          Clear
        </button>
        {["/", 1, 2, 3, "x", 4, 5, 6, "+", 7, 8, 9, "-", 0, "."].map((char) => (
          <button
            className="col-span-1 border-0 rounded-md text-xl"
            onClick={() => setDisplay(char)}
          >
            {char}
          </button>
        ))}
        <button
          className="col-span-2 border-0 rounded-md text-xl"
          onClick={() => submit()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Calculator;
