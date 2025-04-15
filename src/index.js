class Glang {
    constructor(options = {}) {
      if (!options.api_key) {
        throw new Error('api_key is required');
      }
      if (!options.alias) {
        throw new Error('alias is required');
      }
  
      this.api_key = options.api_key;
      this.alias = options.alias;
      this.cache = {};
      this.baseUrl = 'https://g.ars.world';
      this.outputDir = options.outputDir || 'public/langs';
    }
  
    async fetchTranslations() {
      try {
        const url = `${this.baseUrl}/${this.api_key}/${this.alias}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        
        if (data && typeof data === 'object') {
          this.cache = data;
          await this.generateLangFiles();
          return this.cache;
        }
        
        throw new Error('Invalid response format');
      } catch (error) {
        console.error('Failed to fetch translations:', error.message);
        throw error;
      }
    }
  
    async generateLangFiles() {
      try {
        const fs = require('fs');
        const path = require('path');
  
        // Create output directory if it doesn't exist
        if (!fs.existsSync(this.outputDir)) {
          fs.mkdirSync(this.outputDir, { recursive: true });
        }
  
        // Generate separate JSON files for each language
        for (const [lang, translations] of Object.entries(this.cache)) {
          const filePath = path.join(this.outputDir, `${lang}.json`);
          fs.writeFileSync(filePath, JSON.stringify(translations, null, 2));
          console.log(`Generated language file: ${filePath}`);
        }
  
        // Generate index file with all languages
        const indexFilePath = path.join(this.outputDir, 'index.json');
        fs.writeFileSync(indexFilePath, JSON.stringify(this.cache, null, 2));
        console.log(`Generated index file: ${indexFilePath}`);
  
      } catch (error) {
        console.error('Error generating language files:', error);
        throw error;
      }
    }
  
    // Метод для Next.js
    static nextPlugin(options) {
      const glang = new Glang(options);
      
      return {
        name: 'glang-next-plugin',
        async loadContent() {
          return await glang.fetchTranslations();
        },
        async contentLoaded({ content, actions }) {
          // Здесь можно добавить логику для Next.js
        }
      };
    }
  
    // Метод для Nuxt.js
    static nuxtModule(options) {
      return async function (moduleOptions) {
        const glang = new Glang({ ...options, ...moduleOptions });
        const translations = await glang.fetchTranslations();
        
        this.nuxt.hook('generate:done', () => {
          // Логика после генерации
        });
      };
    }
  
    static vitePlugin(options) {
      const glang = new Glang(options);
      
      return {
        name: 'glang-vite-plugin',
        async buildStart() {
          await glang.fetchTranslations();
        },
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/langs') {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(glang.cache));
            } else {
              next();
            }
          });
        }
      };
    }
  
    static webpackPlugin(options) {
      const glang = new Glang(options);
      
      return {
        apply: (compiler) => {
          compiler.hooks.beforeRun.tapPromise('GlangWebpackPlugin', async () => {
            await glang.fetchTranslations();
          });
        },
        name: 'GlangWebpackPlugin'
      };
    }
  }
  
  module.exports = Glang;