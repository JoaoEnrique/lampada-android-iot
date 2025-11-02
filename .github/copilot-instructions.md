## Quick context

- This is a React Native (0.82.1) TypeScript app scaffolded with the official CLI.
- Node engine requirement: >=20 (see `package.json` -> `engines`).
- Native modules present: Android (`android/`), iOS (`ios/`). New Architecture and Hermes are enabled by default in `android/gradle.properties` (`newArchEnabled=true`, `hermesEnabled=true`).

## What this repo expects from an AI coding assistant

- Prefer TypeScript/React Native patterns used in the project (see `App.tsx`). Keep edits confined to `App.tsx`, `index.js`, or platform folders when changing runtime/bootstrapping behavior.
- When proposing native changes, reference these files/locations explicitly: `android/app/build.gradle`, `android/gradle.properties`, `android/app/src/main/java/com/arvorenatal/` (MainActivity/MainApplication), `ios/Podfile`, and `ios/ArvoreNatal/`.
- Do not assume the app uses JSC — Hermes is enabled (see `android/gradle.properties`). Also note `newArchEnabled=true` (new RN architecture) — native interfaces may rely on Fabric/TurboModules.

## Common tasks & exact commands (how developers run things)

- Start Metro (JS bundler/dev server):

```cmd
npm start
```

- Run on Android (one terminal for Metro, another for build):

```cmd
npm run android
```

- Run on iOS (first install CocoaPods if required):

```cmd
# on macOS, first-time only:
bundle install
bundle exec pod install --project-directory=ios

npm run ios
```

- Lint and tests:

```cmd
npm run lint
npm test
```

Notes: Developers on Windows typically use Android emulators or connected devices for `npm run android`. iOS commands are macOS-only.

## Key files and directories to inspect for changes

- `App.tsx` — app entry / UI (uses `@react-native/new-app-screen` and `react-native-safe-area-context`).
- `index.js` — JS entry registered with `AppRegistry`.
- `package.json` — scripts, RN version, Node engine, deps/devDeps.
- `tsconfig.json` — extends `@react-native/typescript-config` (follow its lint/compile conventions).
- `android/gradle.properties` — important flags: `newArchEnabled`, `hermesEnabled`, `reactNativeArchitectures`.
- `android/app/build.gradle` — namespace/applicationId (`com.arvorenatal`), autolinking configured (`autolinkLibrariesWithApp()`), and comment blocks that show where to customize bundling/hpack.
- `android/app/src/main/AndroidManifest.xml` — permissions and Activity config (launchMode singleTask, cleartext handling via ${usesCleartextTraffic}).
- `ios/` — CocoaPods Podfile and `Images.xcassets` for app icons/assets.

## Project-specific conventions & patterns (observed)

- TypeScript-first: files are `.ts`/`.tsx` and `tsconfig.json` uses the RN typescript preset. Prefer typing new components and props.
- ESLint/Prettier are present; the repo uses `@react-native/eslint-config`. Match existing formatting and lint rules.
- New app scaffolding uses `NewAppScreen` — use it as an example of component props and safe-area handling (`react-native-safe-area-context`).

## Native integration notes for PRs or code changes

- Android:
  - Autolinking is enabled — prefer adding native modules via npm and let autolink handle registration unless manual linking is required.
  - The `react { ... }` block in `android/app/build.gradle` shows how to customize bundling and Hermes flags — mention edits there when proposing RN CLI/packager customizations.
  - Package id / namespace: `com.arvorenatal` (see `build.gradle` and `AndroidManifest.xml`).

- iOS:
  - Keep `Podfile` edits minimal; always run `bundle exec pod install` after changing native iOS deps.

## When you need to make suggestions, be explicit and minimal

- Show exact file paths and small diffs (2–20 lines) rather than vague suggestions.
- If proposing native or architecture changes (Hermes, New Arch), call out required rebuild steps and any platform-specific caveats (e.g., CocoaPods, Android Gradle sync).

## Quick examples to include in suggestions

- Example: to reference Android app id use `android/app/build.gradle` applicationId `com.arvorenatal`.
- Example: enable/disable Hermes in `android/gradle.properties` by toggling `hermesEnabled` and re-running Gradle build.

## Tests / quality gates to mention in PRs

- Run `npm run lint` and `npm test` locally before creating PRs. Note: Jest is configured as the test runner (see `package.json`).

---

If anything above is unclear or you'd like more/less detail (for example: add examples for native module wiring, CI steps, or a short checklist for PR reviews), tell me which area to expand and I'll iterate.
