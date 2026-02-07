# Quick Start Commands

## Initial Setup (Run Once)

```bash
cd /Users/jon/Documents/leonard-site

# Initialize git
git init
git add .
git commit -m "Initial commit with blog system"

# Create GitHub repo (need Leonard's login first)
gh auth login
# ^ Follow prompts to log in as Leonard

gh repo create leonard-site --public --source=. --remote=origin --push
```

## Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with Leonard's GitHub
3. Import `leonard-site` repo
4. Build: `npm run build`
5. Publish: `dist`
6. Deploy!

## Enable CMS

In Netlify dashboard:
1. **Site settings** → **Identity** → **Enable Identity**
2. **Registration** → **Invite only**
3. **Services** → **Enable Git Gateway**
4. **External providers** → Enable **GitHub**
5. **Invite users** → Enter Leonard's email

## Connect Domain

Get DNS from Netlify, then at WordPress.com:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: [your-site].netlify.app
```

## Test

- Homepage: `leonardarobinson.com`
- Blog: `leonardarobinson.com/blog`
- CMS: `leonardarobinson.com/admin`

Done!
