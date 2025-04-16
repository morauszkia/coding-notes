import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/coding-notes/",
  title: "My Treasury of Coding Notes",
  description:
    "A site to house all my coding notes for various languages, frameworks and libraries that I came into contact",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Concepts", link: "/concepts" },
      { text: "Languages", link: "/languages" },
      { text: "Frontend", link: "/frontend" },
      { text: "Backend", link: "/backend" },
    ],

    sidebar: [
      {
        text: "Programming Concepts",
        items: [
          { text: "Advanced Concepts", link: "/advanced-concepts/" },
          { text: "Version Control", link: "/git/" },
        ],
      },
      {
        text: "Languages",
        link: "/languages",
      },
      {
        text: "Frontend Development",
        link: "/frontend",
      },
      {
        text: "Backend Development",
        link: "/backend",
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
