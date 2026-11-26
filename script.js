"use strict";
const translations = {
  en: {
    "practice.linde": "Linde Austria · through Motius:",
    "practice.title": "Experience by discipline",
    "practice.projects": "projects",
    "practice.apps": "App development",
    "practice.apps.topics": "iOS · Android · Flutter · SwiftUI",
    "practice.apps.0": "Contribution to the shop app, with Shopware integration and automated releases. Smooth interaction on budget Android phones was a central requirement.",
    "practice.apps.1": "Development of a reusable Flutter app with CMS content and offline synchronisation.",
    "practice.apps.2": "Contribution to the medical app supporting obesity treatment, including Bluetooth fitness hardware integration and video chat.",
    "practice.apps.3": "Contribution to a Flutter app supporting breast cancer patients, intended for DiGA certification.",
    "practice.apps.4": "Development of an app for location-based apprenticeship search.",
    "practice.apps.5": "Led app development on behalf of Soccerbrands, from planning to iOS and Android implementation.",
    "practice.apps.6": "Flutter app for photo competitions and swipe-based voting.",
    "practice.apps.7": "Cross-platform multiplayer with matchmaking and AI opponents.",
    "practice.apps.8": "Supported app development for tracking oxygen deliveries on behalf of Motius.",
    "practice.web": "Web & e-commerce",
    "practice.web.topics": "React · Shopify · CMS · Prototyping",
    "practice.web.0": "Technical evaluation, prototyping and implementation of a 360° product view in Shopify, including delivery windows. The work also included product photography and isolating tree images.",
    "practice.web.1": "Product and frontend development with TypeScript and React.",
    "practice.web.2": "React frontend development for secure data rooms.",
    "practice.web.3": "Development of a Flutter CMS whose content preview uses the same components as the app.",
    "practice.web.scope": "For design and prototyping, I use Figma, Sketch, Adobe XD, Blender and Photoshop as appropriate to the task.",
    "practice.backend": "Backend development",
    "practice.backend.topics": "APIs · Data models · Synchronisation",
    "practice.backend.0": "Development and maintenance of the central GraphQL proxy: connecting backends, evolving data models and maintaining compatibility as systems change.",
    "practice.backend.1": "Microservices, CQRS and event sourcing, plus migration of highly sensitive data. Consistency and protection of confidential information were central requirements.",
    "practice.backend.2": "Backend for tracking oxygen deliveries: data synchronisation APIs, real-time integration with Firebase and support for app development.",
    "practice.backend.3": "Go backend services, a web crawler and location-based search with Bleve.",
    "practice.backend.4": "Backend architecture prototype, Go services and a custom offline synchronisation mechanism.",
    "practice.backend.5": "Go backend with PostgreSQL for photo competitions, voting and partner integration.",
    "practice.backend.6": "Serverless Firebase backend in TypeScript for the app.",
    "practice.backend.7": "Firebase backend with matchmaking for players and AI opponents.",
    "practice.cloud": "Cloud, operations & quality",
    "practice.cloud.topics": "Deployments · Infrastructure · Tests",
    "practice.cloud.0": "AWS Lambda integration for the central GraphQL proxy, focusing on performance and reliability.",
    "practice.cloud.1": "Development with AWS and LocalStack for local cloud environments.",
    "practice.cloud.2": "Google Cloud and Docker for backend services.",
    "practice.cloud.3": "Kubernetes and Telekom Cloud in the Kontina project, alongside integration and unit tests for the app and backend.",
    "practice.cloud.4": "Automated releases of the shop app for iOS and Android.",
    "practice.cloud.5": "CI/CD, Jest tests and code reviews for the app and serverless backend.",
    "practice.cloud.6": "Handling traffic spikes during photo competitions.",
    "practice.cloud.7": "Backend development with Google Cloud Functions and real-time synchronisation through Firebase on behalf of Motius.",
    "practice.cloud.8": "Firebase and Google Cloud as the basis of the multiplayer backend.",
    "practice.cloud.scope": "Database, messaging and RPC experience includes PostgreSQL, MySQL, MongoDB, Cassandra, Neo4j, RabbitMQ and gRPC.",
    "practice.security": "Security & medical software",
    "practice.security.topics": "Sensitive data · Devices · Requirements",
    "practice.security.0": "Secure data rooms, Vault for cluster credentials and confidential data migration in a microservices environment.",
    "practice.security.1": "Development under medical software requirements, Bluetooth integration with fitness hardware and video chat integration.",
    "practice.security.2": "Contribution to an app intended for DiGA certification and coordination of backend APIs.",
    "practice.security.3": "Data synchronisation APIs with privacy requirements for tracking oxygen deliveries.",
    "practice.consulting": "Consulting & teams",
    "practice.consulting.topics": "Architecture · Roadmap · Collaboration",
    "practice.consulting.0": "Architecture and schema design, system analysis, cross-team troubleshooting and stakeholder coordination.",
    "practice.consulting.1": "Technical due diligence, modernisation and a strategic roadmap for a film and media production platform, including quality assurance, scalability and recruiting support.",
    "practice.consulting.2": "Mentoring the existing development team.",
    "practice.consulting.3": "Planning, development leadership, coaching and introducing code reviews.",
    "practice.consulting.4": "As a co-founder, I combine product development with sales and business development.",
    "practice.ai": "AI, search & data",
    "practice.ai.topics": "LLMs · Models · Training · Embeddings",
    "practice.ai.0": "LLM and prompt engineering, matching skills with projects, and integration in TypeScript and React, alongside machine learning methods and ongoing product development.",
    "practice.ai.1": "Web crawling and location-based search with Bleve for apprenticeships.",
    "practice.ai.2": "Matchmaking and game AI for a multiplayer app.",
    "practice.ai.scope": "My offering also covers AI workflows, model selection and evaluation, training and embeddings, combined with user interfaces, APIs, tests and production operations. Other tools in my practice include Ollama, HDBSCAN, TensorFlow and NumPy.",
    "case.imageAlt": "projectfit.ai: dashboard with project suggestions and matching skills",
    "case.zoom": "Enlarge view ↗",
    "case.caption": "projectfit.ai · Project overview",
    "case.problem": "Keyword search fails in recruiting because the same skill is described differently from project to project. projectfit.ai solves this semantically, matching freelancers and project requirements with precision.",
    "case.detail": "As co-founder, I lead product and frontend development (TypeScript, React) as well as LLM and prompt engineering, alongside sales and customer feedback. I bring this product perspective directly into my consulting work.",
    "principle.0.title": "Start with the real problem.",
    "principle.0.text": "Before talking about technology, we look at your users’ day-to-day reality: where is time lost, where do workflows break down? That defines what the software actually needs to do.",
    "principle.1.title": "Choose technology for the task.",
    "principle.1.text": "Not every new technology solves a real problem. I choose solutions based on what can be sensibly reused and what your team can operate later without external dependency.",
    "principle.2.title": "Test early, refine deliberately.",
    "principle.2.text": "Instead of specifying in isolation for months, we put a usable version into real hands early. Feedback from real use guides the next steps.",
    portfolio: "View portfolio (PDF)",
    "case.kicker": "Own product",
    "case.context": "AI-powered project matching for IT freelancers",
    "case.link": "View the project in my portfolio",
    "service.0.title": "Architecture & technical decisions",
    "service.0.text":
      "Planning a modernisation, hitting scaling limits or looking for a second opinion? I review existing systems, weigh options realistically and work with you on a solid roadmap.",
    "service.1.title": "Apps, web & backend engineering",
    "service.1.text":
      "I do not just advise on slides, I help build it: from API architecture and modern web or mobile apps to reliable cloud operations.",
    "service.2.title": "Production-ready AI applications",
    "service.2.text":
      "There is a big gap between an impressive AI prototype and dependable software. I build LLM applications that are controllable, measurable and robust enough for production.",
    "service.3.title": "Sparring & support for your team",
    "service.3.text":
      "I join ongoing projects, resolve technical bottlenecks and pass on knowledge through architecture work, code reviews and day-to-day collaboration.",
    "client.freenet":
      "Architecture and evolution of the central GraphQL proxy, including API design, data modelling and reliable integration of multiple backends.",
    "client.zeit":
      "Development of the ZEIT Shop app with Shopware integration, automated iOS and Android releases, and smooth performance even on budget devices.",
    "client.brainloop":
      "Microservices, secure data rooms and consistent migration of highly sensitive customer data under strict security requirements.",
    "client.aidhere":
      "App and backend engineering for regulated healthcare applications, alongside technical mentoring of the development team.",
    "nav.services": "Services",
    "nav.references": "Projects",
    "nav.approach": "Approach",
    "nav.research": "Research",
    "nav.contact": "Contact",
    "hero.eyebrow": "Nino Wagensonner · Software, architecture & AI",
    "hero.title":
      'Software, architecture<br><span class="accent">and production AI.</span>',
    "hero.intro":
      "I support companies and product teams where technical decisions become expensive in the long run: architecture, engineering and production AI. I think from the business model down to the code and build software your team can maintain and evolve.",
    "hero.cta": "Discuss your project",
    "hero.years": "18+",
    "hero.experience":
      "Years of experience in software engineering and architecture, from startup prototypes to enterprise systems.",
    "hero.location": "Munich · Remote & on-site",
    "references.kicker": "Project experience",
    "references.note": "Selected work",
    "references.title": "Projects and contributions",
    "services.kicker": "Services",
    "services.title": "How I can<br>help you.",
    "approach.kicker": "Approach",
    "approach.title": "A direct path to<br>a professional solution.",
    "approach.text":
      "As a technical generalist, I see the whole picture from user interfaces, backends and infrastructure to AI models, and go deep where it matters most for your project.",
    "approach.aiLabel": "AI in our collaboration",
    "approach.ai":
      "I use modern AI tools across the development process for analysis, prototyping and code. That speeds up delivery, while architecture and quality decisions stay firmly in experienced hands.",
    "research.kicker": "Products & research",
    "company.description":
      "Through my company, Isar Innovations, I build my own software products. Building and running products yourself leads to more realistic consulting decisions.",
    "company.link": "Visit the company",
    "research.title": "Research",
    "research.intro":
      "Alongside client work, we research practical questions in applied AI: how AI agents discover genuinely novel solutions, and how large, inconsistent skill databases can be structured reliably.",
    "research.all": "All research papers",
    "contact.kicker": "Contact",
    "contact.title": "What are you<br>working on?",
    "contact.intro":
      "Tell me briefly about your project or the technical question on your mind. In a non-binding introductory call (around 30 minutes), we will see whether and how I can help.",
    "contact.location": "Unterschleissheim near Munich · Remote & on-site",
    "footer.role": "Software, architecture and production AI",
    "contact.bookTitle": "Arrange a conversation",
    "modal.title": "Request an appointment",
    "modal.name": "Name *",
    "modal.namePlaceholder": "Your name",
    "modal.emailPlaceholder": "your@email.com",
    "modal.company": "Company",
    "modal.companyPlaceholder": "Your company (optional)",
    "modal.submit": "Request appointment",
    "modal.successTitle": "Request sent",
    "modal.successText": "I will get back to you to confirm the appointment.",
  },
};

