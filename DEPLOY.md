# Deploy to GitHub Pages (recommended)

## Repo name used in this project
`Sundari-Birthday-Treasure-Hunt`

This project is configured for GitHub Pages with:
- `vite.config.js` base = `/Sundari-Birthday-Treasure-Hunt/`
- React Router uses `basename={import.meta.env.BASE_URL}`

---

## 1) Create a NEW GitHub repo
Create a new repo named **Sundari-Birthday-Treasure-Hunt** under your GitHub account.

---

## 2) Push code (PowerShell)
From the project root (where `package.json` is):

```powershell
git init
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/Sundari-Birthday-Treasure-Hunt.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

---

## 3) Build
```powershell
npm install
npm run build
```

---

## 4) Deploy to `gh-pages` branch using pure Git (avoids Windows long-path issues)

Use a short folder like `C:\tmp\deploy`:

```powershell
mkdir C:\tmp -ErrorAction SilentlyContinue
mkdir C:\tmp\deploy -ErrorAction SilentlyContinue

cd C:\tmp\deploy
git clone https://github.com/YOUR_GITHUB_USERNAME/Sundari-Birthday-Treasure-Hunt.git .

git checkout gh-pages 2>$null
if ($LASTEXITCODE -ne 0) { git checkout --orphan gh-pages }

git rm -rf . 2>$null

Copy-Item -Recurse -Force "FULL_PATH_TO_YOUR_PROJECT\dist\*" "C:\tmp\deploy\"

git add .
git commit -m "Deploy"
git push -f origin gh-pages
```

---

## 5) Enable Pages (one-time)
Repo → Settings → Pages:
- Source: Deploy from a branch
- Branch: `gh-pages`
- Folder: `/(root)`

Your site will be:
`https://YOUR_GITHUB_USERNAME.github.io/Sundari-Birthday-Treasure-Hunt/`
