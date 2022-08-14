import React from 'react';
import { getFileType } from 'src/frontend/components/common/fileType';
import useAlertState from 'src/frontend/hooks/useAlertState';
export type Props = {
  handleFile?: (file: File, type: any, key: number) => Promise<void>;
  children: React.ReactNode;
};

const FileHandler = (props: Props) => {
  const [isShowAlert, alertStatus, alertText, throwAlert, closeAlert] =
    useAlertState(false);

  const {
    handleFile = () => {
      /* empty */
    },
    children,
  } = props;
  const upload = React.useRef(null);

  const handle = async (file: File) => {
    const key = Date.now();
    try {
      const type = await getFileType(file);

      if (!type.mime || !type.ext) {
        throw new Error('許可されていないファイルの種類です');
      }

      await handleFile(file, type, key);
    } catch (e) {
      throwAlert('danger', e.message || '');
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
