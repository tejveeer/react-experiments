import { random } from "lodash-es";
import { useState } from "react";

const INSULTS = [
  "name, you are not stupid, you just have bad luck thinking.",
  "name, I would agree with you, but we'd both be wrong.",
  "name, your secrets are always safe with me. I never even listen when you tell me them.",
  "I'd explain it to you, name, but I left my crayons at home.",
];

function generateInsult(name) {
  const insult = INSULTS[random(0, INSULTS.length - 1)];
  return insult.replace("name", name);
}

export default function Experiment() {
  const [name, setName] = useState("");
  const [insult, setInsult] = useState("");

  const onSubmit = () => {
    setInsult(generateInsult(name));
  };

  return (
    <>
      <div className="grid grid-rows-2 mx-auto w-[210px] h-full">
        <div className="self-end flex flex-col gap-2">
          <input
            className="rounded-md border-solid border-orange-300 p-2 text-[1rem] outline-none"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button
            onClick={onSubmit}
            className="self-start rounded-md border-solid px-2 transition"
          >
            Submit
          </button>
        </div>
        <div className="mt-6">{insult}</div>
      </div>
    </>
  );
}
