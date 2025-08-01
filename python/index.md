---
prev:
  text: Languages
  link: /languages
next:
  text: Basics
  link: ./basics
---

# Python

Python is a high-level, general-purpose programming language known for its readability, simplicity, and versatility.
It was created by Guido van Rossum and first released in 1991. Python was designed to emphasize code clarity and reduce the complexity of programming tasks. Python has consistently ranked among the most popular programming languages worldwide.
The current version is Python 3, which introduced significant improvements compared to Python 2. It was released at the end of 2008. Later minor versions introduced further features to the language. Python 2 has reached End-of-Life on January 1, 2020.

::: info Why "Python"?
The name was inspired by the British comedy series _Monty Python's Flying Circus_, reflecting van Rossum's emphasis on having fun while programming.
:::

## Key features

- **Interpreted language**: code is executed line by line, which facilitates rapid development and debugging
- **Dynamically typed**: variable types are determined at runtime, allowing for flexible and concise code
- **Strongly typed**: values need to be explicitly converted to other types, and are not coerced automatically such as in JavaScript
- **Multi-Paradigm**: Python supports object-oriented, procedural, and functional programming styles, making it adaptable to various types of projects and developer preferences
- **Readability and Simplicity**: Python’s syntax is designed to be clean and easy to read, often resembling the English language. Indentation is used to define code blocks, which enforces readability and consistent formatting
- **Extensive Standard Library**: Python is often described as a "batteries included" language because of its comprehensive standard library, which provides tools suited for many tasks out of the box.
- **Cross-Platform**: Python runs on all major operating systems, including Windows, macOS, and Linux, and is freely available as open-source software.

## Common uses

- Web Development: Used to build server-side web applications
- Software Development: Powers everything from simple scripts to large-scale applications
- Data Science and Machine Learning: Widely used for data analysis, machine learning, and artificial intelligence due to powerful libraries and frameworks
- Automation and Scripting: Automates repetitive tasks and system scripting
- Mathematics and Scientific Computing: Handles complex mathematical computations and big data processing

## Installation and usage

Python3 can be installed to the computer, and after that can be used from the terminal with the command `python3 filename.py` to run specific Python scripts. You can enter interactive mode by typing `python` (if Python 2 is installed on the computer, this may run the Python 2 interpreter) or `python3` (this will always run Python 3), which starts the Python shell, where you can type and execute Python commands.

::: info Python on Linux distros
If you are using a Linux distro, chances are, you already have Python 2 and 3 pre-installed on your computer.
:::

```bash
python3 --version
python3 main.py
```

### pip

Python has its own package manager called `pip`. You can check is pip is installed by checking its version, and if it is not installed, to install it using your systems package manager.

```bash
pip3 --version
```

::: info
On Windows, you might need to add Python and pip to the PATH environment variable manually, to be able to use it from the command prompt.
:::

### Setting up an IDE

You can also use IDEs to run Python files, and to code in Python. Popular IDEs for Python Development are [PyCharm](https://www.jetbrains.com/pycharm), [Visual Studio Code](https://code.visualstudio.com/) and [Jupyter Notebook](https://jupyter.org/) (especially for data science).

PyCharm is an IDE designed specifically for programming in Python. Its Community Edition is free to use. It has out-of-the-box support for several tools related to Python development: Python itself, of course, databases, git, Jupyter, Python frameworks (Django, Flask), etc.

Visual Studio Code is another popular open source IDE used for development in a great number of languages, because it offers a vast library of extensions. Coding in Python may require more initial setup, but the [VS Code website helps you with that](https://code.visualstudio.com/docs/python/python-tutorial).

Other IDEs, such as Atom, Sublime Text or Neovim can also be used for Python programming.

### Python Distributions

The official distribution of Python is CPython, but Python exists in other distributions as well:

- Anaconda: is a popular distribution for data science and machine learning, and bundles Python with popular libraries like NumPy, Pandas, Matplotlib, and Jupyter.
- Miniconda: is a lightweight alternative to Anaconda
- PyPy: offers a Just-in-Time compiler, which improves the speed of Python applications.
