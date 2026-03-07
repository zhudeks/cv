# CV Website - Static Version

A secure, static CV website hosted on GitHub Pages. **No admin panel** - edit data directly in files.

## Project Structure

```
cv/
├── index.html           # Main CV page
├── css/
│   └── style.css        # Styles
├── js/
│   ├── data.js          # ⚠️ EDIT THIS FILE to update CV
│   └── script.js        # Page logic
├── images/              # CV images
├── CNAME                # Your custom domain
└── README.md            # This file
```

## How to Update Your CV

### Edit `js/data.js`

Open `js/data.js` and modify the `CV_DATA` object:

```javascript
const CV_DATA = {
    profile: {
        name: "Your Name",
        title: "Your Job Title",
        email: "your@email.com",
        // ... etc
    },
    // ... rest of data
};
```

### Sections You Can Edit:

- **Profile**: Name, title, avatar, email, phone, LinkedIn, GitHub
- **Summary**: Professional summary text
- **Skills**: Skill categories and items
- **Experience**: Job positions with descriptions
- **Education**: Degrees and institutions
- **Settings**: Primary color theme

### Deploy Changes:

```bash
# 1. Edit js/data.js
# 2. Save the file
# 3. Commit and push

git add js/data.js
git commit -m "Update CV: [describe changes]"
git push
```

Changes will be live on GitHub Pages in 1-2 minutes.

## GitHub Pages Setup

### Step 1: Create Repository

1. Go to https://github.com/new
2. Create a **public** repository (required for free GitHub Pages)
3. Name it (e.g., `cv` or `zhudeks.github.io`)

### Step 2: Push Code

```bash
cd c:\Users\zhudeks\vscode\cv
git init
git add .
git commit -m "Initial commit - CV website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
3. Click **Save**

### Step 4: Custom Domain (name.am)

1. Edit `CNAME` file with your domain (e.g., `zhudeks.am`)
2. Commit and push
3. In GitHub Pages settings, enter your domain
4. **At name.am**, configure DNS:

| Type  | Name | Value                      |
|-------|------|----------------------------|
| CNAME | www  | YOUR_USERNAME.github.io    |
| A     | @    | 185.199.108.153            |
| A     | @    | 185.199.109.153            |
| A     | @    | 185.199.110.153            |
| A     | @    | 185.199.111.153            |

5. Wait 24-48 hours for DNS propagation
6. Enable **Enforce HTTPS** in GitHub Pages settings

## Local Development

Open `index.html` in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

Then visit: `http://localhost:8000`

## Features

- ✅ **Secure**: No admin panel, no database, no authentication vulnerabilities
- ✅ **Static**: Fast loading, works on free GitHub Pages
- ✅ **Easy Updates**: Edit one file (`js/data.js`) and push
- ✅ **Responsive**: Mobile-friendly design
- ✅ **Dark Mode**: Built-in light/dark theme toggle
- ✅ **Print Ready**: Optimized for PDF export
- ✅ **Custom Domain**: Supports your own domain

## Security

This is a **static website** with:
- ❌ No admin panel
- ❌ No database
- ❌ No authentication
- ❌ No server-side code

**All data is in `js/data.js`** - edit it directly and push to GitHub.

Since the repo is public (required for free GitHub Pages), anyone can see the source code. This is fine for a CV since it's public information anyway.

## Tips

1. **Backup**: Keep a backup of your `data.js` file locally
2. **Images**: Add images to `images/` folder and reference in `data.js`
3. **Test Locally**: Always test changes locally before pushing
4. **Commit Messages**: Use descriptive commit messages for tracking changes

## License

This is a personal CV website. Feel free to use as inspiration for your own.
