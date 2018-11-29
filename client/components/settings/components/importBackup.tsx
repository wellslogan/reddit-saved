import * as React from 'react';
import { readJsonDataAsync } from '@utils/fileReaderAsync';

type ImportBackupProps = {
  onImport: (fileData) => void;
};

export class ImportBackup extends React.Component<ImportBackupProps, {}> {
  private _filePickerRef;

  constructor(props) {
    super(props);
  }

  onImport = async () => {
    const file = this._filePickerRef.files.item(0);
    const jsonData = await readJsonDataAsync(file);
    this.props.onImport(jsonData);
  };

  render() {
    return (
      <>
        <label>Import backup file:</label>
        <input
          type="file"
          id="backupFileImport"
          ref={ref => (this._filePickerRef = ref)}
        />
        <button
          id="backupFileImportBtn"
          data-testid="backupFileImportBtn"
          onClick={() => {
            this.onImport();
          }}
        >
          Import
        </button>
      </>
    );
  }
}
