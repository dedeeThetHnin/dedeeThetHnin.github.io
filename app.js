document.addEventListener("DOMContentLoaded", () => {
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // 1. LIGHT / DARK MODE TOGGLE
  const savedTheme = localStorage.getItem("thet-portfolio-theme") || "light";
  setTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const nextTheme = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });

  function setTheme(theme) {
    htmlEl.setAttribute("data-theme", theme);
    localStorage.setItem("thet-portfolio-theme", theme);
    themeIcon.textContent = theme === "dark" ? "☼" : "☾";
  }

  // 2. RELEVANT COURSES ACCORDION (Year 1, Year 2 & Year 3)
  const coursesToggle = document.getElementById("courses-toggle");
  const coursesPanel = document.getElementById("courses-panel");
  const coursesList = document.getElementById("courses-list");
  const courseTabs = document.querySelectorAll(".course-tab");

  function renderCourses(yearKey) {
    const list = (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.courses[yearKey]) || [];
    coursesList.innerHTML = list
      .map(
        (c) => `
        <div class="course-item">
          <div class="course-code">${c.code}</div>
          <div class="course-name">${c.name}</div>
        </div>
      `
      )
      .join("");
  }

  renderCourses("year1");

  coursesToggle.addEventListener("click", () => {
    const isExpanded = coursesToggle.getAttribute("aria-expanded") === "true";
    coursesToggle.setAttribute("aria-expanded", String(!isExpanded));
    coursesPanel.hidden = isExpanded;
  });

  courseTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      courseTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderCourses(tab.dataset.year);
    });
  });

  // 3. RENDER & TOGGLE 2x2 PROJECTS GRID UNDER ABOUT SECTION
  const projectsShowcase = document.getElementById("projects-showcase");
  const projectsGrid = document.getElementById("projects-grid");
  const projectsCardTrigger = document.getElementById("projects-card-trigger");
  const projectsCardAction = document.getElementById("projects-card-action");

  function renderProjectCards() {
    const projects = (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.projects) || [];
    projectsGrid.innerHTML = projects
      .map((p) => {
        const coverSrc = p.coverImage || (p.images && p.images[0]) || "";
        return `
        <article class="project-showcase-card">
          <div class="project-preview ${p.theme || "theme-blue"}">
            ${
              coverSrc
                ? `<img src="${coverSrc}" alt="${p.title} preview" class="project-cover-img" onerror="this.remove()" />`
                : ""
            }
            <div class="wireframe-window" aria-hidden="true">
              <div class="wireframe-dots"><span></span><span></span><span></span></div>
              <div class="wireframe-body">
                <div class="wf-col-left"></div>
                <div class="wf-col-mid"><div class="wf-box"></div><div class="wf-box"></div></div>
                <div class="wf-col-right"><div class="wf-box"></div><div class="wf-box"></div></div>
              </div>
            </div>
          </div>

          <div class="project-card-body">
            <div class="project-meta-row">
              <span>${p.meta || p.date}</span>
              <span>${p.number || ""}</span>
            </div>
            <h3 class="project-card-title">${p.title}</h3>
            <p class="project-card-subtitle">${p.subtitle || ""}</p>

            <div class="project-card-links">
              <button type="button" class="project-link-btn" data-project-detail="${p.id}">
                View details <span>↗</span>
              </button>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${
                  p.liveUrl
                    ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-github-pill">Live site ↗</a>`
                    : ""
                }
                ${
                  p.github
                    ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project-github-pill">GitHub ↗</a>`
                    : ""
                }
              </div>
            </div>
          </div>
        </article>
      `;
      })
      .join("");

    // Attach click listeners to each "View details ↗" button
    projectsGrid.querySelectorAll("[data-project-detail]").forEach((btn) => {
      btn.addEventListener("click", () => {
        openProjectDetailModal(btn.getAttribute("data-project-detail"));
      });
    });
  }

  renderProjectCards();

  function toggleProjectsGrid(forceOpen = false) {
    const isHidden = projectsShowcase.hidden;
    const shouldOpen = forceOpen ? true : isHidden;

    projectsShowcase.hidden = !shouldOpen;
    if (projectsCardTrigger) {
      projectsCardTrigger.classList.toggle("is-active", shouldOpen);
      projectsCardTrigger.setAttribute("aria-expanded", String(shouldOpen));
    }
    if (projectsCardAction) {
      projectsCardAction.textContent = shouldOpen ? "Hide projects ↑" : "Explore projects ↗";
    }

    if (shouldOpen) {
      projectsShowcase.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  document.querySelectorAll("[data-toggle-projects]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const isHeroBtn = el.classList.contains("btn-primary");
      if (isHeroBtn) {
        e.preventDefault();
        toggleProjectsGrid(true);
      } else {
        toggleProjectsGrid(false);
      }
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleProjectsGrid(false);
      }
    });
  });

  // 4. MODALS FOR EXPERIENCES, HOBBIES & INDIVIDUAL PROJECT DETAILS
  const modalOverlay = document.getElementById("modal-overlay");
  const modalContainer = modalOverlay.querySelector(".modal-container");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");

  document.querySelectorAll("[data-open-modal]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openModal(trigger.getAttribute("data-open-modal"));
    });
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(trigger.getAttribute("data-open-modal"));
      }
    });
  });

  function openProjectDetailModal(projectId) {
    const projects = (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.projects) || [];
    const proj = projects.find((item) => item.id === projectId);
    if (!proj) return;

    if (modalContainer) {
      modalContainer.classList.add("is-project-modal");
    }

    const images = Array.isArray(proj.images) ? proj.images : [];
    let currentIndex = 0;

    const hasPhotos = images.length > 0;
    const hasMultiple = images.length > 1;

    modalBody.innerHTML = `
      <!-- TOP BANNER: PHOTO SLIDER OR FALLBACK WIREFRAME -->
      <div class="modal-hero-banner project-preview ${proj.theme || "theme-blue"}">
        ${
          hasPhotos
            ? `
            <div class="modal-carousel-track" id="modal-carousel-track">
              <img
                id="modal-active-slide"
                src="${images[0]}"
                alt="${proj.title} screenshot 1"
                class="modal-slide-img"
                onerror="document.getElementById('modal-carousel-track').style.display='none'; if(document.getElementById('carousel-prev')) document.getElementById('carousel-prev').style.display='none'; if(document.getElementById('carousel-next')) document.getElementById('carousel-next').style.display='none'; if(document.getElementById('carousel-dots')) document.getElementById('carousel-dots').style.display='none'; document.getElementById('modal-fallback-wf').style.display='flex';"
              />
            </div>
            ${
              hasMultiple
                ? `
                <button type="button" id="carousel-prev" class="carousel-arrow prev" aria-label="Previous photo">‹</button>
                <button type="button" id="carousel-next" class="carousel-arrow next" aria-label="Next photo">›</button>
                <div class="carousel-dots" id="carousel-dots">
                  ${images
                    .map(
                      (_, idx) =>
                        `<button type="button" class="carousel-dot ${idx === 0 ? "active" : ""}" data-slide="${idx}" aria-label="Go to photo ${idx + 1}"></button>`
                    )
                    .join("")}
                </div>
              `
                : ""
            }
          `
            : ""
        }

        <!-- Wireframe Fallback if no photos are uploaded yet -->
        <div id="modal-fallback-wf" class="wireframe-window" style="${hasPhotos ? "display: none;" : "display: flex;"}" aria-hidden="true">
          <div class="wireframe-dots"><span></span><span></span><span></span></div>
          <div class="wireframe-body">
            <div class="wf-col-left"></div>
            <div class="wf-col-mid"><div class="wf-box"></div><div class="wf-box"></div></div>
            <div class="wf-col-right"><div class="wf-box"></div><div class="wf-box"></div></div>
          </div>
        </div>
      </div>

      <!-- BOTTOM CONTENT -->
      <div class="modal-project-content">
        <p class="eyebrow">${proj.meta || proj.date}</p>
        <h2 id="modal-title" class="modal-section-title">${proj.fullTitle || proj.title}</h2>
        <p class="modal-project-summary">${proj.summary || (proj.bullets && proj.bullets[0]) || ""}</p>

        <ul class="modal-bullets" style="margin-bottom: 20px;">
          ${(proj.bullets || []).map((b) => `<li>${b}</li>`).join("")}
        </ul>

        <div class="tag-row">
          ${(proj.tech || []).map((t) => `<span class="modal-pill-tag">${t}</span>`).join("")}
        </div>

        <div class="modal-project-footer">
          <span class="modal-footer-note">
            ${
              hasPhotos
                ? `Showing ${images.length} project screenshot${images.length > 1 ? "s" : ""} · Use arrows to browse.`
                : "Interface concept · Project images and demo links can be added as they're available."
            }
          </span>
          <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 4px;">
            ${
              proj.liveUrl
                ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="modal-github-link">
                    Visit live website <span>↗</span>
                  </a>`
                : ""
            }
            ${
              proj.github
                ? `<a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="modal-github-link">
                    View GitHub repository <span>↗</span>
                  </a>`
                : ""
            }
          </div>
        </div>
      </div>
    `;

    // Wire up Next / Previous buttons and Dots
    if (hasMultiple) {
      const slideImg = document.getElementById("modal-active-slide");
      const prevBtn = document.getElementById("carousel-prev");
      const nextBtn = document.getElementById("carousel-next");
      const dots = modalBody.querySelectorAll(".carousel-dot");

      function showSlide(index) {
        currentIndex = (index + images.length) % images.length;
        slideImg.src = images[currentIndex];
        slideImg.alt = `${proj.title} screenshot ${currentIndex + 1}`;
        dots.forEach((dot, idx) => {
          dot.classList.toggle("active", idx === currentIndex);
        });
      }

      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showSlide(currentIndex - 1);
      });

      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showSlide(currentIndex + 1);
      });

      dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          showSlide(Number(dot.getAttribute("data-slide")));
        });
      });
    }

    modalOverlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function openModal(type) {
    if (modalContainer) {
      modalContainer.classList.remove("is-project-modal");
    }

    const data = window.PORTFOLIO_DATA;
    if (type === "experiences") {
      const expHtml = data.experiences
        .map(
          (exp) => `
          <div class="modal-item-card">
            <div class="modal-item-header">
              <h3 class="modal-item-title">${exp.role}</h3>
              <span class="modal-item-date">${exp.date}</span>
            </div>
            <ul class="modal-bullets">
              ${exp.bullets.map((b) => `<li>${b}</li>`).join("")}
            </ul>
          </div>
        `
        )
        .join("");

      const skillsHtml = Object.entries(data.skills)
        .map(
          ([category, items]) => `
          <div class="modal-item-card">
            <h4 class="modal-item-title" style="font-size:1rem; margin-bottom:8px;">${category}</h4>
            <div class="tag-row">
              ${items.map((skill) => `<span class="tech-tag">${skill}</span>`).join("")}
            </div>
          </div>
        `
        )
        .join("");

      modalBody.innerHTML = `
        <p class="eyebrow">01 / WORK & TECHNICAL TOOLKIT</p>
        <h2 id="modal-title" class="modal-section-title">experiences &amp; skills</h2>
        <p class="modal-subtitle">Software development, neuroscience LLM research, and technical skills.</p>
        ${expHtml}
        <h3 class="modal-section-title" style="font-size:1.6rem; margin: 28px 0 14px;">technical skills</h3>
        ${skillsHtml}
      `;
    } else if (type === "hobbies") {
      const hobbiesHtml = data.hobbies
        .map(
          (h) => `
          <div class="modal-item-card">
            <h3 class="modal-item-title" style="margin-bottom:8px;">${h.title}</h3>
            <p style="color: var(--text-secondary); font-size:0.95rem;">${h.desc}</p>
          </div>
        `
        )
        .join("");

      modalBody.innerHTML = `
        <p class="eyebrow">03 / LIFE</p>
        <h2 id="modal-title" class="modal-section-title">hobbies</h2>
        <p class="modal-subtitle">Creative rituals away from the screen.</p>
        ${hobbiesHtml}
      `;
    }

    modalOverlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.hidden = true;
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalOverlay.hidden) closeModal();
  });

  // 5. SUBTLE CONSTELLATION / PARTICLE CANVAS BACKGROUND
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  for (let i = 0; i < 36; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = htmlEl.getAttribute("data-theme") === "dark";
    ctx.fillStyle = isDark ? "rgba(216, 180, 254, 0.25)" : "rgba(147, 51, 234, 0.16)";
    ctx.strokeStyle = isDark ? "rgba(216, 180, 254, 0.07)" : "rgba(147, 51, 234, 0.06)";

    particles.forEach((p, idx) => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = idx + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
});