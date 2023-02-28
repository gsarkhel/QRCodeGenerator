const prompts = require('prompts');
const { exec } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');
const fse = require('fs-extra');

function runExec(env) {
  const distDir = path.resolve('./dist');

  if (existsSync(distDir)) {
    fse.removeSync(distDir);
  }

  process.env.NODE_ENV = env;

  let script = 'webpack-dev-server --open';

  // For ipad/mobile devices debugging
  // let script = 'webpack-dev-server --open --host 0.0.0.0';

  if (process.env.NODE_ENV === 'production') {
    script = 'webpack';
  }

  console.log(env, script);
  const child = exec(script);

  // Log all the success messages
  child.stdout.on('data', (data) => {
    console.log(data);

    // console.log('exist', existsSync('./dist'));
  });

  // Log all the errors messages
  child.stderr.on('data', (data) => {
    console.log(data);
  });

  child.on('exit', (data) => {
    console.log('exit');
    console.log(data);
  });
}

(async () => {
  const { environment } = await prompts([
    {
      type: 'autocomplete',
      name: 'environment',
      message: 'Pick Development Environment',
      choices: [
        {
          title: 'development',
          description: 'Select this to run development environment',
          value: 'development',
        },
        {
          title: 'production',
          description: 'Select this to create a build',
          value: 'production',
        },
      ],
    },
  ]);
  choiceEnv = environment;

  runExec(choiceEnv);
})();
