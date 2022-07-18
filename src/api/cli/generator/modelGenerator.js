const program = require('commander');
const { generateFileAndFolder } = require('./common');

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
