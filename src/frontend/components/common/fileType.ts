export type FileType = {
  ext: string;
  mime: string;
};

export const getFileType = async (file: File): Promise<FileType> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const type = fileType(new Uint8Array(reader.result as ArrayBuffer));
      if (!type) {
        resolve({} as FileType);
        return;
      }
      resolve(type);
    };
    reader.onerror = () => resolve({} as FileType);
    reader.readAsArrayBuffer(file);
  });
};

const fileType = (input: Iterable<number>): FileType => {
  const buf = new Uint8Array(input);

  if (!(buf && buf.length > 1)) {
    return null;
  }

  const check = (header: number[], opts?: { offset: number }) => {
    opts = Object.assign(
      {
        offset: 0,
      },
      opts,
    );

    for (let i = 0; i < header.length; i++) {
      if (header[i] !== buf[i + opts.offset]) {
        return false;
      }
    }

    return true;
  };

  if (check([0xff, 0xd8, 0xff])) {
    return {
      ext: 'jpg',
      mime: 'image/jpeg',
    };
  }

  if (check([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return {
      ext: 'png',
      mime: 'image/png',
    };
  }

  if (check([0x25, 0x50, 0x44, 0x46])) {
    return {
      ext: 'pdf',
      mime: 'application/pdf',
    };
  }

  if (check([0x42, 0x50, 0x47, 0xfb])) {
    return {
      ext: 'bpg',
      mime: 'image/bpg',
    };
  }

  return null;
};