const ui = {
  de: {
    skip: "Zum Inhalt",
    top: "Nach oben ↑",
    timezone: "Wunschtermin · Europe/Berlin",
    retry: "Erneut versuchen",
    loading: "Termine werden geladen …",
    failed:
      "Termine konnten nicht geladen werden. Bitte erneut versuchen oder per E-Mail Kontakt aufnehmen.",
    empty:
      "Aktuell sind keine Termine hinterlegt. Bitte kontaktieren Sie mich per E-Mail.",
    choose: "Bitte wählen Sie einen Tag.",
    times: "Verfügbare Zeiten:",
    sending: "Wird gesendet …",
    error:
      "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie mich per E-Mail.",
    requested: "Angefragt",
    menu: "Menü",
    close: "Schließen",
    prev: "Vorheriger Monat",
    next: "Nächster Monat",
  },
  en: {
    skip: "Skip to content",
    top: "Back to top ↑",
    timezone: "Requested appointment · Europe/Berlin",
    retry: "Try again",
    loading: "Loading appointments …",
    failed:
      "Appointments could not be loaded. Please try again or contact me by email.",
    empty: "No appointments are currently listed. Please contact me by email.",
    choose: "Please choose a day.",
    times: "Available times:",
    sending: "Sending …",
    error:
      "Your request could not be sent. Please try again or contact me by email.",
    requested: "Requested",
    menu: "Menu",
    close: "Close",
    prev: "Previous month",
    next: "Next month",
  },
};
const originals = new Map();
document
  .querySelectorAll("[data-i18n]")
  .forEach((node) => originals.set(node, node.innerHTML));
