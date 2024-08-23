import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ExistentialTransition } from "../utils";

export default function Initializer() {
  return (
    <>
      <div className="relative">
        <Settings />
        <Start />
      </div>
    </>
  );
}

function Settings() {
  return (
    <>
      <div className="border-box w-min rounded-lg border border-solid border-slate-200 bg-slate-100 p-3 pb-4">
        <ul className="grid list-none grid-cols-2 gap-2 pl-0">
          <li>
            <Checkbox content={"Addition"} />
          </li>
          <li>
            <Checkbox content={"Subtraction"} />
          </li>
          <li>
            <Checkbox content={"Multiplication"} />
          </li>
          <li>
            <Checkbox content={"Division"} />
          </li>
        </ul>
        <AdvancedSettingsDisplay />
        <ErrorMessage />
      </div>
    </>
  );
}

function Checkbox({ content }) {
  const { register } = useFormContext();
  return (
    <>
      <div className="flex gap-1">
        <input
          type="checkbox"
          className="border-solid"
          value={content.toLowerCase()}
          {...register("operations", {
            validate: (value) =>
              value.length > 0 || "You need to have at least one operation",
          })}
        />
        <label>{content}</label>
      </div>
    </>
  );
}

function AdvancedSettingsDisplay() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div>
        <AdvancedSettings show={show} />
        <button
          className="absolute bottom-5 left-1/2 -translate-x-1/2 cursor-pointer select-none rounded-md border-none bg-orange-300 px-2 font-semibold text-white duration-100 hover:bg-orange-400"
          onClick={() => setShow(!show)}
        >
          See {show ? "less" : "more"}
        </button>
      </div>
    </>
  );
}

function AdvancedSettings({ show }) {
  return (
    <>
      <ExistentialTransition
        trigger={show}
        innerStyles={`rounded-md my-1 bg-slate-300 [&_*]:p-3`}
      >
        <div className="text-sm">This has some content now</div>
      </ExistentialTransition>
    </>
  );
}

function ErrorMessage() {
  const [error, setError] = useState("");

  const {
    formState: { errors },
  } = useFormContext();
  const hasErrors = Object.keys(errors).length !== 0;

  useEffect(() => {
    if (hasErrors) {
      setError(errors.operations.message);
    }
  }, [hasErrors, errors]);

  return (
    <>
      <ExistentialTransition trigger={hasErrors}>
        <div
          className={`rounded-lg border-dashed border-red-400 bg-red-300/70 p-1 text-center text-sm font-semibold leading-4 text-red-700/80`}
        >
          {error}
        </div>
      </ExistentialTransition>
    </>
  );
}

function Start() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <>
      <button
        className="mt-2 cursor-pointer select-none rounded-md border-none bg-slate-200 px-3 font-semibold text-slate-700 outline outline-2 outline-transparent transition-[outline] duration-200 hover:outline-blue-400 focus-visible:outline-blue-400"
        onClick={handleSubmit(() => {})}
        disabled={isSubmitting}
      >
        Start
      </button>
    </>
  );
}
