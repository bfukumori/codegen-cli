import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import fsPromises from 'node:fs/promises';
import { createFilesIfNotExists } from '../../src/createFiles.js';
import templates from '../../src/templates/index.js';

describe('#Layers - Files Structure', () => {
  const defaultLayers = ['repository', 'service', 'factory'];
  const config = {
    mainPath: '.',
    defaultMainFolder: 'src',
    layers: defaultLayers,
    componentName: 'product',
  };
  const repositoryName = `${config.componentName}Repository`;
  const serviceName = `${config.componentName}Service`;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('should not create file structure on unexistent templates (layers)', async () => {
    const myConfig = {
      ...config,
      layers: ['unexistent'],
    };

    const expected = { error: "The chosen layer doesn't have a template" };
    const result = await createFilesIfNotExists(myConfig);

    expect(result).toStrictEqual(expected);
  });

  test('repository should not add any additional dependencies', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.repositoryTemplate.name)
      .mockReturnValue({ className: '', template: '' });

    const myConfig = {
      ...config,
      layers: ['repository'],
    };

    const expected = { success: true };
    const result = await createFilesIfNotExists(myConfig);

    expect(result).toStrictEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName
    );
  });

  test('service should have repository as dependency', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.serviceTemplate.name)
      .mockReturnValue({ className: '', template: '' });

    const myConfig = {
      ...config,
      layers: ['repository', 'service'],
    };

    const expected = { success: true };
    const result = await createFilesIfNotExists(myConfig);

    expect(result).toStrictEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.serviceTemplate).toHaveBeenCalledWith(
      myConfig.componentName,
      repositoryName
    );
  });

  test('factory should have repository and service as dependencies', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.factoryTemplate.name)
      .mockReturnValue({ className: '', template: '' });

    const myConfig = {
      ...config,
    };

    const expected = { success: true };
    const result = await createFilesIfNotExists(myConfig);

    expect(result).toStrictEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.factoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName,
      repositoryName,
      serviceName
    );
  });
});
