// Lessen Spaans Intake — V2.0
// ✅ Google Drive / Sheets koppeling behouden

const ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbzDRcO9twI8QuzlVNAqS8YLFzBvfdk4yYEf9mLL_q211o-FS7MFtoY9g8W7ti50sU0/exec";
const INTAKE_KEY = "dolfijn-rodeo-Spanje";

const DATA = {
  situations: [
    { id:"travel", icon:"🧳", label:"Op reis zelfstandig zijn", sub:"Hotel, OV, vragen, small talk." },
    { id:"restaurant", icon:"🍽️", label:"Restaurant & bar", sub:"Bestellen, vragen, dieet, klagen." },
    { id:"doctor", icon:"🩺", label:"Dokter / apotheek", sub:"Klachten uitleggen, instructies." },
    { id:"shopping", icon:"🛍️", label:"Winkelen", sub:"Maten, ruilen, onderhandelen." },
    { id:"friends", icon:"🧑‍🤝‍🧑", label:"Vrienden & buren", sub:"Gezellig kletsen, verhalen." },
    { id:"house", icon:"🏡", label:"Huis & klussen", sub:"Reparaties, afspraken, verhuur." },
    { id:"work", icon:"💼", label:"Werk/collega’s", sub:"E-mails, meetings, bellen." },
    { id:"culture", icon:"🎭", label:"Cultuur & nieuws", sub:"Podcast/TV, meningen geven." },
  ],
  themes: [
    { id:"food", icon:"🥑", label:"Eten & drinken", sub:"smaken, recepten, uit eten." },
    { id:"weather", icon:"🌤️", label:"Weer & seizoenen", sub:"plannen, kleding, praten." },
    { id:"hobbies", icon:"🎯", label:"Hobby’s", sub:"sport, muziek, lezen, games." },
    { id:"family", icon:"👨‍👩‍👧‍👦", label:"Familie", sub:"relaties, feestjes, verhalen." },
    { id:"health", icon:"🧘", label:"Gezondheid", sub:"gevoelens, klachten, routines." },
    { id:"transport", icon:"🚆", label:"Vervoer & route", sub:"tijden, tickets, overstap." },
    { id:"money", icon:"💳", label:"Geld & afspraken", sub:"prijzen, plannen, regelen." },
    { id:"opinions", icon:"💬", label:"Meningen", sub:"eens/oneens, argumenten." },
  ],
  skills: [
    { id:"speaking", icon:"🗣️", label:"Spreken", desc:"vloeiend, zinnen maken, durf." },
    { id:"listening", icon:"🎧", label:"Luisteren", desc:"begrijpen in tempo, accenten." },
    { id:"pronunciation", icon:"🔊", label:"Uitspraak", desc:"ritme, klemtoon, klanken." },
    { id:"vocab", icon:"🧠", label:"Woordenschat", desc:"vasthouden, actief gebruiken." },
    { id:"grammar", icon:"📚", label:"Grammatica", desc:"structuur, tijden, fouten snappen." },
    { id:"writing", icon:"✍️", label:"Schrijven (licht)", desc:"korte appjes, zinnen, notities." },
  ],
  painPoints: [
    { id:"speed", icon:"⏱️", label:"Het gaat te snel", desc:"ik raak de draad kwijt." },
    { id:"words", icon:"🧩", label:"Woorden schieten niet te binnen", desc:"ik weet het wel, maar…" },
    { id:"tenses", icon:"🕰️", label:"Werkwoordstijden", desc:"perfecto/indefinido etc." },
    { id:"serestar", icon:"🧷", label:"Ser/estar & por/para", desc:"ik twijfel steeds." },
    { id:"preps", icon:"🧲", label:"Voorzetsels", desc:"a/de/en/por… voelt random." },
    { id:"confidence", icon:"🫣", label:"Spreekdurf", desc:"bang om fouten te maken." },
  ],
  grammar: [
    { id:"present", icon:"🟩", label:"Tegenwoordige tijd", sub:"regelmaat + uitzonderingen" },
    { id:"past", icon:"🟦", label:"Verleden tijd", sub:"perfecto vs indefinido" },
    { id:"future", icon:"🟨", label:"Toekomende tijd", sub:"ir a + futuro simple" },
    { id:"subj", icon:"🟪", label:"Subjuntivo", sub:"wensen, twijfel, advies" },
    { id:"pronouns", icon:"🟧", label:"Voornaamwoorden", sub:"lo/la/le, me/te/se" },
    { id:"connectors", icon:"🧵", label:"Verbinders", sub:"pero, aunque, entonces…" },
  ],
  pronunciation: [
    { id:"r", icon:"r", label:"R / RR", desc:"trillen, verschil r/rr." },
    { id:"bvd", icon:"β", label:"B/V/D klanken", desc:"zachter dan NL." },
    { id:"stress", icon:"ˈ", label:"Klemtoon", desc:"waar ligt de nadruk?" },
    { id:"linking", icon:"⛓️", label:"Aaneenschakelen", desc:"tempo zonder woorden te verliezen." },
  ],
  correctionStyle: [
    { id:"gentle", label:"Zacht, doorpraten", small:"Ik wil vooral blijven praten. Corrigeer kort of achteraf." },
    { id:"stop", label:"Stop & fix", small:"Als er iets fout gaat, liever meteen even pauze en opnieuw." },
    { id:"notes", label:"Met korte regels", small:"Graag een mini-regel of voorbeeldzin erbij." },
    { id:"mix", label:"Mix", small:"Hangt van het onderwerp af. Soms door, soms uitleg." },
  ],
  inClass: [
    { id:"roleplay", icon:"🎬", label:"Rollenspellen", desc:"restaurant, hotel, dokter." },
    { id:"rapid", icon:"⚡", label:"Snelle mini-vragen", desc:"kort, veel herhaling." },
    { id:"story", icon:"📖", label:"Verhaal bouwen", desc:"samen 1 verhaal, iedereen 1 zin." },
    { id:"listening", icon:"🎧", label:"Luisteren & naspreken", desc:"ritme, intonatie, shadowing." },
    { id:"games", icon:"🎲", label:"Taalspelletjes", desc:"bingo, memory, ‘raad het woord’." },
    { id:"grammarMoments", icon:"🧠", label:"Korte grammar-momenten", desc:"regel + meteen oefenen." },
  ],
  homeworkFormats: [
    { id:"tiny", icon:"📝", label:"Klein & vaak", desc:"3–5 minuten per keer." },
    { id:"audio", icon:"🎙️", label:"Audio inspreken", desc:"30–60 sec voice note." },
    { id:"sentences", icon:"🧱", label:"Zinnen bouwen", desc:"10 zinnen met variatie." },
    { id:"quiz", icon:"🧩", label:"Quiz/flashcards", desc:"woordjes herhalen." },
    { id:"watch", icon:"📺", label:"Video met vragen", desc:"korte clip + 5 vragen." },
    { id:"dialogue", icon:"💬", label:"Dialoog oefenen", desc:"2 minuten gesprek." },
  ],
  sources: [
    { id:"youtube", icon:"▶️", label:"YouTube", sub:"korte clips" },
    { id:"podcast", icon:"🎧", label:"Podcast", sub:"langzaam / A2" },
    { id:"news", icon:"🗞️", label:"Nieuws (simpel)", sub:"samenvatten" },
    { id:"music", icon:"🎵", label:"Muziek", sub:"lyrics als oefening" },
    { id:"duo", icon:"🦉", label:"Duolingo", sub:"als bijwerk" },
    { id:"none", icon:"🧘", label:"Liever geen bronnen", sub:"houd het in de les" },
  ],
  workedWell: [
    { id:"structure", icon:"🧭", label:"Duidelijke structuur", desc:"ik weet wat het doel is." },
    { id:"repeat", icon:"🔁", label:"Herhaling", desc:"oude stof komt terug." },
    { id:"speakingTime", icon:"🗣️", label:"Veel spreektijd", desc:"ik kom aan bod." },
    { id:"feedback", icon:"✅", label:"Goede correctie", desc:"prettig en concreet." },
    { id:"useful", icon:"🧳", label:"Praktisch", desc:"direct bruikbaar op reis." },
    { id:"safe", icon:"🧡", label:"Veilige sfeer", desc:"fouten mogen." },
  ],
  change: [
    { id:"morelistening", icon:"🎧", label:"Meer luisteren", desc:"meer echte audio." },
    { id:"moregrammar", icon:"📚", label:"Meer grammatica", desc:"duidelijkere regels." },
    { id:"lessgrammar", icon:"🌿", label:"Minder grammatica", desc:"meer flow, minder uitleg." },
    { id:"morewriting", icon:"✍️", label:"Meer schrijven", desc:"korte stukjes." },
    { id:"pace", icon:"🐢", label:"Tempo aanpassen", desc:"iets rustiger/duidelijker." },
    { id:"homework", icon:"🧪", label:"Ander huiswerk", desc:"korter/variatie." },
  ],
};

