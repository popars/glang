# g-lang

[![npm version](https://img.shields.io/npm/v/glang.svg)](https://www.npmjs.com/package/@glang/plugin)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/glang)](https://npm-stat.com/charts.html?package=@glang/plugin)
[![Tests](https://github.com/your-username/glang/actions/workflows/tests.yml/badge.svg)](https://github.com/your-username/glang/actions/workflows/tests.yml)
[![Coverage](https://coveralls.io/repos/github/your-username/glang/badge.svg?branch=main)](https://coveralls.io/github/your-username/glang?branch=main)

A build-time localization solution for modern JavaScript frameworks that automatically fetches and injects translations during the build process.

## ✨ Features

- **Zero-runtime localization** - Translations are injected at build time
- **Simple integration** - Works seamlessly with Next.js and Nuxt.js
- **Centralized management** - Translations stored on [g.ars.world](https://glang.ars.world)
- **Automatic updates** - Fetch latest translations on each build
- **Lightweight** - No heavy client-side libraries

## 🚀 How It Works

g-lang connects to the [g.ars.world](https://glang.ars.world) translation service during your build process:

1. You provide your `api_key` and project `alias`
2. During build, g-lang fetches translations from `https://g.ars.world/<api_key>/<alias>`
3. Translations are injected into your application
4. All translation keys are replaced with actual translations
5. The built application contains all translations statically

This approach eliminates the need for client-side translation loading and reduces bundle size.

## 📦 Installation

```bash
npm install @glang/plugin
# or
yarn add @glang/plugin
```

## 🔧 Usage 

### For Next.js

```javascript
// next.config.js
const Glang = require('@glang/plugin');

module.exports = {
  // ... other config
  plugins: [
    Glang.nextPlugin({
      api_key: 'your_api_key',
      alias: 'your_project_alias',
      outputDir: 'public/locales' // Optional
    })
  ]
};
```

### For Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import Glang from '@glang/plugin';

export default defineConfig({
  plugins: [
    Glang.vitePlugin({
      api_key: 'your_api_key',
      alias: 'your_project_alias',
      outputDir: 'public/locales' // Optional
    })
  ]
});
```

### For webpack 

```javascript
// webpack.config.js
const Glang = require('@glang/plugin');

module.exports = {
  plugins: [
    new Glang.webpackPlugin({
      api_key: 'your_api_key',
      alias: 'your_project_alias',
      outputDir: 'public/locales' // Optional
    })
  ]
};
```

### For Nuxt.js

```javascript
// nuxt.config.js
export default defineNuxtConfig({
  // ... other config
  modules: [
    ['@glang/plugin', {
      api_key: 'your_api_key',
      alias: 'your_project_alias',
      outputDir: 'public/locales' // Optional
    }]
  ]
})
```

## Configuration

- api_key (required) - Your account API key from g.ars.world
- alias (required) - Your project alias


## 🌍 Multi-language Support

g-lang automatically handles multi-language projects. Your translations should be structured with language codes as top-level keys:

```json
{
  "en": {
    "welcome": "Welcome",
    "about": "About Us"
  },
  "fr": {
    "welcome": "Bienvenue",
    "about": "À propos"
  }
}
```

## 🧪 Testing

The codebase is thoroughly tested to ensure reliability:

- Unit tests with Jest/Vitest
- Integration tests for all major frameworks
- End-to-end testing for critical workflows
- Code coverage maintained at 90%+

To run tests locally:

```bash
npm test
# or
yarn test
```

## 💡 Best Practices

Use meaningful keys - Choose translation keys that describe their purpose

Keep translations organized - Group related translations together

Update regularly - Fetch fresh translations during your build process

Fallback language - Always provide complete translations for your default language

Cache wisely - Balance between build performance and translation freshness

## 🤝 Contributing

We welcome contributions! Please follow these steps:

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

## 📜 License
Distributed under the MIT License. See LICENSE for more information.

## 📧 Contact
For support or questions, contact us at support@ars.world

## 🙏 Credits

Developed by ARS33
Inspired by modern localization needs
Built with ❤️ for the open source community