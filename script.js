// V1: technical scaffold. Edit only the CONTENT blocks below.

// --- V1.4 storage config (Google Apps Script) ---
const ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbzDRcO9twI8QuzlVNAqS8YLFzBvfdk4yYEf9mLL_q211o-FS7MFtoY9g8W7ti50sU0/exec";
const INTAKE_KEY = "dolfijn-rodeo-Spanje";

async function sendToSheet(payload) {
  const outgoing = {
    key: INTAKE_KEY,
    ts: payload.ts,
    naam: payload.naam,
    focus: payload.focus,
    year_one_liner: payload.year_one_liner,
    selections: JSON.parse(payload.selections_json || "[]"),
    meta: JSON.parse(payload.meta_json || "{}"),
    source: "github-pages"
  };

  // Use no-cors to avoid CORS/preflight issues with Apps Script Web Apps.
  // Response will be opaque; we assume success if the request is sent.
  await fetch(ENDPOINT_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(outgoing)
  });
}


function animateOutline(card){
  try{
    syncOutlineGeometry(card);

    const rect = card.querySelector(".outline rect");
    if(!rect) return;

    // Cancel any previous animations on this rect
    rect.getAnimations().forEach(a => a.cancel());

    const total = rect.getTotalLength();

    // Make sure we draw the full perimeter (one complete loop)
    rect.style.strokeDasharray = String(total);
    rect.style.strokeDashoffset = String(total);

    // Force layout so the start state is applied
    void rect.getBoundingClientRect();

    // Animate clockwise reveal (dashoffset: total -> 0)
    rect.animate(
      [{ strokeDashoffset: total }, { strokeDashoffset: 0 }],
      { duration: 420, easing: "cubic-bezier(.2,.85,.2,1)", fill: "forwards" }
    );
  } catch(_){}
}

