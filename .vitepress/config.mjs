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
        { text: "Data Structures and Algorithms", link: "/dsa/" },
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
            { text: "Conditional Logic", link: "/js/conditionals" },
          ],
        },
        mainNav,
      ],
      "/ts/": [
        {
          text: "TypeScript",
          items: [
            { text: "Intro to TypeScript", link: "/ts/" },
            { text: "TypeScript Basics", link: "/ts/basics" },
            { text: "Functions", link: "/ts/functions" },
            { text: "Unions", link: "/ts/unions" },
            { text: "Arrays and Tuples", link: "/ts/arrays" },
            { text: "Objects", link: "/ts/objects" },
            { text: "Sets & Maps", link: "/ts/sets-maps" },
          ],
        },
        mainNav,
      ],
      "/go/": [
        {
          text: "Go",
          items: [
            { text: "Intro to Go", link: "/go/" },
            { text: "Variables", link: "/go/variables" },
            { text: "Program flow", link: "/go/program-flow" },
            { text: "Functions", link: "/go/functions" },
            { text: "Structs", link: "/go/structs" },
          ],
        },
        mainNav,
      ],
      "/dsa/": [
        {
          text: "Data Structures and Algorithms",
          items: [
            { text: "Intro to Data Structures and Algorithms", link: "/dsa/" },
            { text: "Time Complexity", link: "/dsa/time-complexity" },
            { text: "Algorithms", link: "/dsa/algorithms" },
            { text: "Nondeterministic Polynomial Time", link: "/dsa/np" },
            {
              text: "Data Structures",
              items: [
                { text: "Intro", link: "/dsa/data-structures" },
                { text: "Stacks", link: "/dsa/stacks" },
                { text: "Queues", link: "/dsa/queues" },
              ],
            },
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
