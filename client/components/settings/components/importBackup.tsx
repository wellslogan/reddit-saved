import * as React from 'react';
import { readJsonDataAsync } from '@utils/fileReaderAsync';

type ImportBackupProps = {
  onImport: (fileData) => void;
};

export const ImportBackup: React.FunctionComponent<
  ImportBackupProps
> = props => {
  const { onImport } = props;
  const filePickerRef = React.createRef<HTMLInputElement>();

  const triggerFilePicker = () => {
    filePickerRef.current.click();
  };

  const handleImport = (): Promise<void> => {
    if (!filePickerRef.current) {
      // this should not happen but we'll reject
      // just in case
      return Promise.reject('filePickerRef not defined');
    }
    const file = filePickerRef.current.files.item(0);
    return readJsonDataAsync(file).then(onImport);
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        id="backupFileImport"
        ref={filePickerRef}
        onChange={handleImport}
      />
      <button
        className="btn"
        id="backupFileImportBtn"
        onClick={triggerFilePicker}
      >
        Import backup file
      </button>
    </>
  );
};

ImportBackup.displayName = 'ImportBackup';
