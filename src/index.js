#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createFilesIfNotExists } from './createFiles.js';
import { createLayersIfNotExists } from './createLayers.js';

const {
  argv: { componentName, defaultFolder },
} = yargs(hideBin(process.argv)).command(
  'skeleton',
  'Generate an initial skeleton for a project',
  (builder) => {
    return builder
      .option('component-name', {
        alias: 'c',
        demandOption: true,
        describe: "Components's name",
        type: 'array',
      })
      .option('default-folder', {
        alias: 'f',
        demandOption: false,
        describe: 'Default folder',
        type: 'string',
        default: 'src',
      })
      .example(
        'skeleton --component-name product',
        'Generate a project with a single domain'
      )
      .example(
        'skeleton -c product -c person -c colors',
        'Generate a project with a list of domains'
      )
      .epilog('Copyright 2024 - Bruno Fukumori Corporation');
  }
);

const env = process.env.NODE_ENV;
const defaultMainFolder = env === 'dev' ? 'tmp' : defaultFolder;

const layers = ['factory', 'repository', 'service'].sort();
const config = {
  mainPath: '.',
  defaultMainFolder,
  layers,
};

await createLayersIfNotExists(config);

const pendingPromises = [];

for (const domain of componentName) {
  pendingPromises.push(
    createFilesIfNotExists({
      ...config,
      componentName: domain,
    })
  );
}

await Promise.all(pendingPromises);
