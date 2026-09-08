// Bumps every published package to the given version, commits and tags.
// Nothing is pushed; pushing the tag triggers the Release workflow.
//
//   npm run release -- 3.1.0
//   npm run release -- 3.1.0-beta.1
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const version = process.argv[2];
const semver = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;
if (!semver.test(version ?? '')) {
  console.error('Usage: npm run release -- <version>');
  process.exit(1);
}

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();

if (git('status', '--porcelain')) {
  console.error('Working tree is not clean.');
  process.exit(1);
}
if (git('rev-parse', '--abbrev-ref', 'HEAD') !== 'main') {
  console.error('Releases are cut from main.');
  process.exit(1);
}
if (git('tag', '--list', `v${version}`)) {
  console.error(`Tag v${version} already exists.`);
  process.exit(1);
}

function updateJson(path, update) {
  const json = JSON.parse(readFileSync(path, 'utf8'));
  update(json);
  writeFileSync(path, JSON.stringify(json, null, 2) + '\n');
}

execFileSync('npm', ['version', version, '--no-git-tag-version'], {
  stdio: 'inherit',
});
updateJson('packages/template-blank/package.json', (pkg) => {
  pkg.version = version;
  pkg.dependencies['nativescript-vue'] = version;
});
updateJson('packages/stackblitz-template/package.json', (pkg) => {
  pkg.dependencies['nativescript-vue'] = version;
});

git(
  'add',
  'package.json',
  'package-lock.json',
  'packages/template-blank/package.json',
  'packages/stackblitz-template/package.json',
);
git('commit', '-m', `release: ${version}`);
git('tag', '-a', `v${version}`, '-m', `v${version}`);

console.log(
  `\nTagged v${version}. To publish:\n\n  git push origin main v${version}\n`,
);
