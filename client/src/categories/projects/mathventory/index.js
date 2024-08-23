import { FormProvider, useForm } from "react-hook-form";
import Game from "./components/Game";
import Initializer from "./components/Initializer";

export default function MathventoryPage() {
  const methods = useForm();
  return (
    <>
      <FormProvider {...methods}>
        <div className="flex h-full items-center justify-center [&_*]:font-redhat">
          <Initializer />
          <Game />
        </div>
      </FormProvider>
    </>
  );
}
