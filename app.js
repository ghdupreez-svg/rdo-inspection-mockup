const defaultProperties = [
  ["120", "SMYES", "Smyrna", "Extended Stay America", "RH ES Smyrna Hospitality Operating, LLC"],
  ["125", "MERES", "Meridian", "Extended Stay America", "ES Meridian Hospitality Operating Co., LLC"],
  ["245", "BOIHW", "Boise", "Hilton", "BOISE ATH2017, LLC"],
  ["254", "PIAZN", "Bloomington", "Hyatt", "MHI - BLOOMINGTON NORMAL HP OPCO, LLC"],
  ["370", "DSIEC", "Destin", "Hilton", "MHI - DESTIN 2 OPCO, LLC"],
  ["380", "MEMOB", "Olive Branch", "Marriott", "MHI - OLIVE BRANCH F OPCO, LLC"],
  ["430", "TWFTF", "Twin Falls", "Hilton", "TWIN FALLS ATH2017, LLC"],
  ["460", "SLCWJ", "West Jordan", "Hilton", "WEST JORDAN ATH2017, LLC"],
  ["610", "AHNAT", "Athens", "Hilton", "PR MIG ATHENS OPCO, LLC"],
  ["615", "CSGAU", "Auburn", "Marriott", "PR MIG AUBURN OPCO, LLC"],
  ["625", "BALCO", "Columbia HIS", "Hilton", "PR MIG COLUMBIA H OPCO, LLC"],
  ["630", "BWICO", "Columbia SHS", "Marriott", "PR MIG COLUMBIA S OPCO, LLC"],
  ["635", "GNVTH", "Gainesville", "Hilton", "PR MIG GAINESVILLE OPCO, LLC"],
  ["645", "HSVZH", "Huntsville", "Hyatt", "PR MIG HUNTSVILLE OPCO, LLC"],
  ["650", "MHKCM", "Manhattan", "Marriott", "PR MIG MANHATTAN OPCO, LLC"],
  ["655", "MOBHT", "Mobile", "Hilton", "PR MIG MOBILE OPCO, LLC"],
  ["660", "MGWRI", "Morgantown", "Marriott", "PR MIG MORGANTOWN OPCO, LLC"],
  ["670", "MEMSO", "Southaven", "Hilton", "PR MIG SOUTHAVEN OPCO, LLC"],
  ["675", "ACTHT", "Waco", "Hilton", "PR MIG WACO OPCO, LLC"],
  ["830", "MEMGE", "Germantown HIS", "Hilton", "GERMANTOWN NESHOBA HOTEL PARTNERS, LLC"],
  ["835", "MEMTG", "Germantown TPS", "Marriott", "THORNWOOD LOT 5, LLC"]
].map(([propertyCode, innCode, propertyName, brand, legalEntity]) => ({
  propertyCode,
  innCode,
  propertyName,
  brand,
  legalEntity,
  siteUrl: ""
}));

let properties = loadProperties();

function loadProperties() {
  try {
    const saved = JSON.parse(localStorage.getItem("rdoProperties") || "null");
    if (Array.isArray(saved) && saved.length) {
      return saved.map((property) => ({ siteUrl: "", ...property }));
    }
  } catch {
    localStorage.removeItem("rdoProperties");
  }
  return defaultProperties;
}

function saveProperties() {
  localStorage.setItem("rdoProperties", JSON.stringify(properties));
}

const sections = [
  {
    id: "sales-operations",
    name: "Sales & Operations Alignment",
    items: [
      "Confirm daily collaboration on business activity",
      "Document GM involvement in sales calls/site visits",
      "Confirm Ops team participation on revenue calls",
      "Solicit feedback from Revenue Manager in advance of the RDO visit"
    ]
  },
  {
    id: "daily-leadership",
    name: "Daily Leadership Responsibilities",
    items: [
      "Review and update attached daily checklist",
      "Include finance checklist",
      "Prepare for brand and OTA response responsibility transition starting July/August"
    ]
  },
  {
    id: "leadership-meetings",
    name: "Leadership Meetings",
    items: [
      "Verify meeting cadence and attendance",
      "Review BEOs and group resumes by department",
      "High group volume hotels distribute BEOs/resumes in advance",
      "Reinforce that Ops is responsible for execution once turned over"
    ]
  },
  {
    id: "hotel-effectiveness",
    name: "Hotel Effectiveness Review",
    items: [
      "Schedules align with forecast and update at least every other day",
      "Gameday usage for housekeeping",
      "Data quality",
      "Only Hotel Effectiveness schedules are used"
    ]
  },
  {
    id: "back-of-house",
    name: "Back of House Audit",
    items: [
      "Confirm area cleanliness and organization",
      "MHC Pulse is posted and discussed",
      "HR Hotline and Absence Pro flyers are posted and laminated",
      "Internal Job Postings are current and communicated",
      "Daily huddles are occurring; confirm with multiple associates",
      "Keys to Success and Respects are posted and understood",
      "Communications posted over 7 days are laminated and current",
      "Breakroom is clean and welcoming",
      "All permits are up to date"
    ],
    prompt: "Would you be comfortable walking a guest through this space?"
  },
  {
    id: "housekeeping",
    name: "Housekeeping Review",
    items: [
      "Staffing levels and leadership",
      "Shift start/end times",
      "Houseperson duties",
      "Cleaning processes and rapid room recovery tool use",
      "Cart setup, chemical usage, and ordering accuracy",
      "Laundry process and productivity",
      "Inventory management",
      "Work order process",
      "Storage closet organization",
      "Inspection processes documented via brand-specific systems",
      "Review inspectors' score and rooms not inspected report"
    ]
  },
  {
    id: "maintenance",
    name: "Maintenance Review",
    items: [
      "Inspection of all major mechanicals",
      "Rooftop units, HVAC, and ventilation checks",
      "Landscaping, dumpster area, and curb appeal",
      "No liquid is left in Icapsol overnight",
      "Steamer condition and accessories",
      "Cart/tool reviews",
      "Leadership explains the GCPM process",
      "Review three GCPM-completed rooms from the past 10 days",
      "Engineering office/closet cleanliness and organization"
    ]
  },
  {
    id: "qa",
    name: "Quality Assurance",
    items: ["Document review findings and clearly outline action steps to address all deficiencies"]
  },
  {
    id: "gss",
    name: "Guest Satisfaction Scores",
    items: [
      "Service",
      "Cleanliness",
      "Maintenance & Upkeep",
      "Elite Member Appreciation",
      "Breakfast Experience"
    ]
  },
  {
    id: "loyalty",
    name: "Loyalty Enrollments",
    items: ["Outline current status and action plan to meet or improve enrollment goals"]
  },
  {
    id: "training-relations",
    name: "Employee Training & Relations",
    items: [
      "Review brand training compliance and address past due items",
      "Assess onboarding and training structure",
      "Identify who trains each department",
      "Confirm Ecolab training is utilized",
      "Housekeeping trained by Exec; FD by AGM/GM",
      "Verify PIC training and documentation",
      "Confirm daily huddle content and consistency",
      "Monthly associate celebrations confirmed and pre-scheduled",
      "Review employee relations spend",
      "Same-day sellout incentive participation",
      "Leadership hiring activity on Indeed"
    ]
  }
].map((section) => ({
  ...section,
  items: section.items.map((text, index) => ({
    id: `${section.id}-${index + 1}`,
    text,
    status: "",
    notes: "",
    photos: []
  })),
  notes: "",
  photos: []
}));

