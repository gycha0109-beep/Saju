name: FR194 Cheek Mid-Face Neutral Target Feasibility CI

on:
  pull_request:
    paths:
      - 'packages/face-reading/src/face-reading-cheek-mid-face-neutral-target-feasibility-fr194.ts'
      - 'packages/face-reading/src/face-reading-cheek-mid-face-neutral-target-feasibility-fr194.test.ts'
      - 'research/face-reading/fr194-cheek-mid-face-neutral-target-feasibility.md'
      - '.github/workflows/fr194-cheek-mid-face-neutral-target-feasibility-ci.yml'

permissions:
  contents: read

jobs:
  verify-fr194-cheek-mid-face-neutral-target-feasibility:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - name: Build Face Reading package
        run: npm run face:build
      - name: Verify FR194 cheek/mid-face neutral target and provider feasibility
        run: npx vitest run packages/face-reading/src/face-reading-cheek-mid-face-neutral-target-feasibility-fr194.test.ts
