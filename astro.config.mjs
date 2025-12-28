// @ts-check
import { defineConfig } from 'astro/config';


// https://astro.build/config
export default defineConfig({
    output: 'static',
    base: process.env.GITHUB_ACTIONS ? '/tomjan-eley/' : '/',
    i18n: {
        defaultLocale: "en",
        locales: ["en", "pl"],
    },
});
