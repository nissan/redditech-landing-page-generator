#!/bin/bash

# Landing Page Template - GitHub Repository Initialization Script
# This script helps you set up the repository for the first time

set -e

echo "🚀 Initializing Landing Page Template Repository"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git repository if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo "📝 .gitignore already exists"
fi

# Check for uncommitted changes
echo ""
echo "📋 Checking repository status..."
git status

echo ""
echo "🎯 Next steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Add the remote and push:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/landing-page-template.git"
echo "   git add ."
echo "   git commit -m 'Initial commit: Landing page template with CLI configurator'"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Update README.md with your repository URL"
echo "   Replace 'yourusername' with your GitHub username"
echo ""
echo "4. (Optional) Enable GitHub Actions:"
echo "   The CI workflow is already configured in .github/workflows/ci.yml"
echo ""
echo "5. (Optional) Set up GitHub Pages or Vercel deployment"
echo ""
echo "✨ Your template is ready to be shared with the world!"
