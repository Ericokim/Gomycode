const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

function isWorkingHours(requestTime = new Date()) {
  const day = requestTime.getDay();
  const hour = requestTime.getHours();

  const isWeekday = day >= 1 && day <= 5;
  const isOpenHour = hour >= 9 && hour < 17;

  return isWeekday && isOpenHour;
}

function workingHoursMiddleware(req, res, next) {
  if (isWorkingHours()) {
    return next();
  }

  return res.status(403).send(renderPage({
    title: "Closed",
    heading: "We are currently closed",
    activePath: "",
    intro: "BrightPath Studio is available during standard working hours.",
    content: `
      <div class="info-card">
        <h2>Working hours</h2>
        <p>Monday to Friday, 9:00 to 17:00.</p>
        <p>Please come back during working hours to view our pages.</p>
      </div>
    `
  }));
}

function renderPage({ title, heading, activePath, intro, content }) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Our Services" },
    { href: "/contact", label: "Contact us" }
  ];

  const navLinks = links
    .map((link) => {
      const activeClass = link.href === activePath ? " active" : "";
      return `<a class="nav-link${activeClass}" href="${link.href}">${link.label}</a>`;
    })
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title} | BrightPath Studio</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <header class="site-header">
          <nav class="navbar" aria-label="Main navigation">
            <a class="brand" href="/">BrightPath Studio</a>
            <div class="nav-links">
              ${navLinks}
            </div>
          </nav>
        </header>

        <main class="page-shell">
          <section class="hero">
            <div class="hero-content">
              <p class="eyebrow">BrightPath Studio</p>
              <h1>${heading}</h1>
              <p class="intro">${intro}</p>
            </div>
            <div class="hero-card">
              <span class="status-dot"></span>
              <p>Open Monday to Friday</p>
              <strong>9:00 - 17:00</strong>
            </div>
          </section>

          <section class="page-content">
            ${content}
          </section>
        </main>
      </body>
    </html>
  `;
}

app.use(workingHoursMiddleware);

app.get("/", (req, res) => {
  res.send(renderPage({
    title: "Home",
    heading: "Digital services that help teams launch with confidence",
    activePath: "/",
    intro: "We plan, design, and build practical websites for small businesses that need clear communication and reliable delivery.",
    content: `
      <div class="feature-grid">
        <article class="info-card">
          <h2>Clean websites</h2>
          <p>Modern pages built around your message, your services, and your customers.</p>
        </article>
        <article class="info-card">
          <h2>Focused delivery</h2>
          <p>Simple project planning, fast feedback, and polished results without unnecessary complexity.</p>
        </article>
      </div>
    `
  }));
});

app.get("/services", (req, res) => {
  res.send(renderPage({
    title: "Our Services",
    heading: "Services for your next online launch",
    activePath: "/services",
    intro: "Choose the support you need, from a landing page to practical maintenance for an existing site.",
    content: `
      <div class="feature-grid">
        <article class="info-card">
          <h2>Website design</h2>
          <p>Responsive pages with clear structure, readable content, and a professional finish.</p>
        </article>
        <article class="info-card">
          <h2>Landing pages</h2>
          <p>Focused pages for products, campaigns, events, and service launches.</p>
        </article>
        <article class="info-card">
          <h2>Website support</h2>
          <p>Small updates, content changes, and technical fixes for business websites.</p>
        </article>
      </div>
    `
  }));
});

app.get("/contact", (req, res) => {
  res.send(renderPage({
    title: "Contact us",
    heading: "Tell us what you want to build",
    activePath: "/contact",
    intro: "Share your project goals and we will help you choose the simplest next step.",
    content: `
      <div class="contact-panel">
        <p><strong>Email:</strong> hello@brightpath.example</p>
        <p><strong>Phone:</strong> +1 555 012 4488</p>
        <p><strong>Address:</strong> 120 Market Street, Suite 4</p>
      </div>
    `
  }));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
