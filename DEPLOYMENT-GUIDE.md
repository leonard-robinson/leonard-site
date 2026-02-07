# Complete Deployment Guide for leonardarobinson.com

## Overview

This guide walks you through:
1. Creating Leonard's GitHub account
2. Pushing the site to his GitHub
3. Deploying to Netlify (free hosting)
4. Pointing his WordPress.com domain to Netlify
5. Setting up the CMS so he can publish

**Total time: ~20 minutes**

---

## Step 1: Create Leonard's GitHub Account

1. Go to [github.com/signup](https://github.com/signup)
2. Use his email (probably his main email)
3. Choose a username (e.g., `leonardarobinson` or `leonardwrites`)
4. Verify email
5. **Save login credentials** — you'll need them

---

## Step 2: Push Site to His GitHub

### On Your Computer:

```bash
cd /Users/jon/Documents/leonard-site

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial site with blog system"
```

### Create Repo on His GitHub:

**Option A: Using GitHub CLI (if you have `gh` installed)**

```bash
# Login as Leonard (you'll need his credentials)
gh auth login

# Create repo on his account
gh repo create leonard-site --public --source=. --remote=origin

# Push code
git push -u origin main
```

**Option B: Manually via Web**

1. Log into his GitHub account
2. Click "+" in top right → "New repository"
3. Name: `leonard-site` (or `leonardarobinson.com`)
4. Public or Private: **Public** (required for free Netlify)
5. Don't initialize with README (already have files)
6. Click "Create repository"

7. Then on your computer:
```bash
# Replace USERNAME with his GitHub username
git remote add origin https://github.com/USERNAME/leonard-site.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Netlify

### 3.1 Create Netlify Account

1. Go to [netlify.com](https://netlify.com)
2. Click "Sign up" → Choose "Sign up with GitHub"
3. Log in with **Leonard's GitHub account**
4. Authorize Netlify to access GitHub

### 3.2 Deploy Site

1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Select his repository (`leonard-site`)
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: Leave default (or set to 18+)
5. Click "Deploy site"

Wait 2-3 minutes. Site will be live at: `random-name-12345.netlify.app`

### 3.3 Enable Netlify Identity (For CMS Login)

1. In Netlify dashboard, go to **Site settings** → **Identity**
2. Click **Enable Identity**
3. Under **Registration preferences**:
   - Set to **Invite only** (prevents random people from publishing)
4. Under **External providers**:
   - Enable **GitHub** (so Leonard logs in with GitHub)
5. Under **Services**:
   - Click **Enable Git Gateway**

### 3.4 Invite Leonard to Publish

1. Still in Identity section, click **Invite users**
2. Enter Leonard's email
3. He'll get an email invite to set up CMS access

---

## Step 4: Connect Domain (Keep at WordPress.com)

### 4.1 Get Netlify DNS Info

1. In Netlify dashboard: **Domain settings** → **Add custom domain**
2. Enter `leonardarobinson.com`
3. Netlify will show DNS records to add. You need:
   - **A record**: `75.2.60.5` (Netlify's IP)
   - **CNAME record**: `www` → `your-site-name.netlify.app`

### 4.2 Update DNS at WordPress.com

1. Log into [wordpress.com](https://wordpress.com) with Leonard's account
2. Go to **My Sites** → **Domains** → **leonardarobinson.com**
3. Click **DNS Records** or **Name Servers**
4. **Delete existing A/CNAME records** (old WordPress ones)
5. **Add new records**:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   TTL: 3600

   Type: CNAME
   Name: www
   Value: [your-site-name].netlify.app
   TTL: 3600
   ```
6. Save changes

### 4.3 Wait for DNS Propagation

- Takes 5 minutes to 48 hours (usually ~1 hour)
- Check status: [whatsmydns.net](https://whatsmydns.net)
- When propagated, `leonardarobinson.com` will load the new site

### 4.4 Enable HTTPS in Netlify

1. Back in Netlify: **Domain settings** → **HTTPS**
2. Wait for "Provisioning certificate" to finish
3. Enable "Force HTTPS"

---

## Step 5: Test Publishing System

### For Leonard:

1. Go to `leonardarobinson.com/admin`
2. Click "Login with GitHub"
3. Authorize the CMS app
4. Click "New Post" under "Blog Posts"
5. Write a test post:
   - Title: "Test Post"
   - Date: Today
   - Excerpt: "Testing the publishing system"
   - Body: "This is a test post to verify everything works."
6. Click **Publish**

### What Happens:

- CMS commits the markdown file to GitHub
- Netlify detects the commit
- Site rebuilds automatically (~30 seconds)
- Post appears at `/blog`

### If It Works:

Leonard can delete the test post and start writing for real.

---

## Troubleshooting

### "Site not building"
- Check build logs in Netlify dashboard
- Verify build command is `npm run build` and publish dir is `dist`

### "Can't login to /admin"
- Verify Git Gateway is enabled in Netlify Identity settings
- Check Leonard received the Identity invite email

### "Domain not loading"
- Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
- Verify A record points to `75.2.60.5`
- Clear browser cache

### "Posts not appearing"
- Check `/content/posts/` directory exists in GitHub repo
- Verify markdown files have proper frontmatter (title, date, excerpt)
- Check Netlify build logs for errors

---

## What Leonard Needs to Know

### To Publish a New Post:

1. Go to `leonardarobinson.com/admin`
2. Log in (one-time GitHub OAuth)
3. Click "New Post"
4. Fill in title, date, excerpt
5. Write post in editor (supports bold, italic, links, images)
6. Click "Publish"
7. Wait 30 seconds for site to rebuild

### To Edit a Post:

1. Go to `/admin`
2. Click on existing post
3. Make changes
4. Click "Publish" again

### To Add Images:

1. In post editor, click image icon
2. Upload image from computer
3. Image is automatically inserted

### To See the Blog:

- List of posts: `leonardarobinson.com/blog`
- Individual post: `leonardarobinson.com/blog/post-slug`

---

## Cost Breakdown

- **GitHub**: Free (public repo)
- **Netlify hosting**: Free (up to 100GB bandwidth/month — plenty)
- **Netlify builds**: Free (300 build minutes/month — plenty)
- **Domain**: Already paid at WordPress.com ($20/year)
- **CMS (Decap)**: Free (open source)

**Total monthly cost: $0**

---

## Next Steps After Deployment

1. Leonard can customize the sample post or delete it
2. He can publish 1-2 real posts to test the workflow
3. Share the `/blog` link to see it live
4. He can write as much as he wants — no limits

---

## Files You Need

All files are ready in `/Users/jon/Documents/leonard-site/`:

```
leonard-site/
├── DEPLOYMENT-GUIDE.md  ← This file
├── SETUP.md             ← Technical setup docs
├── content/posts/       ← Leonard's blog posts go here
├── public/admin/        ← CMS admin panel
├── src/                 ← React app code
└── package.json         ← Dependencies
```

Ready to deploy! Just follow steps 1-5 above.
