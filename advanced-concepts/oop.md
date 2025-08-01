---
prev:
  text: Advanced Concepts Menu
  link: "./"
next:
  text: Functional Programming
  link: "./functional"
---

# Object-Oriented Programming

Object-oriented programming (OOP) is a programming paradigm that structures software design around the concept of _objects_ rather than just functions and logic. Objects are self-contained units that bundle together _data_ (called attributes, fields or properties) and _behaviors_ (called methods or functions) that operate on that data.

## Benefits of Object-Oriented Programming

- **Modularity**: OOP encourages breaking down complex problems into smaller, manageable objects, making code easier to understand, develop, and maintain.
- **Reusability**: Inheritance allows for reusing code from existing classes, reducing development time and effort.
- **Maintainability**: Encapsulation and abstraction make code more robust and easier to modify without affecting other parts of the system.
- **Scalability**: The modular nature of OOP makes it easier to scale applications by adding new objects and classes.
- **Flexibility**: Polymorphism allows for writing code that can work with objects of different classes in a uniform way.
- **Collaboration**: The structure of OOP supports collaborative development, as different teams can work on different objects or classes independently.
- **Real-world Modeling**: OOP allows developers to model real-world entities and their interactions more naturally in code.

## Core Concepts

- **Classes** are blueprints or templates for creating objects. A class defines what attributes and methods the objects created from it will have.
- **Objects** are instances of classes. Each object has its own unique data but shares the structure and behaviors defined by its class.
- **Attributes** are variables that store the state or data of an object (e.g., a person's name or age)
- **Methods** are functions defined within a class that describe the behaviors of an object (e.g., a method to print a person's name)

## Core Principles

1. **Encapsulation**:

   - Bundling data and methods within objects
   - Interaction with the object happens through methods
   - Restricting direct access to some of the object's components by making properties private or using conventions to indicate properties that shouldn't be manipulated directli. This protects the integrity of the data and hides the internal implementation details.
   - Encapsulation focuses on _hiding_ implementation details and private properties
   - E.g. use the `accelerate` or `brake` method of a `Car` object to control its speed instead of accessing `speed` property directly

2. **Abstraction**:

   - Exposing only essential features and hiding the complex implementation details
   - Users interact with objects through simple interfaces: allows you to work with objects at a higher level, without needing to know the details
   - Abstraction focuses on what's _exposed_: on creating _simple interfaces_ for _complex behavior_
   - Using the `drive` method of the Car object without worrying, what happens under the hood.

3. **Inheritance**:

   - Allows one class (child/subclass) inherit attributes and methods from another class (parent/superclass)
   - Encourages code reuse and logical hierarchy
   - The child class can override certain parts of the functionality of the base class.
   - A `RaceCar` class can inherit certain attributes and methods of the `Car` class, which itself inherits from `Vehicle`

4. **Polymorphism**:

   - Ability of objects of different classes to respond to the same method call in their own specific way
   - You can write code that works with objects of different classes in a consistent way
   - There are different types of polymorphism, such as method overloading (same method name with different parameters within a class) and method overriding (a subclass providing a specific implementation for a method inherited from its superclass)
   - A `draw()` method could work differently for `Circle`, `Square`, and `Triangle` classes

## OOP Languages

Most modern programming languages support Object-oriented programming to some degree. Some are principally Object-oriented languages, that treat everything as an object. Some are purely OOP languages that fully support or even enforce OOP, while there are also some that are mostly OOP, but also include some procedural programming features. These include

- Java
- Ruby
- C#
- Scala
- Smalltalk

Other multi-paradigm languages have also strong support for OOP principles:

- Python treats everything as an object, and has strong support for OOP, but also functional and procedural programming
- JavaScript added the Class syntax only as syntactic sugar, but supports OOP principles such as prototypal inheritance
- Other languages: C++, Swift, Kotlin, PHP and others also support OOP principles
- However, some languages only support encapsulation and abstraction, but do not support inheritance (e.g. Go or Rust).