const placeholders = new Map();
const imageDescriptions = new Map();
document
  .querySelectorAll("[data-i18n-alt]")
  .forEach((node) => imageDescriptions.set(node, node.alt));
document
  .querySelectorAll("[data-i18n-placeholder]")
  .forEach((node) => placeholders.set(node, node.placeholder));
let currentLang =
  new URLSearchParams(location.search).get("lang") === "en" ? "en" : "de";
const $ = (id) => document.getElementById(id);
const locale = () => (currentLang === "en" ? "en-GB" : "de-DE");
const label = (key) => ui[currentLang][key];
let slots = {};
let month = "";
let selectedDate = "";
let selectedTime = "";
let loadState = "loading";
let submitting = false;
const requested = new Set();
let returnFocus = null;
const modal = $("bookingModal");

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  const url = new URL(location.href);
  url.searchParams.delete("lang");
  if (lang === "en") url.searchParams.set("lang", "en");
  history.replaceState(null, "", url);
  for (const [node, original] of originals) {
    const key = node.dataset.i18n;
    if (key.startsWith("ui.")) {
      node.textContent = label(key.slice(3));
      continue;
    }
    node.innerHTML =
      lang === "en" ? (translations.en[key] ?? original) : original;
  }
  for (const [node, original] of placeholders) {
    node.placeholder =
      lang === "en"
        ? (translations.en[node.dataset.i18nPlaceholder] ?? original)
        : original;
  }
  for (const [node, original] of imageDescriptions) {
    node.alt = lang === "en" ? (translations.en[node.dataset.i18nAlt] ?? original) : original;
  }
  $("langToggle").textContent = lang === "de" ? "EN" : "DE";
  $("langToggle").setAttribute(
    "aria-label",
    lang === "de" ? "EN — Switch to English" : "DE — Auf Deutsch wechseln",
  );
  $("mobileToggle").firstChild.textContent = label("menu") + " ";
  $("closeModal").setAttribute("aria-label", label("close"));
  $("prevMonth").setAttribute("aria-label", label("prev"));
  $("nextMonth").setAttribute("aria-label", label("next"));
  $("calendarGrid").setAttribute(
    "aria-label",
    lang === "de" ? "Kalender" : "Calendar",
  );
  $("timeSlots").setAttribute("aria-label", label("times"));
  $("navLinks").setAttribute(
    "aria-label",
    lang === "de" ? "Hauptnavigation" : "Main navigation",
  );
  document.title =
    lang === "en"
      ? "Nino Wagensonner — Software, architecture and production AI"
      : "Nino Wagensonner — Software, Architektur und produktreife KI";
  renderCalendar();
  renderTimes();
  updateCalendarStatus();
}

