import {
  useDropdownState,
  DropdownModal,
} from "../utils/dropdown/DropdownModal";

import { useNavigate } from "react-router-dom";
import { useQCache } from "../utils/categoriesUtils";
import {
  changeOptionSelectionDispatcher,
  initializeOptionsDispatcher,
  switchDropdownVisibilityDispatcher,
  switchOptionsVisibilityDispatcher,
} from "../utils/dropdown/dropdownDispatcher";

import { useEffect } from "react";

const dropdownStyles = {
  currentlySelectedStyles: `bg-teal-700/60 opacity-100 text-sm rounded-lg px-3 font-bold text-stone-300 hover:bg-teal-800`,
  optionsContainerStyles: `max-w-[150px] gap-1 rounded-lg bg-slate-200 p-1`,
  optionStyles: `rounded-lg px-3 duration-300 hover:bg-slate-400`,
};

export function NavbarSearch({ location }) {
  const importablePaths = useQCache("importable-paths");
  const navigate = useNavigate();

  const [folderState, folderDispatch] = useDropdownState(null);
  const [fileState, fileDispatch] = useDropdownState(null);

  usePathOptionsInitialier(
    location,
    importablePaths,
    folderDispatch,
    fileDispatch,
  );

  function selectFolderOption(option) {
    if (importablePaths.length === 0) return;

    const correspondingFolderFiles = importablePaths
      .filter((path) => path.includes(option))
      .map((path) => path.split("/")[1].replace(".js", ""));

    switchOptionsVisibilityDispatcher(fileDispatch, correspondingFolderFiles);

    const fileSelections = fileState.options.filter(
      (option) => option.selected,
    );
    if (fileSelections.length !== 0) {
      const [{ option }] = fileSelections;
      changeOptionSelectionDispatcher(fileDispatch, option);
    }

    changeOptionSelectionDispatcher(folderDispatch, option);
    switchDropdownVisibilityDispatcher(folderDispatch);
  }

  function selectFileOption(option) {
    changeOptionSelectionDispatcher(fileDispatch, option);
    switchDropdownVisibilityDispatcher(fileDispatch);
    const [{ option: selectedFolder }] = folderState.options.filter(
      (option) => option.selected,
    );

    navigate(`/${selectedFolder}/${option}`);
  }

  function onFolderDropdownClick() {
    if (fileState.options.length === 0 || fileState.visible) {
      switchDropdownVisibilityDispatcher(fileDispatch);
    }
    switchDropdownVisibilityDispatcher(folderDispatch);
  }

  function onFileDropdownClick() {
    if (folderState.options.length === 0 || folderState.visible) {
      switchDropdownVisibilityDispatcher(folderDispatch);
    }

    const folderSelections = folderState.options.filter(
      (option) => option.selected,
    );
    if (folderSelections.length === 0) {
      return;
    }

    switchDropdownVisibilityDispatcher(fileDispatch);
  }

  return (
    <>
      <div className="absolute left-1/2 top-0 flex max-h-min -translate-x-1/2 items-center gap-1">
        <div
          className="flex cursor-pointer flex-col justify-center text-base font-bold"
          onClick={() => navigate("/homepage")}
          title="Go to homepage"
        >
          ~
        </div>
        <div className="flex flex-col justify-center text-base font-bold">
          /
        </div>
        <DropdownModal
          state={folderState}
          dispatch={folderDispatch}
          onDropdownClick={onFolderDropdownClick}
          onSelectOption={selectFolderOption}
          currentlySelectedStyles={dropdownStyles.currentlySelectedStyles}
          optionsContainerStyles={dropdownStyles.optionsContainerStyles}
          optionStyles={dropdownStyles.optionStyles}
          defaultCurrentlySelectedValue="Folder"
        />
        <div className="flex flex-col justify-center text-base font-bold">
          /
        </div>
        <DropdownModal
          state={fileState}
          dispatch={fileDispatch}
          onDropdownClick={onFileDropdownClick}
          onSelectOption={selectFileOption}
          currentlySelectedStyles={dropdownStyles.currentlySelectedStyles}
          optionsContainerStyles={dropdownStyles.optionsContainerStyles}
          optionStyles={dropdownStyles.optionStyles}
          defaultCurrentlySelectedValue="File"
        />
      </div>
    </>
  );
}

function usePathOptionsInitialier(
  location,
  importablePaths,
  folderDispatch,
  fileDispatch,
) {
  useEffect(() => {
    if (!importablePaths) return;

    const [currentFolder, currentFile] = location.pathname
      .replaceAll("/", " ")
      .trim()
      .split(" ");

    const folders = new Set(importablePaths.map((path) => path.split("/")[0]));
    const files = new Set(
      importablePaths.map((path) => path.split("/")[1].replace(".js", "")),
    );

    let folderOptions = [];
    folders.forEach((folder) => {
      folderOptions.push({
        option: folder,
        selected: folder === currentFolder,
      });
    });

    const correspondingFolderFiles = importablePaths
      .filter((path) => path.includes(currentFolder))
      .map((path) => path.split("/")[1].replace(".js", ""));

    let fileOptions = [];
    files.forEach((file) => {
      fileOptions.push({
        option: file,
        selected: file === currentFile,
        visible: correspondingFolderFiles.includes(file),
      });
    });

    initializeOptionsDispatcher(folderDispatch, folderOptions);
    initializeOptionsDispatcher(fileDispatch, fileOptions);
  }, [importablePaths, location]);
}