const statusLabels = {
  yes: "Yes",
  no: "No",
  see_notes: "See Notes",
  na: "NA"
};

const nav = [
  ["properties", "Properties", "P"],
  ["home", "Report", "R"],
  ["action", "Actions", "A"],
  ["signatures", "Sign", "S"],
  ["review", "Review", "V"],
  ["users", "Users", "U"],
  ["microsoft", "Microsoft", "M"],
  ["settings", "Settings", "G"]
];

const state = {
  screen: "properties",
  property: properties[2],
  sectionId: sections[0].id,
  query: "",
  sections: JSON.parse(JSON.stringify(sections)),
  actionPlan: [],
  signatures: {
    managerName: "",
    rdoName: "Gerhard du Preez",
    managerSigned: false,
    rdoSigned: false
  },
  settings: {
    tenant: "",
    tenantId: "",
    clientId: "",
    redirectUri: "msauth.com.company.rdoinspection://auth",
    iosBundleId: "com.company.rdoinspection",
    androidPackageName: "com.company.rdoinspection",
    graphPermissionModel: "Sites.Selected",
    graphScopes: "User.Read offline_access Sites.Selected Files.ReadWrite.All",
    adminGroup: "RDO Inspection App - Admins",
    userGroup: "RDO Inspection App - Users",
    sitePattern: "https://<tenant>.sharepoint.com/sites/{innCode}",
    folderTemplate: "RDO Property Visits/{date}",
    library: "Documents"
  },
  newProperty: {
    propertyCode: "",
    innCode: "",
    propertyName: "",
    brand: "Hilton",
    customBrand: "",
    legalEntity: "",
    siteUrl: ""
  },
  users: loadUsers(),
  userAdmin: {
    unlocked: false,
    passwordInput: "",
    adminEmail: localStorage.getItem("rdoAdminEmail") || "gerhard@company.com"
  },
  newUser: {
    email: "",
    name: "",
    role: "RDO",
    permissions: {
      inspect: true,
      submit: true,
      manageProperties: false,
      manageUsers: false,
      viewSettings: false
    }
  },
  submitted: false
};

function loadUsers() {
  try {
    const saved = JSON.parse(localStorage.getItem("rdoUsers") || "null");
    if (Array.isArray(saved)) return saved;
  } catch {
    localStorage.removeItem("rdoUsers");
  }
  return [];
}

function saveUsers() {
  localStorage.setItem("rdoUsers", JSON.stringify(state.users));
}

const app = document.getElementById("app");

function h(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ?? ""), "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function sectionProgress(section) {
  const total = section.items.length;
  const complete = section.items.filter((item) => item.status).length;
  return { complete, total, pct: Math.round((complete / total) * 100) };
}

function reportProgress() {
  const all = state.sections.flatMap((section) => section.items);
  const complete = all.filter((item) => item.status).length;
  return { complete, total: all.length, pct: Math.round((complete / all.length) * 100) };
}

function brandClass(brand) {
  if (brand === "Hilton") return "blue";
  if (brand === "Marriott") return "red";
  if (brand === "Hyatt") return "green";
  return "gold";
}

function go(screen) {
  state.screen = screen;
  render();
}

function selectProperty(code) {
  state.property = properties.find((property) => property.propertyCode === code);
  state.screen = "home";
  render();
}

function updatePropertySite(code, value) {
  const property = properties.find((entry) => entry.propertyCode === code);
  property.siteUrl = value;
  if (state.property.propertyCode === code) state.property = property;
  saveProperties();
}

function updateProperty(originalCode, key, value) {
  const property = properties.find((entry) => entry.propertyCode === originalCode);
  if (!property) return;

  if (key === "propertyCode") {
    const nextCode = value.trim();
    if (!nextCode || properties.some((entry) => entry.propertyCode === nextCode && entry !== property)) return;
    property.propertyCode = nextCode;
  } else if (key === "innCode") {
    property.innCode = value.trim().toUpperCase();
  } else {
    property[key] = value;
  }

  if (state.property.propertyCode === originalCode || state.property === property) {
    state.property = property;
  }

  saveProperties();
}

function updateNewProperty(key, value) {
  state.newProperty[key] = value;
}

