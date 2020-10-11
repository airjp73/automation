import sade from 'sade';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import shell from 'shelljs';

const repoBasePath = process.env.PROJECT_REPOS ?? '~/coding/personal';
const thisPackage: { version: string } = require('../package.json');
const prog = sade('proj');

const isJs = (projectName: string) =>
  fs.existsSync(`${repoBasePath}/${projectName}/package.json`);

prog
  .version(thisPackage.version)
  .command('run <projects...>')
  .describe('Runs all the specified projects in their own terminal tabs')
  .action((project, allArgs) => {
    const thisScript = require.resolve('./index.js');
    const projects = [project, ...allArgs._];
    projects.forEach(project => {
      console.log(chalk.blue(`Running ${project}`));
      shell.exec(
        `PROJECT_REPOS=${repoBasePath} python3 ${require.resolve(
          path.join(__dirname, '../../python/runInNewTab.py')
        )} "${thisScript} run ${project} "`
      );
    });
  });

prog
  .command('runProject <project>')
  .describe('Runs specified project in the current terminal tab')
  .action(project => {
    if (isJs(project)) {
      shell.cd(`${repoBasePath}/project`);
      shell.exec('yarn install');
      shell.exec('yarn dev');
    }
  });

prog.parse(process.argv);
