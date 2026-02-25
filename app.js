const STORAGE_KEY = "msp_data_override";
const EMAIL_KEY = "msp_email";
const ADMIN_SESSION_KEY = "msp_admin";
const RESULTS_UNLOCK_KEY = "msp_results_unlocked";
const ADMIN_PASSWORD = "shl2026"; // change for production

const defaultData = {
  sponsor: {
    name: "Ductus",
    logoUrl: "https://res.cloudinary.com/dufekxhkq/image/upload/v1758878747/banner_omro%CC%88stning_vit_tmguie.png",
    linkUrl: "https://example.com"
  },
  bannerUrl: "https://res.cloudinary.com/dufekxhkq/image/upload/v1758878747/banner_omro%CC%88stning_vit_tmguie.png",
  settings: {
    votingClosed: false
  },
  leagues: [
    {
      id: "shl",
      name: "SHL",
      players: [
        {
          id: "shl-1",
          active: true,
          number: 28,
          name: "Erik Lund",
          country: "SE",
          position: "F",
          imageUrl: "https://res.cloudinary.com/dufekxhkq/image/upload/v1758874547/9x16_il2fgk.png",
          stats: []
        },
        {
          id: "shl-2",
          active: true,
          number: 19,
          name: "Mikael Sjödin",
          country: "SE",
          position: "F",
          imageUrl: "https://res.cloudinary.com/dufekxhkq/image/upload/v1758874547/9x16_il2fgk.png",
          stats: []
        },
        {
          id: "shl-3",
          active: true,
          number: 1,
          name: "Anton Berg",
          country: "SE",
          position: "G",
          imageUrl: "https://res.cloudinary.com/dufekxhkq/image/upload/v1758874547/9x16_il2fgk.png",
          stats: []
        }
      ]
    },
    {
      id: "sdhl",
      name: "SDHL",
      players: [
        {
          id: "sdhl-1",
          active: true,
          number: 12,
          name: "Sara Holm",
          country: "SE",
          position: "F",
          imageUrl: "https://res.cloudinary.com/dufekxhkq/image/upload/v1758874547/9x16_il2fgk.png",
          stats: []
        },
        {
          id: "sdhl-2",
          active: true,
          number: 6,
          name: "Elsa Bergström",
          country: "SE",
          position: "D",
          imageUrl: "https://res.cloudinary.com/dufekxhkq/image/upload/v1758874547/9x16_il2fgk.png",
          stats: []
        },
        {
          id: "sdhl-3",
          active: true,
          number: 30,
          name: "Ida Nilsson",
          country: "SE",
          position: "G",
          imageUrl: "https://res.cloudinary.com/dufekxhkq/image/upload/v1758874547/9x16_il2fgk.png",
          stats: []
        }
      ]
    }
  ]
};

const state = {
  data: loadData(),
  selections: { shl: null, sdhl: null },
  auth: {
    client: null
  },
  activeMonthId: toMonthId(new Date()),
  remoteVotingClosed: false,
  submitInProgress: false
};

normalizePlayerDefaults();

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn("Failed to load data override", err);
  }
  return structuredClone(defaultData);
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function normalizePlayerDefaults() {
  let changed = false;
  if (!state.data.settings) {
    state.data.settings = { votingClosed: false };
    changed = true;
  }
  if (typeof state.data.settings.votingClosed !== "boolean") {
    state.data.settings.votingClosed = false;
    changed = true;
  }
  state.data.leagues.forEach((league) => {
    league.players.forEach((player) => {
      if (typeof player.active === "undefined") {
        player.active = true;
        changed = true;
      }
      if (typeof player.number === "undefined") {
        player.number = 0;
        changed = true;
      }
      if (!player.country) {
        player.country = normalizeCountry(player.country || player.team || "");
        changed = true;
      }
      if (typeof player.statsText === "undefined") {
        if (Array.isArray(player.stats) && player.stats.length > 0) {
          player.statsText = player.stats
            .map((s) => `${s.label} ${s.value}`.trim())
            .join(", ");
        } else {
          player.statsText = "";
        }
        changed = true;
      }
    });
  });
  if (changed) saveData();
}

