---
prev:
  text: "Front End Fundamentals"
  link: "/frontend-fundamentals/"
next:
  text: "Semantic HTML"
  link: "./semantic"
---

# Introduction to HTML

HTML (HyperText Markup Language) is the standard language used to create and structure web pages on the Internet. It provides a system of elements (or _tags_) that browsers use to display text, images, links, and other media in a readable and organized way. HTML provides the structure and the content of a web page, it creates content hierarchy using headings, containers, lists, inserts media (images, video and audio) into the web page, and can be used to create forms to gather user input.

## HTML Elements

HTML elements are the fundamental building blocks of web pages. Most elements consist of an opening tag, content, and a closing tag, such as `<p>This is a paragraph.</p>`. There are also a few _void_ elements, that consist of a single tag, such as `<img>` (image). These cannot have a content and consist only of an opening tag. You can also write void elements in the form `<img />`

Elements can be nested inside each other in a tree-like structure.

### Common HTML Elements

- `<html>`: The root element of any HTML page
- `<head>`: Contains metadata (title, description, etc.) about the document
- `<title>`: Sets the browser tab's title
- `<body>`: Holds all visible content
- `<h1>`–`<h6>`: Headings for structuring page sections
- `<p>`: Paragraphs
- `<a>`: Hyperlinks
- `<img>`: Images
- `<ul>`, `<ol>`, `<li>`: Unordered and ordered lists, and list items
- `<div>`, `<span>`: Generic containers for layout or styling without semantic meaning

::: tip Semantic HTML

While `div` and `span` elements can be used to group and style other elements, these lack semantic meaning. Therefore, it is a best practice to use [semantic HTML](./semantic) elements instead.

:::

### HTML entities

You might sometimes want to include characters or strings that are reserved into your text. You can use HTML entities to insert special characters into your website so that the browser won't interpret them as code. These entities always start with an ampersand `&` and end with a semicolon `;`.

You can use

- **named** character references: e.g. `&lt;` (&lt;), `&gt;` (&gt;), `&amp;` (&amp;), etc.
- **decimal** numeric references: e.g. `&#60;` (&#60;), `&#62;` (&#62;), `&#38;` (&#38;), etc.
- **hexadecimal** numeric references: e.g. `&#x3C;` (&#x3C;), `&#x3E;` (&#x3E;), `&#x26;` (&#x26;), etc.

You can use these to include special symbols (e.g. &copy;, &dollar;, &euro;, &pound;), greek letters (e.g. &alpha;, &beta;, &omega;), etc.

### HTML attributes

HTML elements can, and sometimes should receive attributes. Attributes are values placed inside the _opening tag_ of an HTML element. These provide additional information about the element or specify how it should behave. The typical syntax is `<element attribute="value">content</element>` These can also serve styling purposes (e.g. `class` or `style` attribute), give the element a unique identifier (`id`), etc. You can learn more about styling [in the CSS section of my notes.](./css)

Typical use case of attributes is to provide the source (`src`) and `alt` (alternative descriptive) text of images: `<img src="/cat.jpg" alt="a cat">`
Another typical use case is to provide the URL of a link with `href`: `<a href="https://example.com">Visit example.com</a>`

Some attributes are required: `src` is required for images and `href` for links. Others are optional.

Some attributes are used without a value: a `checkbox` or `radio` input can be `checked`, a `button` can be `disabled`, a `text` input can be `required`. These are boolean attributes and their presence means that the attribute has the value `true`.

## Structure of a HTML Page

A typical HTML document consists of several essential elements. To simplify the development process, we can use a boilerplate which has all necessary elements as starter code for our web page.

The code of a HTML page starts with the `DOCTYPE` declaration which tells the browser, which HTML version we are using. Nowadays it is typically `<!DOCTYPE html>` which means we are using HTML5.

Everything else is wrapped within a `<html></html>` element. We can (and should) specify the language of our page as an attribute of the `html` tag. There are two main sections inside: the `head` and the `body`.

### The `<head>`

The `<head>` section contains the page's metadata and other information. Metadata is specified within `<meta>` tags. We can specify the page's encoding in a `meta` tag with `charset` attribute: `UTF-8` is widely used on the web. It supports every character in the Unicode character set.
Here you can find the page's `<title>`, which will show in the browsers' tab.

#### Metadata Basics

Adding metadata to your website can help with Search Engine Optimization (SEO), which makes your sites more visible by ranking higher on search engines. One way to do that is to provide a short description of your site using a `meta` element with `name` set to `description`, and `content` set to a short text describing you web page. The description won't be visible on your site, but will be displayed in the search engine results page snippet.

The _open graph protocol_ lets you control, how your website's content appears on social media platforms. For this you can use the `meta` tag with the attribute `property` set to the actual open graph property, and use the `content` attribute to specify the value. You can include an `og:title` will be the title displayed on social media. Setting `og:type` set to `website` informs the platform about the type of content being shared. Examples include articles, websites, videos or music. The `og:image` will be the image visitors will see shared on social media. Another useful property is `og:url`. You can also set `og:description`, and several other properties, but the preceding properties were the most important. To learn more about the Open Graph Protocol, [visit this site](https://ogp.me/).

#### External Resources

We can link to external [stylesheets](./css) and script files in the `head`. While it is possible, to write CSS directly between `style` tags, and JavaScript between the `script` tags, it is best practice to separate content, styles and behavior. We have our structure and content in the `.html` file, and our styles in a `.css` file, which we link to the `.html` file using the `link` tag. Such `link` tags are used also to link to Google Fonts or to icons, and multiple `link` elements can be used in a single document to link to multiple stylesheets. The favicon (the small icon we see beside the title in the browser's tab or associated with the page if we bookmark it) is also specified using a `link` tag. `link` tags are void, they only have an opening tag with the `rel` and `href` attributes.

::: info Relative or absolute path

Paths are often written relative to the document we are working with. These start with a `.`, which signifies the current folder or directory. The path `./styles/globals.css` tells the browser to start in the current folder (`.`), look for a folder named `styles`, and then for a `globals.css` file inside that directory. A path starting with a `/` would be an absolute path.

:::

The `script` tag is used to link a [JavaScript file](/js/) to our HTML file. Script files can also be linked at the end of the body, to make sure that the content is rendered before we try to access it using JavaScript. Alternatively, we can use the `defer` attribute to defer the execution of the JavaScript file after the site is rendered. Unlike `link` tags, `script` tags have an opening and a closing tag, but if we use the `src` attribute to link a file, _no content_.

### The `<body>`

The `body` is where the visible content of the page is inserted. Most HTML elements, such as general containers, like `div`s or `span`s, paragraphs of text, images, video and other elements are.

**Example:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Awesome Website</title>
    <meta property="og:title" content="My Awesome Website" />
    <meta property="og:type" content="website" />
    <meta
      property="og:image"
      content="https://plus.unsplash.com/premium_photo-1683309565422-77818a287060?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
    />
    <link rel="stylesheet" href="./styles.css" />
    <link rel="icon" href="favicon.ico" />
    <script src="./main.js" defer></script>
  </head>
  <body>
    <h1>Welcome to HTML</h1>
    <p>This is a sample paragraph.</p>
    <a href="https://example.com">Visit Example</a>
    <button id="action">This Button does something</button>
  </body>
</html>
```
