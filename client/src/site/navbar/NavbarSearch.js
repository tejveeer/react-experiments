import {
  useDropdownState,
  DropdownModal,
} from "../utils/dropdown/DropdownModal";

import { useLocation, useNavigate } from "react-router-dom";
import { useQCache } from "../utils/categoriesUtils";
import {
  changeOptionSelectionDispatcher,
  initializeOptionsDispatcher,
  switchDropdownVisibilityDispatcher,
  switchOptionsVisibilityDispatcher,
} from "../utils/dropdown/dropdownDispatcher";
import { useEffect } from "react";

export function NavbarSearch() {
  const location = useLocation();
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
    if (folderSelections.length === 0) return;

    switchDropdownVisibilityDispatcher(fileDispatch);
  }

  return (
    <>
      <div className="flex absolute left-1/2 top-0 -translate-x-1/2 gap-2">
        <div className="flex flex-col justify-center text-[1.4rem] font-bold">
          ~
        </div>
        <div className="flex flex-col justify-center text-[1.4rem] font-bold">
          /
        </div>
        <DropdownModal
          state={folderState}
          dispatch={folderDispatch}
          onDropdownClick={onFolderDropdownClick}
          onSelectOption={selectFolderOption}
        />
        <div className="flex flex-col justify-center text-[1.4rem] font-bold">
          /
        </div>
        <DropdownModal
          state={fileState}
          dispatch={fileDispatch}
          onDropdownClick={onFileDropdownClick}
          onSelectOption={selectFileOption}
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
