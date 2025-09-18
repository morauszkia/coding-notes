---
prev:
  text: "Git Basics"
  link: "./basics"
next:
  text: "Cooperation"
  link: "./cooperation"
---

# Working with Git

If you work with your codebase, you might want to add certain features without affecting the main branch, until you are ready to introduce these features into your application. Or, you might have to abandon your current work temporarily to fix a bug, and are not ready to commit the changes you have made so far. You also might have introduced a bug, and want to undo the changes.

Git has powerful features to help you work on your project, furthermore, to do so in parallel with others. Git branches, revert and reset, stashing, etc. help you in your work immensely.

## Branches

With git, you can use branches to experiment on the project without changing the entire project directly. The solution is to keep the `master` or `main` branch intact, and work on the feature on a new branch. If you are satisfied with the result, you can `merge` the branch with the main branch.

Under the hood, a branch is just a named pointer to a commit. The commit, that the branch points to is called the _tip_ (or _head_) of the branch. This makes branches lightweight and cheap to create. You are not creating copies of the entire project with new branches, only pointers to specific commits.

```bash
git branch                            # Check branch you are working on
git branch -m master main             # Rename master branch to main
git branch new_branch                 # Creates a new branch with name new_branch
git switch -c new_branch              # Creates new_branch and switches to it
git switch -c new_branch COMMITHASH   # Creates new_branch from a specified commit and switches to it
git switch branch_name                # Switch to branch
git checkout branch_name              # Old command to do the same
```

When you create a new branch, it uses the current commit as its base. Git stores the branch informations under `.git/refs/heads`, where each branch has a file containing the hash of the commit it points to.

### Merging

After you are satisfied with the code on your branch, you will want to merge it into the main branch. With merging, git will combine both branches by creating a new commit, that has both histories as parents.

E.g. on main we have commits A - B - C, and on the other branch we have A - D - E.

```bash
git merge branch_name       # Merges branch_name into the current branch we are on.
```

The merge will:

1. Find the "merge base" commit, or "best common ancestor" of the two branches. In this case, A.
2. Replays the changes from `main`, starting from the best common ancestor, into a new commit.
3. Replays the changes from the other branch onto main, starting from the best common ancestor.
4. Records the result as a new commit, in our case, F.
5. F is special because it has two parents, C and E.

The simplest type of merge is a _fast-forward merge_: If a commit on a branch has all the commits, that main has, git automatically does a fast-forward merge. It just moves the pointer of the "base" branch to the head of the "feature" branch, and no merge commit is created.

::: info Not just branches
You can merge not only branches, but also commits, tags, `reflog` entries.
:::

### Deleting branches

After merging a feature branch into main, we no longer need it, and we can delete it.

```bash
git branch -d branch_name       # Deletes the branch
```

Git won't allow us to simply delete a branch, that was not fully merged. In such a case we receive a warning. We can force delete the branch using the `-D` flag.

```bash
git branch -D branch_name       # Will force delete the branch
```

### Rebase

Rebasing a branch is another way to integrate changes from one branch into another. Rebasing does not create a merge commit, but can be used to bring the changes made on main into the feature branch, so we do not work with a stale branch.

```bash
git rebase main               # Rebases the current branch, adding changes on main
```

Rebasing does the following:

1. Checkout the latest commit from `main` into a temporary location
2. Replay each commit from the `feature` branch one at a time onto this temporary location
3. Update the `feature` branch to point to the last replayed commit in the temporary location, making this the new permanent `feature` branch.
4. The rebase does not affect the `main` branch; The `feature` branch will include all changes from `main`.

#### Rebase vs. Merge

- `merge` preserves the true history of the project, but it can create lots of merge conflicts, which make the history harder to read and understand.
- `rebase` creates a linear history, which is easier to work with

#### Squashing

The `rebase` command can be used to alter commit history by _squashing_ commits: make a single commit out of multiple separate commits. This can be done using `rebase` because it can be used to replay changes onto a previous state.

