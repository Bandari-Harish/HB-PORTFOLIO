# 💼 HB Portfolio

A modern, responsive personal portfolio website built with **React, Vite, Bootstrap, and SCSS**. It showcases my skills, experience, education, projects, achievements, and a working contact section — with all content loaded dynamically from a live REST API.

> As a **Frontend Developer**, this project focuses on building a polished, accessible, and performant React interface. The `Backend/` folder exists only to serve data to this frontend.

---

## 📸 Preview

Screenshots are coming soon.

> Replace the placeholders below once screenshots are captured:

```
![Home Section](screenshots/home.png)
![Projects Section](screenshots/projects.png)
![Admin Dashboard](screenshots/dashboard.png)
```

---

## 🚀 Live Demo

Frontend (GitHub Pages)

<a href="https://bandari-harish.github.io/HB-PORTFOLIO/" target="_blank">
    🌐 Live Demo
</a>

Backend API (Render)

```
https://hb-portfolio-n59p.onrender.com/api/profile
```

---

## ✨ Features

- 🏠 Hero section with animated typewriter effect
- ✨ Interactive particle background
- 👤 Profile / About section with career objective and stats
- 🛠️ Skills section
- 💼 Experience timeline
- 🎓 Education section
- 🗂️ Projects with modal detail view
- 🏆 Achievements section
- 📩 Working contact form (saves messages & sends email notifications)
- 🌙 Dark & Light theme toggle (persisted to localStorage)
- 🔐 Admin login with protected dashboard
- 📝 Admin dashboard for managing portfolio content (CRUD)
- ⚡ Dynamic data fetched live from a REST API via Axios
- 📱 Fully responsive design
- 🎨 Modern glassmorphism-inspired UI

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| React 19 | UI development |
| Vite 8 | Build tool & dev server |
| JavaScript (ES6+) | Application logic |
| React Router 7 | Routing (public + protected admin routes) |
| Bootstrap 5 & React-Bootstrap | Responsive layout & components |
| SCSS (Sass) | Custom styling with variables and partials |
| Axios | REST API integration |
| tsparticles | Animated hero background |
| react-type-animation | Typewriter text effect |
| react-scroll-progress-read | Reading progress indicator |
| Font Awesome & Remixicon | Icons |
| Google Fonts (Inter, Outfit) | Typography |
| GitHub Pages | Frontend deployment |

---

## 📂 Project Structure

```
HB-PORTFOLIO
│
├── Frontend/
│   ├── public/
│   │   └── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── css/
│   │   │   └── scss/
│   │   │
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Achivements.jsx
│   │   │   └── Contact.jsx
│   │   │
│   │   ├── layout-components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Main-Layout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── PortfolioPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── Admin Dashbaord/
│   │   │
│   │   ├── routes/
│   │   │   ├── routes.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── utilities/
│   │   │   ├── api/
│   │   │   ├── context/
│   │   │   ├── Particles.jsx
│   │   │   ├── ProjectModalCard.jsx
│   │   │   ├── ErrorCard.jsx
│   │   │   └── SuccessCard.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── global.scss
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── Backend/
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── models/
│       └── config/
│
└── README.md
```

---

## 🧩 Frontend Architecture

The frontend is organized into reusable components, layout components, pages, routes, and utilities.

- **Components** (`src/components/`) — one section per feature: `Home`, `About`, `Skills`, `Experience`, `Education`, `Projects`, `Achievements`, and `Contact`. Each component reads its data from the shared `PortfolioContext`.
- **Layout** (`src/layout-components/`) — `Header`, `Footer`, and `Main-Layout` wrap the portfolio page, providing navigation, theme toggle, and a reading progress bar.
- **Routing** (`src/routes/`) — React Router handles two public areas and a protected admin area:
  - `/` → Portfolio page
  - `/login` → Admin sign-in page
  - `/admin` → Protected dashboard (redirects to `/login` when no token exists)
- **State management** (`src/utilities/context/`) — two React contexts:
  - `ThemeContext` — dark/light theme, persisted to `localStorage`
  - `PortfolioContext` — fetches and shares all portfolio data across components
