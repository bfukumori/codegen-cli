import {
  afterAll,
  beforeAll,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals';
import fsPromises from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createFilesIfNotExists } from '../../src/createFiles.js';
import { createLayersIfNotExists } from '../../src/createLayers.js';
import Util from '../../src/util.js';

async function createTmpDir() {
  return fsPromises.mkdtemp(join(tmpdir(), 'files-'));
}

async function removeTmpDir(mainPath) {
  return fsPromises.rm(mainPath, { recursive: true });
}

async function copyPackageJsonToTempDir(mainPath) {
  const packageJSON = 'package.json';
  const packageJSONLocation = join('./test/integration/mocks/', packageJSON);

  return fsPromises.copyFile(packageJSONLocation, join(mainPath, packageJSON));
}

function generateFilePath({
  mainPath,
  defaultMainFolder,
  layers,
  componentName,
}) {
  return layers.map((layer) => {
    const filename = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`;

    return join(mainPath, defaultMainFolder, layer, filename);
  });
}

function getAllFunctionsFromInstance(instance) {
  return Reflect.ownKeys(Reflect.getPrototypeOf(instance)).filter(
    (method) => method !== 'constructor'
  );
}

describe('#Integration - Files - Files Structure', () => {
  const config = {
    mainPath: '',
    defaultMainFolder: 'src',
    layers: ['factory', 'repository', 'service'].sort(),
    componentName: 'product',
  };

  beforeAll(async () => {
    config.mainPath = await createTmpDir();
    await copyPackageJsonToTempDir(config.mainPath);
    await createLayersIfNotExists(config);
  });

  afterAll(async () => {
    await removeTmpDir(config.mainPath);
  });

  test('Repository class should have create, read, update and delete methods', async () => {
    const myConfig = {
      ...config,
      layers: ['repository'],
    };

    await createFilesIfNotExists(myConfig);

    const [repositoryFile] = generateFilePath(myConfig);

    const { default: Repository } = await import(repositoryFile);

    const expectNotImplemented = (fn) =>
      expect(() => fn.call()).rejects.toEqual('method not implemented!');

    const instance = new Repository();

    expectNotImplemented(instance.create);
    expectNotImplemented(instance.read);
    expectNotImplemented(instance.update);
    expectNotImplemented(instance.delete);
  });

  test('Service should have the same signature of repository and call all its methods', async () => {
    const myConfig = {
      ...config,
      layers: ['repository', 'service'],
    };

    await createFilesIfNotExists(myConfig);

    const [repositoryFile, serviceFile] = generateFilePath(myConfig);

    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);

    const repository = new Repository();
    const service = new Service({ repository });

    const allRepositoryMethods = getAllFunctionsFromInstance(repository);

    allRepositoryMethods.forEach((method) =>
      jest.spyOn(repository, method).mockResolvedValue()
    );

    getAllFunctionsFromInstance(service).forEach((method) =>
      service[method].call(service, [])
    );

    allRepositoryMethods.forEach((method) =>
      expect(repository[method]).toHaveBeenCalled()
    );
  });

  test('Factory instance should match layers', async () => {
    const myConfig = {
      ...config,
    };

    await createFilesIfNotExists(myConfig);

    const [factoryFile, repositoryFile, serviceFile] =
      generateFilePath(myConfig);

    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);
    const { default: Factory } = await import(factoryFile);

    const expectedInstance = new Service({ repository: new Repository() });
    const instance = Factory.getInstance();

    expect(instance).toMatchObject(expectedInstance);
    expect(instance).toBeInstanceOf(Service);
  });
});
