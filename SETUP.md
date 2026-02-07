# Blog Publishing Setup Guide

## What's Been Built

Leonard's site now has a fully functional blog system called **"The Notebook"** with:

- `/blog` — Blog post listing page
- `/blog/:slug` — Individual blog post pages
- `/admin` — Decap CMS admin panel (WYSIWYG editor)
- Footer links to The Notebook and Clubland

## How Leonard Publishes (After Deployment)

1. Go to `yoursite.com/admin`
2. Click "Login with GitHub" (one-time OAuth setup)
3. Click "New Post" in the CMS
4. Write post in visual editor (bold, italic, images, etc.)
5. Click "Publish"
6. Post goes live in ~30 seconds

He never touches code or terminal.

## Deployment Steps (You Need to Do This)

### 1. Create GitHub Repository

```bash
cd /Users/jon/Documents/leonard-site
git init
git add .
git commit -m "Initial commit with blog system"
gh repo create leonard-site --public --source=. --remote=origin --push
```

### 2. Deploy to Netlify

**Option A: Netlify CLI (Recommended)**

```bash
npm install -g netlify-cli
netlify login
netlify init
```

Follow prompts:
- Build command: `npm run build`
- Publish directory: `dist`
- Enable Netlify Identity: **Yes**
- Enable Git Gateway: **Yes**

**Option B: Netlify Web UI**

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub repo
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy site

### 3. Enable Netlify Identity & Git Gateway

**In Netlify Dashboard:**

1. Go to Site Settings → Identity
2. Click "Enable Identity"
3. Go to Registration → Set to "Invite only" (so only Leonard can publish)
4. Enable Git Gateway:
   - Identity → Services → Git Gateway → Enable
5. Invite Leonard:
   - Identity → Invite users → Enter his email

### 4. Connect Custom Domain

**In Netlify Dashboard:**

1. Domain settings → Add custom domain
2. Enter `leonardrobinson.com` (or whatever domain)
3. Follow DNS configuration instructions
4. Add DNS records at domain registrar (Cloudflare, etc.)

**Typical DNS records:**
```
A     @      75.2.60.5
CNAME www    your-site.netlify.app
```

### 5. Configure CMS for Production

Update `/public/admin/config.yml` — change the backend from GitHub to Netlify Identity:

Already configured correctly. No changes needed.

## Testing Locally

```bash
npm run dev
```

Visit:
- `http://localhost:5173` — Homepage
- `http://localhost:5173/blog` — Blog list
- `http://localhost:5173/blog/welcome-to-the-notebook` — Sample post

**Note:** The `/admin` CMS panel won't work locally without Git Gateway setup. Leonard will only use it in production.

## What Leonard Needs to Know

1. **Publishing**: Go to `leonardrobinson.com/admin` and log in with GitHub
2. **Markdown basics**: Bold `**text**`, italic `*text*`, links `[text](url)`
3. **Images**: Click image icon in editor, upload, done
4. **Drafts**: Posts are saved as drafts until you click "Publish"

## File Structure

```
leonard-site/
├── content/
│   └── posts/              # Blog posts (markdown)
│       └── welcome-to-the-notebook.md
├── public/
│   ├── admin/              # Decap CMS admin panel
│   │   ├── index.html
│   │   └── config.yml
│   └── uploads/            # User-uploaded images
├── src/
│   ├── pages/
│   │   ├── BlogList.jsx    # /blog page
│   │   └── BlogPost.jsx    # /blog/:slug pages
│   ├── App.jsx             # Homepage
│   └── index.css           # Styles (includes blog styling)
```

## Troubleshooting

**CMS shows "Error loading config":**
- Check `/public/admin/config.yml` exists
- Verify Git Gateway is enabled in Netlify

**Posts don't appear:**
- Check markdown files exist in `/content/posts/`
- Verify frontmatter has `title`, `date`, `excerpt`

**Build fails:**
- Run `npm run build` locally to test
- Check console for errors

## Next Steps

1. Deploy to Netlify (follow steps above)
2. Set up custom domain
3. Invite Leonard to Netlify Identity
4. Show Leonard how to use `/admin` panel
5. He can delete the sample post and start writing

## Questions?

The system is ready to go. Just need to:
1. Push to GitHub
2. Deploy on Netlify
3. Enable Identity/Git Gateway
4. Connect domain

That's it. Leonard can start publishing immediately after.
