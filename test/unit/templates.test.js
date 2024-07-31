import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import templates from '../../src/templates/index.js';
const { repositoryTemplate, serviceTemplate, factoryTemplate } = templates;

import {
  factoryTemplateMock,
  repositoryTemplateMock,
  serviceTemplateMock,
} from './mocks/index.js';

describe('#Codegen 3-layers arch', () => {
  const componentName = 'product';
  const repositoryName = `${componentName}Repository`;
  const serviceName = `${componentName}Service`;
  const factoryName = `${componentName}Factory`;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('#should generate repository template', () => {
    const expected = {
      filename: repositoryName,
      template: repositoryTemplateMock,
    };
    const result = repositoryTemplate(componentName);

    expect(result).toStrictEqual(expected);
  });

  test('#should generate service template', () => {
    const expected = {
      filename: serviceName,
      template: serviceTemplateMock,
    };
    const result = serviceTemplate(componentName, repositoryName);

    expect(result).toStrictEqual(expected);
  });

  test('#should generate factory template', () => {
    const expected = {
      filename: factoryName,
      template: factoryTemplateMock,
    };
    const result = factoryTemplate(componentName, repositoryName, serviceName);

    expect(result).toStrictEqual(expected);
  });
});
