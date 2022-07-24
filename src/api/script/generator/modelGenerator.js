const program = require('commander');
const { generateFileAndFolder } = require('./common');

const main = async () => {
  program
    // @ts-ignore
    .version('1.0.0')
    .option('-n, --name <name>', 'name')
    .option('--dryRun')
    .parse(process.argv);

  // @ts-ignore
  const opts = program.opts();
  const name = opts.name;
  const dryRun = opts.dryRun;

  const generateSchema = (name) => {
    if (!name) throw new Error('name is required');
    const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);

    return `
    import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ${upperCaseName}Document = ${upperCaseName} & Document;

@Schema({ timestamps: true })
export class ${upperCaseName} {
  // ex.
  // @Prop({ type: String, required: true })
  // name: string;
}

export const ${upperCaseName}Schema = SchemaFactory.createForClass(${upperCaseName});
`;
  };

  const generateDto = (name) => {
    if (!name) throw new Error('name is required');
    const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);
    return `
    import { IsOptional, IsNumber, IsString } from 'class-validator';

export class ${upperCaseName}DTO {
  // ex.
  // @IsOptional()
  // @IsString()
  // name: string
}
`;
  };

  try {
    const dirPath = `${__dirname}/generated/${name}`;
    generateFileAndFolder({
      dirPath,
      name,
      dryRun,
      generateFun: generateSchema,
      fileType: 'schema',
    });

    generateFileAndFolder({
      dirPath,
      name,
      dryRun,
      generateFun: generateDto,
      fileType: 'dto',
    });
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
