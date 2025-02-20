---
title: "Git Feature Branch Workflow"
date: "2025-02-20"
excerpt: "This is a guideline for collaborating using Git and Github"
---

# Feature Branch Workflow Guide

## Introduction
This guide outlines the **Feature Branch Workflow** for collaborating on our project using Git and GitHub. The goal is to ensure a smooth development process, avoid conflicts, and maintain a stable `main` branch.

## Table of Contents
1. [Branching Strategy](#branching-strategy)
2. [Setting Up the Repository](#setting-up-the-repository)
3. [Creating and Working on a Feature Branch](#creating-and-working-on-a-feature-branch)
4. [Keeping Your Branch Updated](#keeping-your-branch-updated)
5. [Creating a Pull Request (PR)](#creating-a-pull-request-pr)
6. [Handling Merge Conflicts](#handling-merge-conflicts)
7. [Merging the PR and Deleting the Branch](#merging-the-pr-and-deleting-the-branch)
8. [Common Scenarios & Troubleshooting](#common-scenarios--troubleshooting)
9. [Best Practices](#best-practices)

---

## Branching Strategy
We follow the **Feature Branch Workflow**, where:
- `main` contains stable, production-ready code.
- Each developer works on a **feature branch** (e.g., `feature/user-authentication`).
- Changes are merged into `main` via **Pull Requests (PRs)**.

## Setting Up the Repository
### 1. Clone the repository
```sh
git clone <repository-url>
cd <project-folder>
```

### 2. Set the remote (if not already set)
```sh
git remote add origin <repository-url>
```

### 3. Ensure you are on the `main` branch and up to date
```sh
git checkout main
git pull origin main
```

## Creating and Working on a Feature Branch
### 1. Create a new branch
```sh
git checkout -b feature/your-feature-name
```

### 2. Work on your feature and stage changes
```sh
git add .
```

### 3. Commit changes with a meaningful message
```sh
git commit -m "Added authentication logic"
```

### 4. Push your feature branch to GitHub
```sh
git push origin feature/your-feature-name
```

## Keeping Your Branch Updated
Before pushing your branch, ensure it's up-to-date with `main`:

### 1. Switch to `main` and pull the latest changes
```sh
git checkout main
git pull origin main
```

### 2. Switch back to your feature branch and merge `main`
```sh
git checkout feature/your-feature-name
git merge main
```
_Resolve any merge conflicts if needed._

### 3. Push the updated branch
```sh
git push origin feature/your-feature-name
```

## Creating a Pull Request (PR)
1. Go to GitHub → Your Repository → Pull Requests.
2. Click **New Pull Request**.
3. Select `feature/your-feature-name` as the **source branch**.
4. Select `main` as the **target branch**.
5. Add a clear title and description.
6. Request reviews from your team.
7. Wait for approval before merging.

## Handling Merge Conflicts
If you encounter conflicts when merging `main` into your feature branch:

1. Open the conflicting file, and you'll see:
```
<<<<<< HEAD
Your changes here
=======
Other developer's changes here
>>>>>> main
```
2. Manually edit the file to keep the correct changes.
3. Stage the resolved file:
```sh
git add <conflicted-file>
```
4. Commit the merge resolution:
```sh
git commit -m "Resolved merge conflict in <file>"
```
5. Push your branch:
```sh
git push origin feature/your-feature-name
```

## Merging the PR and Deleting the Branch
Once the PR is approved:

1. Merge the PR on GitHub.
2. Delete the branch on GitHub.
3. Delete the branch locally:
```sh
git branch -d feature/your-feature-name
```
4. Update local branches:
```sh
git checkout main
git pull origin main
```

## Common Scenarios & Troubleshooting
### 1. I forgot to create a feature branch and committed to `main`
- Create a new branch from the latest commit:
```sh
git checkout -b feature/fix-branch
```
- Reset `main` to the last known good state:
```sh
git checkout main
git reset --hard origin/main
```

### 2. My branch is behind `main`
- Merge the latest `main` into your branch:
```sh
git checkout feature/your-feature-name
git merge main
```

### 3. My branch is ahead of `main` (I pushed changes directly)
- **DO NOT push directly to `main`!** Instead, create a PR and merge it properly.

### 4. I want to undo my last commit
- If it’s not pushed:
```sh
git reset --soft HEAD~1
```
- If it’s already pushed:
```sh
git revert HEAD
git push origin feature/your-feature-name
```

### 5. I accidentally deleted a branch
- If it’s on GitHub:
```sh
git checkout -b feature/your-feature-name origin/feature/your-feature-name
```
- If it was local:
```sh
git reflog
git checkout <commit-hash>
git checkout -b feature/your-feature-name
```

## Best Practices

✅ **Use Descriptive Branch Names** → (`feature/login-page`)  
✅ **Write Clear Commit Messages** → (`Fixed bug in authentication`)  
✅ **Always Pull Before Pushing** → (`git pull origin main`)  
✅ **Code Reviews Before Merging** → PRs must be reviewed before merging.  
✅ **Avoid Pushing Directly to Main** → Always use feature branches.  
✅ **Keep Your Branch Updated** → Regularly merge `main` into your branch.  
✅ **Delete Merged Branches** → Keep the repo clean.

---

By following these guidelines, we ensure a smooth and conflict-free development process! 🚀

