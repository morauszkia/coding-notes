---
prev:
  text: "Markdown Files"
  link: "./markdown-files"
---

# Building Dynamic Astro Pages

## Importing Local Files

You can use Vite's `import.meta.glob()` method to import many files at once using glob patterns. It takes a _relative glob pattern_ matching the local files you want to import. It returns an object with _relative paths_ as keys and dynamic imports, or, if you pass `{ eager: true }` as the second argument, the imported glob data. You can access the imported data with `Object.values()`, which returns an array of the data.

For example, if you import `.md` files with it, you get access to the frontmatter on each imported file.

```astro {3,9}
---
import BaseLayout from '../layouts/BaseLayout.astro'
const allPosts = Object.values(import.meta.glob('./posts/*.md', { eager: true }));
const pageTitle = "My Astro Learning Blog";
---
<BaseLayout pageTitle={pageTitle}>
  <p>This is where I will post about my journey learning Astro.</p>
  <ul>
    {allPosts.map((post: any) => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}
  </ul>
</BaseLayout>
```

## Dynamic Page Routes

You can create dynamic page titles using the square brackets (`[id].astro`) syntax. The `getStaticPaths()` function returns an array of page routes, and all of the pages at those routes will use the same template that you define in this file. The paths can be hardcoded or constructed dynamically, too. You need to specify the values for the dynamic parts of the routes.

You can pass props to these pages using the `props` property.

::: tabs

== hardcoded

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import BlogPost from "../../components/BlogPost.astro";

export async function getStaticPaths() {
  const allPosts = Object.values(
    import.meta.glob("../posts/*.md", { eager: true })
  );

  return [
    { params: { tag: "astro" }, props: { posts: allPosts } },
    { params: { tag: "successes" }, props: { posts: allPosts } },
    { params: { tag: "community" }, props: { posts: allPosts } },
    { params: { tag: "blogging" }, props: { posts: allPosts } },
    { params: { tag: "setbacks" }, props: { posts: allPosts } },
    { params: { tag: "learning in public" }, props: { posts: allPosts } },
  ];
}

const { tag } = Astro.params;
const { posts } = Astro.props;
const filteredPosts = posts.filter((post: any) =>
  post.frontmatter.tags?.includes(tag)
);
---

<BaseLayout pageTitle={tag}>
  <p>Posts tagged with {tag}</p>
  <ul>
    {
      filteredPosts.map((post: any) => (
        <BlogPost url={post.url} title={post.frontmatter.title} />
      ))
    }
  </ul>
</BaseLayout>

```

== dynamic

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import BlogPost from "../../components/BlogPost.astro";

export async function getStaticPaths() {
  const allPosts = Object.values(
    import.meta.glob("../posts/*.md", { eager: true })
  );

  const uniqueTags = [
    ...new Set(allPosts.map((post: any) => post.frontmatter.tags).flat()),
  ];

  return uniqueTags.map((tag) => {
    const filteredPosts = allPosts.filter((post: any) =>
      post.frontmatter.tags.includes(tag)
    );
    return {
      params: { tag },
      props: { posts: filteredPosts },
    };
  });
}

const { tag } = Astro.params;
const { posts } = Astro.props;
---

<BaseLayout pageTitle={tag}>
  <p>Posts tagged with {tag}</p>
  <ul>
    {
      posts.map((post: any) => (
        <BlogPost url={post.url} title={post.frontmatter.title} />
      ))
    }
  </ul>
</BaseLayout>

```

:::
