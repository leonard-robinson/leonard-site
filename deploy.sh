#!/bin/bash

# Deployment script for leonardarobinson.com
# Run this after you've created his GitHub and Netlify accounts

set -e  # Exit on error

echo "🚀 Leonard Site Deployment Script"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the leonard-site directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Adding all files to git..."
    git add .

    echo "💾 Creating initial commit..."
    git commit -m "Initial commit: Leonard Robinson portfolio with blog system"
fi

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "📥 Install it with: brew install gh"
    echo "   Then run this script again."
    exit 1
fi

# Check if logged into GitHub CLI
if ! gh auth status &> /dev/null; then
    echo "🔐 Please log into GitHub as Leonard..."
    gh auth login
fi

# Get GitHub username
GITHUB_USER=$(gh api user --jq .login)
echo "✅ Logged in as: $GITHUB_USER"
echo ""

# Check if remote already exists
if git remote get-url origin &> /dev/null; then
    echo "✅ Remote 'origin' already configured"
else
    echo "🌐 Creating GitHub repository..."
    read -p "Repository name (default: leonard-site): " REPO_NAME
    REPO_NAME=${REPO_NAME:-leonard-site}

    gh repo create "$REPO_NAME" --public --source=. --remote=origin
fi

# Push to GitHub
echo "⬆️  Pushing code to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Code successfully pushed to GitHub!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next Steps (Manual):"
echo ""
echo "1. 🌐 Deploy to Netlify:"
echo "   - Go to https://netlify.com"
echo "   - Sign up with Leonard's GitHub account"
echo "   - Click 'Add new site' → 'Import from Git'"
echo "   - Choose the repository you just created"
echo "   - Build settings:"
echo "     • Build command: npm run build"
echo "     • Publish directory: dist"
echo "   - Click 'Deploy site'"
echo ""
echo "2. 🔐 Enable CMS:"
echo "   - In Netlify: Site settings → Identity → Enable Identity"
echo "   - Registration → Set to 'Invite only'"
echo "   - Services → Enable Git Gateway"
echo "   - External providers → Enable GitHub"
echo "   - Invite users → Add Leonard's email"
echo ""
echo "3. 🌍 Connect Domain (at wordpress.com):"
echo "   - Get Netlify's DNS records from: Domain settings"
echo "   - At WordPress.com → Domains → DNS Records:"
echo "     • A record: @ → 75.2.60.5"
echo "     • CNAME: www → [your-site].netlify.app"
echo ""
echo "4. ✅ Test:"
echo "   - Go to leonardarobinson.com/admin"
echo "   - Log in with GitHub"
echo "   - Create a test post"
echo "   - Verify it appears at /blog"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Full instructions: DEPLOYMENT-GUIDE.md"
echo "⚡ Quick reference: QUICK-START.md"
echo ""
