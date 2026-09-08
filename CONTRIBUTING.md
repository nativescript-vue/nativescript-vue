# Contributing

## Development

```sh
npm install
npm test            # vitest, runs the renderer against a stubbed @nativescript/core
npm run typecheck
npm run build
```

The `demo/` app resolves `nativescript-vue` straight from `src/`, so
`cd demo && ns run ios|android` exercises uncommitted changes.

Commits follow [Conventional Commits](https://www.conventionalcommits.org);
a commit-msg hook enforces it.

## Releasing

Releases are published by GitHub Actions with npm provenance when a `v*` tag
is pushed. Nothing publishes from a laptop.

```sh
npm run release -- 3.1.0        # or 3.1.0-beta.1 for a prerelease (npm tag: next)
git push origin main v3.1.0
```

The script bumps `nativescript-vue` and `@nativescript-vue/template-blank`
together, commits `release: 3.1.0` and creates the tag. The Release workflow
verifies the tag matches the package versions, runs the checks, and then
publishes from the protected `npm` environment.
