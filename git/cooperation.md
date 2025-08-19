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

If changes are made to _different_ lines of the code, [merging](./commands#merging) and [rebasing](./commands#rebase) goes smoothly. Similarly, if a line of code is changed in one commit, and later again, in a different commit, no problem arises, because Git knows, which change came first, and which came later.

However, if changes are made to the _same line_ of code _in parallel_, things get more complicated. In such cases one commit isn't the parent of another, and merge or rebase conflicts arise if we try to `merge` ore `rebase`. In these cases git can't automatically decide what to keep and what to discard. In such cases, Git will prompt the user to decide which changes to keep.

Git will mark the conflicting lines in the files to help you. Editors may help you further by highlight such lines, but these are in fact just lines of text.

The section between `<<<<<<< HEAD` and `=======` is either the version on the current branch, while the section between `=======` and `>>>>>>> main` is the incoming version. You may decide, if you want to keep one or the other, or even to combine the two.

#### Merge vs. rebase conflicts

In the case of a **merge** conflict, _current change_ is the code on the branch onto which you are merging, and _incoming change_ is the code from the branch you are trying to merge.

In the case of a **rebase** conflict, _current change_ is the code on the branch you are trying to rebase onto (typically _main_), and _incoming change_ is the code on the branch that you want to rebase (typically the _feture branch_).

#### Resolving a conflict manually

In the case of a **merge conflict** you are on the branch onto which you wanted to merge changes. After resolving the conflicts, you need to `add` and `commit` the changes. This tells git, that you have resolved the conflict, and it can continue with the `merge`. At the end you get a merge commit.

In the case of **rebase conflicts**, however, the `HEAD` will point to the branch that you wanted your current branch to `rebase` onto. This is because `rebase` checks out the _source_ branch, so it can replay the changes from the _feature_ branch onto it. If you run `git branch` you will see, that you are on `* (no branch, rebasing branch-name)`, you're in a special state called _detached HEAD_, until you resolve the conflict. After conflict resolution you have to `add` the changes to the staging area, but after this you have to `git rebase --continue`.

::: info Discarded changes

You will get no merge commits, and if you keep the current changes, the commits with the incoming code will be discarded and will be missing from the commit history. If you combine the two or keep changes from the incoming commit, both will be kept in the history.

:::

#### Letting Git resolve

Git provides the `checkout` command, which can checkout individual changes during a merge conflict using the `--theirs` or `--ours` flags.

- `--ours` will overwrite the file with the changes from the branch you are currently working on and merging into in the case of `merge` and with the code on the branch you want to rebase onto in the case of `rebase`
- `--theirs` will overwrite the file with the incoming changes from the branch you are merging into the current branch or which you want to rebase onto another branch.

After running into a merge conflict, you can run this command to tell Git, if it has to keep the incoming or the current changes on a file-by-file basis.

```bash
git checkout --theirs path/to/file
```

#### Workflow of a typical merge conflict

1. You have worked on a branch
2. You want to merge two branches - let's say `branch-b` into `branch-a`
3. If you get a conflict
   - you can manually resolve the conflicting lines: current will be `branch-a` and incoming will be code on `branch-b`
   - you can checkout `--ours` (`branch-a`) or `--theirs` on a file-by-bile basis
4. After resolving you `add` and `commit` with a commit message and get a merge commit and history will contain commits from both branches

#### Workflow of a typical rebase conflict

1. You worked on `feature-branch`
2. Changes happened on branch `main`, which you want to bring to `feature-branch`
3. You rebase `feature-branch` onto `main`: git checks out code from `main` and starts to replay changes from `feature-branch`
4. If git runs into a conflict, you can
   - manually resolve the conflict: current will be `main` and incoming will be `feature-branch`
   - or checkout `--ours` (code from `main`) or `--theirs` (code from `feature-branch`)
5. After resolution you `add` and `git rebase --continue` with the rebase. History will contain all commits from main, but the new commits from `feature-branch` only if they actually contain some changes that you kept compared to the code on `main`

#### RERERE

With a long-running feature branch, it happens, that with `rebase` you have to resolve the same conflict again and again. For these situations, Git has the `rerere` feature (_REuse REcorded REsolution_), which allows Git to remember how you've resolved a conflict, so the next time Git can resolve it automatically. This applies both to `rebase` and to `merge`.

::: info Disabling/enabling RERERE
Git will inform you of saving resolutions. This shows, that the rerere function is enabled. You will get a message like "Recorded preimage for 'path/to/file'" before resolving the conflict and "Recorded resolution for 'path/to/file' after `git rebase --continue`. At the next occasion, you might receive "Resolved 'customers/favs.md' using previous resolution." if Git resolved the conflict using a previously saved resolution.
"
You can disable and enable RERERE using the config option `rerere.enabled`

```bash
# true, if you want to enable it
git config --local rerere.enabled false
```

:::

#### Accidental commits after rebase conflicts

If you accidentally commit the resolution of a rebase conflict instead of simply `--continue`, you can undo the commit using `git reset --soft HEAD~1`. The `--soft` will keep the changes, and you can `git rebase --continue`.
