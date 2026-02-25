const STORAGE_KEY = "msp_data_override";
const EMAIL_KEY = "msp_email";
const ADMIN_SESSION_KEY = "msp_admin";
const RESULTS_UNLOCK_KEY = "msp_results_unlocked";
const ADMIN_PASSWORD = "shl2026"; // change for production
const DEFAULT_DATA_PATH = "data/defaultData.json";
const DEFAULT_DATA_VERSION = "2026-02-25-lineup-v1";
const STORAGE_VERSION_KEY = "msp_data_version";

const defaultData = {
  "sponsor": {
    "name": "Ductus",
    "logoUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771911570/Ductus-logo-white_cyc5no.png",
    "linkUrl": "https://example.com"
  },
  "bannerUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1758878747/banner_omro%CC%88stning_vit_tmguie.png",
  "leagues": [
    {
      "id": "shl",
      "name": "SHL",
      "players": [
        {
          "id": "shl-1",
          "active": true,
          "name": "Markus Nurmi",
          "team": "Finland",
          "position": "F",
          "number": 51,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771862012/51_Markus_Nurmi_3_bbdftx.png",
          "stats": []
        },
        {
          "id": "shl-2",
          "active": true,
          "name": "Isac Hedqvist",
          "team": "Sverige",
          "position": "F",
          "number": 6,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771862012/06_Isac_Hedqvist_4_htn9a5.png",
          "stats": []
        },
        {
          "id": "shl-3",
          "active": true,
          "name": "Filip Eriksson",
          "team": "Sverige",
          "position": "F",
          "number": 25,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771862011/23_Filip_Eriksson_3_dkxdv3.png",
          "stats": []
        },
        {
          "id": "shl-1771917318978",
          "active": true,
          "name": "Joel Lassinantti",
          "team": "Sverige",
          "position": "G",
          "number": 34,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771917312/34_Joel_Lassinantti_1_qixvyh.png",
          "stats": []
        },
        {
          "id": "shl-1771917335335",
          "active": true,
          "name": "Erik Gustafsson",
          "team": "Sverige",
          "position": "D",
          "number": 29,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771917315/29_Erik_Gustafsson_2_zrfnzn.png",
          "stats": []
        },
        {
          "id": "shl-1771918557123",
          "active": true,
          "name": "Matteus Ward",
          "team": "Sverige",
          "position": "G",
          "number": 1,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918538/31_Matteus_Ward_1_vcnkie.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918571532",
          "active": true,
          "name": "Jesper Sellgren",
          "team": "Sverige",
          "position": "D",
          "number": 23,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918539/23_Jesper_Sellgren_1_r4nuii.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918585699",
          "active": true,
          "name": "Frederic Allard",
          "team": "Kanada",
          "position": "D",
          "number": 3,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918538/03_Frederic_Allard_1_or2yul.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918610087",
          "active": true,
          "name": "Oskari Laaksonen",
          "team": "Finland",
          "position": "D",
          "number": 27,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918537/27_Oskari_Laaksonen_01_1_d5bqsz.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918621718",
          "active": false,
          "name": "Oscar Engsund",
          "team": "Sverige",
          "position": "D",
          "number": 32,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918537/32_Oscar_Engsund_1_vanjra.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918675162",
          "active": false,
          "name": "Eetu Koivistoinen",
          "team": "Finland",
          "position": "F",
          "number": 13,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918536/13_Eetu_Koiistoinen_1_sycn9p.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918693281",
          "active": false,
          "name": "Otto Leskinen",
          "team": "Finland",
          "position": "D",
          "number": 82,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918535/82_Otto_Leskinen_1_kphbou.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918710481",
          "active": false,
          "name": "Casper Juustovaara",
          "team": "Sverige",
          "position": "F",
          "number": 20,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918535/20_Casper_Juustovaara_1_zb4zyd.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918729560",
          "active": true,
          "name": "Pontus Själin",
          "team": "Sverige",
          "position": "D",
          "number": 39,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918535/39_Pontus_Sja%CC%88lin_1_kbdbz8.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918744971",
          "active": false,
          "name": "Heiki Liedes",
          "team": "Finland",
          "position": "F",
          "number": 9,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918535/09_Heikki_Liedes_1_omisou.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918758075",
          "active": false,
          "name": "Brendan Shinnimin",
          "team": "Kanada",
          "position": "F",
          "number": 24,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918533/24_Brendan_Shinnimin_01_usjfuw.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918770982",
          "active": false,
          "name": "Anton Levtchi",
          "team": "Finland",
          "position": "F",
          "number": 76,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918532/76_Anton_Levtchi_1_e80le9.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918783783",
          "active": false,
          "name": "Ben Tardif",
          "team": "Kanada",
          "position": "F",
          "number": 72,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918532/72_Ben_Tardif_bewvvv.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918794585",
          "active": false,
          "name": "Linus Omark",
          "team": "Sverige",
          "position": "F",
          "number": 67,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918532/30_Linus_Omark_01_qqmifx.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918809599",
          "active": false,
          "name": "Pontus Andreasson",
          "team": "Sverige",
          "position": "F",
          "number": 96,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918532/96_Pontus_Andreasson_2_zsfyur.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918821868",
          "active": false,
          "name": "Mathias Bromé",
          "team": "Sverige",
          "position": "F",
          "number": 86,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918532/86_Mathias_Brome_01_d64rnr.jpg",
          "stats": []
        },
        {
          "id": "shl-1771918836713",
          "active": false,
          "name": "Brian O'Neill",
          "team": "USA",
          "position": "F",
          "number": 91,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771918531/91_Brian_ONeill_2_qtkhwy.jpg",
          "stats": []
        }
      ]
    },
    {
      "id": "sdhl",
      "name": "SDHL",
      "players": [
        {
          "id": "sdhl-1",
          "active": true,
          "name": "Sara Grahn",
          "team": "Luleå Hockey",
          "position": "G",
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771861791/52_Sara_Grahn_1_ma9auv.png",
          "stats": [
            {
              "label": "GP",
              "value": "5"
            },
            {
              "label": "SV%",
              "value": ".936"
            },
            {
              "label": "GAA",
              "value": "1.71"
            },
            {
              "label": "SO",
              "value": "0"
            }
          ],
          "number": 0
        },
        {
          "id": "sdhl-2",
          "active": true,
          "name": "Petra Nieminen",
          "team": "Luleå Hockey",
          "position": "FW",
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771861790/16_Petra_Nieminen_1_qa4qwp.png",
          "stats": [
            {
              "label": "GP",
              "value": "7"
            },
            {
              "label": "G",
              "value": "2"
            },
            {
              "label": "A",
              "value": "7"
            },
            {
              "label": "BLK",
              "value": "12"
            }
          ],
          "number": 0
        },
        {
          "id": "sdhl-3",
          "active": true,
          "name": "Linnea Johansson",
          "team": "Luleå Hockey",
          "position": "FW",
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771861791/77_Linnea_Johansson_1_ojd5vz.png",
          "stats": [
            {
              "label": "GP",
              "value": "7"
            },
            {
              "label": "G",
              "value": "4"
            },
            {
              "label": "A",
              "value": "5"
            },
            {
              "label": "SOG",
              "value": "15"
            }
          ],
          "number": 0
        },
        {
          "id": "sdhl-1771919423667",
          "active": true,
          "name": "Erica Rieder",
          "team": "Kanada",
          "position": "D",
          "number": 17,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919362/17_Erica_Rieder_2_yrzdju.jpg",
          "stats": []
        },
        {
          "id": "sdhl-1771919440314",
          "active": true,
          "name": "Jenni Hiirikoski",
          "team": "Finland",
          "position": "D",
          "number": 6,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919362/06_Jenni_Hiirikoski_1_tyktah.jpg",
          "stats": []
        },
        {
          "id": "sdhl-1771919459621",
          "active": true,
          "name": "Charlii Kettyle",
          "team": "Kanada",
          "position": "D",
          "number": 23,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919361/23_Charli_Kettyle_1_kpbgik.jpg",
          "stats": []
        },
        {
          "id": "sdhl-1771919508602",
          "active": true,
          "name": "Hedvig Sturk",
          "team": "Sverige",
          "position": "D",
          "number": 8,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919360/08_Hedvig_Sturk_2_mzdacr.jpg",
          "stats": []
        },
        {
          "id": "sdhl-1771919546889",
          "active": true,
          "name": "Jenna Donohue",
          "team": "USA",
          "position": "F",
          "number": 13,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919358/13_Jenna_Donohue_2_tqedrk.jpg",
          "stats": []
        },
        {
          "id": "sdhl-1771919563497",
          "active": true,
          "name": "Lovisa Lundström",
          "team": "Sverige",
          "position": "G",
          "number": 95,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919359/95_Lovisa_Lundstro%CC%88m_2_foraev.jpg",
          "stats": []
        },
        {
          "id": "sdhl-1771919576705",
          "active": true,
          "name": "Nadia Mattivi",
          "team": "Italien",
          "position": "D",
          "number": 93,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919358/93_Nadia_Mattivi_2_n1pv7s.jpg",
          "stats": []
        },
        {
          "id": "sdhl-1771919589909",
          "active": true,
          "name": "Tilde Sjödin",
          "team": "Sverige",
          "position": "D",
          "number": 7,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919357/07_Tilde_Sjo%CC%88din_2_rtf2yk.jpg",
          "stats": []
        },
        {
          "id": "sdhl-1771919604423",
          "active": true,
          "name": "Sarah Bujold",
          "team": "Kanada",
          "position": "F",
          "number": 62,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919355/62_Sarah_Bujold_2_c1wdpp.jpg",
          "stats": []
        },
        {
          "id": "sdhl-1771919622450",
          "active": true,
          "name": "Johanna Fällman",
          "team": "Sverige",
          "position": "D",
          "number": 5,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919356/05_Johanna_Fa%CC%88llman_2_njd3iy.jpg",
          "stats": []
        },
        {
          "id": "sdhl-1771919634225",
          "active": true,
          "name": "Mimmi Gill",
          "team": "Sverige",
          "position": "F",
          "number": 24,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919354/24_Mimmi_Gill_2_jecgr9.jpg",
          "stats": []
        },
        {
          "id": "sdhl-1771919646241",
          "active": true,
          "name": "Jaycee Magwood",
          "team": "Kanada",
          "position": "F",
          "number": 27,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919354/27_Jaycee_Magwood_2_tbebci.jpg",
          "stats": []
        },
        {
          "id": "sdhl-1771919661066",
          "active": true,
          "name": "Emelie Kruse",
          "team": "Norge",
          "position": "F",
          "number": 15,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919354/15_Emilie_Kruse_1_cesal3.jpg",
          "stats": []
        },
        {
          "id": "sdhl-1771919676678",
          "active": true,
          "name": "Inez Nygren",
          "team": "Sverige",
          "position": "F",
          "number": 39,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919354/39_Inez_Nygren_2_kblvmb.jpg",
          "stats": []
        },
        {
          "id": "sdhl-1771919696891",
          "active": true,
          "name": "Wilma Sjölund",
          "team": "Sverige",
          "position": "F",
          "number": 14,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919353/14_Wilma_Sjo%CC%88lund_2_qzrpig.jpg",
          "stats": []
        },
        {
          "id": "sdhl-1771919707122",
          "active": true,
          "name": "Akane Shiga",
          "team": "Japan",
          "position": "F",
          "number": 11,
          "imageUrl": "https://res.cloudinary.com/dufekxhkq/image/upload/v1771919353/11_Akane_Shiga_02_ftlq3h.jpg",
          "stats": []
        }
      ]
    }
  ],
  "settings": {
    "votingClosed": false
  }
};

