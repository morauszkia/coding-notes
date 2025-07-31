---
next:
  text: "TypeScript Basics"
  link: "./basics"
---

# Introduction to TypeScript

TypeScript is a superset of JavaScript, which is strongly typed. It was developed by Microsoft. It adds static typing (and some other advanced features) to JavaScript with type annotations and powerful type inference. It is a _syntactic superset_ of JavaScript, which means, that valid JavaScript is also valid TypeScript, but TypeScript allows developers to specify types of variables, function parameters and return values, and more.

Key features:

- **Type safety**: optional static typing enables the developer to catch many errors at the time of development, and not just at runtime
- **Tooling**: thanks to its awareness of types it provides better autocompletion, error checking and refactoring tools
- **Compatibility**: is ensured by compiling TypeScript to JavaScript, which can be run in any runtime, that runs JavaScript (browser, Node.js, Deno, Bun)
- **Scalability**: TypeScript is particularly advantageous for large-scale complex applications, because it enhances code maintainability and reliability

## Installation

The TypeScript Compiler can be installed using `npm`, `yarn` or `pnpm` as a dev dependency to a project.

::: tabs

== npm

```bash
npm install typescript --save-dev
```

== yarn

```bash
yarn add typescript --dev
```

== pnpm

```bash
pnpm add typescript -D
```

:::

You can also install TypeScript globally using `npm`

```bash
npm install -g typescript
```

TypeScript is compiled, but not in the same sense (i.e. compiled to binary), compiled languages are: TypeScript code is compiled to JavaScript to be run in a JavaScript runtime.
