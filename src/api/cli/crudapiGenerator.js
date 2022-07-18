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

const main = async () => {
  program
    .version('1.0.0')
    .option('-n, --name <name>', 'name')
    .option('--exec')
    .parse(process.argv);

  const opts = program.opts();
  const name = opts.name;

  try {
    console.log(__dirname, process.cwd());
    const moduleDirPath = `${__dirname}/generated/${name}`;
    if (!fsExtra.existsSync(moduleDirPath)) {
      fsExtra.mkdirsSync(moduleDirPath);
    }
    fsExtra.writeFileSync(
      `${moduleDirPath}/${name}.module.ts`,
      generateModule(name),
    );
    console.log('write end', moduleDirPath);
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
