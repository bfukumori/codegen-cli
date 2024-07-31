import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

export async function createLayersIfNotExists({
  mainPath,
  defaultMainFolder,
  layers,
}) {
  const defaultPath = `${mainPath}/${defaultMainFolder}`;
  const foldersToCreate = layers.filter((layer) => !fs.existsSync(layer));

  const results = foldersToCreate.map((folder) =>
    fsPromises.mkdir(`${defaultPath}/${folder}`, {
      recursive: true,
    })
  );

  return Promise.all(results);
}
