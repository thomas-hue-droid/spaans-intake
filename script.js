// V1: technical scaffold. Edit only the CONTENT blocks below.
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
        <div class="tag">Gekozen</div>
        <div class="top">
          <div class="emoji">${escapeHtml(item.emoji || "•")}</div>
          <div>
            <div class="label">${escapeHtml(item.label)}</div>
            <div class="desc">${escapeHtml(item.desc || "")}</div>
          </div>
        </div>
        <div class="inline">
          <input type="text" class="note" placeholder="(optioneel) toelichting..." value="${escapeAttr(noteValue)}" />
        </div>
      `;

      card.addEventListener("click", (e) => {
        // If click originated inside input, don't toggle
        if (e.target && e.target.classList && e.target.classList.contains("note")) return;

        toggleItem(block, item);
        render();
        syncHiddenFields();
      });

      // Note input updates state
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
  // Max-per-block logic (optional)
  if (!state.selected.has(item.id)) {
    if (Number.isFinite(block.max) && block.max !== null) {
      const selectedInBlock = [...state.selected.values()].filter(v => v.blockId === block.id).length;
      if (selectedInBlock >= block.max) {
        // Simple feedback: briefly disable button text
        flashButton(`Max ${block.max} in “${block.title}”`);
        return;
      }
    }
    state.selected.set(item.id, { blockId: block.id, note: "" });
  } else {
    state.selected.delete(item.id);
  }
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
    version: "v1",
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


// --- GitHub Pages mode (V1.3): intercept submit to avoid POST/405 ---
(function attachSubmitHandler(){
  const formEl = document.getElementById("intakeForm");
  if (!formEl) return;

  formEl.addEventListener("submit", (e) => {
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
      version: "v1.3"
    };

    // Store last submission locally for debugging (optional)
    try {
      localStorage.setItem("spaans_intake_last_submission", JSON.stringify(payload));
    } catch (_) {}

    // Redirect to thanks page (GET) — safe on GitHub Pages
    window.location.href = "thanks/";
  });
})();
