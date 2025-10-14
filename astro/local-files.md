---
prev:
  text: "Markdown Files"
  link: "./markdown-files"
---

# Working with Local Files

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
