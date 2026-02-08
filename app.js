function telLink(e164) { return `tel:${e164}`; }
function mapsLink(q) { return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`; }

const COPY = {
  en: {
    title: "South Florida Pregnancy Help (Catholic)",
    subtitle: "Fast, practical help. Free, confidential support.",
    stepTitle: "What to do right now (60 seconds)",
    step1: "If you need someone now: call or text Option Line (24/7).",
    step2: "If you can visit today: call a local Pregnancy Help Center and make an appointment.",
    step3: "If you’re in immediate danger: call 911.",
    hotlines: "24/7 Help",
    centers: "Local Pregnancy Help Centers",
    office: "Diocesan Contact",
    disclaimerTitle: "Notes",
    disclaimer: "This site provides logistics and referrals only. It does not provide medical advice. Always call 911 for emergencies.",
    privacy: "Privacy",
    sources: "Sources",
    callText: "Call/Text",
    chat: "Chat",
    directions: "Directions",
    official: "Official contact page"
  },
  es: {
    title: "Ayuda para el Embarazo en el Sur de Florida (Católica)",
    subtitle: "Ayuda rápida y práctica. Apoyo gratuito y confidencial.",
    stepTitle: "Qué hacer ahora (60 segundos)",
    step1: "Si necesita hablar con alguien ahora: llame o envíe un texto a Option Line (24/7).",
    step2: "Si puede ir hoy: llame a un Centro de Ayuda y programe una cita.",
    step3: "Si está en peligro inmediato: llame al 911.",
    hotlines: "Ayuda 24/7",
    centers: "Centros Locales de Ayuda",
    office: "Contacto Diocesano",
    disclaimerTitle: "Notas",
    disclaimer: "Este sitio solo ofrece información práctica y referencias. No brinda consejos médicos. Para emergencias, llame al 911.",
    privacy: "Privacidad",
    sources: "Fuentes",
    callText: "Llamar/Text",
    chat: "Chat",
    directions: "Cómo llegar",
    official: "Página oficial"
  }
};

let lang = "en";

function render() {
  const t = COPY[lang];
  document.getElementById("tTitle").textContent = t.title;
  document.getElementById("tSub").textContent = t.subtitle;
  document.getElementById("tSteps").textContent = t.stepTitle;

  document.getElementById("step1").textContent = t.step1;
  document.getElementById("step2").textContent = t.step2;
  document.getElementById("step3").textContent = t.step3;

  document.getElementById("tHotlines").textContent = t.hotlines;
  document.getElementById("tCenters").textContent = t.centers;
  document.getElementById("tOffice").textContent = t.office;

  // Hotlines
  const hl = document.getElementById("hotlines");
  hl.innerHTML = "";
  RESOURCES.hotlines.forEach(h => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="row" style="justify-content:space-between; align-items:flex-start;">
        <div>
          <div><strong>${h.name}</strong> <span class="badge">24/7</span></div>
          <div class="small muted">${h.desc}</div>
          <div class="small"><strong>${h.phoneDisplay}</strong></div>
        </div>
        <div class="row">
          <a class="btn primary" href="${telLink(h.phoneE164)}">${t.callText}</a>
          <a class="btn" href="${h.url}" target="_blank" rel="noopener">${t.chat}</a>
        </div>
      </div>
    `;
    hl.appendChild(div);
  });

  // Centers
  const c = document.getElementById("centers");
  c.innerHTML = "";
  RESOURCES.centers.forEach(x => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div><strong>${x.name}</strong></div>
      <div class="small">${x.address}</div>
      <div class="small"><strong>${x.phoneDisplay}</strong></div>
      <div class="small muted">${x.hours}</div>
      <div class="row" style="margin-top:10px;">
        <a class="btn primary" href="${telLink(x.phoneE164)}">${lang === "en" ? "Call" : "Llamar"}</a>
        <a class="btn" href="${mapsLink(x.mapsQuery)}" target="_blank" rel="noopener">${t.directions}</a>
      </div>
    `;
    c.appendChild(div);
  });

  // Office
  const o = RESOURCES.diocesanOffice;
  const off = document.getElementById("office");
  off.innerHTML = `
    <div class="card">
      <div><strong>${o.name}</strong></div>
      <div class="small">${o.address}</div>
      <div class="small"><strong>${o.phoneDisplay}</strong> • <a href="mailto:${o.email}">${o.email}</a></div>
      <div class="row" style="margin-top:10px;">
        <a class="btn" href="${o.url}" target="_blank" rel="noopener">${t.official}</a>
      </div>
    </div>
  `;

  // Footer
  document.getElementById("tDisclaimerTitle").textContent = t.disclaimerTitle;
  document.getElementById("tDisclaimer").textContent = t.disclaimer;
  document.getElementById("tPrivacy").textContent = t.privacy;
  document.getElementById("tSources").textContent = t.sources;
}

function toggleLang() {
  lang = (lang === "en") ? "es" : "en";
  document.getElementById("langBtn").textContent = (lang === "en") ? "ES" : "EN";
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("langBtn").addEventListener("click", toggleLang);
  render();
});
