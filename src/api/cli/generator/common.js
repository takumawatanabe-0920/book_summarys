const fsExtra = require('fs-extra');

const generateFileAndFolder = async ({
  name,
  dirPath,
  fileType = 'module',
  generateFun,
  dryRun,
}) => {
  if (!dirPath) throw new Error('path name is required');
  if (!generateFun) throw new Error('generateFun is required');

  const generateSource = generateFun(name);
  const generateFilePath = `${dirPath}/${name}.${fileType}.ts`;

  if (dryRun) {
    console.log({ generateFilePath });
    console.log({ generateSource });
    return;
  }

  if (!fsExtra.existsSync(dirPath)) {
    fsExtra.mkdirsSync(dirPath);
  }
  fsExtra.writeFileSync(generateFilePath, generateSource);
};

module.exports = { generateFileAndFolder };
