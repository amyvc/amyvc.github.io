
# Personal Website & Professional Portfolio

Personal website and professional portfolio showcasing technical delivery expertise, product strategy, leadership philosophy, and ongoing work in AI governance and continuous learning.

**Live Domain:** [https://amrutha.org](https://amrutha.org) *(Professional Portfolio)* | [https://amrutha.org/beyondwork](https://amrutha.org/beyondwork) *(Personal Site)*

---

## Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Hugo** | Static site generation and content-template separation |
| **HTML5** | Semantic page structure and reusable layout partials |
| **CSS3** | Custom responsive design and Bento grid architecture |
| **Vanilla JavaScript** | Interactive case study drawers and UI interactions |
| **Markdown & TOML** | Structured content management and front-matter metadata |
| **JSON** | Structured portfolio data *(planned)* |
| **GitHub Pages** | Static website hosting configured for custom domain (`amrutha.org`) |
| **GitHub Actions** | Automated build and deployment pipeline *(planned)* |

---

## Design System

Custom Hugo theme (**Dark Editorial Elegance**) built around high-contrast editorial typography and restrained visual hierarchy:

- **Deep Forest:** `#142622` *(Primary background)*
- **Forest Green:** `#243E38` *(Card and surface elevation)*
- **Muted Gold:** `#C4A77D` *(Primary accents and metrics)*
- **Dusty Rose:** `#B88B7E` *(Secondary highlights)*
- **Warm Ivory:** `#FAF5EF` *(Primary typography)*

---

## Project Structure

```text
├── content/                  # Markdown pages, case studies, and Insights articles
├── data/                     # Structured project and portfolio data
├── themes/
│   └── amrutha/              # Custom Hugo theme
│       ├── assets/           # Custom CSS stylesheets and vanilla JS
│       ├── layouts/          # Page templates and reusable partials
│       └── static/           # Static assets and media
└── hugo.toml                 # Site configuration and navigation menus

```

---

## Local Development

### Prerequisites

* **Hugo** (`v0.170.0` or compatible extended version)
* **Git**
* **Ubuntu / Linux** environment *(local build environment migrated to Ubuntu following Windows Smart App Control configuration)*
* **Visual Studio Code** *(optional)*

### Clone & Run Locally

```bash
git clone [https://github.com/amyvc/amyvc.github.io.git](https://github.com/amyvc/amyvc.github.io.git)
cd amyvc.github.io
git switch development
hugo server -D

```

Open `http://localhost:1313/` in your browser to preview the site locally (including draft content via `-D`).

---

## License

Copyright © 2026 Amrutha. All rights reserved.
