import { useState } from "react";

const A = ({ callback }) => {
  console.log("A");
  return <button onClick={() => callback(10)}>Increment 10</button>;
};

const B = ({ callback }) => {
  console.log("B");
  return (
    <>
      <button onClick={() => callback(5)}>Increment 5</button>
      <C />
    </>
  );
};

const C = () => {
  console.log("Here");
  return <></>;
};

const Experiment = () => {
  const [state, setState] = useState(0);
  const incrementStateBy = (n) => {
    setState(state + n);
    console.log(`State changed to ${state}`);
  };

  console.log("Experiment");
  return (
    <>
      <button onClick={() => incrementStateBy(3)}>Parent</button>
      <A callback={incrementStateBy} />
      <B callback={incrementStateBy} />
    </>
  );
};

export default Experiment;