function addProperty() {
  const brand = state.newProperty.brand === "__custom__" ? state.newProperty.customBrand.trim() : state.newProperty.brand;
  const next = {
    propertyCode: state.newProperty.propertyCode.trim(),
    innCode: state.newProperty.innCode.trim().toUpperCase(),
    propertyName: state.newProperty.propertyName.trim(),
    brand,
    legalEntity: state.newProperty.legalEntity.trim(),
    siteUrl: state.newProperty.siteUrl.trim()
  };

  if (!next.propertyCode || !next.innCode || !next.propertyName || !next.brand || properties.some((property) => property.propertyCode === next.propertyCode)) {
    return;
  }

  properties.push(next);
  state.property = next;
  state.newProperty = {
    propertyCode: "",
    innCode: "",
    propertyName: "",
    brand: "Hilton",
    customBrand: "",
    legalEntity: "",
    siteUrl: ""
  };
  saveProperties();
  render();
}

function removeProperty(code) {
  if (properties.length <= 1) return;
  properties = properties.filter((property) => property.propertyCode !== code);
  if (state.property.propertyCode === code) state.property = properties[0];
  saveProperties();
  render();
}

function unlockUserAdmin() {
  state.userAdmin.unlocked = state.userAdmin.passwordInput === "demo-admin";
  state.userAdmin.passwordInput = "";
  render();
}

function updateAdminEmail(value) {
  state.userAdmin.adminEmail = value.trim();
  localStorage.setItem("rdoAdminEmail", state.userAdmin.adminEmail);
}

function updateNewUser(key, value) {
  state.newUser[key] = value;
}

function updateNewUserPermission(key, value) {
  state.newUser.permissions[key] = value;
}

function addAllowedUser() {
  const email = state.newUser.email.trim().toLowerCase();
  if (!email || state.users.some((user) => user.email.toLowerCase() === email)) return;

  state.users.push({
    id: `user-${Date.now()}`,
    email,
    name: state.newUser.name.trim(),
    role: state.newUser.role.trim() || "RDO",
    permissions: { ...state.newUser.permissions }
  });

  state.newUser = {
    email: "",
    name: "",
    role: "RDO",
    permissions: {
      inspect: true,
      submit: true,
      manageProperties: false,
      manageUsers: false,
      viewSettings: false
    }
  };
  saveUsers();
  render();
}

function removeAllowedUser(id) {
  state.users = state.users.filter((user) => user.id !== id);
  saveUsers();
  render();
}

function updateAllowedUser(id, key, value) {
  const user = state.users.find((entry) => entry.id === id);
  if (!user) return;
  user[key] = value;
  saveUsers();
}

function updateAllowedUserPermission(id, key, value) {
  const user = state.users.find((entry) => entry.id === id);
  if (!user) return;
  user.permissions[key] = value;
  saveUsers();
}

function setStatus(sectionId, itemId, status) {
  const section = state.sections.find((entry) => entry.id === sectionId);
  const item = section.items.find((entry) => entry.id === itemId);
  item.status = status;
  if (status === "no" || status === "see_notes") {
    const exists = state.actionPlan.some((row) => row.sourceItemId === itemId);
    if (!exists) {
      state.actionPlan.push({
        id: crypto.randomUUID ? crypto.randomUUID() : `ap-${Date.now()}`,
        sourceItemId: itemId,
        discipline: section.name,
        actionStep: item.text,
        responsible: "",
        resource: "",
        comments: "",
        dueDate: "",
        completionDate: ""
      });
    }
  }
  render();
}

function updateSectionNotes(sectionId, value) {
  state.sections.find((entry) => entry.id === sectionId).notes = value;
}

function updateItemNotes(sectionId, itemId, value) {
  const section = state.sections.find((entry) => entry.id === sectionId);
  const item = section.items.find((entry) => entry.id === itemId);
  item.notes = value;
}

function addPhoto(sectionId) {
  const section = state.sections.find((entry) => entry.id === sectionId);
  const stamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  section.photos.push({
    id: `photo-${Date.now()}`,
    caption: `${state.property.innCode} ${section.name}`,
    stamp
  });
  render();
}

function addItemPhoto(input, sectionId, itemId) {
  const file = input.files && input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const section = state.sections.find((entry) => entry.id === sectionId);
    const item = section.items.find((entry) => entry.id === itemId);
    item.photos.push({
      id: `photo-${Date.now()}`,
      name: file.name,
      src: reader.result,
      stamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    });
    render();
  };
  reader.readAsDataURL(file);
}

function updateAction(id, key, value) {
  const row = state.actionPlan.find((entry) => entry.id === id);
  row[key] = value;
}

function deleteAction(id) {
  state.actionPlan = state.actionPlan.filter((entry) => entry.id !== id);
  render();
}

function sign(role) {
  state.signatures[`${role}Signed`] = true;
  render();
}

function submitReport() {
  state.submitted = true;
  render();
}

function topbar() {
  const progress = reportProgress();
  return h`
    <header class="topbar">
      <div class="brand-lockup">
        <div class="mark">RDO</div>
        <div>
          <strong>Property Inspection</strong>
          <span>${escapeHtml(state.property.innCode)} / ${escapeHtml(state.property.propertyName)}</span>
        </div>
      </div>
      <div class="top-actions">
        <span class="chip ${brandClass(state.property.brand)}">${escapeHtml(state.property.brand)}</span>
        <span class="chip green">${progress.pct}% complete</span>
        <button class="btn ghost" onclick="go('settings')">Settings</button>
      </div>
    </header>
  `;
}

function sidebar() {
  return h`
    <aside class="sidebar">
      <div class="context-title">
        <strong>${escapeHtml(state.property.propertyName)}</strong>
        <span>${escapeHtml(state.property.legalEntity)}</span>
      </div>
      <div class="nav-stack">
        ${nav.map(([id, label, icon]) => navButton(id, label, icon)).join("")}
      </div>
      <div class="card" style="margin-top:14px">
        <div class="muted">SharePoint target</div>
        <strong>${escapeHtml(state.settings.library)}</strong>
        <div class="property-meta">${escapeHtml(state.settings.folderTemplate)}</div>
      </div>
    </aside>
  `;
}

function mobileTabs() {
  return h`
    <nav class="mobile-tabs">
      ${nav.map(([id, label, icon]) => navButton(id, label, icon)).join("")}
    </nav>
  `;
}

