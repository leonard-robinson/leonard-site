# Cloudflare Deployment Guide (Recommended)

## Why This Approach

- **2 services total**: GitHub + Cloudflare (instead of GitHub + Netlify + Cloudflare)
- **Everything in one place**: Domain, hosting, email, CDN all at Cloudflare
- **Faster**: Cloudflare's global CDN is industry-leading
- **Free**: Unlimited bandwidth, no caps

## What Leonard Needs

1. **GitHub account** (for code storage + CMS login)
2. **Cloudflare account** (for domain + hosting + email)

---

## Step-by-Step Deployment

### Step 1: Create Leonard's GitHub Account (5 min)

1. Go to [github.com/signup](https://github.com/signup)
2. Use Leonard's email + password
3. Verify email
4. **Save credentials**

### Step 2: Push Code to GitHub (2 min)

On your computer:

```bash
cd /Users/jon/Documents/leonard-site

# Run the deployment script
./deploy.sh
```

This will:
- Create GitHub repo
- Push all code
- Set up git properly

The script will ask you to log in as Leonard (using the GitHub account you just created).

### Step 3: Create Cloudflare Account (3 min)

1. Go to [cloudflare.com](https://cloudflare.com)
2. Sign up with Leonard's email
3. Verify email

### Step 4: Transfer Domain to Cloudflare (Optional but Recommended)

**Option A: Transfer from WordPress.com (takes 5-7 days)**

1. In Cloudflare: Domain Registration → Transfer Domain
2. Enter `leonardarobinson.com`
3. At WordPress.com:
   - Go to Domains → leonardarobinson.com
   - Unlock domain
   - Get authorization code
4. Back in Cloudflare: Enter auth code
5. Pay $9.77 (one year renewal)
6. Wait 5-7 days for transfer

**Option B: Keep at WordPress.com, Just Update DNS (takes 1 hour)**

1. Skip transfer
2. At WordPress.com → DNS → Update nameservers to Cloudflare's
3. Cloudflare will provide nameservers when you add the domain

**Recommended: Option A** (everything in one place)

### Step 5: Deploy to Cloudflare Pages (5 min)

1. In Cloudflare: **Workers & Pages** → **Create application** → **Pages**
2. Click **Connect to Git**
3. Choose **GitHub**
4. Authorize Cloudflare to access Leonard's GitHub
5. Select the `leonard-site` repository
6. Build settings:
   - **Framework preset**: None (or Vite)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
7. Click **Save and Deploy**

Wait 2-3 minutes. Site will be live at: `leonard-site.pages.dev`

### Step 6: Connect Custom Domain (2 min)

1. In Pages project: **Custom domains** → **Set up a custom domain**
2. Enter `leonardarobinson.com`
3. Cloudflare auto-configures DNS (no manual records needed)
4. Wait 5 minutes for SSL certificate
5. Site live at `leonardarobinson.com`

### Step 7: Set Up Email Forwarding (2 min)

1. In Cloudflare: **Email** → **Email Routing**
2. Click **Get started**
3. Add destination email (Leonard's personal email)
4. Create routing rule:
   - From: `leonard@leonardarobinson.com`
   - To: His personal email
5. Verify destination email (click link in confirmation email)

Now emails to `leonard@leonardarobinson.com` forward automatically.

### Step 8: Configure CMS Authentication (10 min)

This is the only "technical" step. Leonard will never see this, but you need to do it once.

#### 8.1 Create GitHub OAuth App

1. Go to GitHub (logged in as Leonard)
2. Click profile → **Settings** → **Developer settings** → **OAuth Apps**
3. Click **New OAuth App**
4. Fill in:
   - **Application name**: `Leonard Site CMS`
   - **Homepage URL**: `https://leonardarobinson.com`
   - **Authorization callback URL**: `https://leonardarobinson.com/admin/`
5. Click **Register application**
6. You'll see:
   - **Client ID**: (copy this)
   - Click **Generate a new client secret** → copy the secret

**⚠️ Save these somewhere secure — you'll need them in the next step**

#### 8.2 Update CMS Config

Edit `/Users/jon/Documents/leonard-site/public/admin/config.yml`:

Change this:
```yaml
backend:
  name: git-gateway
  branch: main
```

To this:
```yaml
backend:
  name: github
  repo: USERNAME/leonard-site  # Replace USERNAME with Leonard's GitHub username
  branch: main
```

#### 8.3 Add OAuth Credentials to Cloudflare

Create a new file: `/Users/jon/Documents/leonard-site/functions/oauth.js`

```javascript
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Handle OAuth callback
  if (url.pathname === '/auth') {
    const code = url.searchParams.get('code');
    if (!code) return new Response('Missing code', { status: 400 });

    // Exchange code for token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: env.OAUTH_CLIENT_ID,
        client_secret: env.OAUTH_CLIENT_SECRET,
        code,
      }),
    });

    const data = await tokenResponse.json();

    // Redirect back to CMS with token
    return Response.redirect(`${url.origin}/admin/#access_token=${data.access_token}`, 301);
  }

  return new Response('Not found', { status: 404 });
}
```

#### 8.4 Add Environment Variables

1. In Cloudflare Pages: Your project → **Settings** → **Environment variables**
2. Add two variables:
   - **OAUTH_CLIENT_ID**: (paste the Client ID from GitHub)
   - **OAUTH_CLIENT_SECRET**: (paste the Client Secret from GitHub)
3. Click **Save**
4. Redeploy: **Deployments** → **...** → **Retry deployment**

### Step 9: Test Publishing (2 min)

1. Go to `leonardarobinson.com/admin`
2. Click **Login with GitHub**
3. Authorize the app
4. Click **New Post**
5. Title: "Test Post"
6. Date: Today
7. Body: "Testing the CMS"
8. Click **Publish**

**What happens:**
- CMS commits markdown to GitHub
- Cloudflare detects push
- Site rebuilds (~30 sec)
- Post appears at `/blog`

If it works, Leonard can delete the test and start writing.

---

## Summary

**What you set up once:**
1. GitHub account (code storage)
2. Cloudflare account (domain + hosting + email)
3. OAuth app (CMS authentication)

**What Leonard uses forever:**
- `leonardarobinson.com/admin` (write posts)
- GitHub login (one click, no code)

**Total cost:**
- GitHub: Free
- Cloudflare hosting: Free
- Domain at Cloudflare: $9.77/year (cheaper than WordPress.com's $20/year)
- Email forwarding: Free

**Total monthly: $0**

---

## Troubleshooting

### "Can't log into /admin"
- Check OAuth app callback URL is `https://leonardarobinson.com/admin/`
- Verify environment variables are set in Cloudflare Pages
- Check `config.yml` has correct GitHub repo path

### "Posts not appearing"
- Check `/content/posts/` exists in GitHub
- Verify markdown files have frontmatter (title, date, excerpt)
- Check Cloudflare Pages build logs

### "Build failing"
- Verify build command is `npm run build` and output is `dist`
- Check Node.js version in Cloudflare settings (should be 18+)

### "Email not forwarding"
- Verify destination email in Cloudflare Email Routing
- Check spam folder
- Ensure MX records are set (Cloudflare does this automatically)

---

## Next Steps After Deployment

1. Leonard logs into `/admin` with GitHub
2. Deletes sample post (or edits it)
3. Writes first real post
4. Shares `/blog` link

Done!
