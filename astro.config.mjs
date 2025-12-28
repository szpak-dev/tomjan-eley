// @ts-check
import { defineConfig } from 'astro/config';
import { getBasePath } from './src/libs/deployment.ts';

// https://astro.build/config
export default defineConfig({
    output: 'static',
    base: getBasePath() + '/',
    i18n: {
        defaultLocale: "en",
        locales: ["en", "pl"],
    },
});