- **API layer** (`src/utilities/api/api.js`) — a single Axios instance with a JWT authorization interceptor, keeping API logic centralized and reusable.

---

## 🔗 Backend Integration

The React frontend communicates with a separate **REST API** built with **Node.js, Express, and MongoDB (Mongoose)**, deployed on **Render**.

The backend provides data for every section of the portfolio and supports admin authentication and content management. It is kept as a supporting service — the focus of this repository is the frontend implementation.

---

## ⚙️ API Integration

All requests are made through a shared **Axios** instance (`src/utilities/api/api.js`), which automatically attaches the admin JWT token to authorized requests.

The frontend uses the following API groups:

| Endpoint | Purpose |
|----------|---------|
| `/api/profile` | Profile / about information |
| `/api/skills` | Skills list |
| `/api/experience` | Work experience |
| `/api/education` | Education history |
| `/api/projects` | Projects list |
| `/api/achievements` | Achievements |
| `/api/messages` | Contact form submissions |
| `/api/auth` | Admin login |

`PortfolioContext` loads the first six collections in parallel with `Promise.allSettled`, so the page renders even if one section temporarily fails.

> 🔒 No API keys, tokens, or credentials are stored in the frontend. The admin password and JWT secret live only in the backend environment.

---

## 🚀 Deployment

### Frontend — GitHub Pages

The frontend is built with Vite and deployed to **GitHub Pages**:

```
https://bandari-harish.github.io/HB-PORTFOLIO/
```

Because the site is served from the `/HB-PORTFOLIO/` sub-path, two settings are configured:

- `base: '/HB-PORTFOLIO/'` in `vite.config.js`
- `basename="/HB-PORTFOLIO"` on the `BrowserRouter` so React Router matches URLs correctly

The production build is output to `Frontend/preview/`.

### Backend — Render

The API is hosted on **Render** at:

```
https://hb-portfolio-n59p.onrender.com
```

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (18+ recommended, includes npm)

---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/Bandari-Harish/HB-PORTFOLIO.git
```

Navigate to the frontend

```bash
cd HB-PORTFOLIO/Frontend
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 🔑 Environment Setup

No environment variables are required to run the frontend. The backend API URL is configured directly in `src/utilities/api/api.js`:

```js
const api = axios.create({
  baseURL: "https://hb-portfolio-n59p.onrender.com/api",
});
```

The backend itself loads its own configuration (database URI, JWT secret, admin credentials) from a `.env` file, which is **never committed** to the repository.

---

## 📱 Responsive Design

The portfolio is optimized for

- 💻 Desktop
- 💼 Laptop
- 📱 Mobile
- 📟 Tablet

Bootstrap's grid system and custom SCSS breakpoints adapt the layout to every screen size, including a mobile navigation menu.

---

## 📄 Pages / Sections

The single-page portfolio contains these sections:

- 🏠 **Home** — hero, animated roles, quick actions, social links
- 👤 **About** — who I am, career objective, key facts, stats
- 🛠️ **Skills** — skills with icons
- 💼 **Experience** — professional timeline
- 🎓 **Education** — academic background
- 🗂️ **Projects** — project cards and modal details
- 🏆 **Achievements** — highlights
- 📩 **Contact** — contact info and working message form

Plus two dedicated routes:

- 🔐 **Login** (`/login`) — admin sign-in
- 🛠️ **Admin Dashboard** (`/admin`) — manage portfolio content (protected)

---

## 🎯 Future Improvements

- Migrate to TypeScript for type-safe development
- Add automated tests (unit + end-to-end)
- Add image uploads for profile and project thumbnails
- Improve SPA deep-link handling (e.g., refreshing `/login`)
- Add multi-language support
- Add project filtering / search
- Add toast notifications for better UX feedback

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Create a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for more information.

---

## 👨‍💻 Author

**Harish Bandari**

GitHub

<a href="https://github.com/Bandari-Harish">
    GitHub Profile
</a>

Repository

<a href="https://github.com/Bandari-Harish/HB-PORTFOLIO">
    GitHub Repository
</a>

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates further development.