function toggleMenu(open) {
  $("navLinks").classList.toggle("is-open", open);
  $("mobileToggle").setAttribute("aria-expanded", String(open));
}
$("mobileToggle").addEventListener("click", () =>
  toggleMenu($("mobileToggle").getAttribute("aria-expanded") !== "true"),
);
document.addEventListener("keydown", (event) => {
  if (
    event.key !== "Escape" ||
    $("mobileToggle").getAttribute("aria-expanded") !== "true"
  )
    return;
  toggleMenu(false);
  $("mobileToggle").focus();
});
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", () => {
    toggleMenu(false);
    const target = document.getElementById(anchor.hash.slice(1));
    if (!target) return;
    target.setAttribute("tabindex", "-1");
    requestAnimationFrame(() => target.focus({ preventScroll: true }));
  });
});
$("langToggle").addEventListener("click", () =>
  setLanguage(currentLang === "de" ? "en" : "de"),
);

function months() {
  return [
    ...new Set(
      Object.keys(slots)
        .sort()
        .map((date) => date.slice(0, 7)),
    ),
  ];
}
function dateLabel(date) {
  return new Intl.DateTimeFormat(locale(), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date + "T12:00:00Z"));
}
function updateCalendarStatus() {
  const messages = {
    loading: "loading",
    failed: "failed",
    empty: "empty",
    ready: "choose",
  };
  $("calendarStatus").textContent = label(messages[loadState]);
  $("calendarStatus").hidden = loadState === "ready" && Boolean(selectedDate);
  $("retrySlots").hidden = loadState !== "failed";
}
function validSlots(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.entries(value).every(
    ([date, times]) =>
      /^\d{4}-\d{2}-\d{2}$/.test(date) &&
      !Number.isNaN(Date.parse(date)) &&
      Array.isArray(times) &&
      times.every(
        (time) =>
          typeof time === "string" && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time),
      ),
  );
}
async function loadSlots() {
  loadState = "loading";
  updateCalendarStatus();
  try {
    const response = await fetch("/api/slots", {
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Slots unavailable");
    const data = await response.json();
    if (!validSlots(data.slots)) throw new Error("Invalid slots response");
    slots = Object.fromEntries(
      Object.entries(data.slots).filter(([, times]) => times.length),
    );
    month = months()[0] ?? "";
    loadState = month ? "ready" : "empty";
  } catch {
    slots = {};
    month = "";
    loadState = "failed";
  }
  renderCalendar();
  updateCalendarStatus();
}
function renderCalendar() {
  const grid = $("calendarGrid");
  grid.replaceChildren();
  const monthList = months();
  const index = monthList.indexOf(month);
  $("prevMonth").disabled = index <= 0;
  $("nextMonth").disabled = index < 0 || index >= monthList.length - 1;
  $("calendarMonth").textContent = "";
  if (!month) return;
  const [year, number] = month.split("-").map(Number);
  $("calendarMonth").textContent = new Intl.DateTimeFormat(locale(), {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, number - 1, 1)));
  const weekdays =
    currentLang === "de"
      ? ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
      : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  for (const name of weekdays) {
    const cell = document.createElement("span");
    cell.className = "calendar-day-header";
    cell.textContent = name;
    grid.append(cell);
  }
  const offset = (new Date(Date.UTC(year, number - 1, 1)).getUTCDay() + 6) % 7;
  for (let i = 0; i < offset; i++) {
    const cell = document.createElement("span");
    cell.setAttribute("aria-hidden", "true");
    grid.append(cell);
  }
  const lastDay = new Date(Date.UTC(year, number, 0)).getUTCDate();
  for (let day = 1; day <= lastDay; day++) {
    const date = `${month}-${String(day).padStart(2, "0")}`;
    const available = Boolean(slots[date]?.length);
    const cell = document.createElement(available ? "button" : "span");
    cell.className = "calendar-day";
    cell.textContent = String(day);
    if (available) {
      cell.type = "button";
      cell.classList.add("available");
      cell.classList.toggle("selected", selectedDate === date);
      cell.dataset.date = date;
      cell.setAttribute("aria-label", dateLabel(date));
      cell.setAttribute("aria-pressed", String(selectedDate === date));
    }
    grid.append(cell);
  }
}
function renderTimes() {
  const container = $("timeSlots");
  container.replaceChildren();
  if (!selectedDate) return;
  const heading = document.createElement("p");
  heading.textContent = `${dateLabel(selectedDate)} · Europe/Berlin`;
  container.append(heading);
  for (const time of slots[selectedDate] ?? []) {
    const button = document.createElement("button");
    const sent = requested.has(`${selectedDate}T${time}`);
    button.type = "button";
    button.className = "time-slot";
    button.dataset.time = time;
    button.disabled = sent;
    button.textContent = sent ? `${time} · ${label("requested")}` : time;
    button.setAttribute(
      "aria-label",
      `${dateLabel(selectedDate)}, ${time}, Europe/Berlin`,
    );
    container.append(button);
  }
}
function moveMonth(direction) {
  const list = months();
  const next = list[list.indexOf(month) + direction];
  if (!next) return;
  month = next;
  selectedDate = "";
  updateCalendarStatus();
  renderCalendar();
  renderTimes();
}
$("prevMonth").addEventListener("click", () => moveMonth(-1));
$("nextMonth").addEventListener("click", () => moveMonth(1));
$("retrySlots").addEventListener("click", loadSlots);
$("calendarGrid").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-date]");
  if (!button) return;
  selectedDate = button.dataset.date;
  updateCalendarStatus();
  renderCalendar();
  renderTimes();
  $("calendarGrid")
    .querySelector(`[data-date="${selectedDate}"]`)
    .focus({ preventScroll: true });
});
$("timeSlots").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-time]");
  if (!button || button.disabled) return;
  selectedTime = button.dataset.time;
  returnFocus = button;
  $("selectedSlotDisplay").textContent =
    `${dateLabel(selectedDate)}, ${selectedTime} · Europe/Berlin`;
  $("modalForm").hidden = false;
  $("modalSuccess").hidden = true;
  $("formError").hidden = true;
  modal.setAttribute("aria-labelledby", "modalTitle");
  modal.showModal();
  $("bookingName").focus();
});
function closeModal() {
  if (submitting) return;
  modal.close();
}
$("closeModal").addEventListener("click", closeModal);
modal.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  const controls = [
    ...modal.querySelectorAll(
      "button:not(:disabled), input:not(:disabled), a[href]",
    ),
  ].filter((node) => node.getClientRects().length);
  const first = controls[0];
  const last = controls.at(-1);
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
    return;
  }
  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
