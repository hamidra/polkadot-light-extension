# React + TypeScript + Vite + Tailwind

This repo currently includes a minimal scaffold to build a Web Extension on React + Tailwind in Vite. 

This uses official Vite react-swc plugin to build react.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Getting Started

1. Clone the repository.
2. Install the dependencies.

```zsh
pnpm install
```
## Build the Extension:
1. Run the build command.
```zsh 
pnpm build
```
This will create the extension's output files in the ```./dist``` directory.


## Run the Extensioon:
1. Run the start command.
```zsh 
pnpm start 
```

This will open a Chrome browser in extension developer mode and load the extension source package.
