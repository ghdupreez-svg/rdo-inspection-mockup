# Publish The RDO Mockup With GitHub Pages

Use these steps to make the mockup available as a normal web link.

## 1. Create A GitHub Repository

1. Go to https://github.com
2. Sign in.
3. Click `+` in the top right.
4. Select `New repository`.
5. Repository name:

```text
rdo-inspection-mockup
```

6. Choose visibility:

```text
Public
```

GitHub Pages is simplest with a public repo. If you need private Pages, that depends on your GitHub plan.

7. Do not add a README, .gitignore, or license.
8. Click `Create repository`.

## 2. Upload The Mockup Files

Upload these files from this folder:

```text
index.html
styles.css
app.js
README.md
IT_Setup_Guide.md
Sample_RDO_Trip_Report.pdf
.nojekyll
```

In GitHub:

1. Click `uploading an existing file`.
2. Drag the files into the browser.
3. Commit message:

```text
Initial RDO inspection mockup
```

4. Click `Commit changes`.

## 3. Turn On GitHub Pages

1. Open the repository.
2. Go to `Settings`.
3. Go to `Pages`.
4. Under `Build and deployment`, choose:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

5. Click `Save`.

## 4. Share The Link

After a minute or two, GitHub will show a link like:

```text
https://YOUR-GITHUB-USERNAME.github.io/rdo-inspection-mockup/
```

That link can be opened on:

```text
iPhone
Android
iPad
Laptop
Desktop
```

Reviewers do not need to download anything.

## Important

This is still a mockup. Do not enter real confidential inspection data into the public GitHub Pages version.
