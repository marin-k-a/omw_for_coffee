// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	base: '/',
	outDir: 'docs',
	integrations: [tailwind()],
//	experimental: {
//    contentLayer: true,
//  },
});