function resetOutline(card){(card){
  try{
    const rect = card.querySelector(".outline rect");
    if(!rect) return;
    rect.getAnimations().forEach(a => a.cancel());
    rect.style.strokeDasharray = "";
    rect.style.strokeDashoffset = "";
  } catch(_){}


function syncOutlineGeometry(card){
  const svg = card.querySelector(".outline");
  const rect = svg?.querySelector("rect");
  if(!svg || !rect) return;

  // Match the card's pixel geometry exactly
  const w = Math.max(0, Math.round(card.clientWidth));
  const h = Math.max(0, Math.round(card.clientHeight));

  // Read border-radius from CSS (we use a single value like 16px)
  const br = getComputedStyle(card).borderRadius || "0px";
  // Take first radius value (supports "16px 16px ..." too)
  const r = Math.max(0, parseFloat(br.split(" ")[0]) || 0);

  // Use a viewBox in pixels to avoid scaling artifacts; stroke sits on the 0.5px inset
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.setAttribute("preserveAspectRatio", "none");

  rect.setAttribute("x", "0.5");
  rect.setAttribute("y", "0.5");
  rect.setAttribute("width", String(Math.max(0, w - 1)));
  rect.setAttribute("height", String(Math.max(0, h - 1)));
  rect.setAttribute("rx", String(r));
  rect.setAttribute("ry", String(r));
}

}


// Selections are stored in Netlify Forms via hidden field: selections_json.

const CONTENT = [
  {
    id: "blok1",
    title: "Wat wil je met Spaans dóen?",
    hint: "Kies wat je aanspreekt (je kunt meerdere kiezen).",
    max: null, // set to a number later if you want a limit
    items: [
      { id: "reis", emoji: "🧳", label: "Op reis zelfstandig zijn", desc: "Hotel, OV, vragen, small talk." },
      { id: "restaurant", emoji: "🍽️", label: "Restaurant & bestellen", desc: "Natuurlijk praten aan tafel." },
      { id: "dokter", emoji: "🏥", label: "Dokter / apotheek", desc: "Uitleggen wat je voelt." },
      { id: "locals", emoji: "🧑‍🤝‍🧑", label: "Contact met locals", desc: "Gesprekjes onderweg." },
      { id: "appjes", emoji: "📱", label: "Appjes / korte berichten", desc: "Kort, duidelijk, handig." },
      { id: "luisteren", emoji: "👂", label: "Beter verstaan", desc: "Ook als het snel gaat." },
    ]
  },
  {
    id: "blok2",
    title: "Hoe wil jij het liefst leren?",
    hint: "Later kun je hier ‘max 3’ van maken.",
    max: null,
    items: [
      { id: "spreken", emoji: "🗣️", label: "Veel praten (ook met fouten)", desc: "Gewoon doen, met zachte correctie." },
      { id: "uitleg", emoji: "📘", label: "Duidelijke uitleg", desc: "Stap voor stap, met voorbeelden." },
      { id: "herhalen", emoji: "🔁", label: "Veel herhalen", desc: "Tot het vanzelf gaat." },
      { id: "luister", emoji: "🎧", label: "Luisteren & naspreken", desc: "Ritme, uitspraak, flow." },
      { id: "schrijven", emoji: "✍️", label: "Korte schrijfopdrachten", desc: "Kort en concreet." },
      { id: "speels", emoji: "🎲", label: "Speels / verrassend", desc: "Licht, interactief, variatie." },
    ]
  },
  {
    id: "blok3",
    title: "Wat kost je nu energie?",
    hint: "Klik als iets herkenbaar is.",
    max: null,
    items: [
      { id: "durf", emoji: "😶", label: "Ik durf niet te praten", desc: "Ik weet het wel, maar het komt niet." },
      { id: "gram", emoji: "🧩", label: "Grammatica blijft vaag", desc: "Ik mis het ‘aha’ moment." },
      { id: "tempo", emoji: "⏳", label: "Het gaat te snel", desc: "Ik raak de draad kwijt." },
      { id: "teveel", emoji: "🧠", label: "Te veel tegelijk", desc: "Dan blijft er weinig hangen." },
      { id: "goedgenoeg", emoji: "❓", label: "Wat is ‘goed genoeg’?", desc: "Ik twijfel of het klopt." },
      { id: "uitspraak", emoji: "🔊", label: "Uitspraak", desc: "Ik wil dat dat beter voelt." },
    ]
  },
];

const blocksEl = document.getElementById("blocks");
const selectionsJsonEl = document.getElementById("selections_json");
const metaJsonEl = document.getElementById("meta_json");
const submitBtn = document.getElementById("submitBtn");

const state = {
  selected: new Map(), // key: itemId, value: { blockId, note }
  lastToggledItemId: null,
};

// Render
function render() {
  blocksEl.innerHTML = "";
  for (const block of CONTENT) {
    const blockWrap = document.createElement("div");
    blockWrap.className = "block";
    blockWrap.dataset.blockId = block.id;

    const head = document.createElement("div");
    head.className = "block-title";
    head.innerHTML = `
      <div>
        <h3>${escapeHtml(block.title)}</h3>
      </div>
      <p>${escapeHtml(block.hint || "")}</p>
    `;
    blockWrap.appendChild(head);

    const cards = document.createElement("div");
    cards.className = "cards";

    for (const item of block.items) {
      const card = document.createElement("div");
      card.className = "choice";
      card.dataset.itemId = item.id;
      card.dataset.blockId = block.id;

      const isSelected = state.selected.has(item.id);
      if (isSelected) card.classList.add("selected");

      const noteValue = isSelected ? (state.selected.get(item.id).note || "") : "";

      card.innerHTML = `
<svg class="outline" aria-hidden="true"><rect></rect></svg>
        <div class="top">
          <div class="emoji">${escapeHtml(item.emoji || "•")}</div>
          <div>
            <div class="label">${escapeHtml(item.label)}</div>
            <div class="desc">${escapeHtml(item.desc || "")}</div>
          </div>
        </div>
        <div class="inline">
          <textarea class="note" rows="4" placeholder="(optioneel) toelichting...">${escapeHtml(noteValue)}</textarea>
        </div>
      `;
card.addEventListener("click", (e) => {
        // If click originated inside textarea, don't toggle
        if (e.target && e.target.classList && e.target.classList.contains("note")) return;

        const changed = toggleItem(block, item);
        if (!changed) return;

        const nowSelected = state.selected.has(item.id);

        // Update classes on this card only
        if (nowSelected) {
          // Prep SVG outline to draw from start
          try {
            const rect = card.querySelector(".outline rect");
            if (rect) {
              const total = parseFloat(getComputedStyle(card).getPropertyValue("--dash")) || rect.getTotalLength();
              rect.style.strokeDasharray = String(total);
              rect.style.strokeDashoffset = String(total);
              void rect.getBoundingClientRect();
            }
          } catch (_) {}

          card.classList.add("selected");
          requestAnimationFrame(() => animateOutline(card));
          // ensure textarea gets focus when selecting
          const ta = card.querySelector(".note");
          if (ta) setTimeout(() => ta.focus({ preventScroll: true }), 0);
          // remove just-selected after animation so it won't replay
} else {
          card.classList.remove("selected");
          resetOutline(card);
          // clear textarea UI (keep state already removed)
          const ta = card.querySelector(".note");
          if (ta) ta.value = "";
        }

        syncHiddenFields();
      });

      // Note textarea updates state
      const noteInput = card.querySelector(".note");
      noteInput.addEventListener("click", (e) => e.stopPropagation());
      noteInput.addEventListener("input", (e) => {
        if (!state.selected.has(item.id)) return;
        state.selected.get(item.id).note = e.target.value;
        syncHiddenFields();
      });
cards.appendChild(card);
}

    blockWrap.appendChild(cards);
    blocksEl.appendChild(blockWrap);
  }

  syncHiddenFields();
}

function toggleItem(block, item) {
  state.lastToggledItemId = item.id;

  // Select
  if (!state.selected.has(item.id)) {
    if (Number.isFinite(block.max) && block.max !== null) {
      const selectedInBlock = [...state.selected.values()].filter(v => v.blockId === block.id).length;
      if (selectedInBlock >= block.max) {
        flashButton(`Max ${block.max} in “${block.title}”`);
        return false;
      }
    }
    state.selected.set(item.id, { blockId: block.id, note: "" });
    return true;
  }

  // Deselect
  state.selected.delete(item.id);
  return true;
}

let flashTimeout = null;
function flashButton(text) {
  const old = submitBtn.textContent;
  submitBtn.textContent = text;
  submitBtn.disabled = true;
  clearTimeout(flashTimeout);
  flashTimeout = setTimeout(() => {
    submitBtn.textContent = old;
    submitBtn.disabled = false;
  }, 1200);
}

function syncHiddenFields() {
  const selections = [];
  for (const block of CONTENT) {
    for (const item of block.items) {
      if (state.selected.has(item.id)) {
        const entry = state.selected.get(item.id);
        selections.push({
          block_id: block.id,
          block_title: block.title,
          item_id: item.id,
          label: item.label,
          note: entry.note || ""
        });
      }
    }
  }

  selectionsJsonEl.value = JSON.stringify(selections);

  const meta = {
    version: "v1.5.1",
    ts_iso: new Date().toISOString(),
    user_agent: navigator.userAgent
  };
  metaJsonEl.value = JSON.stringify(meta);
}

function escapeHtml(str) {
  return String(str).replace(/[&<>\"']/g, s => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[s]));
}
function escapeAttr(str) {
  return String(str).replace(/["]/g, "&quot;");
}

render();


// --- GitHub Pages mode (V1.4): intercept submit, write to Sheets, then redirect ---
(function attachSubmitHandler(){
  const formEl = document.getElementById("intakeForm");
  if (!formEl) return;

  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Ensure hidden fields are up to date
    try { syncHiddenFields(); } catch (_) {}

    const payload = {
      naam: formEl.querySelector('input[name="naam"]')?.value || "",
      focus: formEl.querySelector('input[name="focus"]')?.value || "",
      year_one_liner: formEl.querySelector('textarea[name="year_one_liner"]')?.value || "",
      selections_json: document.getElementById("selections_json")?.value || "[]",
      meta_json: document.getElementById("meta_json")?.value || "{}",
      ts: new Date().toISOString(),
      version: "v1.5.1"
    };

    // Optional: keep local copy for debugging
    try {
      localStorage.setItem("spaans_intake_last_submission", JSON.stringify(payload));
    } catch (_) {}

    try {
      await sendToSheet(payload);
      window.location.href = "thanks/";
    } catch (err) {
      // Most likely offline or request blocked
      alert("Versturen lukte niet (mogelijk offline). Probeer opnieuw.");
      console.error(err);
    }
  });
})();

// Keep outlines aligned after viewport resize (cards change size)
window.addEventListener("resize", () => {
  document.querySelectorAll(".choice").forEach(c => {
    try{ syncOutlineGeometry(c); }catch(_){}
  });
});
