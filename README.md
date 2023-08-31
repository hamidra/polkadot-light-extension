# Polkadot-Lite-Extension

## Getting Started

1. Clone the repository.
2. Install the dependencies.

   ```zsh
   pnpm install
   ```

3. Run `dev` process:

   ```zsh
   pnpm dev
   ```

This will create the extension's output files in the `./apps/extension/dist` directory.

## Run the Extension

### Use Extension in a Temporary Browser Session

Use the following command to start a temporary chromium browser session with the local version of the extension.

```zsh
pnpm extension:start
```

### Install Extension in Your Browser

1. Open your browser's Extensions page
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" in the top left corner
4. Select the `./apps/extension/dist` folder
5. You're good to go! 🎉 The extension is now permanently available in your browser.
