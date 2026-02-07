# Cloudflare Setup Checklist

Use this as your step-by-step guide. Check off each item as you complete it.

---

## Before You Start

What you need:
- [ ] Leonard's email address
- [ ] Password for his accounts (or you set temporarily)

---

## Setup Steps

### 1. GitHub Account
- [ ] Go to [github.com/signup](https://github.com/signup)
- [ ] Create account with Leonard's email
- [ ] Verify email
- [ ] **Write down username**: ___________________

### 2. Push Code to GitHub
- [ ] Open Terminal
- [ ] `cd /Users/jon/Documents/leonard-site`
- [ ] `./deploy.sh`
- [ ] Log in when prompted (use Leonard's GitHub account)
- [ ] Wait for push to complete

### 3. Cloudflare Account
- [ ] Go to [cloudflare.com](https://cloudflare.com)
- [ ] Sign up with Leonard's email
- [ ] Verify email

### 4. Deploy Site to Cloudflare Pages
- [ ] In Cloudflare: Workers & Pages → Create → Pages
- [ ] Connect to Git → GitHub
- [ ] Authorize Cloudflare
- [ ] Select `leonard-site` repo
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Deploy
- [ ] **Write down URL**: ___________________.pages.dev

### 5. Transfer Domain (Optional - can do later)
- [ ] In Cloudflare: Domain Registration → Transfer
- [ ] Enter leonardarobinson.com
- [ ] Get auth code from WordPress.com
- [ ] Complete transfer ($9.77)
- [ ] *OR* skip and just update DNS to point to Cloudflare

### 6. Connect Domain
- [ ] In Pages project: Custom domains → Add
- [ ] Enter leonardarobinson.com
- [ ] Wait 5 minutes for SSL
- [ ] Test: Visit leonardarobinson.com

### 7. Set Up Email Forwarding
- [ ] Cloudflare: Email → Email Routing
- [ ] Add destination email (Leonard's personal email)
- [ ] Create rule: leonard@leonardarobinson.com → his email
- [ ] Verify destination email (check his inbox for link)

### 8. Configure CMS (Most Important Part!)

#### 8a. Create GitHub OAuth App
- [ ] Log into GitHub as Leonard
- [ ] Settings → Developer settings → OAuth Apps
- [ ] New OAuth App
- [ ] Fill in:
  - Name: `Leonard Site CMS`
  - Homepage: `https://leonardarobinson.com`
  - Callback: `https://leonardarobinson.com/auth`
- [ ] Register application
- [ ] Copy **Client ID**: ___________________
- [ ] Generate **Client Secret**: ___________________
- [ ] **SAVE THESE** - you need them next

#### 8b. Update CMS Config
- [ ] Open `/Users/jon/Documents/leonard-site/public/admin/config-cloudflare.yml`
- [ ] Replace `GITHUB_USERNAME` with Leonard's actual username
- [ ] Save file
- [ ] Rename to `config.yml` (replace old one)

#### 8c. Add OAuth Secrets to Cloudflare
- [ ] In Cloudflare Pages: Settings → Environment variables
- [ ] Add variable:
  - Name: `OAUTH_CLIENT_ID`
  - Value: (paste Client ID from GitHub)
- [ ] Add variable:
  - Name: `OAUTH_CLIENT_SECRET`
  - Value: (paste Client Secret from GitHub)
- [ ] Save
- [ ] Deployments → Retry deployment

#### 8d. Push Updated Config to GitHub
- [ ] In Terminal: `cd /Users/jon/Documents/leonard-site`
- [ ] `git add .`
- [ ] `git commit -m "Update CMS config for Cloudflare"`
- [ ] `git push`
- [ ] Wait 30 seconds for Cloudflare to redeploy

### 9. Test Everything
- [ ] Go to leonardarobinson.com/admin
- [ ] Click "Login with GitHub"
- [ ] Authorize app
- [ ] Click "New Post"
- [ ] Write test post
- [ ] Click "Publish"
- [ ] Wait 30 seconds
- [ ] Check leonardarobinson.com/blog
- [ ] See test post? ✅ Success!

---

## After Setup

Tell Leonard:
1. Go to leonardarobinson.com/admin
2. Log in with GitHub (one click)
3. Click "New Post" to write
4. Click "Publish" when done
5. Post goes live in 30 seconds

**He never touches GitHub, Cloudflare, or any code.**

---

## Troubleshooting

### Can't log into /admin
- Double-check OAuth callback URL is `/auth` (not `/admin/`)
- Verify env variables are set in Cloudflare
- Check `config.yml` has correct GitHub username/repo

### Build failing
- Check build command: `npm run build`
- Check output: `dist`
- View build logs in Cloudflare Pages

### Posts not showing
- Verify markdown files are in `/content/posts/`
- Check frontmatter format (title, date, excerpt)
- Look for build errors in Cloudflare

---

## Quick Reference

- **Homepage**: leonardarobinson.com
- **Blog**: leonardarobinson.com/blog
- **CMS**: leonardarobinson.com/admin
- **GitHub**: github.com/USERNAME/leonard-site
- **Cloudflare**: dash.cloudflare.com

---

**Total time: ~30 minutes**
**Total cost: $0/month (domain $9.77/year if transferred)**
