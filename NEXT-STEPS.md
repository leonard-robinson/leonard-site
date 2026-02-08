# Next Steps to Complete Leonard's Site

**Status: Site is live at Cloudflare Pages, but CMS login not working yet**

Current URL: `leonard-site-[xyz].pages.dev` (replace with actual)

---

## What's Done ✅

- [x] Site built and pushed to GitHub
- [x] Deployed to Cloudflare Pages
- [x] Site loading correctly
- [x] Blog system implemented
- [x] Footer links (Blog + Clubland) added
- [x] Sample blog post created

---

## What's Left (30 minutes total)

### 1. Set Up OAuth (So `/admin` Login Works) ⚠️ CRITICAL

**Why:** Without this, Leonard can't log into `/admin` to publish posts.

**Steps:**

1. **Create GitHub OAuth App** (3 min)
   - Go to GitHub (logged in as `leonard-robinson`)
   - Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Fill in:
     - **Application name**: Leonard Site CMS
     - **Homepage URL**: https://leonardarobinson.com
     - **Authorization callback URL**: https://leonardarobinson.com/auth
   - Click "Register application"
   - **Copy Client ID**: ___________________
   - **Generate new client secret** → Copy it: ___________________

2. **Add OAuth Credentials to Cloudflare** (2 min)
   - In Cloudflare Pages: leonard-site → Settings → Environment variables
   - Add variable:
     - Name: `OAUTH_CLIENT_ID`
     - Value: (paste Client ID from step 1)
   - Add variable:
     - Name: `OAUTH_CLIENT_SECRET`
     - Value: (paste Client Secret from step 1)
   - Save
   - Go to Deployments → Retry latest deployment

3. **Test CMS Login** (1 min)
   - Visit `your-site.pages.dev/admin`
   - Click "Login with GitHub"
   - Should redirect and log you in
   - If it works → ✅ OAuth configured correctly

---

### 2. Connect Custom Domain (5 min)

**Why:** So site loads at `leonardarobinson.com` instead of `.pages.dev`

**Steps:**

1. In Cloudflare Pages: leonard-site → Custom domains
2. Click "Set up a custom domain"
3. Enter: `leonardarobinson.com`
4. Cloudflare will auto-configure DNS
5. Click "Activate domain"
6. Wait 5 minutes for SSL certificate
7. Test: Visit `leonardarobinson.com` — should load!

---

### 3. Transfer Domain to Cloudflare (Optional but Recommended)

**Why:**
- Everything in one place
- Cheaper ($9.77/year vs WordPress $20/year)
- Better DNS management
- Free email forwarding

**Steps:**

1. **Start Transfer at Cloudflare**
   - Cloudflare → Domain Registration → Transfer Domain
   - Enter: `leonardarobinson.com`
   - Pay $9.77 (includes 1-year renewal)

2. **Unlock Domain at WordPress.com**
   - Log into WordPress.com
   - Domains → leonardarobinson.com
   - Click "Transfer domain away"
   - Unlock domain
   - Get authorization code

3. **Complete Transfer at Cloudflare**
   - Enter authorization code from WordPress
   - Confirm transfer
   - Wait 5-7 days (automatic approval)

**Important:** Email will keep working during transfer (MX records copy automatically)

---

### 4. Set Up Email Forwarding (2 min)

**After domain is at Cloudflare:**

1. Cloudflare → Email → Email Routing
2. Add destination email (Leonard's personal Gmail/etc)
3. Create forwarding rule:
   - From: `leonard@leonardarobinson.com`
   - To: His personal email
4. Verify destination email (click link in confirmation email)

Now emails to his domain forward automatically (free, unlimited).

---

### 5. Test Publishing (2 min)

**After OAuth is set up:**

1. Go to `leonardarobinson.com/admin`
2. Log in with GitHub
3. Click "New Post"
4. Write test post:
   - Title: "Test Post"
   - Date: Today
   - Body: "Testing the CMS"
5. Click "Publish"
6. Wait 30 seconds
7. Visit `leonardarobinson.com/blog`
8. See the post? ✅ Success!
9. Delete test post from `/admin`

---

## Priority Order

**Do these in this order:**

1. **OAuth setup** ← Do this first (site works but CMS doesn't)
2. **Custom domain** ← Do this second (makes site live at real URL)
3. **Test publishing** ← Verify CMS works
4. **Domain transfer** ← Do this anytime (can wait if needed)
5. **Email forwarding** ← After transfer completes

---

## When Everything's Done

Leonard will:
1. Visit `leonardarobinson.com/admin`
2. Click "Login with GitHub" (one-time setup)
3. Write posts in WYSIWYG editor
4. Click "Publish"
5. Posts go live in 30 seconds

**He never touches:**
- GitHub
- Cloudflare
- Code
- Terminal
- Localhost

---

## Troubleshooting

### CMS login fails
- Check OAuth callback URL is `/auth` (not `/admin/`)
- Verify environment variables are set in Cloudflare
- Check `config.yml` has correct repo: `leonard-robinson/leonard-site`

### Domain not loading
- Check DNS propagation: whatsmydns.net
- Verify SSL certificate issued (Cloudflare → SSL/TLS)
- Clear browser cache

### Posts not appearing
- Check `/content/posts/` in GitHub repo
- Verify markdown files have frontmatter (title, date)
- Check Cloudflare build logs for errors

---

## Files Reference

- **Setup guide**: `CLOUDFLARE-DEPLOYMENT.md`
- **Quick checklist**: `SETUP-CHECKLIST.md`
- **This file**: `NEXT-STEPS.md`

---

**Current Status: Ready for OAuth setup → Then go live!**