const state = { chips:new Map(), tiles:new Map(), choices:new Map() };

function esc(s){ return String(s??"").replace(/[&<>"']/g, c=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }
function ensureSet(map,k){ if(!map.has(k)) map.set(k,new Set()); return map.get(k); }
function ensureMap(map,k){ if(!map.has(k)) map.set(k,new Map()); return map.get(k); }

function renderChips(group, items){
  const host = document.querySelector(`[data-chip-group="${group}"]`);
  const selected = ensureSet(state.chips, group);

  host.innerHTML = items.map(it=>{
    const sel = selected.has(it.id) ? "selected" : "";
    return `
      <div class="chip ${sel}" data-id="${esc(it.id)}" role="button" tabindex="0" aria-pressed="${sel?"true":"false"}">
        <div class="chipIcon">${esc(it.icon||"•")}</div>
        <div class="chipCol">
          <div class="chipText">${esc(it.label)}</div>
          ${it.sub?`<div class="chipSub">${esc(it.sub)}</div>`:""}
        </div>
      </div>`;
  }).join("");

  host.addEventListener("click",(e)=>{
    const chip = e.target.closest(".chip"); if(!chip) return;
    const id = chip.dataset.id;
    const set = ensureSet(state.chips, group);
    set.has(id) ? set.delete(id) : set.add(id);
    chip.classList.toggle("selected");
    chip.setAttribute("aria-pressed", chip.classList.contains("selected")?"true":"false");
    sync(); progress();
  });

  host.addEventListener("keydown",(e)=>{
    if(e.key!=="Enter" && e.key!==" ") return;
    const chip = e.target.closest(".chip"); if(!chip) return;
    e.preventDefault(); chip.click();
  });
}

function renderTiles(group, items){
  const host = document.querySelector(`[data-tile-group="${group}"]`);
  const selected = ensureMap(state.tiles, group);

  host.innerHTML = items.map(it=>{
    const isSel = selected.has(it.id);
    const note = selected.get(it.id) ?? "";
    return `
      <div class="tile ${isSel?"selected":""}" data-id="${esc(it.id)}" role="button" tabindex="0" aria-pressed="${isSel?"true":"false"}">
        <div class="tileTop">
          <div class="tileIcon">${esc(it.icon||"•")}</div>
          <div>
            <div class="tileTitle">${esc(it.label)}</div>
            <div class="tileDesc">${esc(it.desc||"")}</div>
          </div>
        </div>
        <div class="inline">
          <textarea class="note" rows="4" placeholder="(optioneel) toelichting...">${esc(note)}</textarea>
        </div>
      </div>`;
  }).join("");

  host.addEventListener("click",(e)=>{
    const tile = e.target.closest(".tile"); if(!tile) return;
    if(e.target.closest("textarea")) return;
    const id = tile.dataset.id;
    const map = ensureMap(state.tiles, group);
    const on = !map.has(id);
    on ? map.set(id,"") : map.delete(id);
    tile.classList.toggle("selected", on);
    tile.setAttribute("aria-pressed", on?"true":"false");
    if(on){
      const ta = tile.querySelector("textarea.note");
      if(ta) setTimeout(()=>ta.focus({preventScroll:true}),0);
    }else{
      const ta = tile.querySelector("textarea.note");
      if(ta) ta.value="";
    }
    sync(); progress();
  });

  host.addEventListener("input",(e)=>{
    const ta = e.target.closest("textarea.note"); if(!ta) return;
    const tile = e.target.closest(".tile"); if(!tile) return;
    const id = tile.dataset.id;
    const map = ensureMap(state.tiles, group);
    if(!map.has(id)) map.set(id,"");
    map.set(id, ta.value);
    sync(); progress();
  });

  host.addEventListener("keydown",(e)=>{
    if(e.key!=="Enter" && e.key!==" ") return;
    const tile = e.target.closest(".tile");
    if(!tile || e.target.tagName==="TEXTAREA") return;
    e.preventDefault(); tile.click();
  });
}

function renderChoices(group, items){
  const host = document.querySelector(`[data-choice-group="${group}"]`);
  const current = state.choices.get(group) ?? "";

  host.innerHTML = items.map(it=>{
    const id = `${group}_${it.id}`;
    return `
      <div class="choice">
        <div class="radioRow">
          <input type="radio" id="${esc(id)}" name="${esc(group)}" value="${esc(it.id)}" ${current===it.id?"checked":""}/>
          <div>
            <label for="${esc(id)}">${esc(it.label)}</label>
            <div class="small">${esc(it.small||"")}</div>
          </div>
        </div>
      </div>`;
  }).join("");

  host.addEventListener("change",(e)=>{
    const r = e.target.closest('input[type="radio"]'); if(!r) return;
    state.choices.set(group, r.value);
    sync(); progress();
  });
}

function selectedJson(){
  const chips={}, tiles={}, choices={};
  for(const [g,s] of state.chips.entries()) chips[g]=[...s];
  for(const [g,m] of state.tiles.entries()) tiles[g]=[...m.entries()].map(([id,note])=>({id,note}));
  for(const [g,v] of state.choices.entries()) choices[g]=v;
  return {chips, tiles, choices};
}

function metaJson(){
  return { ua:navigator.userAgent, ts:new Date().toISOString(), version:"v2.0", page:location.href };
}

function sync(){
  document.getElementById("selected_json").value = JSON.stringify(selectedJson());
  document.getElementById("meta_json").value = JSON.stringify(metaJson());
  document.getElementById("endpointLabel").textContent = ENDPOINT_URL;
  document.getElementById("keyLabel").textContent = INTAKE_KEY;
}

function progress(){
  const form = document.getElementById("intakeForm");
  const fields = [...form.querySelectorAll('input[type="text"], textarea, select')];
  let filled=0, total=0;
  for(const el of fields){
    total++;
    const v = (el.value||"").trim();
    if(v && v!=="Kies…") filled++;
  }
  const s = selectedJson();
  const selCount =
    Object.values(s.chips).reduce((a,b)=>a+(b?.length||0),0) +
    Object.values(s.tiles).reduce((a,b)=>a+(b?.length||0),0) +
    Object.values(s.choices).filter(Boolean).length;
  const selAsFields = Math.min(12, Math.floor(selCount/3));
  const score = filled + selAsFields;
  const maxScore = total + 12;
  const pct = Math.max(0, Math.min(100, Math.round((score/maxScore)*100)));

  document.getElementById("progressFill").style.width = pct+"%";
  document.getElementById("progressPct").textContent = pct+"%";
  document.querySelector(".progressTrack").setAttribute("aria-valuenow", String(pct));
}

function status(msg){ document.getElementById("status").textContent = msg||""; }

function snapshot(payload){
  const s = payload.selected || {};
  const lines=[];
  if(payload.name?.trim()) lines.push(`Naam: ${payload.name.trim()}`);
  if(payload.focus?.trim()) lines.push(`Focus: ${payload.focus.trim()}`);
  if(payload.goalSentence?.trim()) lines.push(`Doelzin: ${payload.goalSentence.trim()}`);

  const chips = (label,key)=>{ const a=s.chips?.[key]||[]; if(a.length) lines.push(`${label}: ${a.join(", ")}`); };
  chips("Situaties","situations");
  chips("Thema's","themes");
  chips("Grammatica","grammar");
  chips("Bronnen","sources");

  const tiles = (label,key)=>{
    const a=s.tiles?.[key]||[];
    if(!a.length) return;
    lines.push(`${label}: ${a.map(x=>x.note?.trim()?`${x.id} (${x.note.trim()})`:x.id).join("; ")}`);
  };
  tiles("Taalonderdelen","skills");
  tiles("Lastig","painPoints");
  tiles("Uitspraak","pronunciation");
  tiles("In de les","inClass");
  tiles("Huiswerk","homeworkFormats");
  tiles("Ging goed","workedWell");
  tiles("Anders graag","change");

  if(s.choices?.correctionStyle) lines.push(`Correctiestijl: ${s.choices.correctionStyle}`);
  if(payload.confidence) lines.push(`Spreekdurf: ${payload.confidence}/10`);
  if(payload.homeworkTime) lines.push(`Huiswerktijd: ${payload.homeworkTime}`);

  ["bestMoment","homeworkFeedback","wishList","surpriseMe"].forEach(k=>{
    if(payload[k]?.trim()) lines.push(`${k}: ${payload[k].trim()}`);
  });

  return lines.join("\\n");
}

function payloadFromForm(){
  const fd = new FormData(document.getElementById("intakeForm"));
  const p={};
  for(const [k,v] of fd.entries()) p[k]=v;
  try{ p.selected = JSON.parse(p.selected_json||"{}"); }catch{ p.selected={}; }
  try{ p.meta = JSON.parse(p.meta_json||"{}"); }catch{ p.meta={}; }
  p.snapshot = snapshot(p);
  return p;
}

async function send(payload){
  const res = await fetch(ENDPOINT_URL,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ intake_key: INTAKE_KEY, payload }),
    redirect:"follow"
  });
  if(!res.ok){
    const t = await res.text().catch(()=> "");
    throw new Error(`HTTP ${res.status} — ${t.slice(0,200)}`);
  }
  return res.json().catch(()=> ({}));
}

