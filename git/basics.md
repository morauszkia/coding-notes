---
prev:
  text: "Introduction to Version Control and Git"
  link: "git"
next:
  text: "Working with Git"
  link: "./parallel-work"
---

# Git Basics

Git can be installed on Linux, Windows or MacOs. On Linux, the default package manager can be used. On MacOs Homebrew is the preferred way to install git. On Windows, you can download the installer from the Git website.

E.g. on Ubuntu you can type:

```bash
sudo apt update
sudo apt install git
```

Git is a command line tool. You can check if the installation was successful by typing `git --version` in the terminal.

## Git Configuration

You can add information to the worktree (part of a project), local (repository level), global (all projects of a user) and system level (all users) configuration in git. However, global config is used 90% of the time, and local another 9% of time. A setting in a more specific location will override the same configuration in a more general location.

System config is stored in `/etc/gitconfig`, global in `~/.gitconfig`, local in `.git/config` and worktree in `.git/config.worktree`

Some information is used by git to initialize default branch of repository or to indicate, who made a commit. But you can store any information in your config. To set local config, omit the `--global` flag. You can `--add`, `--get` and `--unset` values to `section.key`-s.

Git allows to have multiple values for the same key. To unset all values belonging to a key, use `--unset-all`.

You can remove entire sections with `--remove-section`.

```bash
git config --add --global user.name "JohnDoe"
git config --add --global user.email "example@email.com"
git config --add --global init.defaultBranch "main"
git config --add project.deadline "Yesterday"
git config --list --local
git config --list --global
cat .git/config     # Local config
git config --get user.name
git config --unset user.name
git config --unset-all example.key
git config --remove-section example
```

## Porcelain and Plumbing Commands

In Git, commands are divided into high-level ("porcelain") commands and low-level ("plumbing") commands. The porcelain commands are the ones that you will use most often as a developer to interact with your code. Some porcelain commands are:

- `git status`
- `git add`
- `git commit`
- `git push`
- `git pull`
- `git log`

You use `add` to stage changes, and then use `commit` to create the new snapshot of your project. You can check your commits with `log`. Log flags can be combined.

```bash
git add new_file.txt              # Adds file to staging area
git add .                         # Adds all files that changed in the current directory
git commit -m "Message"           # Creates commit with message "Message"
git log                           # Shows the commit log
git log --decorate=full           # Commit log with full refs names
git log --decorate=short          # The default view
git log --decorate=no             # No branch names
git log --oneline                 # A more compact view of the log
git log --graph                   # Will show a graphlike (ASCII art) output connecting the branches
git log --all                     # Will log all branches, not only current
git log --parents                 # Will add hashes of parent commits
git log --oneline --graph --all   # Will log graph for all branches in a compact form
git log --no-pager                # Log commits without the interactive pager
git log -n 10                     # Limit the number of commits shown
```

### Commit Lifecycle

Most of the time you will use the following commands to commit changes:

1. You will `add` changes to the staging area.
2. You will `commit -m` them with a message.
3. If you use a remote repository, you will `push` changes to the remote repo.

You can check the status of your repo with `git status`.

Before working on a shared repo, you might want to `git fetch` or `git pull` changes from a remote repo.

::: tip Commit messages

You will want to make your commit messages informative. It is a good practice to start your message with the type of the change you are committing. Typical choices are `feat` or `feature` (for adding some new functionality), `docs` (update to the documentation), `fix` or `bug` (if you fixed some bug), `chore` (for other changes that don't modify source code), `test`, `refactor`, `revert`, `style` etc.

You can also add a description to your commit message to provide even more information.
:::

### Diff

You can view the differences between two states using `diff`. Used without further parameters, it shows the difference between the last commit and the working tree.

```bash
git diff
git diff HEAD~1 # Difference between the previous commit and the current state, incl. last commit and uncommitted changes
git diff hash1 hash2 # Difference between two commits.
```

### Some Plumbing commands

Git stores its files in a hidden `.git` directory. These include the commits, branches, etc.

Git allows us to see a content of a commit with `cat-file`. You can use this command to go all the way down from a `tree` (a directory) to a `blob` (a file), and check its contents.

```bash
git cat-file -p HASH
```

Git stores entire snapshots of files on a per-commit level, however, it also deduplicates, so if a file hasn't changed, it will reference the same file (same hash) in all the commits.

## Gitignore

There may be files or directories we do not want git to keep track of in our folder. This may be true for sensitive information, environment files containing private keys, folders containing modules or temporary files, etc. We can use the `.gitignore` file to tell git to ignore certain files or directories.

You should ignore:

- things that can be generated (e.g. compiled code, minified files)
- dependencies (e.g. node_modules, venv, packages)
- personal things or things specific to how we work (e.g. settings)
- sensitive or dangerous things (e.g. `.env` files, passwords, private keys)

This file is typically in the root directory of the repo, but this is not necessary. It is fairly common to have multiple such files. A `.gitignore` file inside a directory only applies to that directory and its subdirectories.

In the `.gitignore` file, wildcards and other patterns can be used to simplify our work. Order is important, and patterns can override each other (e.g. negations should follow the general rule)

```text
*.txt             # * matches anything and any number of characters except "/"
/main.py          # This will ignore the file only in the root directory where the gitignore file is
!important.txt    # Negates the pattern - the txt pattern above will not apply for important.txt
# Comment         # Comment
```