function normalizeCountry(value) {
  const map = {
    SVERIGE: "SE",
    SWEDEN: "SE",
    FINLAND: "FI",
    SUOMI: "FI",
    KANADA: "CA",
    CANADA: "CA",
    USA: "US",
    "UNITED STATES": "US",
    TJECKIEN: "CZ",
    CZECHIA: "CZ",
    SLOVAKIEN: "SK",
    SLOVAKIA: "SK",
    SCHWEIZ: "CH",
    SWITZERLAND: "CH",
    ITALIEN: "IT",
    ITALY: "IT",
    JAPAN: "JP"
  };
  const raw = String(value || "").trim().toUpperCase();
  if (!raw) return "";
  if (/^[A-Z]{2}$/.test(raw)) return raw;
  return map[raw] || "";
}

function countryLabel(iso) {
  const labels = {
    SE: "Sverige",
    FI: "Finland",
    CA: "Kanada",
    US: "USA",
    CZ: "Tjeckien",
    SK: "Slovakien",
    CH: "Schweiz",
    IT: "Italien",
    JP: "Japan"
  };
  return labels[iso] || "Okänt land";
}

function flagFromIso(iso) {
  const code = String(iso || "").toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return "🏳️";
  const base = 127397;
  return String.fromCodePoint(...code.split("").map((c) => base + c.charCodeAt(0)));
}

