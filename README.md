# Elyas Heidari | Portfolio & Research Blog

[![Build a Next.js site to Pages](https://github.com/EliHei2/elihei2.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/EliHei2/elihei2.github.io/actions/workflows/deploy.yml)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Material UI](https://img.shields.io/badge/Material%20UI-v6-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

This repository contains the source code for my personal portfolio and research blog, hosted at [elihei2.github.io](https://elihei2.github.io).

The site is designed as a **Digital Curriculum Vitae** and research showcase, built with a focus on:
- **Clean Aesthetics**: "Google Dark" theme with high-contrast typography and subtle interactive elements.
- **Performance**: Static site generation (SSG) for optimal loading speeds.
- **Maintainability**: Component-based architecture using React and Material UI.

## 🚀 Technologies

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI System**: [Material UI (MUI)](https://mui.com/) v6
- **Styling**: `emotion` (CSS-in-JS) with a custom Dark Theme (`src/theme/theme.ts`)
- **Content**: Markdown processing (`remark`, `gray-matter`) for blog posts.
- **Optimization**: `next/font` with `Inter` and `Roboto Mono`.
- **Deployment**: GitHub Actions -> GitHub Pages.

## 📂 Project Structure

```bash
├── posts/                  # Markdown blog posts
├── public/                 # Static assets (images, CV.pdf)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── about/          # CV & Experience page
│   │   ├── blog/           # Blog index & dynamic posts
│   │   ├── projects/       # Software showcase
│   │   ├── reading/        # Reading list
│   │   └── page.tsx        # Home landing page
│   ├── components/         # Reusable UI components
│   │   ├── Sidebar.tsx     # Main navigation drawer
│   │   └── PostCard.tsx    # Blog post list item
│   ├── theme/              # MUI Theme configuration
│   └── lib/                # Utilities (markdown parsing)
└── next.config.ts          # Static export configuration
```

## 🛠️ Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/EliHei2/elihei2.github.io.git
    cd elihei2.github.io
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the site.

4.  **Build for production**:
    ```bash
    npm run build
    ```
    The static output will be generated in the `out/` directory.

## 📄 License
© 2026 Elyas Heidari. All Rights Reserved.
