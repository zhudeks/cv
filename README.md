# CV Website - Deployment Guide

## Project Structure

```
cv/
├── index.html           # Main CV page
├── css/
│   └── style.css        # CV styles
├── js/
│   └── script.js        # CV logic + data rendering
├── images/              # CV images
├── admin/               # Admin panel
│   ├── index.html
│   ├── css/
│   │   └── admin.css
│   ├── js/
│   │   └── admin.js
│   └── images/
│       └── favicon.png
├── CNAME                # Your custom domain
└── README.md            # This file
```

## GitHub Pages Deployment

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `zhudeks.github.io` or `cv`)
3. Make it **Public** (required for free GitHub Pages)

### Step 2: Push Code to GitHub

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

### Step 4: Configure Custom Domain (name.am)

1. In GitHub Pages settings, enter your domain (e.g., `zhudeks.am`)
2. Click **Save**

3. **At name.am**, configure DNS:

| Type  | Name | Value                      |
|-------|------|----------------------------|
| CNAME | www  | YOUR_USERNAME.github.io    |
| A     | @    | 185.199.108.153            |
| A     | @    | 185.199.109.153            |
| A     | @    | 185.199.110.153            |
| A     | @    | 185.199.111.153            |

4. Wait 24-48 hours for DNS propagation

### Step 5: Enforce HTTPS

After DNS propagates:
1. Go back to GitHub Pages settings
2. Check **Enforce HTTPS**

## Admin Panel

- Access: `https://yourdomain.am/admin/index.html`
- Default password: `admin123`
- **Change the password** after first login!

### File Manager

The admin panel includes a built-in File Manager:

1. Go to **File Manager** section in admin panel
2. **Upload images** by:
   - Clicking "Upload Files" button
   - Drag & drop files into the upload area
3. **Browse uploaded files** in the grid view
4. **Search and filter** files by name or category
5. **Use files** in your CV:
   - Click "Choose from Files" button next to image path fields
   - Select an uploaded image
6. **Preview** images before using
7. **Delete** unwanted files

**Note:** Files are stored in browser's localStorage (limit ~5-10MB). For large files or production use, consider hosting images separately.

## Update CV Content

1. Open Admin Panel
2. Login with your password
3. Edit any section (Profile, Summary, Skills, Experience, Education)
4. Click **Save Changes**
5. Refresh CV page to see updates

## Local Development

Open `index.html` in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

Then visit: `http://localhost:8000`

## Important Notes

- Data is stored in browser's `localStorage`
- Clear browser cache = reset data (use Reset to Default in admin)
- For production, consider adding a backend for data persistence