modal.addEventListener("cancel", (event) => {
  if (submitting) event.preventDefault();
});
modal.addEventListener("click", (event) => {
  if (event.target !== modal) return;
  const rect = modal.getBoundingClientRect();
  if (
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom
  )
    return;
  closeModal();
});
modal.addEventListener("close", () => {
  const target =
    returnFocus?.isConnected && !returnFocus.disabled
      ? returnFocus
      : $("calendarGrid").querySelector('button[aria-pressed="true"]');
  target?.focus({ preventScroll: true });
});
$("bookingForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (submitting || !$("bookingForm").reportValidity()) return;
  const slot = `${selectedDate}T${selectedTime}`;
  if (!slots[selectedDate]?.includes(selectedTime) || requested.has(slot))
    return;
  const button = document.querySelector(".form-submit");
  submitting = true;
  button.disabled = true;
  $("closeModal").disabled = true;
  button.textContent = label("sending");
  $("formError").hidden = true;
  try {
    const response = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(20000),
      body: JSON.stringify({
        name: $("bookingName").value,
        email: $("bookingEmail").value,
        company: $("bookingCompany").value,
        slot,
      }),
    });
    const result = await response.json();
    if (!response.ok || result.success !== true)
      throw new Error("Request rejected");
    requested.add(slot);
    $("modalForm").hidden = true;
    $("modalSuccess").hidden = false;
    modal.setAttribute("aria-labelledby", "successTitle");
    $("modalSuccess").focus();
    $("bookingForm").reset();
    renderTimes();
  } catch {
    $("formError").textContent = label("error");
    $("formError").hidden = false;
  } finally {
    submitting = false;
    button.disabled = false;
    $("closeModal").disabled = false;
    button.textContent =
      currentLang === "en"
        ? translations.en["modal.submit"]
        : "Termin anfragen";
  }
});
document.documentElement.classList.add("js");
$("mobileToggle").hidden = false;
$("langToggle").hidden = false;
$("bookingWidget").hidden = false;
setLanguage(currentLang);
loadSlots();
