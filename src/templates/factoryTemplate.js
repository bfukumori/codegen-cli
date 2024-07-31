import Util from '../util.js';

const componentNameAnchor = '$$componentName';
const repositoryNameAnchor = '$$repositoryName';
const serviceNameAnchor = '$$serviceName';

const repositoryClassNameAnchor = '$$repositoryClassName';
const serviceClassNameAnchor = '$$serviceClassName';

const template = `import $$repositoryClassName from '../repository/$$repositoryName.js';
import $$serviceClassName from '../service/$$serviceName.js';

export default class $$componentNameFactory {
  static getInstance() {
    const repository = new $$repositoryClassName();
    const service = new $$serviceClassName({ repository });

    return service;
  }
}`;

export function factoryTemplate(componentName, repositoryName, serviceName) {
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(repositoryNameAnchor, repositoryName)
    .replaceAll(serviceNameAnchor, serviceName)
    .replaceAll(
      repositoryClassNameAnchor,
      Util.upperCaseFirstLetter(repositoryName)
    )
    .replaceAll(serviceClassNameAnchor, Util.upperCaseFirstLetter(serviceName));

  return {
    filename: `${componentName}Factory`,
    template: txtFile,
  };
}
