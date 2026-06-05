# Git - Complete Interview Preparation Guide

A comprehensive guide covering essential Git concepts for interview preparation.

---

## Table of Contents

1. [What is Git?](#what-is-git)
2. [Git vs GitHub](#git-vs-github)
3. [Basic Git Commands](#basic-git-commands)
4. [Branching and Merging](#branching-and-merging)
5. [Git Workflow](#git-workflow)
6. [Advanced Git Commands](#advanced-git-commands)
7. [Git Best Practices](#git-best-practices)
8. [Common Interview Questions](#common-interview-questions)

---

## What is Git?

**Git** is a distributed version control system (VCS) that tracks changes in source code during software development.

### Key Features

- **Distributed**: Every developer has a full copy of the repository
- **Fast**: Most operations are local
- **Branching**: Easy and lightweight branching
- **Staging Area**: Review changes before committing
- **Open Source**: Free and widely adopted

### Why Use Git?

✅ **Version Control**: Track all changes to your code
✅ **Collaboration**: Multiple developers can work together
✅ **Backup**: Distributed copies serve as backups
✅ **Branching**: Experiment without affecting main code
✅ **History**: Complete project history

---

## Git vs GitHub

### Git
- Version control system
- Runs locally on your computer
- Command-line tool
- Manages source code history

### GitHub
- Web-based hosting service
- Cloud platform for Git repositories
- Provides collaboration features
- Adds social coding features

### Other Git Hosting Services
- **GitLab**: Self-hosted or cloud
- **Bitbucket**: Atlassian's Git solution
- **Azure DevOps**: Microsoft's platform

---

## Basic Git Commands

### Configuration

```bash
# Set user name
git config --global user.name "Your Name"

# Set user email
git config --global user.email "your.email@example.com"

# View configuration
git config --list

# Set default editor
git config --global core.editor "code"
```

### Repository Initialization

```bash
# Initialize new repository
git init

# Clone existing repository
git clone https://github.com/user/repo.git

# Clone to specific folder
git clone https://github.com/user/repo.git my-folder
```

### Basic Workflow

```bash
# Check status
git status

# Add files to staging
git add filename.txt          # Add specific file
git add .                     # Add all files
git add *.js                  # Add all JS files

# Commit changes
git commit -m "Commit message"

# Add and commit in one step
git commit -am "Commit message"

# Push to remote
git push origin main

# Pull from remote
git pull origin main
```

### Viewing History

```bash
# View commit history
git log

# View compact history
git log --oneline

# View history with graph
git log --graph --oneline --all

# View specific file history
git log filename.txt

# View changes in commits
git log -p

# View last n commits
git log -n 5
```

### Viewing Changes

```bash
# View unstaged changes
git diff

# View staged changes
git diff --staged

# View changes between branches
git diff branch1 branch2

# View changes in specific file
git diff filename.txt
```

---

## Branching and Merging

### Branch Operations

```bash
# List branches
git branch                    # Local branches
git branch -a                 # All branches
git branch -r                 # Remote branches

# Create new branch
git branch feature-branch

# Switch to branch
git checkout feature-branch

# Create and switch in one command
git checkout -b feature-branch

# Modern way (Git 2.23+)
git switch feature-branch
git switch -c feature-branch  # Create and switch

# Delete branch
git branch -d feature-branch  # Safe delete
git branch -D feature-branch  # Force delete

# Rename branch
git branch -m old-name new-name
```

### Merging

```bash
# Merge branch into current branch
git merge feature-branch

# Merge with no fast-forward
git merge --no-ff feature-branch

# Abort merge
git merge --abort

# View merged branches
git branch --merged

# View unmerged branches
git branch --no-merged
```

### Merge Conflicts

```bash
# When conflict occurs:
# 1. Open conflicted files
# 2. Resolve conflicts manually
# 3. Add resolved files
git add conflicted-file.txt

# 4. Complete merge
git commit -m "Resolved merge conflict"

# Or abort merge
git merge --abort
```

**Conflict Markers:**
```
<<<<<<< HEAD
Current branch content
=======
Incoming branch content
>>>>>>> feature-branch
```

---

## Git Workflow

### Feature Branch Workflow

```
main
  │
  ├─── feature-1
  │      │
  │      └─── (work, commit)
  │           │
  ├───────────┘ (merge)
  │
  ├─── feature-2
  │      │
  │      └─── (work, commit)
  │           │
  └───────────┘ (merge)
```

### Gitflow Workflow

```
main (production)
  │
  ├─── develop
  │      │
  │      ├─── feature/login
  │      │      │
  │      │      └─── (merge to develop)
  │      │
  │      ├─── feature/signup
  │      │      │
  │      │      └─── (merge to develop)
  │      │
  │      └─── release/1.0
  │             │
  │             └─── (merge to main and develop)
  │
  └─── hotfix/critical-bug
         │
         └─── (merge to main and develop)
```

---

## Advanced Git Commands

### Stashing

```bash
# Save changes temporarily
git stash

# Save with message
git stash save "Work in progress"

# List stashes
git stash list

# Apply latest stash
git stash apply

# Apply specific stash
git stash apply stash@{2}

# Apply and remove stash
git stash pop

# Remove stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

### Rebasing

```bash
# Rebase current branch onto main
git rebase main

# Interactive rebase (last 3 commits)
git rebase -i HEAD~3

# Continue after resolving conflicts
git rebase --continue

# Skip current commit
git rebase --skip

# Abort rebase
git rebase --abort
```

### Cherry-picking

```bash
# Apply specific commit to current branch
git cherry-pick commit-hash

# Cherry-pick multiple commits
git cherry-pick commit1 commit2

# Cherry-pick without committing
git cherry-pick -n commit-hash
```

### Resetting

```bash
# Soft reset (keep changes staged)
git reset --soft HEAD~1

# Mixed reset (keep changes unstaged) - default
git reset HEAD~1

# Hard reset (discard all changes)
git reset --hard HEAD~1

# Reset to specific commit
git reset --hard commit-hash

# Reset specific file
git reset HEAD filename.txt
```

### Reverting

```bash
# Create new commit that undoes changes
git revert commit-hash

# Revert without committing
git revert -n commit-hash

# Revert merge commit
git revert -m 1 merge-commit-hash
```

### Tagging

```bash
# Create lightweight tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Version 1.0.0"

# List tags
git tag

# Push tag to remote
git push origin v1.0.0

# Push all tags
git push origin --tags

# Delete tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0
```

### Remote Operations

```bash
# View remotes
git remote -v

# Add remote
git remote add origin https://github.com/user/repo.git

# Remove remote
git remote remove origin

# Rename remote
git remote rename origin upstream

# Fetch from remote
git fetch origin

# Fetch all remotes
git fetch --all

# Prune deleted remote branches
git fetch --prune
```

---

## Git Best Practices

### Commit Messages

**Good Commit Message Format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```bash
# Good
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login redirect issue"
git commit -m "docs: update API documentation"

# Bad
git commit -m "fixed stuff"
git commit -m "updates"
git commit -m "asdfasdf"
```

### Branching Strategy

1. ✅ **Keep main/master stable**
2. ✅ **Use feature branches** for new work
3. ✅ **Delete merged branches**
4. ✅ **Use descriptive branch names**
5. ✅ **Regularly sync with main**

**Branch Naming:**
```bash
feature/user-authentication
bugfix/login-error
hotfix/critical-security-patch
release/v1.2.0
```

### General Best Practices

1. ✅ **Commit often** with meaningful messages
2. ✅ **Pull before push** to avoid conflicts
3. ✅ **Review changes** before committing
4. ✅ **Use .gitignore** for unnecessary files
5. ✅ **Don't commit sensitive data**
6. ✅ **Keep commits atomic** (one logical change)
7. ✅ **Write clear commit messages**
8. ✅ **Use branches** for features
9. ✅ **Regularly backup** to remote
10. ✅ **Learn to resolve conflicts**

### .gitignore Example

```gitignore
# Dependencies
node_modules/
vendor/

# Environment variables
.env
.env.local

# Build outputs
dist/
build/
*.log

# IDE files
.vscode/
.idea/
*.swp

# OS files
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.bak
```

---

## Common Interview Questions

### 1. What is Git and why use it?

**Answer:** Git is a distributed version control system that tracks changes in source code. Benefits include version history, collaboration, branching, and distributed backups.

---

### 2. What is the difference between Git and GitHub?

**Answer:** 
- **Git**: Version control system (software)
- **GitHub**: Web-based hosting service for Git repositories (platform)

---

### 3. Explain Git workflow

**Answer:**
1. Modify files in working directory
2. Stage changes (`git add`)
3. Commit changes (`git commit`)
4. Push to remote (`git push`)

---

### 4. What is the difference between `git pull` and `git fetch`?

**Answer:**
- **git fetch**: Downloads changes but doesn't merge
- **git pull**: Downloads and merges changes (`fetch` + `merge`)

---

### 5. What is a merge conflict and how to resolve it?

**Answer:** Occurs when Git can't automatically merge changes. Resolve by:
1. Open conflicted files
2. Manually resolve conflicts
3. Stage resolved files (`git add`)
4. Complete merge (`git commit`)

---

### 6. What is the difference between `git reset` and `git revert`?

**Answer:**
- **git reset**: Moves HEAD to previous commit (rewrites history)
- **git revert**: Creates new commit that undoes changes (preserves history)

---

### 7. What is git stash?

**Answer:** Temporarily saves uncommitted changes so you can work on something else, then reapply them later.

---

### 8. What is the difference between `git merge` and `git rebase`?

**Answer:**
- **git merge**: Combines branches with a merge commit
- **git rebase**: Moves commits to new base, creating linear history

---

### 9. What is a detached HEAD state?

**Answer:** When HEAD points to a specific commit instead of a branch. Happens when checking out a commit directly.

---

### 10. How do you undo the last commit?

**Answer:**
```bash
# Keep changes
git reset --soft HEAD~1

# Discard changes
git reset --hard HEAD~1

# Create reverting commit
git revert HEAD
```

---

### 11. What is cherry-picking?

**Answer:** Applying a specific commit from one branch to another without merging the entire branch.

---

### 12. What is the difference between fork and clone?

**Answer:**
- **Fork**: Creates copy on GitHub (server-side)
- **Clone**: Downloads repository to local machine

---

### 13. What is a pull request?

**Answer:** A request to merge changes from one branch to another, allowing code review before merging.

---

### 14. How do you rename a branch?

**Answer:**
```bash
# Rename current branch
git branch -m new-name

# Rename specific branch
git branch -m old-name new-name
```

---

### 15. What is .gitignore?

**Answer:** File that specifies which files/directories Git should ignore and not track.

---

## Git Cheat Sheet

### Quick Reference

| Command | Description |
|---------|-------------|
| `git init` | Initialize repository |
| `git clone <url>` | Clone repository |
| `git status` | Check status |
| `git add <file>` | Stage file |
| `git commit -m "msg"` | Commit changes |
| `git push` | Push to remote |
| `git pull` | Pull from remote |
| `git branch` | List branches |
| `git checkout <branch>` | Switch branch |
| `git merge <branch>` | Merge branch |
| `git log` | View history |
| `git diff` | View changes |
| `git stash` | Stash changes |
| `git reset` | Reset changes |
| `git revert` | Revert commit |

---

**Master Git! 🚀**