const state = {
  data: loadData(),
  selections: { shl: null, sdhl: null },
  auth: {
    client: null
  },
  activeMonthId: toMonthId(new Date()),
  remoteVotingClosed: false
};

normalizePlayerDefaults();

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.leagues) && parsed.leagues.length > 0) {
        return parsed;
      }
      console.warn("Invalid data override, resetting to defaults");
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_VERSION_KEY);
    }
  } catch (err) {
    console.warn("Failed to load data override", err);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_VERSION_KEY);
  }
  return structuredClone(defaultData);
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function markDataVersion(version = DEFAULT_DATA_VERSION) {
  localStorage.setItem(STORAGE_VERSION_KEY, version);
}

async function hydrateDefaultDataFromFile() {
  const hasLocalOverride = Boolean(localStorage.getItem(STORAGE_KEY));
  const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
  const shouldHydrate = !hasLocalOverride || storedVersion !== DEFAULT_DATA_VERSION;
  if (!shouldHydrate) return;

  try {
    const response = await fetch(DEFAULT_DATA_PATH, { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    if (!data || !Array.isArray(data.leagues) || data.leagues.length === 0) return;
    state.data = data;
    normalizePlayerDefaults();
    saveData();
    markDataVersion();
  } catch (err) {
    console.warn("Failed to load defaultData.json", err);
  }
}

function normalizePlayerDefaults() {
  let changed = false;
  if (!state.data || typeof state.data !== "object") {
    state.data = structuredClone(defaultData);
    changed = true;
  }
  if (!Array.isArray(state.data.leagues) || state.data.leagues.length === 0) {
    state.data.leagues = structuredClone(defaultData.leagues);
    changed = true;
  }
  if (!state.data.sponsor) {
    state.data.sponsor = structuredClone(defaultData.sponsor);
    changed = true;
  }
  if (!state.data.bannerUrl) {
    state.data.bannerUrl = defaultData.bannerUrl;
    changed = true;
  }
  if (!state.data.settings) {
    state.data.settings = { votingClosed: false };
    changed = true;
  }
  if (typeof state.data.settings.votingClosed !== "boolean") {
    state.data.settings.votingClosed = false;
    changed = true;
  }
  state.data.leagues.forEach((league) => {
    if (!Array.isArray(league.players)) {
      league.players = [];
      changed = true;
    }
    league.players.forEach((player) => {
      if (player.active !== true) {
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
    JAPAN: "JP",
    NORGE: "NO",
    NORWAY: "NO"
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
    JP: "Japan",
    NO: "Norge"
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
}

function isVotingClosed() {
  return Boolean(state.data.settings.votingClosed || state.remoteVotingClosed);
}

function canVoteNow() {
  return !isVotingClosed();
}

function resetData() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_VERSION_KEY);
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


function setMissingLeagueHighlight(leagueId) {
  const section = document.querySelector(`[data-league-section="${leagueId}"]`);
  if (section) section.classList.add("missing-selection");
}

function clearMissingLeagueHighlight(leagueId) {
  const section = document.querySelector(`[data-league-section="${leagueId}"]`);
  if (section) section.classList.remove("missing-selection");
}

function clearAllMissingLeagueHighlights() {
  document.querySelectorAll("[data-league-section]").forEach((section) => {
    section.classList.remove("missing-selection");
  });
}

function showCenterOverlay(message, options = {}) {
  const overlay = document.getElementById("feedback-overlay");
  const text = document.getElementById("feedback-message");
  if (!overlay || !text) {
    showToast(message);
    options.onClose?.();
    return;
  }

  const timeoutMs = options.timeoutMs || 2000;
  text.textContent = message;
  overlay.hidden = false;

  const close = () => {
    overlay.hidden = true;
    overlay.removeEventListener("click", onClick);
    document.removeEventListener("keydown", onKeydown);
    clearTimeout(timer);
    options.onClose?.();
  };

  const onClick = () => close();
  const onKeydown = (event) => {
    if (event.key === "Escape") close();
  };

  overlay.addEventListener("click", onClick);
  document.addEventListener("keydown", onKeydown);
  const timer = setTimeout(close, timeoutMs);
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
  if (!Array.isArray(state.data.leagues) || state.data.leagues.length === 0) {
    return;
  }
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
      clearMissingLeagueHighlight(leagueId);
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
    if (!state.selections.shl || !state.selections.sdhl) {
      const missingLeague = state.selections.sdhl ? "shl" : "sdhl";
      setMissingLeagueHighlight(missingLeague);
      showToast("Välj en spelare i vardera serie.");
      const missingSectionTitle = document.getElementById(`${missingLeague}-title`);
      if (missingSectionTitle) missingSectionTitle.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    clearAllMissingLeagueHighlights();
    updateSubmitState();
    if (form.querySelector("#submit").disabled) {
      showToast("Fyll i alla obligatoriska fält.");
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
      if (voteResult.code === "already_voted") {
        showCenterOverlay("Du har redan röstat");
      } else {
        showToast(voteResult.message);
      }
      return;
    }
    sessionStorage.setItem(RESULTS_UNLOCK_KEY, "true");
    await renderResults();
    triggerConfetti();
    showCenterOverlay("Tack för din röst", {
      timeoutMs: 1900,
      onClose: () => {
        const resultsSection = document.getElementById("results-title");
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
    form.reset();
    updateSubmitState();
  });

  const savedEmail = localStorage.getItem(EMAIL_KEY);
  if (savedEmail) {
    form.elements.email.value = savedEmail;
  }
}

async function initSupabaseAuth() {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey || !window.supabase?.createClient) {
    showToast("Supabase saknar konfiguration (SUPABASE_URL/SUPABASE_ANON_KEY).");
    return;
  }

state.auth.client = window.supabase.createClient(url, anonKey);
  await loadRemoteSettings();
}

function renderAuthState() {
  // Auth är borttaget i public vote-läget.
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

  if (error) {
    if (error.code === "42501") {
      return { ok: false, message: "RLS blockerar röster utan inloggning. Lägg en EXECUTE-policy för RPC:n submit_vote_public." };
    }
    return { ok: false, message: `Kunde inte spara röst: ${formatSupabaseError(error)}` };
  }

  const response = Array.isArray(data) ? data[0] : data;
  const status = response?.status || (typeof data === "string" ? data : null);
  if (status === "already_voted") {
    return { ok: false, code: "already_voted", message: "Du har redan röstat denna månad." };
  }
  if (status !== "ok") {
    return { ok: false, message: "Oväntat svar från databasen vid röstning." };
  }

  return { ok: true };
}

function setupAuthHandlers() {
  // Login är avstängt i detta läge.
}

function openAdmin() {
  const panel = document.querySelector(".admin");
  if (!panel) return;
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
  const openAdminButton = document.getElementById("open-admin");
  const logoutAdminButton = document.getElementById("logout-admin");
  if (openAdminButton) {
    openAdminButton.addEventListener("click", openAdmin);
    openAdminButton.onclick = openAdmin;
  }
  if (logoutAdminButton) {
    logoutAdminButton.addEventListener("click", logoutAdmin);
  }


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
        markDataVersion("custom");
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
  console.log("renderAll called");
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
  if (!resultsUnlocked) {
    section.hidden = true;
    grid.innerHTML = "";
    return;
  }

  section.hidden = false;

  if (!state.auth.client) {
    grid.innerHTML = '<p class="results-fallback">Kunde inte hämta resultat just nu.</p>';
    console.log("Results render done", { reason: "missing_client" });
    return;
  }

  console.log("Results fetch start", { monthId: state.activeMonthId });
  let { data, error } = await state.auth.client.rpc("get_vote_results", {
    p_month_id: state.activeMonthId
  });
  if (error && (error.code === "42883" || /function .*get_vote_results\(.*\) does not exist/i.test(String(error.message || "")))) {
    ({ data, error } = await state.auth.client.rpc("get_vote_results"));
  }
  console.log("Results fetch response", { data, error });

  if (error) {
    grid.innerHTML = '<p class="results-fallback">Kunde inte hämta resultat just nu.</p>';
    console.log("Results render done", { reason: "fetch_error" });
    return;
  }

  const rows = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
  if (!Array.isArray(rows)) {
    grid.innerHTML = '<p class="results-fallback">Kunde inte hämta resultat just nu.</p>';
    console.log("Results render done", { reason: "invalid_shape" });
    return;
  }

  if (rows.length === 0) {
    grid.innerHTML = '<p class="results-fallback">Inga röster registrerade än.</p>';
    console.log("Results render done", { reason: "empty" });
    return;
  }

  const grouped = rows.reduce((acc, row) => {
    const leagueId = row.league_id || row.league;
    if (!leagueId) return acc;
    if (!acc[leagueId]) acc[leagueId] = [];
    acc[leagueId].push(row);
    return acc;
  }, {});

  const blocks = state.data.leagues.map((league) => {
    const byPlayer = (grouped[league.id] || [])
      .sort((a, b) => Number(b.pct) - Number(a.pct))
      .slice(0, 3);
    if (byPlayer.length === 0) {
      return `
        <article class="result-league">
          <h3>${league.name} - Topp 3</h3>
          <p class="results-fallback">Inga röster registrerade än.</p>
        </article>
      `;
    }

    return `
      <article class="result-league">
        <h3>${league.name} - Topp 3</h3>
        ${byPlayer.map((row) => {
          const playerId = row.player_id || row.player || row.id;
          const player = league.players.find((p) => p.id === playerId);
          const name = player?.name || playerId || "Okänd spelare";
          const pctValue = Number(row.pct);
          const pct = Number.isFinite(pctValue)
            ? Math.max(0, Math.min(100, Math.round(pctValue)))
            : 0;
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
  grid.innerHTML = blocks.join("");
  console.log("Results render done", { renderedLeagues: blocks.length });
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
  console.log("init start");
  setupAuthHandlers();
  setupAdminHandlers();

  await hydrateDefaultDataFromFile();
  await initSupabaseAuth();
  renderAll();
  attachCardListeners();
  handleForm();
  renderAdmin();
  console.log("init done");
}

void init();