For this, you should start an interactive rebase specifying the number of commits you want to squash.

```bash
git rebase -i HEAD~5    # Will start an interactive rebase for the last 5 commits.
```

The command will open the default editor with the list of commits. You have to change the word `pick` to `squash` for all commits but the first one. After this you have to save and close the editor. You can edit the commit message in the next editor.

::: warning Deleted history
Squashing commits will delete the history of the individual commits. You cannot return to these checkpoints anymore. It will keep the changes in the code, but will squash them into a single commit.
:::

Squashing is most often used to squash all the commits of a feature branch before creating a [PR](#pull-requests) to comply with a single-commit-pull-request policy.

## Undo Changes

### Reset

The `reset` command can be used to undo the last commit(s) or any changes in the index (staged but not committed) and worktree (unstaged and uncommitted).
The `--soft` flag is useful, if you just want to go back to previous commit, but keep the changes. Committed stages will be uncommitted and staged, the other changes will stay as they were before. A `--hard` reset will reset and discard the changes.

A hard reset can be dangerous, because all the undone changes are deleted from commit history, and cannot be restored.

```bash
git reset --soft HASH         # Will undo last commits and return to the commit with specified HASH, but keep the changes in the files
git reset --hard HASH         # Will undo changes and return to the state of the commit with specified HASH
```

### Revert

Revert is a softer approach to undoing changes. While `reset` removes the commit, `revert` creates a new commit that does the exact opposite of the commit being reverted. It keeps a full history of the change and its undoing.

```bash
git revert COMMITHASH
```

If you are working on a shared branch `git revert` is the safer option, because it does not rewrite history. Rewriting history might cause that coworkers have to resolve conflicts.

## Remote

With git, there is no central repo. Another repo is called a `remote`. The repo, that we treat by convenience as a central repo and the "authoritative single source of truth" (e.g. our GitHub repo) is called an `origin`. This should contain the most up-to-date version of accepted code.

```bash
git remote add <name> <uri>                                       # Adds remote repo with specified name and path (can be relative path or URL)
git remote add origin ../dirname                                  # Adds the git repo under dirname as the origin
git remote add origin https://github.com/OWNER/REPOSITORY.git     # Adds GitHub repository as origin remote repo for https connection
git remote add origin git@github.com:OWNER/REPOSITORY.git         # Adds GitHub repo for SSH connection
git remote get-url origin                                         # Get the URL of the origin remote repo
git ls-remote
```

We can check the log of the remote repo:

```bash
git log remote/branch
git log origin/main
```

### Fetch

To bring the remote repo's info into the local repository, we use `fetch`. This fetches the metadata, but not the files. We need to `merge` the remote branch to get the files.

```bash
git fetch                 # Fetches metadata from remote repo
git merge origin/main     # Merges remote repos branch with local branch
```

### Push

Another way is to `push` local changes to the remote repository.

```bash
git push origin main                              # Pushes the main branch to the main branch of the origin remote
git push origin <localbranch>:<remotebranch>      # Pushes a specified local branch to a remote branch
git push origin :<remotebranch>                   # Pushes empty branch to remote and deletes remote branch
```

### Pull

To get the actual file changes from the remote repo, you can use `pull` instead of `fetch`.

```bash
git pull                      # Pulls your current branch from the remote repo
git pull remote/branch        # Pulls a remote branch
```

### Pull Requests

On GitHub developers merge branches through [pull requests](./cooperation#pull-requests), to avoid having broken code due to everybody pushing directly to main. A Pull Request is a way to propose changes and letting others review them before merging into the main branch.

When working on a team a good workflow is to make changes on a separate branch, push that branch to the remote, and then open a pull request. After the PR gets approved by another team mate, it can be merged into main.

## HEAD and reflog

To put it simply, `HEAD` is a reference to where you are currently, to the branch you are working on.

`git reflog` prints the log of where `HEAD` was in previous steps. It logs switches between branches, commits, clones, etc. You can even recover changes that were lost due to the deletion of a branch.

You can use `git cat-file -p` with the hash of the commit from the deleted branch, and follow the hashes of the tree, blob and file, and recover the contents of a deleted file.

You can also `merge` a previous reference to the `HEAD`, e.g. `HEAD@{1}`

## Stashing

If you have uncommitted changes that you want to keep, but are not in a stage so that they can be committed, you can _stash_ them: record the current state of your working directory and the staging area, and revert the working directory to match the `HEAD` commit.

You can add a message to your stashes with `-m`. You will rarely need to do that, as typically stash is only used to pause the work for a short time, and return to it as soon as possible, so typically you have only a single stash. But, if you need to, you can.

You can then

- list your stashes
- return to your most recent stash, apply it to the working directory and remove it from the list of stashes (effectively, to undo the most recent stash)
- apply last stash without removing it from the stack
- remove stash without applying
- apply/remove a specific stash from the list

```bash
git stash
git stash -m "stash with a message"
git stash list  # Will list your stashes
git stash pop   # Will apply most recent stash to working directory and remove from stach
git stash apply # Will apply without removing from stack
git stash drop  # Will remove without applying
git stash apply stash@{2}
git stash drop stash@{1}
```

The `git stash` command stores your changes in a [stack data structure](/dsa/stacks). A stash entry will contain all the changes (staged or unstaged) that were not yet committed, and your working directory and index will be reverted to the state of the last commit.

::: info Conflicts with stash
You can run into conflicts with stashing as well. In such cases you will have to resolve the conflict in the usual way, and then continue with the work.
:::

## Worktrees

You can have more than one worktree. Worktrees accomplish similar goals as branches, clones and stashes: they allow you to work on different changes without losing work.

They are especially useful if

- you want to switch back and forth between versions without having to run many git commands (as with stash or branch)
  - working on multiple features at the same time
  - checking out PRs
  - want to run comparisons between branches
  - collaborate on projects where you frequently check others' work
  - experiment without impacting the main branch
  - want to avoid anticipated conflicts between branches
- you want to keep a light footprint (vs clone) on your machine that's still connected to the main repo

The _main worktree_ contains the `.git` directory with the entire state of the repo, and is heavy. Main trees are created using `git init` or `git clone`-ing a repo.

### Linked worktree

A _linked worktree_ contains a `.git` file with a path to the main working tree, and is as light as a branch, because it contains no data, but can be complicated to work with if you use env files and secrets.

```bash
git worktree list       # List your working trees
git worktree add PATH   # Create working tree with PATH name, optionally you can specify BRANCH name or use the PATH name for that
git worktree add PATH BRANCHNAME
```

Linked worktrees behave like a normal git repo. You can create branches, switch between them, delete them, etc. But, you _cannot_ work on a branch that is currently checked out by any other working tree.

Changes in a linked worktree are automatically reflected in the main worktree. The linked worktree is not a separate repository, just a different view of the same repository.

If you no longer need a worktree, you can `remove` it or delete the directory manually and `prune` the worktrees.

```bash
git worktree remove NAME
```

## Tags

A tag is a name linked to a commit. Unlike a branch, a tag doesn't move between commits. Tags can be created and deleted, but not be modified. Tags are often used to denote releases. In such cases, tags follow the [semver](https://semver.org/) convention.

Tags are `commitish`, so you can use tags basically anywhere, you would use a commit hash.

Commits can have multiple tags.

Tags can be pushed to a remote repository using the `--tags` flag

```bash
git tag # Lists all tags
git tag -a "name" -m "message" # Creates a tag with name and message
git tag -a v1.0.0 -m "New major version v1.0.0"
git tag -a v2.5.12 -m "Minor bug fixes"
git push origin --tags
```
