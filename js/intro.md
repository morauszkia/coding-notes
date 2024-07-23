# Introduction to JavaScript

JavaScript is the programming language, browsers can interpret using their JavaScript engine, which compiles JS code to language that the machine understands. The most well known is Google's V8 enginge, which is also used by Node.js to run JavaScript on the server.

## Adding JavaScript code to html file

JavaScript is typically written within separate `.js` files and linked to the html file using a `<script>` tag. Shorter JS code can be written directly between the opening and closing `<script>` tags.

The `<script>` tag can be placed at the end of the `<body>` so that the body is parsed before the JavaScript code, and the JS code can access DOM elements. A better solution is to add the tag into the `<head>` using the `defer` attribute.

Multiple scripts can be attached to a html file, but in this case the order matters: scripts with functions and variables used by other scripts should come first. In this case, we have to add the scripts to the head and use defer.
If there's no interaction between scripts, the `async` attribute works as well.

But: defer and async are HTML5 features, and really old browsers cannot interpret them, and only work with JS code inserted at the end of the body.

For more complex project setups, module bundlers are used, which will be discussed later.
