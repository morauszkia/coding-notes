---
prev:
  text: "Home"
  link: "/"
next:
  text: "Project Structure"
  link: "./project-structure"
---

# Introduction to Astro

Astro is an open-source web framework that advertises itself as "The web framework for content-driven websites". It became popular among those who want to code a fast website, that focuses on the quality of the content, such as blogs, documentation, and similar cases. Its standout feature is a "zero JavaScript by default" approach, meaning it generates static HTML pages that ship no client-side JavaScript unless you explicitly add interactivity. This results in exceptionally fast load times and improved SEO. In performance benchmarks, Astro consistently outperforms popular frameworks like Next.js and Gatsby.

The current version is v5.9 (June 2025)

You can find the official Astro website at [https://astro.build/](https://astro.build/). Here you can find the [official documentation](https://docs.astro.build/en/getting-started/), including an officia [Tutorial](https://docs.astro.build/en/tutorial/0-introduction/) to learn the basics.

## Key Features

- **Islands Architecture:** Astro introduces the "islands architecture," where only specific interactive components (islands) receive JavaScript, while the rest of the page remains static HTML and CSS. This partial hydration technique drastically reduces JavaScript bloat and improves performance
- **Static Site Generation (SSG):** By default, Astro pre-renders static HTML at build time, ensuring lightning-fast page loads
- **Server-Side Rendering (SSR):** Astro can also render pages on the server for dynamic content, allowing you to mix SSG and SSR in a single project
- **Framework Flexibility:** Astro supports components from React, Vue, Svelte, Solid, and more, letting you leverage your existing skills and ecosystem
- **Markdown \& MDX Support:** Native support for Markdown and MDX makes Astro ideal for content-heavy projects like blogs and documentation
- **Integrations:** Astro offers a robust integration system for adding features such as CMS support, image optimization, sitemaps, and more, with both official and community plugins
- **API Routes:** You can define serverless API endpoints within your Astro project, enabling form handling, file uploads, and REST APIs without extra configuration

## Developer Experience

- **File-based Routing:** Pages are created by adding `.astro` files to the `src/pages` directory; each file automatically becomes a route
- **Reusable Layouts:** Layout files created typically inside `src/layouts` allow you to structure multiple pages with shared templates that also accept dynamic values as props
- **Hot Reloading \& Code Splitting:** Built-in development tools ensure a smooth workflow and optimal production builds
- **TypeScript Support:** Astro supports TypeScript out of the box for type-safe development

## Use Cases

Astro excels at building:

- Content-rich websites (blogs, documentation, marketing pages)
- Static or hybrid static/dynamic sites
- Sites where performance and SEO are top priorities

## Installation

Astro needs Node.js version `v18.20.8` or `v20.3.0`, `v22.0.0` or higher. As text editor, Astro recommends [VS Code](https://code.visualstudio.com/) with official [Astro extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode), but there are extensions for other code editors as well, including Vim/Neovim and Emacs. Astro is accessed through its command-line interface (CLI). You can also use online code editors to try Astro. The Astro website has all information necessary to set up your development environment.

You can create a new Astro projects using the `create astro` command. The wizard helps to setup the project and install dependencies.

```bash
# with npm
npm create astro@latest

# pnpm
pnpm create astro@latest

# or yarn
yarn create astro
```

After installing the dependencies you can run the dev server with `npm run dev` / `pnpm run dev` / `yarn run dev`. After you finish development you can run the `build` command, and Astro will build a deploy-ready version of your page in the `dist` folder.
