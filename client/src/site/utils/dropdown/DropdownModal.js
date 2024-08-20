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
          if (optionsToChange.includes(optionObj.option)) {
            return {
              ...optionObj,
              visible: true,
            };
          }
          return {
            ...optionObj,
            visible: false,
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
  currentlySelectedStyles = null,
  optionsContainerStyles = null,
  optionStyles = null,
  defaultCurrentlySelectedValue = "..."
}) {
  if (!onDropdownClick) {
    onDropdownClick = () => switchDropdownVisibilityDispatcher(dispatch);
  }
  const filteredOptions = state.options.filter((option) => option.selected);

  let currentlySelectedOption;
  if (filteredOptions.length === 0) {
    currentlySelectedOption = defaultCurrentlySelectedValue;
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
          currentlySelectedStyles={currentlySelectedStyles}
        />
        <Options
          options={state.options}
          visible={state.visible}
          dispatch={dispatch}
          onSelectOption={onSelectOption}
          optionsContainerStyles={optionsContainerStyles}
          optionStyles={optionStyles}
        />
      </div>
    </>
  );
}

function CurrentlySelected({
  content,
  onClick,
  currentlySelectedStyles = null,
}) {
  if (!currentlySelectedStyles) {
    currentlySelectedStyles =
      "rounded-lg bg-stone-500 p-1 px-3 font-bold text-stone-300 hover:bg-stone-600";
  }
  return (
    <>
      <div
        title={content}
        onClick={onClick}
        className={`max-w-[200px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap transition duration-100 ${currentlySelectedStyles}`}
      >
        {content}
      </div>
    </>
  );
}

function Options({
  options,
  visible,
  dispatch,
  onSelectOption,
  optionsContainerStyles = null,
  optionStyles = null,
}) {
  if (!onSelectOption) {
    onSelectOption = (option) => {
      changeOptionSelectionDispatcher(dispatch, option);
      switchDropdownVisibilityDispatcher(dispatch);
    };
  }

  if (!optionsContainerStyles) {
    optionsContainerStyles = "max-w-[150px] gap-1 rounded-lg bg-slate-200 p-1";
  }

  return (
    <>
      <div
        className={`${!visible ? "hidden" : ""} absolute left-1/2 top-[130%] flex w-max -translate-x-1/2 flex-col ${optionsContainerStyles}`}
      >
        {options.map((obj, idx) =>
          obj?.visible === undefined || obj?.visible ? (
            <Option
              key={idx}
              content={obj.option}
              selected={obj.selected}
              onSelectOption={() => onSelectOption(obj.option)}
              optionStyles={optionStyles}
            />
          ) : (
            ""
          ),
        )}
      </div>
    </>
  );
}

function Option({ content, selected, onSelectOption, optionStyles = null }) {
  if (!optionStyles) {
    optionStyles = "rounded-lg px-3 duration-300 hover:bg-slate-400";
  }
  return (
    <>
      <div
        title={content}
        // abstract selected
        className={`${selected ? "bg-slate-400" : ""} cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap ${optionStyles}`}
        onClick={onSelectOption}
      >
        {content}
      </div>
    </>
  );
}
