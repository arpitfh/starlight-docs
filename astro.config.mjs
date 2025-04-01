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
  
  return folders.map(folder => {
    // Convert folder name to display label (capitalize words)
    const label = folder
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // For directory reference, use the actual folder name
    return {
      label: label,
      autogenerate: { directory: folder }
    };
  });
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'FirstHive',
      logo: {
        src: './src/assets/logo.png',
        // Optional: Add alt text alongside the logo
        alt: 'FirstHive Logo',
        replacesTitle: true
      },
      // social: {
      //   // github: 'https://github.com/withastro/starlight',
      //   linkedin: 'https://www.linkedin.com/company/firsthivecdp'
      // },
      // components: {
      //   // Use our custom component
      //   SocialIcons: './src/components/starlight/SocialIcons.astro',
      // },
      sidebar: [
        // You can keep some static entries if needed
        // {
        //   label: 'Guides',
        //   items: [
        //     { label: 'Example Guide', slug: 'guides/example' },
        //   ],
        // },
        // Dynamically generated entries from folders
        ...generateSidebarFromFolders()
      ],
    }),
  ],
  // Add this to ignore .gitkeep files
  build: {
    excludeFiles: ['**/.gitkeep']
  }
});