function navButton(id, label, icon) {
  return h`
    <button class="nav-button ${state.screen === id ? "active" : ""}" onclick="go('${id}')">
      <span class="nav-left"><span class="nav-icon">${icon}</span><span>${label}</span></span>
    </button>
  `;
}

function shell(content) {
  app.innerHTML = topbar() + h`
    <main class="layout">
      ${sidebar()}
      <section class="main">${content}</section>
    </main>
    ${mobileTabs()}
  `;
  wireCanvases();
}

function screen(title, subtitle, body, footer = "") {
  return h`
    <article class="screen">
      <div class="screen-header">
        <div class="section-heading">
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
      </div>
      <div class="content">${body}</div>
      ${footer ? `<div class="footer-actions">${footer}</div>` : ""}
    </article>
  `;
}

function renderProperties() {
  const filtered = properties.filter((property) => {
    const q = state.query.toLowerCase();
    return [property.propertyCode, property.innCode, property.propertyName, property.brand].join(" ").toLowerCase().includes(q);
  }).sort((a, b) => {
    const brand = a.brand.localeCompare(b.brand);
    if (brand !== 0) return brand;
    return a.propertyName.localeCompare(b.propertyName);
  });

  return screen(
    "Property List",
    "Search by inn code, property name, brand, or property code. Recent and active properties stay one tap away.",
    h`
      <div class="toolbar">
        <div class="field" style="flex:1; min-width:240px">
          <label for="propertySearch">Search properties</label>
          <input id="propertySearch" class="input" value="${escapeHtml(state.query)}" oninput="state.query=this.value; render()" placeholder="Try BOIHW, Hilton, or Waco" />
        </div>
        <div class="chip green">21 properties</div>
      </div>
      <div class="property-list">
        ${filtered.map((property) => h`
          <button class="property-row ${property.propertyCode === state.property.propertyCode ? "active" : ""}" onclick="selectProperty('${property.propertyCode}')">
            <span>
              <strong>${escapeHtml(property.innCode)} - ${escapeHtml(property.propertyName)}</strong>
              <span class="property-meta">
                <span class="chip ${brandClass(property.brand)}">${escapeHtml(property.brand)}</span>
                <span>Property ${escapeHtml(property.propertyCode)}</span>
                <span>${escapeHtml(property.legalEntity)}</span>
              </span>
            </span>
            <span class="icon">></span>
          </button>
        `).join("")}
      </div>
    `
  );
}

function renderHome() {
  const progress = reportProgress();
  const uncovered = state.sections.flatMap((section) => section.items.filter((item) => !item.status)).length;
  return screen(
    "Trip Report",
    "Walk the 11 workbook sections with exact Yes / No / See Notes / NA statuses, section notes, and section-level photos.",
    h`
      <div class="grid three">
        <div class="metric"><span class="muted">Overall progress</span><strong>${progress.complete}/${progress.total}</strong><div class="progress-bar"><span style="--value:${progress.pct}%"></span></div></div>
        <div class="metric"><span class="muted">Quarterly gaps</span><strong>${uncovered}</strong><span class="chip gold">Prioritize this visit</span></div>
        <div class="metric"><span class="muted">Draft status</span><strong>Auto-saved</strong><span class="chip green">Local</span></div>
      </div>
      <div class="section-list" style="margin-top:16px">
        ${state.sections.map((section) => {
          const p = sectionProgress(section);
          const itemPhotos = section.items.reduce((sum, item) => sum + item.photos.length, 0);
          const totalPhotos = section.photos.length + itemPhotos;
          return h`
            <button class="section-row" onclick="state.sectionId='${section.id}'; go('section')">
              <span>
                <strong>${escapeHtml(section.name)}</strong>
                <span class="property-meta">${p.complete}/${p.total} items complete ${totalPhotos ? `- ${totalPhotos} photos` : ""}</span>
                <span class="progress-bar" style="margin-top:8px"><span style="--value:${p.pct}%"></span></span>
              </span>
              <span class="chip ${p.pct === 100 ? "green" : "gold"}">${p.pct}%</span>
            </button>
          `;
        }).join("")}
      </div>
    `,
    h`<button class="btn ghost" onclick="go('properties')">Change property</button><button class="btn primary" onclick="state.sectionId='${state.sections[0].id}'; go('section')">Start walk</button>`
  );
}

