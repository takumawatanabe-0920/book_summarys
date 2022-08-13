import React from 'react';
import { getFileType } from 'src/frontend/components/common/fileType';
import useAlertState from 'src/frontend/hooks/useAlertState';
export type Props = {
  handleFile?: (file: File, type: any, key: number) => Promise<void>;
  children: React.ReactNode;
  onCreateObjectURL?: (url: string, key: number) => void;
};

const FileHandler = (props: Props) => {
  const [isShowAlert, alertStatus, alertText, throwAlert, closeAlert] =
    useAlertState(false);

  const {
    handleFile = () => {
      /* empty */
    },
    children,
    onCreateObjectURL = () => {
      /* empty */
    },
  } = props;
  const upload = React.useRef(null);

  const handle = async (file: File) => {
    const key = Date.now();
    try {
      const type = await getFileType(file);

      if (!type.mime || !type.ext) {
        throw new Error('許可されていないファイルの種類です');
      }

      createObjectURL(file, key);
      await handleFile(file, type, key);
    } catch (e) {
      throwAlert('danger', e.message || '');
    }
  };

  const createObjectURL = (file, key) => {
    if (!onCreateObjectURL) return;

    const createObjectURL =
      window.URL && window.URL.createObjectURL
        ? window.URL.createObjectURL
        : null;

    if (createObjectURL) {
      const url = createObjectURL(file);
      onCreateObjectURL(url, key);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target.result as string;
        onCreateObjectURL(url, key);
      };
      reader.readAsDataURL(file);
    }
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files.length) {
        throw new Error('ファイルを選択してください');
      }
      for (const file of Array.from(e.target.files)) {
        await handle(file);
      }
      e.target.value = null;
    } catch (e) {
      throwAlert('danger', e.message || '');
    }
  };

  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child as React.ReactElement, {
      onClick: () => upload.current?.click(),
    }),
  );

  return (
    <>
      {childrenWithProps}
      <input
        ref={(e) => (upload.current = e)}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={onChange}
      />
    </>
  );
};

export default FileHandler;
