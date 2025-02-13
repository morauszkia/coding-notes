---
title: "Structure of Svelte projects"
prev:
  text: "Intro"
  link: "/svelte/"
---

# Structure of Svelte projects

Apps in Svelte are made up of components. There is typically a main component, called App, defined by the `App.svelte` file, which is then mounted by `main.js` to the `<div id="app"></div>` part of the main HTML document.

It is possible to mount multipple Svelte applications to several elements of the main html file, using divs with appropriate ids. However, these separate applications would then be unable to communicate with each other, while apps built inside of a single root component can share their data and parts can communicate with each other.

## Structure of component files

The App component is then composed of multiple nested components, defined by their own `.svelte` files. These contain

1. **JavaScript logic**: enclosed by `<script></script>` tags, typically at the top.
2. **Scoped styles**: enclosed by `<style></style>` tags.
3. **HTML template**: all the HTML code outside of the above mentioned tags.

In this respect, the structure os .svelte files is similar to the structure of .vue files.