function renderSection() {
  const section = state.sections.find((entry) => entry.id === state.sectionId);
  const idx = state.sections.findIndex((entry) => entry.id === section.id);
  const p = sectionProgress(section);
  const systemLabel = state.property.brand === "Hyatt" ? "Bob" : "Innspector App";
  return screen(
    section.name,
    `Section ${idx + 1} of ${state.sections.length}. ${p.complete}/${p.total} items completed for ${state.property.innCode}.`,
    h`
      ${section.prompt ? `<div class="card" style="margin-bottom:12px"><strong>Discussion prompt</strong><p class="muted">${escapeHtml(section.prompt)}</p></div>` : ""}
      <div class="card">
        ${section.items.map((item) => {
          const text = item.text.includes("brand-specific systems") ? `${item.text}: ${systemLabel}` : item.text;
          return h`
            <div class="inspection-item">
              <div class="item-text">${escapeHtml(text)}</div>
              <div class="status-grid">
                ${Object.keys(statusLabels).map((status) => h`
                  <button class="status-button ${item.status === status ? `active ${status}` : ""}" onclick="setStatus('${section.id}', '${item.id}', '${status}')">${statusLabels[status]}</button>
                `).join("")}
              </div>
              ${item.status === "see_notes" ? h`
                <div class="question-detail">
                  <div class="field">
                    <label>Notes for this question</label>
                    <textarea class="textarea compact" oninput="updateItemNotes('${section.id}', '${item.id}', this.value)" placeholder="Add the detail leadership will need for this finding">${escapeHtml(item.notes)}</textarea>
                  </div>
                  <div>
                    <div class="toolbar small">
                      <strong>Question photos</strong>
                      <label class="btn">
                        Add picture
                        <input class="file-input" type="file" accept="image/*" capture="environment" onchange="addItemPhoto(this, '${section.id}', '${item.id}')" />
                      </label>
                    </div>
                    <div class="photo-grid">
                      ${item.photos.length ? item.photos.map((photo) => h`
                        <div class="photo-preview">
                          <img src="${photo.src}" alt="${escapeHtml(photo.name)}" />
                          <span>${escapeHtml(photo.name)} - ${escapeHtml(photo.stamp)}</span>
                        </div>
                      `).join("") : `<p class="muted">No pictures attached to this question yet.</p>`}
                    </div>
                  </div>
                </div>
              ` : ""}
            </div>
          `;
        }).join("")}
      </div>
      <div class="grid two" style="margin-top:14px">
        <div class="field">
          <label>Section notes</label>
          <textarea class="textarea" oninput="updateSectionNotes('${section.id}', this.value)" placeholder="Notes for this section only">${escapeHtml(section.notes)}</textarea>
        </div>
        <div class="card">
          <div class="toolbar">
            <strong>Photos</strong>
            <button class="btn" onclick="addPhoto('${section.id}')">Add photo</button>
          </div>
          <div class="photo-grid">
            ${section.photos.length ? section.photos.map((photo) => h`
              <div class="photo-tile"><strong>${escapeHtml(photo.caption)}</strong><span>${escapeHtml(photo.stamp)}</span></div>
            `).join("") : `<p class="muted">No photos attached to this section yet.</p>`}
          </div>
        </div>
      </div>
    `,
    h`
      <button class="btn ghost" onclick="${idx > 0 ? `state.sectionId='${state.sections[idx - 1].id}'; go('section')` : "go('home')"}">Back</button>
      <button class="btn primary" onclick="${idx < state.sections.length - 1 ? `state.sectionId='${state.sections[idx + 1].id}'; go('section')` : "go('action')"}">${idx < state.sections.length - 1 ? "Next section" : "Action plan"}</button>
    `
  );
}

function renderActionPlan() {
  return screen(
    "Action Plan",
    "Rows are suggested from every No or See Notes item and remain fully editable before signature.",
    h`
      <div class="toolbar">
        <span class="chip gold">${state.actionPlan.length} rows</span>
        <span class="muted">Rows come directly from report items marked No or See Notes.</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Discipline</th>
              <th>Specific and measurable action steps</th>
              <th>Responsible</th>
              <th>Resources</th>
              <th>Comments</th>
              <th>Due date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${state.actionPlan.length ? state.actionPlan.map((row) => h`
              <tr>
                <td><div class="locked-field">${escapeHtml(row.discipline)}</div></td>
                <td><div class="locked-field tall">${escapeHtml(row.actionStep)}</div></td>
                <td><input value="${escapeHtml(row.responsible)}" oninput="updateAction('${row.id}', 'responsible', this.value)" /></td>
                <td><input value="${escapeHtml(row.resource)}" oninput="updateAction('${row.id}', 'resource', this.value)" /></td>
                <td><textarea oninput="updateAction('${row.id}', 'comments', this.value)">${escapeHtml(row.comments)}</textarea></td>
                <td>
                  <div class="due-date-control">
                    <input value="${escapeHtml(row.dueDate)}" placeholder="Immediately & Ongoing" oninput="updateAction('${row.id}', 'dueDate', this.value)" />
                    <label class="calendar-pick" title="Select due date">
                      <span class="calendar-symbol" aria-hidden="true"></span>
                      <input type="date" onchange="updateAction('${row.id}', 'dueDate', this.value); render()" />
                    </label>
                  </div>
                </td>
                <td><button class="btn danger" onclick="deleteAction('${row.id}')">Remove</button></td>
              </tr>
            `).join("") : `<tr><td colspan="7" class="muted">No action rows yet. Mark checklist items No or See Notes, or add one manually.</td></tr>`}
          </tbody>
        </table>
      </div>
    `,
    h`<button class="btn ghost" onclick="go('home')">Back to report</button><button class="btn primary" onclick="go('signatures')">Continue to signatures</button>`
  );
}

function renderSignatures() {
  return screen(
    "Signatures",
    "Capture Manager and RDO / Above Property sign-off dates for the final Action Plan section.",
    h`
      <div class="grid two">
        ${signatureCard("manager", "Manager Signature", state.signatures.managerName, state.signatures.managerSigned)}
        ${signatureCard("rdo", "RDO / Above Property Signature", state.signatures.rdoName, state.signatures.rdoSigned)}
      </div>
    `,
    h`<button class="btn ghost" onclick="go('action')">Back to actions</button><button class="btn primary" onclick="go('review')">Review report</button>`
  );
}

function signatureCard(role, title, name, signed) {
  return h`
    <div class="card">
      <div class="field">
        <label>${title} name</label>
        <input class="input" value="${escapeHtml(name)}" oninput="state.signatures.${role}Name=this.value" />
      </div>
      <canvas class="signature-pad" data-role="${role}" aria-label="${title} pad"></canvas>
      <div class="toolbar" style="margin:10px 0 0">
        <span class="chip ${signed ? "green" : "gold"}">${signed ? "Signed today" : "Awaiting signature"}</span>
        <button class="btn primary" onclick="sign('${role}')">Accept</button>
      </div>
    </div>
  `;
}

function wireCanvases() {
  document.querySelectorAll(".signature-pad").forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * devicePixelRatio);
    canvas.height = Math.floor(rect.height * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1d2521";
    let drawing = false;
    const point = (event) => {
      const box = canvas.getBoundingClientRect();
      const touch = event.touches ? event.touches[0] : event;
      return { x: touch.clientX - box.left, y: touch.clientY - box.top };
    };
    const start = (event) => {
      drawing = true;
      const p = point(event);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    };
    const move = (event) => {
      if (!drawing) return;
      event.preventDefault();
      const p = point(event);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    };
    const stop = () => {
      drawing = false;
    };
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", stop);
  });
}

