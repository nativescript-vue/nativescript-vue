module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // `npm run release` commits as `release: <version>`
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'release',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};
