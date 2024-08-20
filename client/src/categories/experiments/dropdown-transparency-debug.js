import {
  DropdownModal,
  useDropdownState,
} from "../../site/utils/dropdown/DropdownModal";

export default function Experiment() {
  const [state1, dispatch1] = useDropdownState([
    { option: "test", selected: true },
    { option: "another test" },
    { option: "another test 2" },
  ]);

  const [state2, dispatch2] = useDropdownState([
    { option: "test", selected: true },
    { option: "another test" },
    { option: "another test 2" },
  ]);

  return (
    <>
      <div className="mx-auto flex h-full w-2/4 flex-col justify-center sm:w-[300px]">
        <div className="mx-auto w-3/4 rounded-lg border-solid p-4">
          <span className="font-mono font-semibold">Flex Container</span>
          <div className="mb-4 flex rounded-md border-solid p-1">
            <DropdownModal state={state1} dispatch={dispatch1} />
          </div>
          <span className="font-mono font-semibold">Non-flex Container</span>
          <div className="mb-4 rounded-md border-solid p-1">
            <DropdownModal state={state2} dispatch={dispatch2} />
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
            incidunt illum optio, veniam vero natus debitis sapiente esse? Quas
            vel suscipit nostrum dolorem itaque adipisci nihil neque, enim
            deleniti explicabo.
          </div>
        </div>
      </div>
    </>
  );
}
