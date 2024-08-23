import * as _ from "lodash-es";

export function ExistentialTransition({
  trigger,
  outerStyles,
  innerStyles,
  children,
}) {
  return (
    <>
      <div
        className={`grid ${trigger ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} transition-[grid] duration-300 ease-in-out ${outerStyles}`}
      >
        <div className={`overflow-hidden ${innerStyles}`}>{children}</div>
      </div>
    </>
  );
}

// game creation utility
const OPERATOR_MAP = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};

const STRING_TO_OPERATOR = {
  addition: "+",
  subtraction: "-",
  multiplication: "*",
  division: "/",
};

export function getQuestions(information) {
  const { operations } = information;
  let store = [];

  for (const operation of operations) {
    store.push(...createQuestions(STRING_TO_OPERATOR[operation], information));
  }

  return _.shuffle(store);
}

function createQuestions(operation, information) {
  const { questionAmount } = information;

  return _.range(questionAmount).map(() =>
    createQuestion(operation, information),
  );
}

function createQuestion(operation, information) {
  const {
    numberRange: [start, end],
  } = information;

  const [leftOperand, rightOperand] = getOperands(operation, start, end);

  const addBrackets = (n) => (n >= 0 ? `${n}` : `-(${n})`);
  const operator = OPERATOR_MAP[operation];

  const answer = operator(leftOperand, rightOperand);
  return {
    question: `${addBrackets(leftOperand)} ${operation} ${addBrackets(rightOperand)}`,
    answers: _.shuffle([
      { value: answer, isAnswer: true },
      ..._.range(3).map(() => ({
        value: operator(...getOperands(operation, answer - 10, answer + 10)),
        isAnswer: false,
      })),
    ]),
  };
}

function getOperands(operation, start, end) {
  const arr = _.remove(_.range(start, end), (n) => n === 0);

  const leftOperand = _.sample(arr);
  let rightOperand;
  if (operation === "/") {
    rightOperand = _.sample(_.range(1, rightOperand - 1));
  } else {
    rightOperand = _.sample(arr);
  }

  return [leftOperand, rightOperand];
}
