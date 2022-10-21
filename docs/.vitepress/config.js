import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'VitePress',
    description: 'Just playing around.',
    themeConfig: {
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Introduction', link: '/introduction' },
              { text: 'Getting Started', link: '/getting-started' }
            ]
          }
        ]
      }
})