function toMonthId(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getSupabaseConfig() {
  const urlMeta = document.querySelector('meta[name="supabase-url"]')?.content?.trim();
  const keyMeta = document.querySelector('meta[name="supabase-anon-key"]')?.content?.trim();
  const url = window.SUPABASE_URL || urlMeta || "";
  const anonKey = window.SUPABASE_ANON_KEY || keyMeta || "";
  return { url, anonKey };
}


function formatSupabaseError(error, fallback = "okänt fel") {
  if (!error) return fallback;
  const message = String(error.message || "").trim();
  const details = String(error.details || "").trim();
  const hint = String(error.hint || "").trim();
  const code = String(error.code || "").trim();
  return [message, details, hint, code && `(kod: ${code})`].filter(Boolean).join(" | ") || fallback;
function getAuthRedirectUrl() {
  const current = new URL(window.location.href);
  current.hash = "";
  current.search = "";
  return current.toString();
}

function isProfileComplete(profile) {
  if (!profile) return false;
  return PROFILE_REQUIRED_FIELDS.every((field) => {
    const value = profile[field];
    return value !== null && value !== undefined && String(value).trim() !== "";
  });
}


function formatSupabaseError(error, fallback = "okänt fel") {
  if (!error) return fallback;
  const message = String(error.message || "").trim();
  const details = String(error.details || "").trim();
  const hint = String(error.hint || "").trim();
  const code = String(error.code || "").trim();
  return [message, details, hint, code && `(kod: ${code})`].filter(Boolean).join(" | ") || fallback;
}

function isVotingClosed() {
  return Boolean(state.data.settings.votingClosed || state.remoteVotingClosed);
}

function canVoteNow() {
  return !isVotingClosed();
}

function resetData() {
  localStorage.removeItem(STORAGE_KEY);
  state.data = structuredClone(defaultData);
  renderAll();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function renderSponsor() {
  const headline = document.getElementById("welcome-headline");
  const sponsorLogo = document.querySelector(".sponsor-logo");
  const sponsorImg = sponsorLogo.querySelector("img");
  headline.textContent = "MÅNADENS SPELARE PRESENTERAS AV";
  sponsorImg.src = state.data.sponsor.logoUrl;
  sponsorImg.alt = state.data.sponsor.name;
  sponsorLogo.href = state.data.sponsor.linkUrl || "#";
  const banner = document.querySelector(".banner");
  banner.src = state.data.bannerUrl;
}

function renderCards() {
  const order = ["G", "D", "FWD"];
  const labels = { G: "MÅLVAKTER", D: "BACKAR", FWD: "FORWARDS" };
  state.data.leagues.forEach((league) => {
    const container = document.getElementById(`${league.id}-cards`);
    container.innerHTML = "";
    const activePlayers = league.players
      .filter((p) => p.active !== false)
      .map((player) => ({
        ...player,
        position: normalizePosition(player.position),
        country: normalizeCountry(player.country || player.team || "")
      }));

    order.forEach((groupKey) => {
      const groupPlayers = activePlayers
        .filter((p) => groupForPosition(p.position) === groupKey)
        .sort((a, b) => (Number(a.number) || 999) - (Number(b.number) || 999));

      if (groupPlayers.length === 0) return;

      const group = document.createElement("section");
      group.className = "position-group";
      group.innerHTML = `<h3 class="group-title">${labels[groupKey]}</h3><div class="group-grid"></div>`;
      const grid = group.querySelector(".group-grid");

      groupPlayers.forEach((player, index) => {
        const card = document.createElement("article");
        card.className = "card";
        card.dataset.league = league.id;
        card.dataset.playerId = player.id;
        card.style.animationDelay = `${index * 0.08}s`;
        card.innerHTML = `
          <div class="card-main">
            <img src="${player.imageUrl}" alt="${player.name}" loading="lazy" />
            <div class="card-copy">
              <h3>#${player.number || "-"} ${player.name}</h3>
              <p class="card-meta">${flagFromIso(player.country)} ${countryLabel(player.country)} · ${player.position}</p>
              ${player.statsText ? `<p class="card-stats">${player.statsText}</p>` : ""}
            </div>
          </div>
          <button class="select-btn" type="button" aria-label="Rösta på ${player.name}" aria-pressed="false">
            <span aria-hidden="true">✓</span>
          </button>
        `;
        grid.appendChild(card);
      });

      container.appendChild(group);
    });
  });
  runDealAnimation();
}

function normalizePosition(value) {
  const raw = String(value || "").trim().toUpperCase();
  if (raw === "G" || raw.includes("MÅL") || raw.includes("MAL")) return "G";
  if (raw === "D" || raw.includes("BACK")) return "D";
  if (raw === "C" || raw.includes("CENTER")) return "C";
  if (raw === "F" || raw === "LW" || raw === "RW" || raw.includes("FORWARD")) return "F";
  return "F";
}

function groupForPosition(position) {
  return position === "G" || position === "D" ? position : "FWD";
}

function runDealAnimation() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowPerf = (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  const reduce = prefersReduced || lowPerf;
  const cards = Array.from(document.querySelectorAll(".card"));
  if (reduce || cards.length === 0) {
    cards.forEach((card) => {
      card.style.opacity = "1";
      card.style.transform = "none";
    });
    return;
  }

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(8px)";
    card.animate(
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      {
        duration: 300,
        delay: index * 70,
        easing: "ease-out",
        fill: "forwards"
      }
    );
  });
}

function updateSelectionUI(leagueId) {
  const selectedId = state.selections[leagueId];
  const cards = document.querySelectorAll(`.card[data-league="${leagueId}"]`);
  cards.forEach((card) => {
    const isSelected = card.dataset.playerId === selectedId;
    card.classList.toggle("selected", isSelected);
    const button = card.querySelector(".select-btn");
    button.classList.toggle("selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function attachCardListeners() {
  document.querySelectorAll(".cards").forEach((container) => {
    container.addEventListener("click", (event) => {
      const card = event.target.closest(".card");
      if (!card) return;
      if (isVotingClosed()) {
        showToast("Omröstningen är stängd.");
        return;
      }
      const leagueId = card.dataset.league;
      const playerId = card.dataset.playerId;
      state.selections[leagueId] = playerId;
      updateSelectionUI(leagueId);
      updateSubmitState();

      const missingLeague = ["sdhl", "shl"].find((id) => !state.selections[id]);
      if (missingLeague) {
        const missingSectionTitle = document.getElementById(`${missingLeague}-title`);
        if (missingSectionTitle) {
          missingSectionTitle.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      const formSection = document.getElementById("form-title");
      if (formSection) formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function updateSubmitState() {
  const form = document.getElementById("vote-form");
  const requiredFields = Array.from(form.querySelectorAll("input[required]"));
  const hasRequired = requiredFields.every((input) => input.type === "checkbox" ? input.checked : input.value.trim() !== "");
  const email = form.elements.email.value.trim();
  const emailValid = /.+@.+\..+/.test(email);
  const hasBothVotes = Boolean(state.selections.shl && state.selections.sdhl);
  const canSubmit = hasRequired && emailValid && hasBothVotes && !isVotingClosed();
  form.querySelector("#submit").disabled = !canSubmit;

  const status = document.getElementById("form-status");
  if (isVotingClosed()) {
    status.textContent = "Omröstningen är stängd.";
  } else if (!hasBothVotes) {
    status.textContent = "Välj en spelare i både SDHL och SHL.";
  } else if (!emailValid) {
    status.textContent = "Kontrollera e-post.";
  } else {
    status.textContent = "Redo att skicka.";
  }
}

function handleForm() {
  const form = document.getElementById("vote-form");
  form.addEventListener("input", updateSubmitState);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (isVotingClosed()) {
      showToast("Omröstningen är stängd.");
      return;
    }
    updateSubmitState();
    if (form.querySelector("#submit").disabled) {
      showToast("Fyll i alla obligatoriska fält och välj en spelare i både SDHL och SHL.");
      return;
    }

    const payload = {
      shl: state.selections.shl,
      sdhl: state.selections.sdhl,
      firstName: form.elements.firstName.value.trim(),
      lastName: form.elements.lastName.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      marketingConsent: Boolean(form.elements.marketingConsent?.checked),
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(EMAIL_KEY, payload.email);
    const voteResult = await submitVotes(payload);
    if (!voteResult.ok) {
      showToast(voteResult.message);
      return;
    }
    sessionStorage.setItem(RESULTS_UNLOCK_KEY, "true");
    await renderResults();
    const resultsSection = document.getElementById("results-title");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    triggerConfetti();
    showToast("Din röst är registrerad. Tack!");
    form.reset();
    updateSubmitState();
  });

  const savedEmail = localStorage.getItem(EMAIL_KEY);
  if (savedEmail) {
    form.elements.email.value = savedEmail;
  }
}


function setModalVisible(id, visible) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.hidden = !visible;
  modal.style.display = visible ? "" : "none";
}

function hideAuthModals() {
  setModalVisible("login-modal", false);
  setModalVisible("profile-modal", false);
}

function openLoginModal() {
  setModalVisible("login-modal", true);
}

function closeLoginModal() {
  setModalVisible("login-modal", false);
}

async function initSupabaseAuth() {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey || !window.supabase?.createClient) {
    showToast("Supabase saknar konfiguration (SUPABASE_URL/SUPABASE_ANON_KEY).");
    return;
  }

state.auth.client = window.supabase.createClient(url, anonKey);
  state.auth.client = window.supabase.createClient(url, anonKey);
  await loadRemoteSettings();
  renderAll();
}

function renderAuthState() {
  // Auth är borttaget i public vote-läget.
}

async function loadProfile() {
  return;
}

function fillVoteFormFromProfile() {
  return;
}

function maybeShowProfileModal() {
  return false;
}

function renderAuthState() {
  const banner = document.getElementById("auth-banner");
  const bannerText = document.getElementById("auth-banner-text");
  const openLogin = document.getElementById("open-login");
  const logoutUser = document.getElementById("logout-user");

  banner.hidden = false;
  bannerText.textContent = "Ingen inloggning krävs just nu. En e-postadress kan bara rösta en gång per månad.";
  openLogin.hidden = true;
  logoutUser.hidden = true;
  updateSubmitState();
}

async function loadRemoteSettings() {
  if (!state.auth.client) return;
  const { data, error } = await state.auth.client
    .from("settings")
    .select("key,value")
    .in("key", ["active_month_id", "voting_closed"]);
  if (error || !data) return;
  const active = data.find((row) => row.key === "active_month_id");
  const closed = data.find((row) => row.key === "voting_closed");
  if (active) {
    const value = typeof active.value === "string" ? active.value : active.value?.value || active.value;
    if (typeof value === "string" && /^\\d{4}-\\d{2}$/.test(value)) {
      state.activeMonthId = value;
    }
  }
  if (closed) {
    state.remoteVotingClosed = Boolean(closed.value?.closed);
  }
}

async function submitVotes(payload) {
  if (!state.auth.client) {
    return { ok: false, message: "Kunde inte ansluta till databasen." };
  }

  const { data, error } = await state.auth.client.rpc("submit_vote_public", {
    p_month_id: state.activeMonthId || toMonthId(new Date()),
    p_email: payload.email.toLowerCase(),
    p_first_name: payload.firstName,
    p_last_name: payload.lastName,
    p_phone: payload.phone || null,
    p_marketing_opt_in: Boolean(payload.marketingConsent),
    p_shl_player_id: payload.shl,
    p_sdhl_player_id: payload.sdhl
  });
  const monthId = state.activeMonthId || toMonthId(new Date());

  const existingVote = await state.auth.client
    .from("votes")
    .select("league_id", { head: false })
    .eq("user_id", state.auth.user.id)
    .eq("month_id", monthId)
    .limit(1);

  if (existingVote.error) {
    const reason = formatSupabaseError(existingVote.error);
    return {
      ok: false,
      message: `Kunde inte kontrollera tidigare röst: ${reason}`
    };
  }

  if (Array.isArray(existingVote.data) && existingVote.data.length > 0) {
    return { ok: false, message: "Du har redan röstat den här månaden." };
  }

  const rows = [
    {
      league_id: "shl",
      player_id: payload.shl,
      month_id: monthId,
      email,
      first_name: payload.firstName,
      last_name: payload.lastName,
      phone: payload.phone,
      marketing_consent: payload.marketingConsent,
      created_at: payload.createdAt
    },
    {
      league_id: "sdhl",
      player_id: payload.sdhl,
      month_id: monthId,
      email,
      first_name: payload.firstName,
      last_name: payload.lastName,
      phone: payload.phone,
      marketing_consent: payload.marketingConsent,
      created_at: payload.createdAt
    }
  ];

  if (error) {
    if (error.code === "42501") {
      return { ok: false, message: "RLS blockerar röster utan inloggning. Lägg en EXECUTE-policy för RPC:n submit_vote_public." };
    }
    return { ok: false, message: `Kunde inte spara röst: ${formatSupabaseError(error)}` };
  }

  const response = Array.isArray(data) ? data[0] : data;
  const status = response?.status || (typeof data === "string" ? data : null);
  if (status === "already_voted") {
    return { ok: false, message: "Du har redan röstat denna månad." };
  }
  if (status !== "ok") {
    return { ok: false, message: "Oväntat svar från databasen vid röstning." };
  }
    if (error.code === "23505") {
      return { ok: false, message: "Den här e-postadressen har redan röstat denna månad." };
    }
    if (error.code === "42501") {
      return { ok: false, message: "Databasen nekar skrivning (RLS/policy). Kontrollera INSERT-policy för votes." };
    }
    return { ok: false, message: `Kunde inte spara röst: ${formatSupabaseError(error)}` };
  }

  return { ok: true };
}

function setupAuthHandlers() {
  // Login är avstängt i detta läge.
  // Inloggning används inte i förenklat läge.
}

function openAdmin() {
  const panel = document.querySelector(".admin");
  if (sessionStorage.getItem(ADMIN_SESSION_KEY) === "true") {
    panel.hidden = false;
    renderAdmin();
    return;
  }

  const password = prompt("Admin-lösenord");
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    panel.hidden = false;
    showToast("Adminläge aktiverat.");
    renderAdmin();
  } else if (password) {
    showToast("Fel lösenord.");
  }
}

function logoutAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  document.querySelector(".admin").hidden = true;
}

function renderAdmin() {
  if (document.querySelector(".admin").hidden) return;
  document.getElementById("sponsor-name").value = state.data.sponsor.name;
  document.getElementById("sponsor-logo").value = state.data.sponsor.logoUrl;
  document.getElementById("sponsor-link").value = state.data.sponsor.linkUrl;
  document.getElementById("banner-url").value = state.data.bannerUrl;
  document.getElementById("voting-closed-toggle").checked = Boolean(state.data.settings.votingClosed);

  const leagueSelect = document.getElementById("league-select");
  leagueSelect.innerHTML = state.data.leagues.map((league) => `<option value="${league.id}">${league.name}</option>`).join("");
  const fallbackLeagueId = state.data.leagues[0]?.id || "";
  if (!leagueSelect.value && fallbackLeagueId) leagueSelect.value = fallbackLeagueId;
  renderPlayerList(leagueSelect.value || fallbackLeagueId);
}

function renderPlayerList(leagueId) {
  const league = state.data.leagues.find((l) => l.id === leagueId);
  const list = document.getElementById("player-list");
  list.innerHTML = "";
  if (!league) {
    list.innerHTML = "<div>Ingen liga vald.</div>";
    return;
  }

  league.players.forEach((player) => {
    const item = document.createElement("div");
    item.className = "player-item";
    const pos = normalizePosition(player.position);
    const country = normalizeCountry(player.country || player.team || "");
    item.innerHTML = `
      <h4>#${player.number || "-"} ${player.name}</h4>
      <div>${flagFromIso(country)} ${countryLabel(country)} · ${pos}</div>
      <div>${player.active ? "Aktiv" : "Inaktiv"}</div>
      <div class="player-actions">
        <button class="ghost" type="button" data-action="edit" data-id="${player.id}">Redigera</button>
        <button class="ghost" type="button" data-action="delete" data-id="${player.id}">Ta bort</button>
      </div>
    `;
    list.appendChild(item);
  });
}

function fillPlayerForm(player) {
  document.getElementById("player-id").value = player?.id || "";
  document.getElementById("player-name").value = player?.name || "";
  document.getElementById("player-country").value = normalizeCountry(player?.country || player?.team || "");
  document.getElementById("player-position").value = normalizePosition(player?.position || "F");
  document.getElementById("player-number").value = player?.number ?? "";
  document.getElementById("player-image").value = player?.imageUrl || "";
  document.getElementById("player-stats").value = player?.statsText || "";
  document.getElementById("player-active").checked = player?.active !== false;
}

function setupAdminHandlers() {
  document.getElementById("open-admin").addEventListener("click", openAdmin);
  document.getElementById("logout-admin").addEventListener("click", logoutAdmin);

  document.getElementById("save-sponsor").addEventListener("click", () => {
    state.data.sponsor.name = document.getElementById("sponsor-name").value.trim() || state.data.sponsor.name;
    state.data.sponsor.logoUrl = document.getElementById("sponsor-logo").value.trim() || state.data.sponsor.logoUrl;
    state.data.sponsor.linkUrl = document.getElementById("sponsor-link").value.trim() || state.data.sponsor.linkUrl;
    state.data.bannerUrl = document.getElementById("banner-url").value.trim() || state.data.bannerUrl;
    state.data.settings.votingClosed = document.getElementById("voting-closed-toggle").checked;
    saveData();
    renderAll();
    showToast("Sponsor uppdaterad.");
  });

  const leagueSelect = document.getElementById("league-select");
  leagueSelect.addEventListener("change", (event) => {
    renderPlayerList(event.target.value);
    fillPlayerForm(null);
  });

  document.getElementById("player-list").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const leagueId = leagueSelect.value;
    const league = state.data.leagues.find((l) => l.id === leagueId);
    const player = league.players.find((p) => p.id === button.dataset.id);
    if (button.dataset.action === "edit") {
      fillPlayerForm(player);
    }
    if (button.dataset.action === "delete") {
      league.players = league.players.filter((p) => p.id !== player.id);
      saveData();
      renderAll();
      renderPlayerList(leagueId);
      showToast("Spelare borttagen.");
    }
  });

  document.getElementById("player-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const leagueId = leagueSelect.value;
    const league = state.data.leagues.find((l) => l.id === leagueId);
    if (!league) {
      showToast("Välj liga först.");
      return;
    }
    const idField = document.getElementById("player-id");
    const playerData = {
      id: idField.value || `${leagueId}-${Date.now()}`,
      active: document.getElementById("player-active").checked,
      name: document.getElementById("player-name").value.trim(),
      country: normalizeCountry(document.getElementById("player-country").value),
      position: normalizePosition(document.getElementById("player-position").value.trim()),
      number: Number(document.getElementById("player-number").value || 0),
      imageUrl: document.getElementById("player-image").value.trim(),
      statsText: document.getElementById("player-stats").value.trim(),
      stats: []
    };

    const existingIndex = league.players.findIndex((p) => p.id === playerData.id);
    if (existingIndex >= 0) {
      league.players[existingIndex] = playerData;
    } else {
      league.players.push(playerData);
    }

    saveData();
    renderAll();
    renderPlayerList(leagueId);
    fillPlayerForm(null);
    showToast("Spelare sparad.");
  });

  document.getElementById("reset-player").addEventListener("click", () => fillPlayerForm(null));

  document.getElementById("export-data").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state.data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "manadens_spelare.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });

  document.getElementById("import-data").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    file.text().then((text) => {
      try {
        state.data = JSON.parse(text);
        normalizePlayerDefaults();
        saveData();
        renderAll();
        renderAdmin();
        showToast("Data importerad.");
      } catch (err) {
        showToast("Kunde inte läsa JSON.");
      }
    });
  });
}

