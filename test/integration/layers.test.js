import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import fsPromises from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createLayersIfNotExists } from '../../src/createLayers.js';

async function createTmpDir() {
  return fsPromises.mkdtemp(join(tmpdir(), 'layers-'));
}

async function readTmpDir(mainPath) {
  return fsPromises.readdir(mainPath);
}

async function removeTmpDir(mainPath) {
  return fsPromises.rm(mainPath, { recursive: true });
}

async function readCreatedFolders(mainPath, defaultMainFolder) {
  return fsPromises.readdir(join(mainPath, defaultMainFolder));
}

describe('#Integration - Layers - Folders Structure', () => {
  const config = {
    mainPath: '',
    defaultMainFolder: 'src',
    layers: ['factory', 'repository', 'service'].sort(),
  };

  beforeAll(async () => {
    config.mainPath = await createTmpDir();
  });

  afterAll(async () => {
    await removeTmpDir(config.mainPath);
  });

  test("should create folders if it doesn't exist", async () => {
    const beforeRun = await readTmpDir(config.mainPath);

    await createLayersIfNotExists(config);

    const afterRun = await readCreatedFolders(
      config.mainPath,
      config.defaultMainFolder
    );

    expect(beforeRun).not.toStrictEqual(afterRun);
    expect(afterRun).toEqual(config.layers);
  });

  test('should not create folders if it exists', async () => {
    const beforeRun = await readCreatedFolders(
      config.mainPath,
      config.defaultMainFolder
    );

    await createLayersIfNotExists(config);

    const afterRun = await readCreatedFolders(
      config.mainPath,
      config.defaultMainFolder
    );

    expect(beforeRun).toEqual(afterRun);
  });
});
