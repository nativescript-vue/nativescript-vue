// Fails unless the given tag (vX.Y.Z) matches the version of every package
// published by the release workflow.
import { readFileSync } from 'node:fs';

const tag = process.argv[2];
if (!tag?.startsWith('v')) {
  console.error(`Expected a tag like v1.2.3, got "${tag}"`);
  process.exit(1);
}
const version = tag.slice(1);

const read = (path) => JSON.parse(readFileSync(path, 'utf8'));
const root = read('package.json');
const template = read('packages/template-blank/package.json');

const problems = [];
if (root.version !== version) {
  problems.push(`package.json is ${root.version}`);
}
if (template.version !== version) {
  problems.push(`packages/template-blank/package.json is ${template.version}`);
}
if (template.dependencies['nativescript-vue'] !== version) {
  problems.push(
    `template-blank depends on nativescript-vue@${template.dependencies['nativescript-vue']}`,
  );
}

if (problems.length) {
  console.error(`Tag ${tag} does not match:\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`Tag ${tag} matches all package versions.`);
