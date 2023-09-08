import { defineManifest } from "@crxjs/vite-plugin";

import { version } from "./package.json";

// "version" can only contain digits, dots, or dash (example: 0.1.0-beta6 => 0.1.0.6)
// "version_name" can be like semver
const [major, minor, patch, label = "0"] = version
  .replace(/[^\d.-]+/g, "")
  .split(/[.-]/);

export const manifest = defineManifest(() => ({
  author: "Parity Team <admin@parity.io>",
  description:
    "Browser extension to manage polkadot signing accounts as well as blockchain light clients",
  homepage_url: "https://github.com/paritytech/polkadot-lite-extension",
  name: "Polkadot Lite Extension",
  short_name: "Polkadot-Lite-Extension",
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  manifest_version: 3,
  permissions: ["notifications", "storage", "tabs", "alarms"],
  options_page: "src/options/index.html",
  background: {
    service_worker: "src/background/index.ts",
  },
  action: {
    default_popup: "src/popup/index.html",
    default_icon: "icon-34.png",
  },
  chrome_url_overrides: {
    newtab: "src/newtab/index.html",
  },
  icons: {
    "128": "icon-128.png",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/content/index.ts"],
    },
  ],
  web_accessible_resources: [
    {
      resources: ["icon-128.png", "icon-34.png"],
      matches: [],
    },
  ],
}));
