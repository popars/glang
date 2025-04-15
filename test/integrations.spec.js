const Glang = require('../src/index');


describe('Framework Integrations', () => {
  const mockTranslations = {
    en: { hello: 'Hello' },
    ru: { hello: 'Привет' }
  };

  beforeEach(() => {
    (global.fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockTranslations)
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Next.js Plugin', () => {
    it('should create valid next plugin', () => {
      const plugin = Glang.nextPlugin({ api_key: 'test', alias: 'test' });
      expect(plugin).toHaveProperty('name', 'glang-next-plugin');
      expect(plugin).toHaveProperty('loadContent');
    });

    it('should load translations in next plugin', async () => {
      const plugin = Glang.nextPlugin({ api_key: 'test', alias: 'test' });
      const content = await plugin.loadContent();
      expect(content).toEqual(mockTranslations);
    });
  });

  describe('Nuxt.js Module', () => {
    it('should return nuxt module function', () => {
      const module = Glang.nuxtModule({ api_key: 'test', alias: 'test' });
      expect(typeof module).toBe('function');
    });
  });

  describe('Vite Plugin', () => {
    it('should create valid vite plugin', () => {
      const plugin = Glang.vitePlugin({ api_key: 'test', alias: 'test' });
      expect(plugin).toHaveProperty('name', 'glang-vite-plugin');
      expect(plugin).toHaveProperty('buildStart');
    });

    it('should fetch translations on build start', async () => {
      const plugin = Glang.vitePlugin({ api_key: 'test', alias: 'test' });
      await plugin.buildStart();
      expect(fetch).toHaveBeenCalled();
    });
  });

  describe('Webpack Plugin', () => {
    it('should create valid webpack plugin', () => {
      const plugin = Glang.webpackPlugin({ api_key: 'test', alias: 'test' });
      expect(plugin).toHaveProperty('name', 'GlangWebpackPlugin');
      expect(plugin).toHaveProperty('apply');
    });
  });
});