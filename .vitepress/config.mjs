import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

const mainNav = {
  text: "Main Topics",
  items: [
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
};

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

    sidebar: {
      "/python/": [
        {
          text: "Python",
          items: [
            { text: "Intro to Python", link: "/python/" },
            { text: "Python Basics", link: "/python/basics" },
            { text: "Conditional Statements", link: "/python/conditionals" },
            { text: "Loops", link: "/python/loops" },
            { text: "Functions", link: "/python/functions" },
          ],
        },
        mainNav,
      ],
      "/js/": [
        {
          text: "JavaScript",
          items: [
            { text: "Intro to JavaScript", link: "/js/" },
            { text: "JavaScript Basics", link: "/js/basics" },
          ],
        },
        mainNav,
      ],
      "/": mainNav,
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/morauszkia" },
      {
        icon: "linkedin",
        link: "https://www.linkedin.com/in/andras-morauszki/",
      },
    ],
  },
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
  },
});
