---
title: Setting up your React project
prev:
  text: "Intro"
  link: "/react-next/"
---

There are multiple way to create your new React project. If you are watching older tutorials on React app coding, you might come across create-react-app (CRA), which was for a long time the most popular way to start your React project. Nowadays, however the React team suggests using one of the full-stack React frameworks, but Vite is also a popular build tool, which has a template for React applications and which you can use to start your React project.

## Create React App

This was for a long time the prefered way to create new React Application. Specifically, from 2017 to 2021 CRA was the suggested way to start a new React project.

To start a new project using CRA you could use npx to run create-react-app and bootstrap a new project.

```bash
npx create-react-app my-app
cd my-app
npm start
```

Now, hovever, the [React team suggests](https://react.dev/learn/creating-a-react-app) using one of the React frameworks to create your React project.

## Next.js

Next.js is a React framework with built in tools to build full-stack React applications, which can be deployed to any Node.js or serverless hosting, or it also supports static export for deployment without a server.

You can create a React app using Next.js' App router with the following command:

```bash
npx create-next-app@latest
```

## React Router

React Router is the most popular React routing library, and paired with Vite it constitutes a full-stack React framework. You can create a new React app using the following command:

```bash
npx create-react-router@latest
```

## Vite

Alternatively, you can build your React app from scratch, using a build tool, such as Vite.

```bash
npm create vite@latest my-app -- --template react
```
