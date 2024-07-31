import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import { createLayersIfNotExists } from '../../src/createLayers.js';

describe('#Layers - Folder Structure', () => {
  const defaultLayers = ['repository', 'service', 'factory'];

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("should create folders if it doesn't exist", async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);

    await createLayersIfNotExists({ layers: defaultLayers });

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length);
  });

  test('should not create folders if it exists', async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);

    await createLayersIfNotExists({ layers: defaultLayers });

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    expect(fsPromises.mkdir).not.toHaveBeenCalled();
  });
});
