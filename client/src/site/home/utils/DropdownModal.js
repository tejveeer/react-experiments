import { useReducer } from "react";

export const actions = {
  SWITCH_VISIBILITY: "SWITCH_VISIBILITY",
  CHANGE_SELECTED_OPTION: "CHANGE_SELECTED_OPTION",
  INITIALIZE_OPTIONS: "INITIALIZE_OPTIONS",
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SWITCH_VISIBILITY:
      return { ...state, visible: !state.visible };

    case actions.CHANGE_SELECTED_OPTION:
      const optionToChange = action.payload.option;
      const changeSelected = (options) => {
        return options.map((optionObj) => {
          if (optionObj.option === optionToChange || optionObj.selected) {
            return { ...optionObj, selected: !optionObj.selected };
          }
          return optionObj;
        });
      };

      return {
        ...state,
        options: changeSelected(state.options),
      };

    case actions.INITIALIZE_OPTIONS:
      return { visible: false, options: action.payload.options };

    default:
      return;
  }
}

export function useDropdownState(options) {
  return useReducer(
    reducer,
    options ? { visible: false, options } : { visible: false, options: [] },
  );
}

export function DropdownModal({ state, dispatch, onSelectOption = null }) {
  const filteredOptions = state.options.filter((option) => option.selected);

  let currentlySelectedOption;
  if (filteredOptions.length === 0) {
    currentlySelectedOption = "...";
  } else {
    const [{ option }] = filteredOptions;
    currentlySelectedOption = option;
  }

  return (
    <>
      <div className="relative">
        <CurrentlySelected
          content={currentlySelectedOption}
          onClick={() => dispatch({ type: actions.SWITCH_VISIBILITY })}
        />
        <Options
          options={state.options}
          visible={state.visible}
          dispatch={dispatch}
          onSelectOption={onSelectOption}
        />
      </div>
    </>
  );
}

function CurrentlySelected({ content, onClick }) {
  return (
    <>
      <div
        title={content}
        onClick={onClick}
        className="max-w-[200px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-lg bg-stone-500 p-1 px-3 font-bold text-stone-300 transition duration-100 hover:bg-stone-600"
      >
        {content}
      </div>
    </>
  );
}

function Options({ options, visible, dispatch, onSelectOption }) {
  if (!onSelectOption) {
    onSelectOption = (option) => {
      dispatch({
        type: actions.CHANGE_SELECTED_OPTION,
        payload: {
          option,
        },
      });
      dispatch({
        type: actions.SWITCH_VISIBILITY,
      });
    };
  }

  return (
    <>
      <div
        className={`${!visible ? "hidden" : ""} py absolute left-1/2 top-[130%] flex w-max max-w-[150px] -translate-x-1/2 flex-col gap-1 rounded-lg bg-slate-200 p-1`}
      >
        {options.map((obj, idx) => (
          <Option
            key={idx}
            content={obj.option}
            selected={obj.selected}
            onSelectOption={() => onSelectOption(obj.option)}
          />
        ))}
      </div>
    </>
  );
}

function Option({ content, selected, onSelectOption }) {
  return (
    <>
      <div
        title={content}
        className={`${selected ? "bg-slate-400" : ""} cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-lg px-3 duration-300 hover:bg-slate-400`}
        onClick={onSelectOption}
      >
        {content}
      </div>
    </>
  );
}
