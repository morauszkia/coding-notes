---
prev:
  text: Advanced Concepts Intro
  link: /advanced-concepts
---

# Clean Code

The concept of clean code is about writing code that is easy for humans to understand. The principles of clean code are not aiming to make your programs run faster or to make them function properly. These are concerned with

- making your code easier to work with
- making it easier to spot and fix bugs in your code
- making the development process faster
- making the development process less painful

Paradigms such as Object Oriented Programming or OOP and Functional programming aim to make your code clean.

## DRY

One important part of clean code principles is the DRY: Don't Repeat Yourself principle. We should avoid writing the same code in multiple places, because

- if we need to change the code, we have to do it in multiple places, and
- if we forget to change the code in one place, we get ourselves a nice little bug, and
- it's certainly a lot of unneccessary work to change the code over and over again

One way to avoid code duplication is to use functions to rerun the same logic with different inputs.
