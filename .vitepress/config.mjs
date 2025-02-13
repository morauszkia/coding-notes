import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Treasury of Coding Notes",
  description:
    "A site to house all my coding notes for various languages, frameworks and libraries that I came into contact",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "JS/TS",
        items: [
          { text: "JavaScript", link: "/js/" },
          { text: "TypeScript", link: "/ts/" },
        ],
      },
      {
        text: "Frontend Frameworks",
        items: [
          { text: "React/Next.js", link: "/react-next/" },
          { text: "Vue/Nuxt.js", link: "/vue-nuxt/" },
          { text: "Svelte.js", link: "/svelte/" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/morauszkia" },
      {
        icon: "linkedin",
        link: "https://www.linkedin.com/in/andras-morauszki/",
      },
    ],
  },
});
