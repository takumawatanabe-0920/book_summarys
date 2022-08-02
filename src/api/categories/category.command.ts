import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryCommand {
  constructor() {}

  @Command({
    command: 'create:category <username>',
    describe: 'create a category',
  })
  async create(
    @Positional({
      name: 'username',
      describe: 'the username',
      type: 'string',
    })
    username: string,
    @Option({
      name: 'group',
      describe: 'category group (ex: "jedi")',
      type: 'string',
      alias: 'g',
      required: false,
    })
    group: string,
    @Option({
      name: 'saber',
      describe: 'if category has a lightsaber',
      type: 'boolean',
      default: false,
      required: false,
    })
    saber: boolean,
  ) {
    console.log({ username, group, saber });
  }
}
