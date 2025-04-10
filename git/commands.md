---
prev:
  text: "Introduction to Version Control and Git"
  link: "git"
---

# Git Basics

Git can be installed on Linux, Windows or MacOs. On Linux, the defaul package manager can be used. On MacOs Homebrew is the preferred way to install git. On Windows, you can download the installer from the Git website.

E.g. on Ubuntu you can type:

```bash
sudo apt update
sudo apt install git
```

Git is a command line tool. You can check if the installation was succesful by typing `git --version` in the terminal.

## Porcelain and Plumbing Commands

In Git, commands are divided into high-level ("porcelain") commands and low-level ("plumbing") commands. The porcelain commands are the ones that you will use most often as a developer to interact with your code. Some porcelain commands are:

- `git status`
- `git add`
- `git commit`
- `git push`
- `git pull`
- `git log`
