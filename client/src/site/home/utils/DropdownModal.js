import { useReducer } from "react";
import {
  switchDropdownVisibilityDispatcher,
  changeOptionSelectionDispatcher,
} from "./dropdownDispatcher";

export const actions = {
  SWITCH_DROPDOWN_VISIBILITY: "SWITCH_DROPDOWN_VISIBILITY",
  CHANGE_OPTION_SELECTION: "CHANGE_OPTION_SELECTION",
  INITIALIZE_OPTIONS: "INITIALIZE_OPTIONS",
  SWITCH_OPTIONS_VISIBILITY: "SWITCH_OPTIONS_VISIBILITY",
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SWITCH_DROPDOWN_VISIBILITY:
      return { ...state, visible: !state.visible };

    case actions.CHANGE_OPTION_SELECTION:
      const optionToChange = action.payload.option;
      return {
        ...state,
        options: state.options.map((optionObj) => {
          if (optionObj.option === optionToChange || optionObj.selected) {
            return { ...optionObj, selected: !optionObj.selected };
          }
          return optionObj;
        }),
      };

    case actions.INITIALIZE_OPTIONS:
      return { visible: false, options: action.payload.options };

    case actions.SWITCH_OPTIONS_VISIBILITY:
      const optionsToChange = action.payload.options;
      return {
        ...state,
        options: state.options.map((optionObj) => {
          const optionVisibility = optionObj?.visible;
          if (optionsToChange.includes(optionObj.option)) {
            return {
              ...optionObj,
              visible: optionVisibility ? !optionVisibility : false,
            };
          }
          return {
            ...optionObj,
            visible: optionVisibility ? optionVisibility : true,
          };
        }),
      };

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

export function DropdownModal({
  state,
  dispatch,
  onSelectOption = null,
  onDropdownClick = null,
}) {
  if (!onDropdownClick) {
    onDropdownClick = () => switchDropdownVisibilityDispatcher(dispatch);
  }
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
          onClick={onDropdownClick}
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
      changeOptionSelectionDispatcher(dispatch, option);
      switchDropdownVisibilityDispatcher(dispatch);
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
