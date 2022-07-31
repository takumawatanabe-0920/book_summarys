const program = require('commander');
const { generateFileAndFolder } = require('./common');

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

const generateApplication = (name) => {
  if (!name) {
    throw new Error('Application name is required');
  }
  const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);
  const lowerCaseName = name.charAt(0).toLowerCase() + name.slice(1);

  return `import { Injectable, Inject } from '@nestjs/common';
  import { ${upperCaseName}Repository } from './${lowerCaseName}.repository';
  import { ${upperCaseName}DTO } from './${lowerCaseName}.dto';
  
  @Injectable()
  export class ${upperCaseName}Application {
    constructor(
      @Inject(${upperCaseName}Repository)
      private ${lowerCaseName}Repository: ${upperCaseName}Repository,
    ) {}
  
    async list(): Promise<ReturnType<${upperCaseName}Repository['list']>> {
      try {
        return await this.${lowerCaseName}Repository.list();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    async show(id: string): Promise<ReturnType<${upperCaseName}Repository['getById']>> {
      try {
        return await this.${lowerCaseName}Repository.getById(id);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    async create(
      body: ${upperCaseName}DTO,
    ): Promise<ReturnType<${upperCaseName}Repository['create']>> {
      try {
        return await this.${lowerCaseName}Repository.create(body);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    async update(
      id: string,
      body: ${upperCaseName}DTO,
    ): Promise<ReturnType<${upperCaseName}Repository['update']>> {
      try {
        return await this.${lowerCaseName}Repository.update(id, body);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    async delete(id: string): Promise<ReturnType<${upperCaseName}Repository['update']>> {
      try {
        return await this.${lowerCaseName}Repository.delete(id);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
  `;
};

const generateController = (name) => {
  if (!name) {
    throw new Error('Controller name is required');
  }
  const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);
  const lowerCaseName = name.charAt(0).toLowerCase() + name.slice(1);

  return `
  import {
    Controller,
    Get,
    Inject,
    Param,
    Post,
    Put,
    Delete,
    Body,
    ValidationPipe,
    BadRequestException,
    NotFoundException,
  } from '@nestjs/common';
  import { ${upperCaseName}DTO } from './${lowerCaseName}.dto';
  import { ${upperCaseName}Application } from './${lowerCaseName}.application';
  
  @Controller('${lowerCaseName}')
  export class ${upperCaseName}Controller {
    constructor(
      @Inject(${upperCaseName}Application)
      private readonly ${lowerCaseName}Application: ${upperCaseName}Application,
    ) {}
  
    @Get()
    async list(): Promise<ReturnType<${upperCaseName}Application['index']>> {
      try {
        return await this.${lowerCaseName}Application.list();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    @Get(':id')
    async show(
      @Param('id') id: string,
    ): Promise<ReturnType<${upperCaseName}Application['show']>> {
      try {
        if (!id) {
          throw new BadRequestException('id is required');
        }
        const ${lowerCaseName} = await this.${lowerCaseName}Application.show(id);
        if (!${lowerCaseName}) {
          throw new NotFoundException('${lowerCaseName} not found');
        }
        return ${lowerCaseName};
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    @Post()
    async create(
      @Body(new ValidationPipe()) body: ${upperCaseName}DTO,
    ): Promise<ReturnType<${upperCaseName}Application['create']>> {
      try {
        return await this.${lowerCaseName}Application.create(body);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    @Put(':id')
    async update(
      @Param('id') id,
      @Body(new ValidationPipe()) body: ${upperCaseName}DTO,
    ): Promise<ReturnType<${upperCaseName}Application['update']>> {
      try {
        if (!id) {
          throw new BadRequestException('id is required');
        }
        return await this.${lowerCaseName}Application.update(id, body);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    @Delete(':id')
    async delete(
      @Param('id') id,
    ): Promise<ReturnType<${upperCaseName}Application['delete']>> {
      try {
        if (!id) {
          throw new BadRequestException('id is required');
        }
        return await this.${lowerCaseName}Application.delete(id);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
`;
};

const generateRepository = (name) => {
  if (!name) {
    throw new Error('Repository name is required');
  }
  const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);
  const lowerCaseName = name.charAt(0).toLowerCase() + name.slice(1);

  return `
  import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ${upperCaseName}, ${upperCaseName}Document } from './${lowerCaseName}.schema';
import { ${upperCaseName}DTO } from './${lowerCaseName}.dto';

@Injectable()
export class ${upperCaseName}Repository {
  constructor(
    @InjectModel(${upperCaseName}.name)
    private readonly ${lowerCaseName}Model: Model<${upperCaseName}Document>,
  ) {}

  async list(): Promise<${upperCaseName}[]> {
    return await this.${lowerCaseName}Model.find().lean();
  }

  async getById(id: string): Promise<${upperCaseName}> {
    return await this.${lowerCaseName}Model.getById(id).lean();
  }

  async create(${lowerCaseName}: ${upperCaseName}DTO): Promise<${upperCaseName}> {
    const created${upperCaseName} = new this.${lowerCaseName}Model(${lowerCaseName});
    return created${upperCaseName}.save();
  }

  async update(id: string, ${lowerCaseName}: ${upperCaseName}DTO): Promise<${upperCaseName}> {
    return await this.${lowerCaseName}Model.findByIdAndUpdate(id, ${lowerCaseName}, { new: true });
  }

  async delete(id: string): Promise<${upperCaseName}> {
    return await this.${lowerCaseName}Model.findByIdAndRemove(id);
  }
}
`;
};

const main = async () => {
  program
    // @ts-ignore
    .version('1.0.0')
    .option('-n, --name <name>', 'name')
    .option('--dryRun')
    .option('--skipModule')
    .option('--skipRepository')
    .option('--skipController')
    .option('--skipApplication')
    .parse(process.argv);

  // @ts-ignore
  const opts = program.opts();
  const name = opts.name;
  const dryRun = opts.dryRun;
  const skipModule = opts.skipModule;
  const skipRepository = opts.skipRepository;
  const skipController = opts.skipController;
  const skipApplication = opts.skipApplication;

  try {
    const dirPath = `${__dirname}/generated/${name}`;
    if (!skipModule) {
      await generateFileAndFolder({
        name,
        dirPath,
        fileType: 'module',
        generateFun: generateModule,
        dryRun,
      });
    }
    if (!skipRepository) {
      generateFileAndFolder({
        name,
        dirPath,
        fileType: 'repository',
        generateFun: generateRepository,
        dryRun,
      });
    }
    if (!skipController) {
      generateFileAndFolder({
        name,
        dirPath,
        fileType: 'controller',
        generateFun: generateController,
        dryRun,
      });
    }
    if (!skipApplication) {
      generateFileAndFolder({
        name,
        dirPath,
        fileType: 'application',
        generateFun: generateApplication,
        dryRun,
      });
    }
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
