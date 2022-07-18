const fsExtra = require('fs-extra');
const program = require('commander');

const generateModule = (name) => {
  if (!name) {
    throw new Error('Module name is required');
  }
  const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);
  const lowerCaseName = name.charAt(0).toLowerCase() + name.slice(1);

  return `
  import { Module } from '@nestjs/common';
  import { MongooseModule } from '@nestjs/mongoose';
  import { ${upperCaseName}Controller } from './${lowerCaseName}.controller';
  import { ${upperCaseName}Application } from './${lowerCaseName}.application';
  import { ${upperCaseName}Repository } from './${lowerCaseName}.repository';
  import { ${upperCaseName}, ${upperCaseName}Schema } from './${lowerCaseName}.schema';
  @Module({
    imports: [
      MongooseModule.forFeature([
        { name: ${upperCaseName}.name, schema: ${upperCaseName}Schema },
      ]),
    ],
    controllers: [${upperCaseName}Controller],
    providers: [${upperCaseName}Application, ${upperCaseName}Repository],
  })
  export class ${upperCaseName}Module {}`;
};

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
const main = async () => {
  program
    .version('1.0.0')
    .option('-n, --name <name>', 'name')
    .option('--dryRun')
    .parse(process.argv);

  const opts = program.opts();
  const name = opts.name;
  const dryRun = opts.dryRun;

  try {
    console.log(__dirname, process.cwd());
    const dirPath = `${__dirname}/generated/${name}`;
    generateFileAndFolder({
      name,
      dirPath,
      fileType: 'module',
      generateFun: generateModule,
      dryRun,
    });
    console.log('write end', dirPath);
  } catch (e) {
    console.log(e);
  }
};

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    process.exit(0);
  });
