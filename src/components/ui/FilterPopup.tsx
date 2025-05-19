import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import { ModSearchFilters, Loaders, Sides, sidesEnum, loadersEnum } from '../../types/modSearchFilters';
import { useReleaseVersions } from '../../hooks/useReleaseVersions';

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: ModSearchFilters;
  onApplyFilters: (filters: ModSearchFilters) => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ isOpen, onClose, currentFilters, onApplyFilters }) => {
  const [sideSelectedOption, setSideSelectedOption] = useState<{ client: Sides; server: Sides }>({
    client: undefined,
    server: undefined,
  });
  const [loaderOptionsState, setLoaderOptionsState] = useState<{ value: Loaders, checked: boolean }[]>(
    loadersEnum.map(loader => ({
      value: loader,
      checked: false,
    }))
  );
  const [versionOptionsState, setVersionOptionsState] = useState<{ value: string, checked: boolean }[]>([]);

  const { versions } = useReleaseVersions();

  useEffect(() => {
    setVersionOptionsState(
      versions.map(version => ({
          value: version,
          checked: false,
        })
      )
    );
  }, [versions]);

  const handleReset = () => {
    setLoaderOptionsState(loaderOptionsState.map(option => ({ ...option, checked: false })));
    setVersionOptionsState(versionOptionsState.map(option => ({ ...option, checked: false })));
    setSideSelectedOption({ client: undefined, server: undefined });
  };

  const handleApply = () => {
    const selectedLoaders = loaderOptionsState
      .filter(option => option.checked)
      .map(option => option.value);
    const selectedVersions = versionOptionsState
      .filter(option => option.checked)
      .map(option => option.value);

    const filters: ModSearchFilters = {
      loaders: selectedLoaders.length > 0 ? selectedLoaders : undefined,
      versions: selectedVersions.length > 0 ? selectedVersions : undefined,
      client_side: sideSelectedOption.client,
      server_side: sideSelectedOption.server,
    };

    onApplyFilters(filters);
    onClose();
  };

  const handleClose = () => {
    const selectedLoaders = loaderOptionsState.filter(option => option.checked).map(option => option.value);
    const selectedVersions = versionOptionsState.filter(option => option.checked).map(option => option.value);

    if (
      JSON.stringify(currentFilters.loaders ?? []) !== JSON.stringify(selectedLoaders) ||
      JSON.stringify(currentFilters.versions ?? []) !== JSON.stringify(selectedVersions) ||
      currentFilters.client_side !== sideSelectedOption.client ||
      currentFilters.server_side !== sideSelectedOption.server
    ) {
      alert('There are unsaved changes to your filters.');
    } else {
      onClose();
    }
  }

  return (
    <Popup isOpen={isOpen} onClose={handleClose} title="Filter Mods">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Loaders</h3>
          <div className="flex flex-col gap-2">
            {loaderOptionsState.map((option, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={option.checked}
                  onChange={() => {
                    const newLoaderOptions = [...loaderOptionsState];
                    newLoaderOptions[index].checked = !newLoaderOptions[index].checked;
                    setLoaderOptionsState(newLoaderOptions);
                  }}
                />
                <span className="ml-2">{option.value}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Versions</h3>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-scroll">
            {versionOptionsState.map((option, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={option.checked}
                  onChange={() => {
                    const newVersionOptions = [...versionOptionsState];
                    newVersionOptions[index].checked = !newVersionOptions[index].checked;
                    setVersionOptionsState(newVersionOptions);
                  }}
                />
                <span className="ml-2">{option.value}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Client Side</h3>
            <div className="flex flex-col gap-2">
              {sidesEnum.map((side) => (
                <label key={side as string} className="flex items-center">
                  <input
                    type="radio"
                    name="clientSide"
                    checked={sideSelectedOption.client === side}
                    onChange={() => setSideSelectedOption({ ...sideSelectedOption, client: side as Sides })}
                  />
                  <span className="ml-2">{side as string}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Server Side</h3>
            <div className="flex flex-col gap-2">
              {sidesEnum.map((side) => (
                <label key={side as string} className="flex items-center">
                  <input
                    type="radio"
                    name="serverSide"
                    checked={sideSelectedOption.server === side}
                    onChange={() => setSideSelectedOption({ ...sideSelectedOption, server: side as Sides })}
                  />
                  <span className="ml-2">{side as string}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={handleReset}
            className="px-3 py-1 border-2 border-primary-muted text-primary rounded-lg"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="px-3 py-1 bg-accent text-bg-primary rounded-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default FilterPopup;