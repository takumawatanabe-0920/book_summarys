import React from 'react';
import FileHandler, {
  Props as FileHandlerProps,
} from 'src/frontend/components/common/FileHandler';
import client from 'src/frontend/apiClient';
import useAlertState from 'src/frontend/hooks/useAlertState';
import { FileType } from 'src/frontend/components/common/fileType';
import axios from 'axios';
type Props = {
  endPoint: ({ type }: { type: FileType }) => string;
  handleFile: ({
    data,
  }: {
    data: {
      id: string;
      url: string;
      signedUrl: string;
      key: string;
      imageUrl: string;
    };
  }) => void;
  children: React.ReactNode;
} & Omit<FileHandlerProps, 'handleFile' | 'onError'>;

const FileUploader = (props: Props) => {
  const { endPoint, handleFile, children } = props;
  const [isShowAlert, alertStatus, alertText, throwAlert, closeAlert] =
    useAlertState(false);
  const handleFileBase = async (file: File, type: any) => {
    let data = null;
    try {
      const res = await client.get(endPoint({ type }));
      data = res.data;

      await axios.put(data.signedUrl, file, {
        headers: { 'Content-Type': type.mime },
      });
      handleFile({ data });
    } catch (e) {
      throwAlert('danger', e.message || '');
    }
  };

  return <FileHandler handleFile={handleFileBase}>{children}</FileHandler>;
};

export default FileUploader;
