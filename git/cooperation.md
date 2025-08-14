# Cooperation with git

## Fork

A fork is a copy of a repository. It lets you experiment with changes without affecting the original project.
It is _not_ a git command or operation, but a feature offered by Git hosting services such as GitHub, GitLab or BitBucket. These copy a repository for you and link it with the original using some metadata.

### Pull Requests

If you want the owners of the original repository to incorporate your changes into their code, you create a _pull request_ (PR) from one of the branches of your copy of the repo to one of the branches of the original repo.

A typical workflow:

1. Fork repository
2. Create a new branch to work on a feature
3. Make, then commit and push changes to your fork's remote branch
4. Create pull request to original repo's `main` from the feature branch of your forked repo
5. The owner of the original repo reviews your changes, and decides if they want to merge your changes into their repository

### Conflicting Changes

If changes are made to _different_ lines of the code, merging goes smoothly. Similarly, if a line of code is changed in one commit, and later again, in a different commit, no problem arises, because Git knows, which change came first, and which came later.

However, if changes are made to the _same line_ of code _in parallel_, things get more complicated. In such cases one commit isn't the parent of another, and merge conflicts arise if we try to `merge` ore `rebase`. In these cases git can't automatically decide what to keep and what to discard. In such cases, Git will prompt the user to _manually_ decide which change to keep.

#### Resolving a conflict manually

Git will mark the conflicting lines in the files. Editors may highlight such lines, but these are in fact just lines of text.

The section between `<<<<<<< HEAD` and `=======` is the version on the current branch, while the section between `=======` and `>>>>>>> main` is the incoming version. You may decide, if you want to keep one or the other, or even to combine the two.

After this, you need to `add` and `commit` the changes. This tells git, that you have resolved the conflict, and it can continue with the `merge`.

#### Letting Git resolve

Git provides the `checkout` command, which can checkout individual changes during a merge conflict using the `--theirs` or `--ours` flags.

- `--ours` will overwrite the file with the changes from the branch you are currently working on and merging into
- `--theirs` will overwrite the file with the incoming changes from the branch you are merging into the current branch

After running into a merge conflict, you can run this command to tell Git, if it has to keep the incoming or the current changes on a file-by-file basis.

```bash
git checkout --theirs path/to/file
```