function init(){
  renderChips("situations", DATA.situations);
  renderChips("themes", DATA.themes);
  renderChips("grammar", DATA.grammar);
  renderChips("sources", DATA.sources);

  renderTiles("skills", DATA.skills);
  renderTiles("painPoints", DATA.painPoints);
  renderTiles("pronunciation", DATA.pronunciation);
  renderTiles("inClass", DATA.inClass);
  renderTiles("homeworkFormats", DATA.homeworkFormats);
  renderTiles("workedWell", DATA.workedWell);
  renderTiles("change", DATA.change);

  renderChoices("correctionStyle", DATA.correctionStyle);

  const conf = document.getElementById("confidence");
  const confVal = document.getElementById("confidenceVal");
  conf.addEventListener("input",()=>{ confVal.textContent=conf.value; sync(); progress(); });

  const form = document.getElementById("intakeForm");
  form.addEventListener("input",()=>{ sync(); progress(); }, {passive:true});
  form.addEventListener("change",()=>{ sync(); progress(); }, {passive:true});

  document.getElementById("toggleCompact").addEventListener("click",()=>{
    const on = document.body.classList.toggle("compact");
    document.getElementById("toggleCompact").setAttribute("aria-pressed", on?"true":"false");
  });

  document.getElementById("copyBtn").addEventListener("click", async ()=>{
    try{
      const p = payloadFromForm();
      await navigator.clipboard.writeText(p.snapshot||"");
      status("Gekopieerd. Plak dit gerust in WhatsApp/e-mail.");
    }catch{
      status("Kopiëren lukt niet automatisch. Selecteer en kopieer handmatig.");
    }
  });

  form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    status("");
    const btn = document.getElementById("submitBtn");
    btn.disabled=true; btn.textContent="Versturen…";
    try{
      sync();
      const p = payloadFromForm();
      await send(p);

      const base = location.pathname.endsWith("/") ? location.pathname : location.pathname.replace(/[^/]*$/, "");
      location.href = base + "thanks/";
    }catch(err){
      status("Versturen lukte niet. Gebruik ‘Kopieer antwoord als tekst’. (Details: "+(err?.message||"onbekend")+")");
    }finally{
      btn.disabled=false; btn.textContent="Verstuur";
    }
  });

  sync(); progress();
}
document.addEventListener("DOMContentLoaded", init);
