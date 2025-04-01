// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import fs from 'fs';
import path from 'path';

// Function to automatically generate sidebar items based on directory structure
function generateSidebarFromFolders() {
  const contentDir = path.join(process.cwd(), 'src/content/docs');
  const folders = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  return folders.map(folder => ({
    label: folder.charAt(0).toUpperCase() + folder.slice(1), // Capitalize folder name
    autogenerate: { directory: folder }
  }));
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      social: {
        github: 'https://github.com/withastro/starlight',
      },
      sidebar: [
        // You can keep some static entries if needed
        {
          label: 'Guides',
          items: [
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        // Dynamically generated entries from folders
        ...generateSidebarFromFolders()
      ],
    }),
  ],
});