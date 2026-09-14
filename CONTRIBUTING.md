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

Releases are staged on npm by GitHub Actions with provenance when a `v*` tag
is pushed, and go live only after a maintainer approves them with 2FA.
No token can publish, from CI or from a laptop.

```sh
npm run release -- 3.1.0        # or 3.1.0-beta.1 for a prerelease (npm tag: next)
git push origin main v3.1.0
```

The script bumps `nativescript-vue` and `@nativescript-vue/template-blank`
together, commits `release: 3.1.0` and creates the tag. The Release workflow
verifies the tag matches the package versions, runs the checks, stages both
packages from the `npm` environment and creates a draft GitHub release.

To publish what was staged:

```sh
npm stage list nativescript-vue
npm stage approve <stage-id>                 # prompts for 2FA
npm stage list @nativescript-vue/template-blank
npm stage approve <stage-id>
```

Then publish the draft GitHub release. Approve the template after the
runtime, since the template depends on the exact runtime version.