function renderAll() {
  renderSponsor();
  renderCards();
  renderVotingState();
  updateSelectionUI("shl");
  updateSelectionUI("sdhl");
  updateSubmitState();
  void renderResults();
}

function renderVotingState() {
  const closed = isVotingClosed();
  const closedBanner = document.getElementById("voting-closed");
  closedBanner.hidden = !isVotingClosed();
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.toggle("disabled", closed);
    const button = card.querySelector(".select-btn");
    if (button) {
      button.disabled = closed;
      button.setAttribute("aria-disabled", String(closed));
    }
  });
}

async function renderResults() {
  const section = document.getElementById("results");
  const grid = document.getElementById("results-grid");
  const resultsUnlocked = sessionStorage.getItem(RESULTS_UNLOCK_KEY) === "true";
  if (!resultsUnlocked || !state.auth.client) {
    section.hidden = true;
    grid.innerHTML = "";
    return;
  }

  const { data, error } = await state.auth.client.rpc("get_vote_results_public", {
    p_month_id: state.activeMonthId
  });
  if (error || !Array.isArray(data) || data.length === 0) {
    section.hidden = true;
    grid.innerHTML = "";
    return;
  }

  const grouped = data.reduce((acc, row) => {
    const leagueId = row.league_id || row.league;
    if (!leagueId) return acc;
    if (!acc[leagueId]) acc[leagueId] = [];
    acc[leagueId].push(row);
    return acc;
  }, {});

  section.hidden = false;
  const blocks = state.data.leagues.map((league) => {
    const byPlayer = (grouped[league.id] || [])
      .sort((a, b) => Number(b.pct) - Number(a.pct))
      .slice(0, 3);
    if (byPlayer.length === 0) return "";

    return `
      <article class="result-league">
        <h3>${league.name} - Topp 3</h3>
        ${byPlayer.map((row) => {
          const player = league.players.find((p) => p.id === row.player_id);
          const name = player?.name || row.player_id;
          const pct = Math.round(Number(row.pct) || 0);
          return `
          <div class="result-row">
            <div class="result-label">
              <span>${name}</span>
              <strong>${pct}%</strong>
            </div>
            <div class="result-bar"><span style="width:${pct}%"></span></div>
          </div>
        `;
        }).join("")}
      </article>
    `;
  });
  grid.innerHTML = blocks.filter(Boolean).join("");
}

function triggerConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (typeof window.confetti !== "function") return;

  const colors = ["#ffd54a", "#8e111b", "#111111"];
  const end = Date.now() + 1200;
  const frame = () => {
    window.confetti({
      particleCount: 60,
      startVelocity: 32,
      spread: 80,
      ticks: 90,
      origin: { x: Math.random(), y: Math.random() * 0.25 + 0.1 },
      colors
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

async function init() {
  hideAuthModals();
  renderAll();
  attachCardListeners();
  handleForm();
  setupAuthHandlers();
  setupAdminHandlers();
  renderAdmin();
  await initSupabaseAuth();
}

void init();

