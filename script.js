"use strict";
const translations = {
  en: {
    "case.imageAlt": "projectfit.ai: dashboard with project suggestions and matching skills",
    "case.zoom": "Enlarge view ↗",
    "case.caption": "Inside the product · Published example screen from projectfit.ai",
    "case.questionLabel": "The challenge",
    "case.question": "Which projects are a real fit?",
    "case.problem": "Freelancers need to find suitable opportunities among many listings. projectfit.ai matches skills and preferences with project requirements. The central challenge is understanding what someone can do, even when the project uses different terms.",
    "case.workLabel": "My contribution",
    "case.work": "From matching to the application.",
    "case.detail": "As a co-founder, I combine product development with LLM and prompt engineering and integration in TypeScript and React. My work also includes sales and business development: I focus on both the technical solution and its value to customers.",
    "zeit.heading": "A shopping app needs to run smoothly on modest devices, too.",
    "zeit.detail": "My contribution to the ZEIT Shop app included Flutter development, Shopware integration and automated releases for iOS and Android. Smooth interaction across device tiers, including budget Android phones, was a key requirement.",
    "brainloop.heading": "Confidential data brings its own requirements.",
    "brainloop.detail": "At Brainloop, I worked on secure data rooms in a microservices environment and on migrating highly sensitive data. This included using Vault for cluster credentials. Data consistency and protecting confidential information were central requirements of this work.",
    "principle.0.title": "Start with the user journey.",
    "principle.0.text": "What do people want to achieve with the software? Where do they lose time or get stuck? I walk through the process with you. Together, we establish what the solution needs to do.",
    "principle.1.title": "Choose technology for the task.",
    "principle.1.text": "Usability, performance, security and operations all inform my technology choices. I assess what can be reused and which solution your team can maintain over time.",
    "principle.2.title": "Use it early. Learn together.",
    "principle.2.text": "We put a usable version into users’ hands early. Their feedback shows where we are on track and what needs to change. What we learn informs the next steps.",
    portfolio: "View portfolio (PDF)",
    "case.kicker": "Building our own product",
    "case.context": "AI-powered project matching for IT freelancers",
    "case.role":
      "As a co-founder, I contribute to the platform and its AI features. My focus is on product development, LLMs and matching skills with suitable projects.",
    "case.link": "View the project in my portfolio",
    "service.0.title": "Technical decisions",
    "service.0.text":
      "What can you keep? What needs to change? I assess your software, weigh the options and work with you on the next steps.",
    "service.1.title": "Development and delivery",
    "service.1.text":
      "I develop applications, connect systems and modernise existing software — from architecture to code.",
    "service.2.title": "AI in everyday work",
    "service.2.text":
      "I assess which tasks are suited to AI, develop workflows and integrate them into your existing systems.",
    "service.3.title": "Working with your team",
    "service.3.text":
      "I join ongoing projects, resolve technical questions and share my knowledge through working together.",
    "client.freenet":
      "GraphQL and API architecture, consulting on interfaces and data models.",
    "client.zeit":
      "Contribution to the development of the ZEIT Shop app, including Shopware integration and automated releases for iOS and Android.",
    "client.brainloop":
      "Work on secure data rooms, microservices and sensitive data migration.",
    "client.aidhere":
      "App and backend development, alongside mentoring the development team.",
    "nav.services": "Services",
    "nav.references": "Projects",
    "nav.approach": "Approach",
    "nav.research": "Research",
    "nav.contact": "Contact",
    "hero.eyebrow": "Nino Wagensonner · Consulting & development",
    "hero.title":
      'Technical consulting<br><span class="accent">and delivery.</span>',
    "hero.intro":
      "Developing software, connecting systems, putting AI to work: I assess what is needed and make it happen.",
    "hero.cta": "Discuss your project",
    "hero.years": "Almost 20",
    "hero.experience":
      "Years of professional experience in software and IT. Across different projects, industries and roles.",
    "hero.location": "Munich · Remote & on-site",
    "references.kicker": "Project experience",
    "references.note": "Selected work",
    "references.title": "Projects and contributions",
    "services.kicker": "Services",
    "services.title": "How I can<br>help you.",
    "approach.kicker": "Approach",
    "approach.title": "Understand thoroughly.<br>Deliver pragmatically.",
    "approach.text":
      "I am a technical generalist. I look at how the parts fit together and go into detail where it matters. My experience spans apps and backend systems, infrastructure and AI.",
    "approach.aiLabel": "Experience, extended with AI",
    "approach.ai":
      "AI helps me apply this experience more broadly: in research, development and testing. I assess the results myself.",
    "research.kicker": "Products & research",
    "company.description":
      "Through my company, Isar Innovations, I develop software products.",
    "company.link": "Visit the company",
    "research.title": "Research",
    "research.intro":
      "Our research explores how AI agents work on problems and how large collections of skill labels can be organised.",
    "research.all": "All research papers",
    "contact.kicker": "Contact",
    "contact.title": "What are you<br>working on?",
    "contact.intro":
      "Tell me about your project or the technical question you are working through. In our first conversation, we will discuss how I can help.",
    "contact.location": "Unterschleissheim near Munich · Remote & on-site",
    "footer.role": "Technical consulting and delivery",
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
      ? "Nino Wagensonner — Technical consulting and delivery"
      : "Nino Wagensonner — Technische Beratung und Umsetzung";
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
