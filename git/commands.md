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

You use `add` to stage changes, and then use `commit` to create the new snapshot of your project. You can check your commits with `log`.

```bash
git add new_file.txt          # Adds file to staging area
git add .                     # Adds all files that changed in the current directory
git commit -m "Message"       # Creates commit with message "Message"
git log                       # Shows the commit log
git log --decorate=full       # Commit log with full refs names
git log --decorate=short      # The default view
git log --decorate=no         # No branch names
git log --oneline             # A more compact view of the log
```

### Commit Lifecycle

Most of the time you will use the following commands to commit changes:

1. You will `add` changes to the staging area.
2. You will `commit -m` them with a message.
3. If you use a remote repository, you will `push` changes to the remote repo.

## Branches

With git, you can use branches to experiment on the project without changing the entire project directly. The solution is to keep the `master` or `main` branch intact, and work on the feature on a new branch. If you are satisfied with the result, you can `merge` the branch with the main branch.

Under the hood, a branch is just a named pointer to a commit. The commit, that the branch points to is called the _tip_ (or _head_) of the branch. This makes branches lightweight and cheap to create. You are not creating copies of the entire project with new branches, only pointers to specific commits.

```bash
git branch                    # Check branch you are working on
git branch -m master main     # Rename master branch to main
git branch new_branch         # Creates a new branch with name new_branch
git switch -c new_branch      # Creates new_branch and switches to it
git switch branch_name        # Switch to branch
git checkout branch_name      # Old command to do the same
```

When you create a new branch, it uses the current commit as its base. Git stores the branch informations under `.git/refs/heads`, where each branch has a file containing the hash of the commit it points to.
