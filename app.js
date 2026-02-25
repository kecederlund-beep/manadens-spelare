const STORAGE_KEY = "msp_data_override";
const EMAIL_KEY = "msp_email";
const ADMIN_SESSION_KEY = "msp_admin";
const RESULTS_UNLOCK_KEY = "msp_results_unlocked";
const ADMIN_PASSWORD = "shl2026"; // change for production
const PROFILE_REQUIRED_FIELDS = ["first_name", "last_name", "birth_year", "postal_code"];

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
    client: null,
    user: null,
    profile: null
  },
  activeMonthId: toMonthId(new Date()),
  remoteVotingClosed: false
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

function isProfileComplete(profile) {
  if (!profile) return false;
  return PROFILE_REQUIRED_FIELDS.every((field) => {
    const value = profile[field];
    return value !== null && value !== undefined && String(value).trim() !== "";
  });
}

function isVotingClosed() {
  return Boolean(state.data.settings.votingClosed || state.remoteVotingClosed);
}

function canVoteNow() {
  return Boolean(state.auth.user && isProfileComplete(state.auth.profile) && !isVotingClosed());
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
  const canSubmit = hasRequired && emailValid && hasBothVotes && !isVotingClosed() && Boolean(state.auth.user);
  form.querySelector("#submit").disabled = !canSubmit;

  const status = document.getElementById("form-status");
  if (!state.auth.user) {
    status.textContent = "Logga in för att rösta.";
  } else if (isVotingClosed()) {
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
    if (!state.auth.user) {
      showToast("Logga in med e-post först.");
      openLoginModal();
      return;
    }
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

function openLoginModal() {
  document.getElementById("login-modal").hidden = false;
}

function closeLoginModal() {
  document.getElementById("login-modal").hidden = true;
}

async function initSupabaseAuth() {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey || !window.supabase?.createClient) {
    showToast("Supabase saknar konfiguration (SUPABASE_URL/SUPABASE_ANON_KEY).");
    renderAuthState();
    return;
  }

  state.auth.client = window.supabase.createClient(url, anonKey);
  const { data } = await state.auth.client.auth.getSession();
  state.auth.user = data.session?.user || null;
  if (state.auth.user) {
    await loadProfile();
  }
  await loadRemoteSettings();
  renderAuthState();
  renderAll();

  state.auth.client.auth.onAuthStateChange(async (_event, session) => {
    state.auth.user = session?.user || null;
    state.auth.profile = null;
    if (state.auth.user) {
      await loadProfile();
    }
    renderAuthState();
    renderAll();
  });
}

async function loadProfile() {
  if (!state.auth.client || !state.auth.user) return;
  const { data, error } = await state.auth.client
    .from("profiles")
    .select("*")
    .eq("id", state.auth.user.id)
    .maybeSingle();
  if (error) {
    showToast("Kunde inte läsa profil.");
    return;
  }
  state.auth.profile = data || null;
  fillVoteFormFromProfile();
  maybeShowProfileModal();
}

function fillVoteFormFromProfile() {
  if (!state.auth.profile) return;
  const form = document.getElementById("vote-form");
  form.elements.firstName.value = state.auth.profile.first_name || "";
  form.elements.lastName.value = state.auth.profile.last_name || "";
  form.elements.email.value = state.auth.user?.email || state.auth.profile.email || "";
  form.elements.phone.value = state.auth.profile.phone || "";
  form.elements.marketingConsent.checked = Boolean(state.auth.profile.marketing_opt_in);
}

function maybeShowProfileModal() {
  const modal = document.getElementById("profile-modal");
  if (!state.auth.user) {
    modal.hidden = true;
    return;
  }
  const needsProfile = !isProfileComplete(state.auth.profile);
  modal.hidden = !needsProfile;
  const p = state.auth.profile || {};
  document.getElementById("profile-first-name").value = p.first_name || "";
  document.getElementById("profile-last-name").value = p.last_name || "";
  document.getElementById("profile-birth-year").value = p.birth_year || "";
  document.getElementById("profile-postal-code").value = p.postal_code || "";
  document.getElementById("profile-phone").value = p.phone || "";
  document.getElementById("profile-marketing").checked = Boolean(p.marketing_opt_in);
}

function renderAuthState() {
  const banner = document.getElementById("auth-banner");
  const bannerText = document.getElementById("auth-banner-text");
  const openLogin = document.getElementById("open-login");
  const logoutUser = document.getElementById("logout-user");
  const voteForm = document.getElementById("vote-form");
  const user = state.auth.user;
  const profileReady = isProfileComplete(state.auth.profile);

  if (!user) {
    banner.hidden = false;
    bannerText.textContent = "Logga in med e-post för att rösta.";
    openLogin.hidden = false;
    logoutUser.hidden = true;
  } else if (!profileReady) {
    banner.hidden = false;
    bannerText.textContent = "Komplettera din profil för att rösta.";
    openLogin.hidden = true;
    logoutUser.hidden = false;
  } else {
    banner.hidden = true;
    logoutUser.hidden = false;
  }

  voteForm.querySelectorAll("input, button").forEach((el) => {
    if (el.id === "open-admin") return;
    if (el.name === "terms") return;
    if (!user || !profileReady) {
      if (el.id !== "submit") el.setAttribute("aria-disabled", "true");
    } else {
      el.removeAttribute("aria-disabled");
    }
  });
  updateSubmitState();
}

async function loadRemoteSettings() {
  if (!state.auth.client || !state.auth.user) return;
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
  if (!state.auth.client || !state.auth.user) {
    return { ok: false, message: "Du måste vara inloggad." };
  }

  const monthId = state.activeMonthId || toMonthId(new Date());
  const rows = [
    { user_id: state.auth.user.id, league_id: "shl", player_id: payload.shl, month_id: monthId },
    { user_id: state.auth.user.id, league_id: "sdhl", player_id: payload.sdhl, month_id: monthId }
  ];

  const { error } = await state.auth.client.from("votes").insert(rows);
  if (error) {
    if (error.code === "23505") {
      return { ok: false, message: "Du har redan röstat i den här ligan denna månad." };
    }
    return { ok: false, message: "Kunde inte spara röst just nu." };
  }
  return { ok: true };
}

function setupAuthHandlers() {
  document.getElementById("open-login").addEventListener("click", openLoginModal);
  document.getElementById("close-login").addEventListener("click", closeLoginModal);

  document.getElementById("email-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!state.auth.client) return;
    const email = document.getElementById("login-email").value.trim();
    const { error } = await state.auth.client.auth.signInWithOtp({ email });
    if (error) {
      showToast("Kunde inte skicka kod.");
      return;
    }
    document.getElementById("otp-form").hidden = false;
    showToast("Kod skickad till din e-post.");
  });

  document.getElementById("otp-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!state.auth.client) return;
    const email = document.getElementById("login-email").value.trim();
    const token = document.getElementById("otp-code").value.trim();
    const { error } = await state.auth.client.auth.verifyOtp({
      email,
      token,
      type: "email"
    });
    if (error) {
      showToast("Fel eller utgången kod.");
      return;
    }
    closeLoginModal();
    showToast("Inloggning lyckades.");
  });

  document.getElementById("profile-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!state.auth.client || !state.auth.user) return;
    const profile = {
      id: state.auth.user.id,
      email: state.auth.user.email || "",
      first_name: document.getElementById("profile-first-name").value.trim(),
      last_name: document.getElementById("profile-last-name").value.trim(),
      birth_year: Number(document.getElementById("profile-birth-year").value),
      postal_code: document.getElementById("profile-postal-code").value.trim(),
      phone: document.getElementById("profile-phone").value.trim(),
      marketing_opt_in: Boolean(document.getElementById("profile-marketing").checked)
    };
    const { error } = await state.auth.client.from("profiles").upsert(profile, { onConflict: "id" });
    if (error) {
      showToast("Kunde inte spara profil.");
      return;
    }
    state.auth.profile = profile;
    document.getElementById("profile-modal").hidden = true;
    fillVoteFormFromProfile();
    renderAuthState();
    renderAll();
    showToast("Profil sparad.");
  });

  document.getElementById("logout-user").addEventListener("click", async () => {
    if (!state.auth.client) return;
    await state.auth.client.auth.signOut();
    sessionStorage.removeItem(RESULTS_UNLOCK_KEY);
    state.auth.user = null;
    state.auth.profile = null;
    renderAuthState();
    renderAll();
  });
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
  const closed = isVotingClosed() || !state.auth.user || !isProfileComplete(state.auth.profile);
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
  if (!resultsUnlocked || !state.auth.client || !state.auth.user) {
    section.hidden = true;
    grid.innerHTML = "";
    return;
  }

  const { data, error } = await state.auth.client.rpc("get_results_for_month", {
    p_month_id: state.activeMonthId
  });
  if (error || !Array.isArray(data) || data.length === 0) {
    section.hidden = true;
    grid.innerHTML = "";
    return;
  }

  const grouped = data.reduce((acc, row) => {
    if (!acc[row.league_id]) acc[row.league_id] = [];
    acc[row.league_id].push(row);
    return acc;
  }, {});

  section.hidden = false;
  const blocks = state.data.leagues.map((league) => {
    const byPlayer = (grouped[league.id] || [])
      .sort((a, b) => Number(b.percentage) - Number(a.percentage))
      .slice(0, 3);
    if (byPlayer.length === 0) return "";

    return `
      <article class="result-league">
        <h3>${league.name} - Topp 3</h3>
        ${byPlayer.map((row) => {
          const player = league.players.find((p) => p.id === row.player_id);
          const name = player?.name || row.player_id;
          const pct = Math.round(Number(row.percentage) || 0);
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
  renderAll();
  attachCardListeners();
  handleForm();
  setupAuthHandlers();
  setupAdminHandlers();
  renderAdmin();
  await initSupabaseAuth();
}

void init();


(async () => {
  // vänta tills init() hunnit initiera Supabase
  // (init() await:ar initSupabaseAuth() i slutet)
  const client = state?.auth?.client;

  if (!client) {
    console.log("Supabase client saknas fortfarande. Kolla meta-taggarna.");
    return;
  }

  const { data, error } = await client.auth.getUser();
  console.log("USER:", data);
  console.log("ERROR:", error);
})();
