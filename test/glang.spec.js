const fs = require('fs');
const Glang = require('../src/index');

// Mock файловой системы
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  writeFileSync: jest.fn(),
  readFileSync: jest.fn()
}));

describe('Glang', () => {
  beforeEach(() => {
    // Очищаем моки перед каждым тестом
    jest.clearAllMocks();
    
    // Настраиваем мок fs
    fs.existsSync.mockReturnValue(false);
    fs.readFileSync.mockReturnValue(JSON.stringify({
      en: { hello: 'Hello' },
      ru: { hello: 'Привет' }
    }));
  });

  describe('constructor', () => {
    it('should throw error when api_key is missing', () => {
      expect(() => new Glang({ alias: 'test' })).toThrow('api_key is required');
    });

    it('should throw error when alias is missing', () => {
      expect(() => new Glang({ api_key: 'test' })).toThrow('alias is required');
    });

    it('should initialize with valid options', () => {
      const glang = new Glang({ api_key: 'test', alias: 'test' });
      expect(glang).toBeInstanceOf(Glang);
    });
  });

  describe('fetchTranslations', () => {
    it('should fetch translations from correct URL', async () => {
      const glang = new Glang({ api_key: 'test_key', alias: 'test_alias' });
      await glang.fetchTranslations();

      expect(fetch).toHaveBeenCalledWith('https://g.ars.world/test_key/test_alias');
    });

    it('should handle fetch errors', async () => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found'
        })
      );

      const glang = new Glang({ api_key: 'test', alias: 'test' });
      await expect(glang.fetchTranslations()).rejects.toThrow('HTTP error! status: 404');
    });
  });

  describe('generateLangFiles', () => {
    it('should create language files', async () => {
      const glang = new Glang({ 
        api_key: 'test', 
        alias: 'test',
        outputDir: 'public/langs' 
      });

      await glang.fetchTranslations();

      expect(fs.mkdirSync).toHaveBeenCalledWith('public/langs', { recursive: true });
      expect(fs.writeFileSync).toHaveBeenCalledTimes(3); // en.json, ru.json, index.json
    });
  });

  describe('framework integrations', () => {
    it('should create Next.js plugin', () => {
      const plugin = Glang.nextPlugin({ api_key: 'test', alias: 'test' });
      expect(plugin).toHaveProperty('name', 'glang-next-plugin');
      expect(plugin).toHaveProperty('loadContent');
    });

    it('should create Vite plugin', () => {
      const plugin = Glang.vitePlugin({ api_key: 'test', alias: 'test' });
      expect(plugin).toHaveProperty('name', 'glang-vite-plugin');
    });
  });
});