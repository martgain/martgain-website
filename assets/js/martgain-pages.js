const WHATSAPP_NUMBER = "201009973780";
const SOCIALS = {
  facebook: "https://www.facebook.com/MartGain/",
  linkedin: "https://linkedin.com/company/martgain"
};
const SHARED_TRANSLATIONS = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.clients": "Clients",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.skip": "Skip to content",
    "nav.menu": "Menu",
    "nav.language": "Language",
    "footer.text": "We turn random marketing into clear, measurable growth.",
    "cta.audit": "WhatsApp MartGain",
    "cta.diagnosis": "WhatsApp MartGain",
    "cta.form": "Send Request",
    "final.kicker": "Next Step"
  },
  ar: {
    "nav.home": "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629",
    "nav.services": "\u062e\u062f\u0645\u0627\u062a\u0646\u0627",
    "nav.clients": "\u0639\u0645\u0644\u0627\u0624\u0646\u0627",
    "nav.blog": "\u0627\u0644\u0645\u062f\u0648\u0646\u0629",
    "nav.contact": "\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627",
    "nav.skip": "\u062a\u062c\u0627\u0648\u0632 \u0625\u0644\u0649 \u0627\u0644\u0645\u062d\u062a\u0648\u0649",
    "nav.menu": "\u0627\u0644\u0642\u0627\u0626\u0645\u0629",
    "nav.language": "\u0627\u0644\u0644\u063a\u0629",
    "footer.text": "\u0646\u062d\u0648\u0651\u0644 \u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0627\u0644\u0639\u0634\u0648\u0627\u0626\u064a \u0625\u0644\u0649 \u0646\u0645\u0648 \u0648\u0627\u0636\u062d \u0648\u0642\u0627\u0628\u0644 \u0644\u0644\u0642\u064a\u0627\u0633.",
    "cta.audit": "\u0648\u0627\u062a\u0633\u0627\u0628 \u0645\u0627\u0631\u062a\u062c\u064a\u0646",
    "cta.diagnosis": "\u0648\u0627\u062a\u0633\u0627\u0628 \u0645\u0627\u0631\u062a\u062c\u064a\u0646",
    "cta.form": "\u0623\u0631\u0633\u0644 \u0627\u0644\u0637\u0644\u0628",
    "final.kicker": "\u0627\u0644\u062e\u0637\u0648\u0629 \u0627\u0644\u062a\u0627\u0644\u064a\u0629"
  }
};

const pageState = {
  lang: localStorage.getItem("martgainLang") || "en"
};

window.martgainEvents = window.martgainEvents || [];
document.documentElement.dataset.mgEventLayer = "ready";

function safeTrackValue(value) {
  if (value === null || value === void 0) return "";
  if (["string", "number", "boolean"].includes(typeof value)) return value;
  return "";
}

function trackEvent(name, payload = {}) {
  const detail = {
    event: name,
    language: pageState.lang,
    source_page: window.location.pathname || "/",
    ...Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, safeTrackValue(value)]))
  };
  window.martgainEvents.push(detail);
  document.documentElement.dataset.mgEventLast = name;
  document.documentElement.dataset.mgEventCount = String(window.martgainEvents.length);
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(detail);
  }
  try {
    window.dispatchEvent(new CustomEvent("martgain:event", { detail }));
  } catch (error) {
    window.dispatchEvent(new Event("martgain:event"));
  }
  return detail;
}

window.martgainTrack = trackEvent;

function sourceSection(node) {
  const section = node.closest("section, header, footer, main");
  return section?.id || section?.className?.toString().split(" ").filter(Boolean)[0] || "page";
}

function dictionary(path) {
  const activeContent = window.pageContent && window.pageContent[pageState.lang];
  const value = path.split(".").reduce((acc, key) => acc && acc[key], activeContent)
    || SHARED_TRANSLATIONS[pageState.lang]?.[path]
    || "";
  if (value) return value;
  return "";
}

function waUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function syncHeaderLogo() {
  document.querySelectorAll(".site-header .brand img").forEach((image) => {
    const current = image.getAttribute("src") || "";
    image.setAttribute("src", current.replace(/logo_(dark|light)(-site)?\.png$/, "logo_dark-site.png"));
  });
}

function applyFixedTheme() {
  document.documentElement.dataset.theme = "dark";
  document.documentElement.classList.add("theme-dark");
  document.body.classList.add("theme-dark");
  syncHeaderLogo();
}

function applyLanguage(lang) {
  pageState.lang = lang;
  localStorage.setItem("martgainLang", lang);
  const content = window.pageContent && window.pageContent[lang];
  if (!content) {
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.setAttribute("aria-pressed", button.dataset.lang === lang ? "true" : "false");
    });
    return;
  }
  document.documentElement.lang = lang;
  document.documentElement.dir = content.dir;
  document.documentElement.classList.toggle("is-ar", lang === "ar");
  document.body.classList.toggle("is-ar", lang === "ar");

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = dictionary(node.dataset.i18n);
    if (value) node.textContent = value;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    const value = dictionary(node.dataset.i18nAria);
    if (value) node.setAttribute("aria-label", value);
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.lang === lang ? "true" : "false");
  });

  document.querySelectorAll("[data-wa]").forEach((link) => {
    const key = link.dataset.wa;
    const message = (content.whatsapp && content.whatsapp[key]) || content.whatsapp.default;
    link.href = waUrl(message);
  });
}

function wireChrome() {
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || false;
  const skipLink = document.querySelector(".skip-link");
  const mainContent = document.querySelector("#main");
  skipLink?.addEventListener("click", () => mainContent?.focus());
  applyFixedTheme();

  const menu = document.querySelector("#menuToggle");
  const nav = document.querySelector("#navLinks");
  if (menu && nav) {
    const closeMenu = () => {
      nav.classList.remove("is-open");
      menu.setAttribute("aria-expanded", "false");
    };
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menu.setAttribute("aria-expanded", String(open));
      trackEvent("mobile_menu_toggle", { open, source_section: "header" });
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || menu.contains(event.target)) return;
      closeMenu();
    });
  }

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      const from = pageState.lang;
      applyLanguage(button.dataset.lang);
      trackEvent("language_switch", { from_language: from, to_language: pageState.lang, source_section: "header" });
    });
  });

  document.querySelectorAll("a[data-wa]").forEach((link) => {
    link.addEventListener("click", () => {
      trackEvent("cta_whatsapp_click", {
        source_section: sourceSection(link),
        message_type: link.dataset.wa || "default"
      });
    });
  });

  const progress = document.querySelector("#progress");
  if (progress) {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const amount = max > 0 ? scrollY / max : 0;
      progress.style.transform = `scaleX(${amount})`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  if (reducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
}

wireChrome();
applyLanguage(pageState.lang);
