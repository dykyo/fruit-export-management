# 🌿 Git Branching Strategy

## Branch Structure

```
main (production)
├── develop (development)
├── feature/* (new features)
├── bugfix/* (bug fixes)
└── hotfix/* (urgent production fixes)
```

## Branch Descriptions

### `main` - Production Branch
- **Purpose**: Production-ready code
- **Deploy**: Auto-deploy to Vercel production
- **Protection**: Require PR reviews
- **Merge from**: `develop` only

### `develop` - Development Branch  
- **Purpose**: Integration branch for features
- **Deploy**: Preview deployments on Vercel
- **Merge from**: `feature/*`, `bugfix/*`
- **Merge to**: `main`

### `feature/*` - Feature Branches
- **Purpose**: New feature development
- **Naming**: `feature/add-export-reports`
- **Base**: `develop`
- **Merge to**: `develop`

### `bugfix/*` - Bug Fix Branches
- **Purpose**: Non-urgent bug fixes
- **Naming**: `bugfix/fix-login-error`
- **Base**: `develop`
- **Merge to**: `develop`

### `hotfix/*` - Hotfix Branches
- **Purpose**: Urgent production fixes
- **Naming**: `hotfix/fix-critical-bug`
- **Base**: `main`
- **Merge to**: `main` and `develop`

## Workflow

### 1. Feature Development
```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/new-feature

# Work on feature
git add .
git commit -m "✨ Add new feature"
git push origin feature/new-feature

# Create PR: feature/new-feature → develop
```

### 2. Bug Fixes
```bash
# Start bug fix
git checkout develop
git pull origin develop
git checkout -b bugfix/fix-issue

# Fix bug
git add .
git commit -m "🐛 Fix issue"
git push origin bugfix/fix-issue

# Create PR: bugfix/fix-issue → develop
```

### 3. Release to Production
```bash
# Merge develop to main
git checkout main
git pull origin main
git merge develop
git push origin main

# Auto-deploy to production
```

### 4. Hotfix
```bash
# Emergency fix
git checkout main
git pull origin main
git checkout -b hotfix/critical-fix

# Fix issue
git add .
git commit -m "🚑 Critical fix"
git push origin hotfix/critical-fix

# Create PR: hotfix/critical-fix → main
# Also merge back to develop
```

## Commit Message Convention

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `✨ feat`: New feature
- `🐛 fix`: Bug fix
- `📚 docs`: Documentation
- `💄 style`: Formatting, missing semicolons, etc.
- `♻️ refactor`: Code refactoring
- `⚡ perf`: Performance improvements
- `✅ test`: Adding tests
- `🔧 chore`: Maintenance tasks
- `🚑 hotfix`: Critical fixes

### Examples
```bash
git commit -m "✨ feat(fruits): add fruit category management"
git commit -m "🐛 fix(auth): resolve login redirect issue"
git commit -m "📚 docs: update deployment guide"
git commit -m "🔧 chore: update dependencies"
```

## Environment Configuration

### Development (.env.development)
- Used for `develop` branch
- Preview deployments
- Development database

### Production (.env.production)  
- Used for `main` branch
- Production deployments
- Production database

## Vercel Deployment

### Production
- **Branch**: `main`
- **URL**: `https://fruit-export-management.vercel.app`
- **Environment**: Production

### Preview
- **Branch**: `develop`, `feature/*`
- **URL**: `https://fruit-export-management-git-branch.vercel.app`
- **Environment**: Preview

## Best Practices

1. **Always create PR for merges**
2. **Write descriptive commit messages**
3. **Keep branches up to date**
4. **Delete merged branches**
5. **Test before merging**
6. **Use branch protection rules**

## Commands Cheat Sheet

```bash
# Switch branches
git checkout main
git checkout develop
git checkout -b feature/new-feature

# Update branch
git pull origin develop

# Push new branch
git push -u origin feature/new-feature

# Merge (after PR approval)
git checkout develop
git merge feature/new-feature
git push origin develop

# Delete merged branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature

# Check current branch
git branch
git status
```
