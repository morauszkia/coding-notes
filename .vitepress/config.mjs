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

const tsPath = "/ts";
const jsPath = "/js";
const pythonPath = "/python";
const goPath = "/go";
const dsaPath = "/dsa";

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
      [pythonPath]: [
        {
          text: "Python",
          items: [
            { text: "Intro to Python", link: `${pythonPath}/` },
            { text: "Python Basics", link: `${pythonPath}/basics` },
            {
              text: "Conditional Statements",
              link: `${pythonPath}/conditionals`,
            },
            { text: "Loops", link: `${pythonPath}/loops` },
            { text: "Functions", link: `${pythonPath}/functions` },
          ],
        },
        mainNav,
      ],
      [jsPath]: [
        {
          text: "JavaScript",
          items: [
            { text: "Intro to JavaScript", link: `${jsPath}/` },
            { text: "JavaScript Basics", link: `${jsPath}/basics` },
            { text: "Conditional Logic", link: `${jsPath}/conditionals` },
          ],
        },
        mainNav,
      ],
      [tsPath]: [
        {
          text: "TypeScript",
          items: [
            { text: "Intro to TypeScript", link: `${tsPath}/` },
            { text: "TypeScript Basics", link: `${tsPath}/basics` },
            { text: "Functions", link: `${tsPath}/functions` },
            { text: "Unions", link: `${tsPath}/unions` },
            { text: "Arrays and Tuples", link: `${tsPath}/arrays` },
            { text: "Objects", link: `${tsPath}/objects` },
            { text: "Interfaces", link: `${tsPath}/interfaces` },
            { text: "Sets & Maps", link: `${tsPath}/sets-maps` },
            { text: "Enums", link: `${tsPath}/enums` },
            { text: "Type Narrowing", link: `${tsPath}/type-narrowing` },
            { text: "Type Assertion", link: `${tsPath}/type-assertion` },
            { text: "Classes", link: `${tsPath}/classes` },
            { text: "Utility Types", link: `${tsPath}/utility-types` },
            { text: "Generics", link: `${tsPath}/generics` },
            { text: "Advanced Topics", link: `${tsPath}/advanced` },
          ],
        },
        mainNav,
      ],
      [goPath]: [
        {
          text: "Go",
          items: [
            { text: "Intro to Go", link: `${goPath}/` },
            { text: "Variables", link: `${goPath}/variables` },
            { text: "Program flow", link: `${goPath}/program-flow` },
            { text: "Functions", link: `${goPath}/functions` },
            { text: "Structs", link: `${goPath}/structs` },
            { text: "Interfaces", link: `${goPath}/interfaces` },
          ],
        },
        mainNav,
      ],
      [dsaPath]: [
        {
          text: "Data Structures and Algorithms",
          items: [
            {
              text: "Intro to Data Structures and Algorithms",
              link: `${dsaPath}/`,
            },
            { text: "Time Complexity", link: `${dsaPath}/time-complexity` },
            { text: "Algorithms", link: `${dsaPath}/algorithms` },
            { text: "Nondeterministic Polynomial Time", link: `${dsaPath}/np` },
            {
              text: "Data Structures",
              items: [
                { text: "Intro", link: `${dsaPath}/data-structures` },
                { text: "Stacks", link: `${dsaPath}/stacks` },
                { text: "Queues", link: `${dsaPath}/queues` },
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
