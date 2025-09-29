---
prev:
  text: "Advanced Topics"
  link: "./advanced"
---

# Local Development with TypeScript

After TypeScript installation, you can use it in your projects in local development. In the project you need a `tsconfig.json` file to configure TypeScript for that project. You can initialize a TypeScript project with a default `tsconfig.json` file using `tsc --init`, or (if you have TypeScript installed globally) you can simply create a `tsconfig.json` file in your project folder.

## Configuration

In you `tsconfig.json` you can specify various options under `compilerOptions`. If you created your `tsconfig.json` with `tsc --init` you will have several options set to a default value and other options commented out.

With TypeScript `v5.9.2` the default `tsconfig.json` looks the following:

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    // "outDir": "./dist",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "nodenext",
    "target": "esnext",
    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  }
}
```

Of course, there are a [lot more options](https://www.typescriptlang.org/tsconfig/) you can use to configure TypeScript. For example we can use

- `exclude` to exclude an array of files and folders to exclude from compilation
- the `include` option to include files or folders which would otherwise be excluded. You can use wildcard (`*`) character in the file or folder names
- `rootDir` tells TypeScript where it should look for your source code
- `outDir` lets you specify, where you would like to have your compiled files
- `sourceMap` helps debugging with devtools, because it lets you see the `.ts` files despite working with the compiled `.js` files

Other useful options include:

- `lib` specifies which type definitions for built-in JS APIs to include in the compilation. This defines, which APIs are available for us in the code (e.g. `dom` and `dom.iterable` for front-end code). If it is commented out, it will use the default libraries
- `target` specifies the ECMAScript target version for the compiled JavaScript code. If you want to use the latest choose `esnext`
- `strict` with value `true` enables all strict type checking options, such as
  - `noImplicitAny`, which doesn't allow having variables that have implicitly type `any`and forces you to be explicit about your types
  - `strictNullChecks` will warn you if a variable may be `null` or `undefined` and forces you to handle such cases with [type guards](./functions#type-guards) or [non-null assertions](./type-assertion#non-null-assertion)
  - `alwaysStrict` will add strict mode to JavaScript files as well
  - `strictBindCallApply` will type check your arguments if you call a function with `bind`, `call` or `apply`
- `skipLibCheck` can skip type checking of all declaration files (e.g. your huge `node_modules` folder), which speeds up compilation
- `verbatimModuleSyntax` forces you to import types using the `import type ...` syntax
- `esModuleInterop` allows you to import CommonJs modules with the ESM syntax
- `moduleDetection` will consider everything to be a module - you want this in a new project
- `noUncheckedIndexedAccess` will add `undefined` to the type of any indexed access of object properties, which may prevent some runtime errors
- `noEmitOnError` will prevent the creation of compiled `.js` files in the compiler runs into an error
- `removeComments` will remove comments during compilation
- `allowJs` and `checkJs` makes using `.js` files in your project possible: the former will compile these, the latter makes it possible to use some of TypeScript's features with `.js` files
- `noUnusedLocals` and `noUnusedParameters` won't let you have unused local variables or parameters in your code
- `noImplicitReturns` will check if all branches of your function's code end with an explicit return statement.

There are of course many more options that you can find [in the official Docs](https://www.typescriptlang.org/tsconfig/).

## Declaration Files

If you have JavaScript code in your project that doesn't have type information, you can use the `.d.ts` declaration files to add the necessary type declarations. These cannot contain any runtime code.

You can add a `global.d.ts` file to add type information to global variables (e.g. coming from imported libraries)

For example the file below tells TypeScript that you have a `supportAI` property on `window` that has a version string property and an `enableAutoReplay` method that accepts no parameters and doesn't explicitly return anything.

```typescript
// global.d.ts
declare global {
  interface Window {
    supportAI: {
      version: string;
      enableAutoReply(): void;
    };
  }
}

export {};
```

For external libraries you can check [DefininelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) if they have type information for that library.

You can also create declaration files for specific modules. The file below adds type information to the module `chats.js`.

```typescript
// chats.d.ts
export declare module "./chats.js" {
  export type Chat = {
    time: string;
    message: string;
  };

  export function log(chats: Chat[]): void;

  export const chats: Chat[];
}
```

This way if you import from the module into a `.ts` file, TypeScript will help you with the types.

## Ignore

While it is not recommended, TypeScript's type checking can be turned off for specific lines of code or entire files.

Typescript will ignore the type errors in the line after `// @ts-ignore`

```typescript
// @ts-ignore
const x: number = "this is a string";
```

It will ignore the whole file that starts with `// @ts-nocheck`

```typescript
// @ts-nocheck
const x: number = "this is not a number";
const y: boolean = "this is not a boolean";

function add(x: number, y: number): number {
  return x + y;
}

console.log(add("3", "5"));
```

## Module Bundlers and Build Tools

TypeScript is often used with various build tools. At the time of writing these notes [Vite](https://vite.dev/) is a popular build tool that supports TypeScript. You can create a new Vanilla TypeScript project with vite by running:

```bash
npm create vite@latest app-name -- --template vanilla-ts
```

You can also create new projects in various frontend frameworks and TypeScript (e.g. React, Vue, Svelte, Solid, Qwik, etc.).

It is really easy to setup TypeScript with Vite, but you can use TypeScript with other bundlers (e.g. webpack or parcel) as well. You can find the necessary information to configure TypeScript in the official docs.

- [Webpack TypeScript config](https://webpack.js.org/guides/typescript/)
- [Parcel TypeScript config](https://parceljs.org/languages/typescript/)
