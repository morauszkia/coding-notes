# Building Blocks of Astro Files

Astro files consist of a frontmatter and a content. Astro files can be used to create Astro pages, layouts and components.

## Frontmatter

The frontmatter is the part between the `---` fences, and it contains JavaScript or TypeScript code, e.g. variable declarations.

This is also, where you can import things into your page: layouts, components and stylesheets.

If your page or component receives props, you can access and destructure them in the frontmatter as well. Props can be reached via `Astro.props`

## HTML Template

Variables declared in the frontmatter can be used in the template between `{}`. Any valid JavaScript or TypeScript expression can come inside the curly braces. For example, you can use this to conditionally render parts of the page with short circuiting or ternary operators. You can also map over an array and render some HTML for each entry.

::: info JSX similarities

Astro templating syntax is similar to JSX. Searching for how something is done in JSX can be a good starting point for solving a problem with Astro.
:::

## Styling Astro Pages

You can add styles to your page between `<style></style>` tags.

With the `define:vars` directive you can use variables from the frontmatter in your style declarations as CSS custom properties.

The style tag is scoped by default, so that it only affects the elements within that page.

### Global stylesheet

Globally applicable styles can be written in a CSS file, and imported into the pages via the frontmatter. If global and local style declarations clash, local declarations are applied.

## Client-side JavaScript

Frontmatter is for server-side JavaScript, that runs at build time. If you want to have client-side interaction with your page or component, you must add client-side JavaScript with the `<script>` tag. Here you can select your elements using vanilla JavaScript methods to manipulate the DOM.

### External .js files

You can write your JavaScript in separate files, e.g. within a `scripts` folder, and import these within the `<script>` tag.

## Components

You can create Astro components in `.astro` files, usually within the `components` folder. These can be imported in the frontmatter of an Astro page or another Astro component, and used in the usual way, as custom HTML entities.

For example a `Navigation` component can be inserted into the HTML template in the form `<Navigation />`.

Components can receive props: a `Social` component can receive the `platform` and `username` prop in the following way: `<Social platform="twitter" username="frodo_baggins" />`

Components can be styled in the same way as pages, using the `<style>` tag.

The Social component below accesses props passed down, defines a HTML template and scoped styles that only apply to this component.

```astro
---
const { platform, username } = Astro.props;
---

<a href={`https://www.${platform}.com/${username}`}>{platform}</a>

<style>
  a {
    padding: 0.5rem 1rem;
    color: white;
    background-color: #4c1d95;
    text-decoration: none;
  }
</style>

```

## Layouts

Layouts are Astro files that define reusable layouts for your page files: these contain all the metadata, and the basic structure of your pages that will be shared between multiple individual pages.

These can also be nested, like any other Astro component, and can receive content using the `<slot />` tag. Everything, that is placed in the page file between the opening and closing layout tags, will be rendered to the `slot`.

Page specific values can be passed to the layout (the same way as to components) as props, and accessed via `Astro.props`. In the case of Markdown files, you can access the properties of the Markdown frontmatter via the `frontmatter` property of `Astro.props`.

The layout below imports a global stylesheet, accesses page specific data via props, uses imported components, imported client-side JavaScript, and renders content to a `slot`.

```astro
---
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import "../styles/global.css";
const { pageTitle } = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>{pageTitle}</title>
  </head>
  <body>
    <Header />
    <h1>{pageTitle}</h1>
    <slot />
    <Footer />
    <script>
      import "../scripts/menu.js";
    </script>
  </body>
</html>

```

The layout below is for a blog post written in Markdown. It accesses the data for the individual post via the `frontmatter` property of `Astro.props`. It is also nested within another layout, and passes data via props to the wrapping layout.

```astro
---
import BaseLayout from "./BaseLayout.astro";
const { frontmatter } = Astro.props;
---

<BaseLayout pageTitle={frontmatter.title}>
  <p>Published on: {frontmatter.pubDate.toString().slice(0, 10)}</p>
  <p><em>{frontmatter.description}</em></p>
  <p>Written by {frontmatter.author}</p>
  <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} />
  <slot />
</BaseLayout>

```

Layouts can be imported in the [frontmatter](#frontmatter) of your pages, and used in the HTML template to wrap your page content. For [markdown files](./markdown-files) you can specify the layout in the Markdown frontmatter using the `layout` property.

## Example Page

The page below imports a layout, and passes data to it via props. It also uses variables declared in the frontmatter, and JavaScript inserted into the HTML template, including conditional rendering, looping through an array, interpolation, and using variables in the `<style>` tag.

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
const pageTitle = "About Me";

const identity = {
  firstName: "András",
  country: "Hungary",
  occupation: "Researcher, data analyst",
  hobbies: ["trail running", "reading", "dancing"],
};

const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Python"];

const happy = true;
const finished = false;
const goal = 3;

const skillColor = "navy";
const fontWeight = "bold";
const textCase = "uppercase";
---

<BaseLayout pageTitle={pageTitle}>
  <h2>... and my new Astro site!</h2>

  <p>
    I am working through Astro's introductory tutorial. This is the second page
    on my website, and it's the first one I built myself!
  </p>

  <p>
    This site will update as I complete more of the tutorial, so keep checking
    back and see how my journey is going!
  </p>

  <p>Here are a few facts about me:</p>
  <ul>
    <li>My name is {identity.firstName}.</li>
    <li>
      I live in {identity.country} and I work as a {identity.occupation}.
    </li>
    {
      identity.hobbies.length >= 2 && (
        <li>
          Two of my hobbies are: {identity.hobbies[0]} and {identity.hobbies[1]}
        </li>
      )
    }
  </ul>
  <p>My skills are:</p>
  <ul>
    {skills.map((skill) => <li class="skill">{skill}</li>)}
  </ul>

  {happy && <p>I am happy to be learning Astro!</p>}

  {finished && <p>I finished this tutorial!</p>}

  {
    goal === 3 ? (
      <p>My goal is to finish in 3 days.</p>
    ) : (
      <p>My goal is not 3 days.</p>
    )
  }
</BaseLayout>

<style is:global define:vars={{ skillColor, fontWeight, textCase }}>
  h1 {
    color: purple;
    font-size: 4rem;
  }
  .skill {
    color: var(--skillColor);
    font-weight: var(--fontWeight);
    text-transform: var(--textCase);
  }
</style>

```
