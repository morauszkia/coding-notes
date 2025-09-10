---
prev:
  text: "Intro"
  link: "./index"
---

# Project structure

The `create astro` CLI tool creates a basic project structure for your project. It creates the `public` and `src` directories for you, to store your assets and source code. Most of your files will be inside the `src` directory, and `public` will contain those static assets (e.g. images), that do not need to be optimized in the build process.

## Running the development server

Astro projects come with a development server, that we can use to preview the project as a website, while we are still working on it.

Astro dev server is run with the `dev` script. As a default, the preview can be accessed at `http://localhost:4321`

::: tabs

== npm

```bash
npm run dev
```

== pnpm

```bash
pnpm run dev
```

== yarn

```bash
yarn run dev
```

:::

## The src folder

The `src` folder hosts the source code of our website. Within it, we can create `.astro` files and others, to build the pages, layouts and components that we want to use on our website.

### The pages folder

Astro uses file-based routing. Every supported page file (`.astro`, `.md`, `.js`, `.ts`, `.html`) located within the pages folder will create a route. By default, all Astro page routes and endpoints are generated and pre-rendered at build time. We can override this on a per-page basis or in the global configuration.

The pages named `index.astro` will be opened, if we navigate to that folder. E.g. the `index.astro` page that is within `src/pages/`, will be our main page. The `index.astro` page of `src/pages/contact/` will be opened, if we navigate to `https://ourwebsite.com/contact/` or `https://ourwebsite.com/contact/index.html`.

### The layouts folder

Files within the `layouts` folder function as the layouts for your pages. Code, that is shared between multiple pages (e.g. main navigation, metadata) can be written in the layout files. We can use multiple layouts in the project, and layouts can also be nested within each other.

### The components folder

Code for smaller reusable components can be written inside the `components` folder. We can choose from many supported front-end libraries and frameworks, or use Astro's own files to create reusable components. Components can be used in the pages, layouts or other components.

### Other folders

To organize our code, we can use other folders, for example, `scripts` for the JavaScript files that provide additional functionality, or `styles` for the global CSS stylesheets.

## Adding external libraries

You can add official integrations, e.g. front-end frameworks, to your project using the `astro add` command. You can add multiple integrations at once.

For more info visit [this page](https://docs.astro.build/en/guides/integrations-guide/).

::: tabs

== npm

```bash
npm astro add react mdx sitemap
```

== pnpm

```bash
pnpm astro add react mdx sitemap
```

== yarn

```bash
yarn astro add react mdx sitemap
```

:::