function renderReview() {
  const progress = reportProgress();
  const photos = state.sections.reduce((sum, section) => {
    return sum + section.photos.length + section.items.reduce((itemSum, item) => itemSum + item.photos.length, 0);
  }, 0);
  const derivedSite = state.settings.sitePattern.replace("{innCode}", state.property.innCode).replace("<tenant>", state.settings.tenant || "<tenant>");
  const saveSite = state.property.siteUrl || derivedSite;
  return screen(
    "Review & Submit",
    "Preview the combined Trip Report, Action Plan, and Photo Documentation package before upload.",
    h`
      <div class="grid three">
        <div class="metric"><span class="muted">Checklist</span><strong>${progress.pct}%</strong><span>${progress.complete}/${progress.total} statuses</span></div>
        <div class="metric"><span class="muted">Action plan</span><strong>${state.actionPlan.length}</strong><span>rows</span></div>
        <div class="metric"><span class="muted">Photos</span><strong>${photos}</strong><span>section attachments</span></div>
      </div>
      <div class="review-block" style="margin-top:16px">
        <div class="review-section">
          <strong>Cover</strong>
          <p>${escapeHtml(state.property.propertyName)} (${escapeHtml(state.property.innCode)}) - ${escapeHtml(state.property.brand)} - ${new Date().toISOString().slice(0, 10)}</p>
        </div>
        ${state.sections.map((section) => {
          const counts = Object.keys(statusLabels).map((status) => `${statusLabels[status]}: ${section.items.filter((item) => item.status === status).length}`).join(" / ");
          const itemNotes = section.items.filter((item) => item.notes || item.photos.length);
          return h`
            <div class="review-section">
              <strong>${escapeHtml(section.name)}</strong>
              <p class="muted">${counts}</p>
              ${section.notes ? `<p>${escapeHtml(section.notes)}</p>` : ""}
              ${itemNotes.length ? h`
                <div class="item-note-list">
                  ${itemNotes.map((item) => h`
                    <div>
                      <strong>${escapeHtml(item.text)}</strong>
                      ${item.notes ? `<p>${escapeHtml(item.notes)}</p>` : ""}
                      ${item.photos.length ? `<span class="chip blue">${item.photos.length} question photos</span>` : ""}
                    </div>
                  `).join("")}
                </div>
              ` : ""}
            </div>
          `;
        }).join("")}
        <div class="review-section">
          <strong>SharePoint upload path</strong>
          <p>${escapeHtml(saveSite)} / ${escapeHtml(state.settings.library)} / ${escapeHtml(state.settings.folderTemplate)}</p>
        </div>
        ${state.submitted ? `<div class="review-section"><strong>Upload queued</strong><p class="muted">Combined PDF, JSON copy, and raw photos are staged for Graph upload when online.</p></div>` : ""}
      </div>
    `,
    h`<button class="btn ghost" onclick="go('signatures')">Back to signatures</button><button class="btn primary" onclick="submitReport()">${state.submitted ? "Queued" : "Submit package"}</button>`
  );
}

