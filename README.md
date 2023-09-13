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

## Adding new shadcn/ui components

In this repository we use the [shadcn/ui](https://ui.shadcn.com/). Instead of exporting components like a traditional components library, this library is just a helper to generate the latest shadcn/ui components via a CLI. The see [docs](https://ui.shadcn.com/docs) for more details.

The generated components should be place in the `packages/ui/components` directory. Inside the `package/ui` project a `components.json` file describes how and where shadcn/ui should create the components. Unfortunately the configuration is a bit limited for our monorepo use-case. Therefore, the generated components need a bit of manual import path adaptation. Most often just changing the absolute import of the `utils` to a relative import like `../utils`. See already generated components for details.

```sh
pnpm shadcn-ui add <component-name>
```

After generating new components, make sure to export them from the `packages/ui/index.ts` file to import the new component easily.
