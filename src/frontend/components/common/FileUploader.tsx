import React from 'react';
import FileHandler, {
  Props as FileHandlerProps,
} from 'src/frontend/components/common/FileHandler';
import client from 'src/frontend/apiClient';
import useAlertState from 'src/frontend/hooks/useAlertState';
import { FileType } from 'src/frontend/components/common/fileType';
type Props = {
  endPoint: ({
    file,
    type,
    key,
    fileType,
  }: {
    file: File;
    type: FileType;
    key: number;
    fileType: 'pdf' | 'image' | 'audio' | 'file';
  }) => string;
  handleFile: ({
    data,
    file,
    type,
    key,
    fileType,
  }: {
    data: {
      id: string;
      url: string;
      signedUrl: string;
      key: string;
      imageUrl: string;
    };
    file: File;
    type: FileType;
    key: number;
    fileType: 'pdf' | 'image' | 'audio' | 'file';
  }) => void;
  children: React.ReactNode;
  onCreateObjectURL?: (url: string, key: number) => void;
} & Omit<FileHandlerProps, 'handleFile' | 'onError'>;

const FileUploader = (props: Props) => {
  const { endPoint, handleFile, children, onCreateObjectURL } = props;
  const [isShowAlert, alertStatus, alertText, throwAlert, closeAlert] =
    useAlertState(false);
  const handleFileBase = async (file: File, type: any, key: number) => {
    let fileType: 'pdf' | 'image';
    const images = ['jpg', 'png', 'gif'];

    if (type.ext === 'pdf') {
      fileType = 'pdf';
    } else if (images.includes(type.ext)) {
      fileType = 'image';
    } else {
      throw new Error('未対応のファイルです');
    }

    let data = null;
    try {
      const res = await client.get(endPoint({ file, type, key, fileType }));
      data = res.data;

      await client.put(data.signedUrl, file, {
        headers: { 'Content-Type': type.mime },
      });
      handleFile({ data, file, type, fileType, key });
    } catch (e) {
      throwAlert('danger', e.message || '');
    }
  };

  return (
    <FileHandler
      handleFile={handleFileBase}
      onCreateObjectURL={onCreateObjectURL}
    >
      {children}
    </FileHandler>
  );
};

export default FileUploader;
