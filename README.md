# React + TypeScript + Vite

This repo currently includes a minimal scaffold to build a Web Extension on React + Tailwind in Vite. 

This uses official Vite react-swc plugin to build react.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Build the Extension:
```zsh 
pnpm build
```
```build``` output files are generated in ./dist directory.
## Run the Extensioon:
```zsh 
pnpm start 
```

```start``` will use web-ext to open a chrome browser in extension developer mode and load the extension source package.