function renderSettings() {
  const defaultBrands = ["Hilton", "Marriott", "Hyatt", "Extended Stay America"];
  const sortedProperties = [...properties].sort((a, b) => {
    const brand = a.brand.localeCompare(b.brand);
    if (brand !== 0) return brand;
    return a.propertyName.localeCompare(b.propertyName);
  });

  return screen(
    "Settings",
    "Configure the per-property SharePoint topology and offline behavior for the mockup.",
    h`
      <div class="grid two">
        <div class="field">
          <label>Document library</label>
          <input class="input" value="${escapeHtml(state.settings.library)}" oninput="state.settings.library=this.value" />
        </div>
        <div class="field">
          <label>Site URL pattern</label>
          <input class="input" value="${escapeHtml(state.settings.sitePattern)}" oninput="state.settings.sitePattern=this.value" />
        </div>
        <div class="field">
          <label>Folder template</label>
          <input class="input" value="${escapeHtml(state.settings.folderTemplate)}" oninput="state.settings.folderTemplate=this.value" />
        </div>
      </div>
      <div class="card" style="margin-top:16px">
        <div class="toolbar">
          <div>
            <strong>Properties</strong>
            <div class="muted">Add/remove properties and set each property's SharePoint save site.</div>
          </div>
          <span class="chip green">${properties.length} properties</span>
        </div>
        <div class="property-admin-list">
          ${sortedProperties.map((property) => h`
            <div class="property-admin-row">
              <div class="property-edit-grid">
                <div class="field">
                  <label>Property code</label>
                  <input class="input" value="${escapeHtml(property.propertyCode)}" onblur="updateProperty('${property.propertyCode}', 'propertyCode', this.value); render()" />
                </div>
                <div class="field">
                  <label>Inn code</label>
                  <input class="input" value="${escapeHtml(property.innCode)}" oninput="updateProperty('${property.propertyCode}', 'innCode', this.value)" />
                </div>
                <div class="field">
                  <label>Brand</label>
                  <input class="input" value="${escapeHtml(property.brand)}" oninput="updateProperty('${property.propertyCode}', 'brand', this.value)" list="brandOptions" />
                </div>
                <div class="field">
                  <label>Property name</label>
                  <input class="input" value="${escapeHtml(property.propertyName)}" oninput="updateProperty('${property.propertyCode}', 'propertyName', this.value)" />
                </div>
                <div class="field wide">
                  <label>Legal entity</label>
                  <input class="input" value="${escapeHtml(property.legalEntity)}" oninput="updateProperty('${property.propertyCode}', 'legalEntity', this.value)" />
                </div>
              </div>
              <div class="field">
                <label>Save site</label>
                <input class="input" value="${escapeHtml(property.siteUrl || "")}" placeholder="${escapeHtml(state.settings.sitePattern.replace("{innCode}", property.innCode))}" oninput="updatePropertySite('${property.propertyCode}', this.value)" />
              </div>
              <button class="btn danger" onclick="removeProperty('${property.propertyCode}')" ${properties.length <= 1 ? "disabled" : ""}>Remove</button>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="card" style="margin-top:16px">
        <strong>Add property</strong>
        <div class="grid three" style="margin-top:12px">
          <div class="field">
            <label>Property code</label>
            <input class="input" value="${escapeHtml(state.newProperty.propertyCode)}" oninput="updateNewProperty('propertyCode', this.value)" />
          </div>
          <div class="field">
            <label>Inn code</label>
            <input class="input" value="${escapeHtml(state.newProperty.innCode)}" oninput="updateNewProperty('innCode', this.value)" />
          </div>
          <div class="field">
            <label>Brand</label>
            <select class="select" onchange="updateNewProperty('brand', this.value); render()">
              ${defaultBrands.map((brand) => `<option ${state.newProperty.brand === brand ? "selected" : ""}>${brand}</option>`).join("")}
              <option value="__custom__" ${state.newProperty.brand === "__custom__" ? "selected" : ""}>Other brand</option>
            </select>
          </div>
          ${state.newProperty.brand === "__custom__" ? h`
            <div class="field">
              <label>Other brand</label>
              <input class="input" value="${escapeHtml(state.newProperty.customBrand)}" oninput="updateNewProperty('customBrand', this.value)" placeholder="Enter brand name" />
            </div>
          ` : ""}
          <div class="field">
            <label>Property name</label>
            <input class="input" value="${escapeHtml(state.newProperty.propertyName)}" oninput="updateNewProperty('propertyName', this.value)" />
          </div>
          <div class="field">
            <label>Legal entity</label>
            <input class="input" value="${escapeHtml(state.newProperty.legalEntity)}" oninput="updateNewProperty('legalEntity', this.value)" />
          </div>
          <div class="field">
            <label>Save site</label>
            <input class="input" value="${escapeHtml(state.newProperty.siteUrl)}" placeholder="https://tenant.sharepoint.com/sites/INNCODE" oninput="updateNewProperty('siteUrl', this.value)" />
          </div>
        </div>
        <div class="toolbar" style="margin:14px 0 0">
          <span class="muted">Property code, inn code, and property name are required.</span>
          <button class="btn primary" onclick="addProperty()">Add property</button>
        </div>
      </div>
      <datalist id="brandOptions">
        ${[...new Set([...defaultBrands, ...properties.map((property) => property.brand)])].map((brand) => `<option value="${escapeHtml(brand)}"></option>`).join("")}
      </datalist>
      <div class="grid three" style="margin-top:16px">
        <div class="metric"><span class="muted">Offline drafts</span><strong>1</strong><span class="chip green">All synced locally</span></div>
        <div class="metric"><span class="muted">Photo quality</span><strong>High</strong><span>3000 px / 85%</span></div>
        <div class="metric"><span class="muted">Account</span><strong>SSO</strong><span>Microsoft 365 placeholder</span></div>
      </div>
    `,
    h`<button class="btn primary" onclick="go('home')">Done</button>`
  );
}

function permissionCheckbox(label, checked, handler) {
  return h`
    <label class="check-row">
      <input type="checkbox" ${checked ? "checked" : ""} onchange="${handler}" />
      <span>${label}</span>
    </label>
  `;
}

function renderUsers() {
  if (!state.userAdmin.unlocked) {
    return screen(
      "Users",
      "Unlock admin controls to manage who can access the app and what they can do.",
      h`
        <div class="grid two">
          <div class="card">
            <strong>Admin</strong>
            <p class="muted">This public mockup uses demo password demo-admin. Production should use Microsoft Entra ID groups or app roles.</p>
            <div class="field" style="margin-top:12px">
              <label>Admin email</label>
              <input class="input" value="${escapeHtml(state.userAdmin.adminEmail)}" oninput="updateAdminEmail(this.value)" placeholder="your.work.email@company.com" />
            </div>
            <div class="field" style="margin-top:12px">
              <label>Admin password</label>
              <input class="input" type="password" value="${escapeHtml(state.userAdmin.passwordInput)}" oninput="state.userAdmin.passwordInput=this.value" onkeydown="if(event.key==='Enter') unlockUserAdmin()" />
            </div>
            <button class="btn primary" style="margin-top:12px" onclick="unlockUserAdmin()">Unlock users</button>
          </div>
          <div class="card">
            <strong>Access model</strong>
            <p class="muted">Allowed users are saved in this browser for prototype testing. The real mobile app would check the signed-in Microsoft 365 work email against an approved user list or Entra security group.</p>
          </div>
        </div>
      `
    );
  }

  return screen(
    "Users",
    "Add allowed users by work email, remove access, and control what each person can do.",
    h`
      <div class="card">
        <div class="toolbar">
          <div>
            <strong>Admin</strong>
            <div class="muted">${escapeHtml(state.userAdmin.adminEmail)}</div>
          </div>
          <button class="btn ghost" onclick="state.userAdmin.unlocked=false; render()">Lock</button>
        </div>
      </div>
      <div class="card" style="margin-top:16px">
        <strong>Add allowed user</strong>
        <div class="grid three" style="margin-top:12px">
          <div class="field">
            <label>Work email</label>
            <input class="input" type="email" value="${escapeHtml(state.newUser.email)}" oninput="updateNewUser('email', this.value)" placeholder="name@company.com" />
          </div>
          <div class="field">
            <label>Name</label>
            <input class="input" value="${escapeHtml(state.newUser.name)}" oninput="updateNewUser('name', this.value)" />
          </div>
          <div class="field">
            <label>Role</label>
            <input class="input" value="${escapeHtml(state.newUser.role)}" oninput="updateNewUser('role', this.value)" placeholder="RDO" />
          </div>
        </div>
        <div class="permission-grid" style="margin-top:12px">
          ${permissionCheckbox("Complete inspections", state.newUser.permissions.inspect, "updateNewUserPermission('inspect', this.checked)")}
          ${permissionCheckbox("Submit packages", state.newUser.permissions.submit, "updateNewUserPermission('submit', this.checked)")}
          ${permissionCheckbox("Manage properties", state.newUser.permissions.manageProperties, "updateNewUserPermission('manageProperties', this.checked)")}
          ${permissionCheckbox("Manage users", state.newUser.permissions.manageUsers, "updateNewUserPermission('manageUsers', this.checked)")}
          ${permissionCheckbox("View settings", state.newUser.permissions.viewSettings, "updateNewUserPermission('viewSettings', this.checked)")}
        </div>
        <div class="toolbar" style="margin:14px 0 0">
          <span class="muted">Work email is required and must be unique.</span>
          <button class="btn primary" onclick="addAllowedUser()">Add user</button>
        </div>
      </div>
      <div class="card" style="margin-top:16px">
        <div class="toolbar">
          <strong>Allowed users</strong>
          <span class="chip green">${state.users.length} users</span>
        </div>
        <div class="user-list">
          ${state.users.length ? state.users.map((user) => h`
            <div class="user-row">
              <div class="user-edit-grid">
                <div class="field">
                  <label>Work email</label>
                  <input class="input" type="email" value="${escapeHtml(user.email)}" oninput="updateAllowedUser('${user.id}', 'email', this.value)" />
                </div>
                <div class="field">
                  <label>Name</label>
                  <input class="input" value="${escapeHtml(user.name)}" oninput="updateAllowedUser('${user.id}', 'name', this.value)" />
                </div>
                <div class="field">
                  <label>Role</label>
                  <input class="input" value="${escapeHtml(user.role)}" oninput="updateAllowedUser('${user.id}', 'role', this.value)" />
                </div>
              </div>
              <div class="permission-grid">
                ${permissionCheckbox("Inspect", user.permissions.inspect, `updateAllowedUserPermission('${user.id}', 'inspect', this.checked)`)}
                ${permissionCheckbox("Submit", user.permissions.submit, `updateAllowedUserPermission('${user.id}', 'submit', this.checked)`)}
                ${permissionCheckbox("Properties", user.permissions.manageProperties, `updateAllowedUserPermission('${user.id}', 'manageProperties', this.checked)`)}
                ${permissionCheckbox("Users", user.permissions.manageUsers, `updateAllowedUserPermission('${user.id}', 'manageUsers', this.checked)`)}
                ${permissionCheckbox("Settings", user.permissions.viewSettings, `updateAllowedUserPermission('${user.id}', 'viewSettings', this.checked)`)}
              </div>
              <button class="btn danger" onclick="removeAllowedUser('${user.id}')">Remove access</button>
            </div>
          `).join("") : `<p class="muted">No allowed users have been added yet.</p>`}
        </div>
      </div>
    `
  );
}

function renderMicrosoft() {
  return screen(
    "Microsoft",
    "Store the Microsoft Entra, Graph, and mobile app registration details needed for the production build.",
    h`
      <div class="grid two">
        <div class="field">
          <label>Microsoft tenant name</label>
          <input class="input" value="${escapeHtml(state.settings.tenant)}" placeholder="company" oninput="state.settings.tenant=this.value" />
        </div>
        <div class="field">
          <label>Microsoft tenant ID</label>
          <input class="input" value="${escapeHtml(state.settings.tenantId)}" placeholder="00000000-0000-0000-0000-000000000000" oninput="state.settings.tenantId=this.value" />
        </div>
        <div class="field">
          <label>Entra app client ID</label>
          <input class="input" value="${escapeHtml(state.settings.clientId)}" placeholder="Application (client) ID" oninput="state.settings.clientId=this.value" />
        </div>
        <div class="field">
          <label>Mobile redirect URI</label>
          <input class="input" value="${escapeHtml(state.settings.redirectUri)}" oninput="state.settings.redirectUri=this.value" />
        </div>
        <div class="field">
          <label>iOS bundle ID</label>
          <input class="input" value="${escapeHtml(state.settings.iosBundleId)}" oninput="state.settings.iosBundleId=this.value" />
        </div>
        <div class="field">
          <label>Android package name</label>
          <input class="input" value="${escapeHtml(state.settings.androidPackageName)}" oninput="state.settings.androidPackageName=this.value" />
        </div>
        <div class="field">
          <label>Graph permission model</label>
          <select class="select" onchange="state.settings.graphPermissionModel=this.value">
            <option ${state.settings.graphPermissionModel === "Sites.Selected" ? "selected" : ""}>Sites.Selected</option>
            <option ${state.settings.graphPermissionModel === "Sites.ReadWrite.All" ? "selected" : ""}>Sites.ReadWrite.All</option>
          </select>
        </div>
        <div class="field">
          <label>Graph scopes</label>
          <input class="input" value="${escapeHtml(state.settings.graphScopes)}" oninput="state.settings.graphScopes=this.value" />
        </div>
        <div class="field">
          <label>Admin group</label>
          <input class="input" value="${escapeHtml(state.settings.adminGroup)}" oninput="state.settings.adminGroup=this.value" />
        </div>
        <div class="field">
          <label>User group</label>
          <input class="input" value="${escapeHtml(state.settings.userGroup)}" oninput="state.settings.userGroup=this.value" />
        </div>
      </div>
      <div class="card" style="margin-top:16px">
        <strong>Production note</strong>
        <p class="muted">These values should come from your IT department after they create the Microsoft Entra app registration and SharePoint permissions. The mockup stores them only in browser memory.</p>
      </div>
    `,
    h`<button class="btn ghost" onclick="go('settings')">SharePoint settings</button><button class="btn primary" onclick="go('users')">User access</button>`
  );
}

function render() {
  const screens = {
    properties: renderProperties,
    home: renderHome,
    section: renderSection,
    action: renderActionPlan,
    signatures: renderSignatures,
    review: renderReview,
    users: renderUsers,
    microsoft: renderMicrosoft,
    settings: renderSettings
  };
  shell(screens[state.screen]());
}

render();
