# RDO Property Inspection App — Plan & Specification

**Prepared for:** Gerhard du Preez
**Date:** May 9, 2026
**Status:** v0.4 — brand + per-property SharePoint topology confirmed; ready to build the UX mockup

**Source documents:**
- `RDO Trip Report SOP.docx` — Sponsor: Operations; Applies to: All Brands and All Hotels; Date Issued: 7/1/25
- `RDO Trip Report.xlsx` — Trip Report tab + Action Plan tab (blank template)
- `Property List.csv` (v2, uploaded 2026-05-10) — 21 properties with Property Code, Inn Code, Legal Entity, Property Name, Brand

**v0.4 changelog (vs. v0.3):**
- Property count corrected from 22 to **21** — Starbucks - Bloomington removed by request.
- Brand mapping integrated: **11 Hilton, 6 Marriott, 2 Hyatt, 2 Extended Stay America**.
- PIAZN inn-code collision section removed (Starbucks gone; only Bloomington uses PIAZN).
- SharePoint topology confirmed: **each property has its own SharePoint site**. Inn code is the site name, not a folder root. Default folder template inside each site is now `Documents/RDO Property Visits/{date}`.
- SOP §5.6 brand-specific items now have known targets: 2 Hyatt properties (Bloomington, Huntsville) use Bob; the other 19 use the Innspector App.
- `properties.json` regenerated with brand + per-property site URL placeholders.

**v0.3 changelog (vs. v0.2):**
- Section 7 now contains the verbatim property list (replaced placeholder).
- Property Code adopted as the unique app-side key.
- `properties.json` deliverable generated alongside the spec.

**v0.2 changelog (vs. v0.1):**
- Section 5 now contains the verbatim 11 procedural sections from the workbook (replaced placeholder).
- Status model simplified to **Yes / No / NA**; No opens notes/photos for detail.
- New Section 6: **Action Plan** (the second workbook tab, missed in v0.1).
- SharePoint folder structure updated to match SOP example: `{innCode} > Documents > RDO Property Visits > {date}`.
- Added Signature capture (Manager + RDO/Above Property) per Action Plan tab.
- Added Quarterly Coverage tracking per SOP rule "all items should be covered at least once every quarter."
- Notes are **section-level**, not per-item, matching the workbook.
- Output deliverable model: one combined PDF (Trip Report + Action Plan + Photo Documentation) per SOP guidance.

---

## 1. Executive Summary

This document specifies a cross-platform mobile app that lets a Regional Director of Operations (RDO) walk a property, complete the standardized RDO Trip Report (and Action Plan) on their phone, capture supporting photos, and produce a single combined PDF that is automatically saved into the correct property folder on SharePoint. The app targets iOS and Android from a single codebase, signs the RDO in with their company Microsoft 365 account, and uses Microsoft Graph to upload reports and photos directly to SharePoint Online without IT having to provision a backend.

The build is phased: a working MVP in roughly 4–6 weeks, with the polish and hardening phase taking another 3–4 weeks before the first production rollout to RDOs in the field.

---

## 2. Goals & Non-Goals

### Goals
- One mobile app for both iOS and Android.
- An RDO can complete the full standardized RDO Trip Report and Action Plan from their phone, offline if needed, and submit when back in coverage.
- Each property is identified by a unique inn code; each report and its photos land in the correct SharePoint folder for that property (`{innCode}/Documents/RDO Property Visits/{date}/`).
- Photos are tagged to the specific section of the trip report (e.g., Back of House Audit, Maintenance Review).
- Manager and RDO/Above Property signatures are captured on-device and stamped into the final PDF.
- A settings screen lets an admin (or the RDO) configure where each property's reports are saved on SharePoint.
- The app uses Microsoft 365 SSO (Entra ID / MSAL) so no separate user accounts.
- The app tracks quarterly coverage — a dashboard shows which checklist items have not yet been covered at a property in the current quarter (per SOP rule).

### Non-Goals (v1)
- No web-based dashboard. Reviewers open SharePoint directly. (A read-only web companion is on the roadmap.)
- No automated reminders / email distribution from inside the app. The SOP specifies the report is "distributed to the property leadership team" — v1 produces the PDF and uploads it; distribution is a manual share or v2 feature.
- No corrective-action enforcement: the Action Plan captures the plan and due dates, but the app does not chase open items. (v2.)
- No integration with property management or accounting systems in v1.

---

## 3. Recommended Tech Stack

**Recommendation: React Native + Expo (managed workflow).**

| Layer | Choice | Why |
|---|---|---|
| App framework | React Native + Expo SDK 51+ | One codebase for iOS and Android. Expo gives camera, file system, secure storage, and over-the-air updates with no native build setup at first. |
| Language | TypeScript | Catches mistakes early; expected by enterprise IT for code review. |
| Auth | `react-native-msal` (Microsoft Authentication Library) | Official Microsoft library; supports Entra ID conditional access policies your IT will require. |
| API access | Microsoft Graph REST API (`https://graph.microsoft.com/v1.0`) | First-party SharePoint upload, no middleware. Uses the token from MSAL. |
| Local storage | SQLite (via `expo-sqlite`) for inspection drafts; `expo-file-system` for photo blobs | Lets RDO work offline; queue uploads when back online. |
| Camera | `expo-camera` + `expo-image-manipulator` | Capture, resize/compress, and stamp photos with timestamp + inn code. |
| Signature capture | `react-native-signature-canvas` | On-device finger/stylus signature for Manager + RDO sign-offs. |
| State | Zustand or Redux Toolkit | Simple stores for the active inspection and the upload queue. |
| PDF generation | `expo-print` (HTML → PDF) + `pdf-lib` for stitching photo PDFs | Produce the combined Trip Report + Action Plan + Photos PDF on-device. |
| Crash reporting | Sentry | Production observability. |
| Distribution | Expo EAS Build + Microsoft Intune (recommended) or TestFlight/Play Internal | EAS handles signing; Intune lets IT push the app to RDO phones without the public app stores. |

**Why React Native over Flutter or PWA here:**
- Flutter is excellent but the MSAL story on Flutter is third-party and weaker. React Native has a battle-tested MSAL plugin already used for SharePoint apps.
- A PWA can do most of this, but iOS Safari has hard limits on camera quality, background uploads, and "install to home screen" UX that an RDO doing 21 properties will notice. Native is worth the slight extra effort.
- React Native lets you ship through Intune as a managed app, which is how most enterprises distribute internal tools.

---

## 4. App Screens & User Flow

### 4.1 Flow at a glance

1. **Sign in** with Microsoft 365 (one tap, MSAL handles the redirect).
2. **Property picker** — RDO selects the property they're at (search by inn code or name). Recent properties pinned at top.
3. **Pre-visit Purpose & Agenda** — optional screen to email the agenda to the hotel before arrival (per SOP: "should be sent to hotel prior to arrival and reviewed on site before official visit begins").
4. **Trip Report home** — the 11 sections from the workbook with progress indicators and a "quarterly coverage" badge showing which items haven't been covered yet this quarter for this property.
5. **Section detail** — for each section: list of items, each with status (Yes / No / NA). Selecting **No** opens question-level notes/photos. One **section-level Notes** field at the bottom. Photo attachments accepted at the section level.
6. **Photo capture** — full-screen camera, capture, optional caption. Photo is auto-tagged with inn code, section, timestamp, and GPS (if permitted). Multiple photos per section.
7. **Action Plan** — discipline-by-discipline table the RDO fills in based on findings: Action Step, Person Responsible, Resource, Due Date. Pre-populated suggestions based on items marked "No."
8. **Signatures** — Manager signature + RDO/Above Property signature, both with date.
9. **Review** — full read-only preview of the combined report.
10. **Submit** — generates a single combined PDF (Trip Report → Action Plan → Photo Documentation), uploads to the configured SharePoint folder for that inn code. Shows progress; resumable on flaky connections.
11. **Settings** — configure SharePoint site, library, per-property folder paths; manage offline cache; sign out.

### 4.2 Screen list

| # | Screen | Purpose |
|---|---|---|
| 1 | Sign In | MSAL login, scopes consent |
| 2 | Property Picker | Choose inn code; search + recents |
| 3 | Pre-visit Agenda (optional) | Compose & email Purpose + Agenda to property |
| 4 | Trip Report Home | 11 sections, progress, quarterly coverage badges, "Resume draft" |
| 5 | Section Detail | Items with Yes/No/NA, question-level notes/photos for No items, section-level Notes, section-level photos |
| 6 | Camera Capture | In-app camera with watermark overlay |
| 7 | Photo Detail | Caption, retake/delete |
| 8 | Action Plan | Discipline-by-discipline table; add/edit/delete rows; due dates |
| 9 | Signatures | Manager + RDO/Above Property signature capture |
| 10 | Review | Full read-only preview before submit |
| 11 | Submit / Upload Progress | PDF generation + Graph upload with retry |
| 12 | History | Past reports for this property; tap to re-open the PDF |
| 13 | Quarterly Coverage Dashboard | Per-property heatmap of items covered in the current quarter |
| 14 | Settings — SharePoint | Default site/library + per-property folder mapping |
| 15 | Settings — Offline & Cache | Storage usage, clear drafts, sync status |
| 16 | Settings — Account | Signed-in user, sign out, app version |

### 4.3 Key UX notes (SOP-aligned)

- Status options are **Yes**, **No**, and **NA**. Selecting **No** captures notes/photos for the finding.
- **Notes are at the section level**, not per item. The workbook has one "Notes:" row at the end of each section.
- Photos are attached at the **section level** (not per item). The SOP's Photo Documentation block specifies all photos compile into a single PDF for ease of review.
- Drafts auto-save every 5 seconds. Closing the app and re-opening drops the RDO back where they were.
- The camera screen is locked to landscape with a horizon helper, because field photos of crooked carpets/ceilings are a known pain point.
- **Quarterly coverage rule (SOP):** "All items may not be covered each visit however all items should be covered at least once every quarter." The app surfaces a per-property "items uncovered this quarter" badge so the RDO can prioritize gaps on each visit.
- **Pre-visit agenda (SOP):** Purpose & Agenda should be sent to the hotel prior to arrival. The app supports composing this and emailing/Teams-sharing it from the property record.
- **Leadership presence reminder (SOP):** "all department leaders — including Sales — are present for property walks." The app can prompt the RDO at the start of an inspection to confirm leadership presence.
- The 11-section list is loaded from a JSON config bundled with the app, so updating the checklist is a config push (not an app store release).

---

## 5. Trip Report — Verbatim Sections & Items (from `RDO Trip Report.xlsx`)

The Trip Report tab contains 11 sections. Each item below is rated **Yes / No / NA**. Selecting **No** opens question-level notes/photos, and each section ends with one free-text **Notes** field.

### 5.1 Sales & Operations Alignment
- Confirm daily collaboration on business activity
- Document GM involvement in sales calls/site visits (include most recent)
- Confirm Ops team participation on revenue calls
- Solicit feedback from Revenue Manager in advance of the RDO visit

### 5.2 Daily Leadership Responsibilities
- Review and update attached daily checklist
- Include finance checklist
- Prepare for brand and OTA response responsibility transition starting July/August

### 5.3 Leadership Meetings
- Verify meeting cadence and attendance
- Review BEOs and group resumes (color-coded by department)
- High group volume hotels should distribute BEOs/resumes in advance; sales to provide overviews, not full breakdowns
- Reinforce that once turned over, Ops is responsible for execution

### 5.4 Hotel Effectiveness Review
Validate:
- Schedules align with forecast (update at least every other day)
- Gameday usage for housekeeping
- Data quality
- Only Hotel Effectiveness (HE) schedules are used

### 5.5 Back of House Audit
- Confirm area cleanliness and organization

> Discussion prompt (not rated): Ask leaders, *"Would you be comfortable walking a guest through this space?"*

Verify:
- MHC Pulse is posted and discussed
- HR Hotline and Absence Pro flyers are posted and laminated
- Internal Job Postings are current and communicated
- Daily huddles are occurring — confirm with multiple associates
- Keys to Success and Respects are posted and understood
- All communications posted >7 days are laminated and current (<30 days)
- Breakroom is clean and welcoming; confirm leader engagement with associates
- All permits are up to date

### 5.6 Housekeeping Review
Include evaluations of:
- Staffing levels and leadership
- Shift start/end times
- Houseperson duties
- Cleaning processes (observe at least two room cleanings; verify pet-cleaning procedures, fogger use, and rapid room recovery tool is being used)
- Cart setup, chemical usage, and ordering accuracy (Scrub Free is the approved pink chemical)
- Laundry process and productivity
- Inventory management
- Work order process
- Storage closet organization
- Inspection processes — documented inspections via brand-specific systems such as Hyatt's Bob or the Innspector App are required
- Review the inspectors' score, do they align with what the guests are telling us? Utilize the rooms not inspected report to determine what rooms should receive an inspection.

### 5.7 Maintenance Review
Conduct a property walk that includes:
- Inspection of all major mechanicals
- Rooftop units, HVAC, and ventilation checks
- Landscaping, dumpster area, and curb appeal

GCPM Process:
- Ensure no liquid is left in Icapsol overnight; unit must be cleaned
- Steamer condition and accessories
- Cart/tool reviews
- Leadership should explain the GCPM process — not the GM or Chief
- Review three GCPM-completed rooms from the past 10 days
- Engineering office/closet cleanliness and organization

### 5.8 Quality Assurance (QA)
- Document review findings and clearly outline action steps to address all deficiencies.

### 5.9 Guest Satisfaction Scores (GSS)
Review GSS data and develop action steps targeting improvements in:
- Service
- Cleanliness
- Maintenance & Upkeep
- Elite Member Appreciation
- Breakfast Experience

### 5.10 Loyalty Enrollments
- Outline the current status and an action plan to meet or improve enrollment goals.

### 5.11 Employee Training & Relations
- Review brand training compliance and address past due items
- Assess onboarding and training structure
- Who trains each department?
- Is Ecolab training utilized?
- Housekeeping should be trained by the Exec; FD by AGM/GM
- Verify PIC training and documentation
- Confirm daily huddle content and consistency
- Monthly associate celebrations — confirmed and pre-scheduled
- Review employee relations spend (meals only during monthly events unless justified)
- Same-day sellout incentive participation
- Leadership hiring activity on Indeed

### 5.12 Photo Documentation (from SOP)
> "All photos from the visit should be compiled into a single PDF for ease of review."

The app handles this automatically: every photo captured during the inspection (tagged by section) is appended to the combined PDF in a final **Photo Documentation** section, ordered by section then capture time. This replaces the SOP's current manual step ("Use Adobe Editor to create and save this document").

---

## 6. Action Plan (from `RDO Trip Report.xlsx` — second tab)

The Action Plan is a separate worksheet in the same workbook. The RDO fills it in based on the findings from Section 5. It captures the corrective actions agreed with the property leadership team.

### 6.1 Header fields (same as Trip Report)
- Property
- Date of Visit
- RDO

### 6.2 Action Plan rows
Each row has:

| Field | Notes |
|---|---|
| **Discipline** | E.g., Revenue Management, Housekeeping, Maintenance, Sales, Front Desk, Training, etc. App suggests options based on Section 5 sections. |
| **Specific and Measurable Action Steps to Guide Improvement** | Free text. The "specific and measurable" phrasing is verbatim from the template. |
| **Person(s) Responsible** | Typically a name + role at the property. |
| **Resources Available** (if applicable) | Person, system, or asset that supports the action. |
| **Comments / Notes** | Free text. |
| **Due Date** | Date or phrase like "Immediately & Ongoing". |
| **Completion Date** | Filled in later (post-visit). v1: editable on the History view so the RDO can mark items done on a follow-up. |

**Example row from the template:**
> Discipline: Revenue Management
> Action Step: GM to attend and participate in weekly revenue calls
> Responsible: GM Name
> Resource: Revenue Manager Name
> Comments: GM must bring discussion items of note to weekly call.
> Due Date: Immediately & Ongoing
> Completion Date: NA

### 6.3 Smart pre-population (app-only, not in workbook)
For every Section 5 item marked **No**, the app offers to draft an Action Plan row pre-filled with that item's text. The RDO can accept, edit, or skip.

### 6.4 Signatures (from the bottom of the Action Plan tab)
- **Manager Signature** — captured on-device (finger or stylus), with date.
- **RDO / Above Property Signature** — captured on-device, with date.
- Both signatures are stamped into the Action Plan section of the final PDF.

---

## 7. Properties (the 21)

The master property list is sourced from `Property List.csv` (v2, 2026-05-10). All 21 properties below, sorted by property code.

### 7.1 Property table

| # | Property Code | Inn Code | Property Name | Brand | Legal Entity |
|---|---|---|---|---|---|
| 1 | 120 | SMYES | Smyrna | Extended Stay America | RH ES Smyrna Hospitality Operating, LLC |
| 2 | 125 | MERES | Meridian | Extended Stay America | ES Meridian Hospitality Operating Co., LLC |
| 3 | 245 | BOIHW | Boise | Hilton | BOISE ATH2017, LLC |
| 4 | 254 | PIAZN | Bloomington | Hyatt | MHI - BLOOMINGTON NORMAL HP OPCO, LLC |
| 5 | 370 | DSIEC | Destin | Hilton | MHI - DESTIN 2 OPCO, LLC |
| 6 | 380 | MEMOB | Olive Branch | Marriott | MHI - OLIVE BRANCH F OPCO, LLC |
| 7 | 430 | TWFTF | Twin Falls | Hilton | TWIN FALLS ATH2017, LLC |
| 8 | 460 | SLCWJ | West Jordan | Hilton | WEST JORDAN ATH2017, LLC |
| 9 | 610 | AHNAT | Athens | Hilton | PR MIG ATHENS OPCO, LLC |
| 10 | 615 | CSGAU | Auburn | Marriott | PR MIG AUBURN OPCO, LLC |
| 11 | 625 | BALCO | Columbia HIS | Hilton | PR MIG COLUMBIA H OPCO, LLC |
| 12 | 630 | BWICO | Columbia SHS | Marriott | PR MIG COLUMBIA S OPCO, LLC |
| 13 | 635 | GNVTH | Gainesville | Hilton | PR MIG GAINESVILLE OPCO, LLC |
| 14 | 645 | HSVZH | Huntsville | Hyatt | PR MIG HUNTSVILLE OPCO, LLC |
| 15 | 650 | MHKCM | Manhattan | Marriott | PR MIG MANHATTAN OPCO, LLC |
| 16 | 655 | MOBHT | Mobile | Hilton | PR MIG MOBILE OPCO, LLC |
| 17 | 660 | MGWRI | Morgantown | Marriott | PR MIG MORGANTOWN OPCO, LLC |
| 18 | 670 | MEMSO | Southaven | Hilton | PR MIG SOUTHAVEN OPCO, LLC |
| 19 | 675 | ACTHT | Waco | Hilton | PR MIG WACO OPCO, LLC |
| 20 | 830 | MEMGE | Germantown HIS | Hilton | GERMANTOWN NESHOBA HOTEL PARTNERS, LLC |
| 21 | 835 | MEMTG | Germantown TPS | Marriott | THORNWOOD LOT 5, LLC |

### 7.2 Brand distribution

| Brand | Count | Properties |
|---|---|---|
| Hilton | 11 | Boise, Destin, Athens, Columbia HIS, Gainesville, Mobile, Southaven, Waco, Twin Falls, West Jordan, Germantown HIS |
| Marriott | 6 | Olive Branch, Auburn, Columbia SHS, Manhattan, Morgantown, Germantown TPS |
| Hyatt | 2 | Bloomington, Huntsville |
| Extended Stay America | 2 | Smyrna, Meridian |

This drives two app behaviors:
1. **Brand-specific checklist variants (SOP §5.6)** — Bloomington and Huntsville (the 2 Hyatt properties) surface Bob as the inspection system; the other 19 surface the Innspector App. v1 ships one combined item with a brand-conditional label; v2 can fully fork variants.
2. **PDF cover branding** — brand logo and color band on the report cover page.

### 7.3 SharePoint topology (confirmed)

**Each property has its own SharePoint site.** The inn code is the site name, not a folder. So for each property, the structure is:

```
Site:    https://<tenant>.sharepoint.com/sites/<innCode>
Library: Documents
Folder:  RDO Property Visits/<date>/
```

This is simpler than the v0.3 model (no inn-code prefix folder needed) and matches the SOP example (`INDNM > Documents > RDO Property Visits > Dated folders`) where `INDNM` is the site.

**One thing still needed from IT:** the exact `<tenant>` and the URL pattern. Most likely `https://<tenant>.sharepoint.com/sites/<innCode>` (e.g., `…/sites/BOIHW`), but it could be `…/sites/<propertyName>` or some other convention. `properties.json` ships with `sharePointSite: null` per property; on first run the app prompts for the URL pattern in Settings, derives all 21 site URLs, and lets the RDO override individual ones. Or IT provides the 21 URLs and we hard-seed them.

### 7.4 Distribution / source of truth

The 21-property list ships as `properties.json` bundled with the app and OTA-updateable via Expo Updates. v2 can move this to a SharePoint List (read via Graph) so IT can edit without engineering involvement.

---

## 8. Data Model

### 8.1 Inspection report (JSON, stored locally then uploaded)

```jsonc
{
  "reportId": "uuid",
  "propertyCode": "245",
  "innCode": "BOIHW",
  "propertyName": "Boise",
  "legalEntity": "BOISE ATH2017, LLC",
  "brand": "Hilton",
  "rdoEmail": "ghdupreez@gmail.com",
  "visitDate": "2026-05-09",
  "startedAt": "2026-05-09T14:02:11Z",
  "submittedAt": "2026-05-09T16:48:03Z",
  "appVersion": "1.0.3",
  "leadershipPresent": ["GM Name", "Sales DOSM Name", "Exec HK Name", "Chief Engineer Name"],
  "sections": [
    {
      "id": "back-of-house-audit",
      "name": "Back of House Audit",
      "items": [
        { "id": "boh-cleanliness", "text": "Confirm area cleanliness and organization", "status": "yes" },
        { "id": "boh-mhc-pulse", "text": "MHC Pulse is posted and discussed", "status": "no" },
        { "id": "boh-permits", "text": "All permits are up to date", "status": "see_notes" }
        // … rest of section's items
      ],
      "notes": "Permits for elevator inspection expire 6/30. Owner notified.",
      "photoIds": ["photo_abc", "photo_def"]
    }
    // … 10 more sections
  ],
  "photos": [
    {
      "id": "photo_abc",
      "sectionId": "back-of-house-audit",
      "filename": "BOIHW_back-of-house-audit_20260509_1404_a1b2.jpg",
      "capturedAt": "2026-05-09T14:04:22Z",
      "gps": { "lat": 39.78, "lng": -89.65 },
      "caption": "Expired permit on wall"
    }
  ],
  "actionPlan": [
    {
      "id": "ap_001",
      "discipline": "Maintenance",
      "actionStep": "Renew elevator inspection permit",
      "personResponsible": "Chief Engineer",
      "resource": "Vendor X",
      "comments": "Schedule before 6/30",
      "dueDate": "2026-06-25",
      "completionDate": null
    }
  ],
  "signatures": {
    "manager": {
      "name": "Jane Smith",
      "signedAt": "2026-05-09T16:42:00Z",
      "signatureImageId": "sig_mgr_001"
    },
    "rdo": {
      "name": "Gerhard du Preez",
      "signedAt": "2026-05-09T16:46:00Z",
      "signatureImageId": "sig_rdo_001"
    }
  }
}
```

### 8.2 Status enum
`yes` | `no` | `see_notes` | `na`

### 8.3 Photo file naming
`{innCode}_{sectionId}_{YYYYMMDD}_{HHMM}_{shortHash}.jpg`

Sortable, self-describing inside SharePoint.

### 8.4 Quarterly coverage tracking
Stored locally per property:
```jsonc
{
  "innCode": "BOIHW",
  "quarter": "2026Q2",
  "itemsCovered": ["sales-confirm-collab", "boh-cleanliness", …],
  "lastUpdated": "2026-05-09T16:48:03Z"
}
```
On Trip Report Home, items not in `itemsCovered` for the current quarter show a small badge so the RDO knows to prioritize them.

---

## 9. SharePoint Folder Structure

Each property has its own SharePoint site (Section 7.3), so the inn code is the **site name**, not a folder. Per the SOP example (`INDNM > Documents > RDO Property Visits > Dated folders`), the default structure inside each property's site — using Boise (`BOIHW`) as a real example — is:

```
Site:    https://<tenant>.sharepoint.com/sites/BOIHW
Library: Documents
└── RDO Property Visits/
    └── 2026-05-09/
        ├── RDO_Trip_Report_BOIHW_2026-05-09.pdf      ← combined PDF (report + action plan + photos)
        ├── RDO_Trip_Report_BOIHW_2026-05-09.json     ← machine-readable copy
        └── photos/
            ├── BOIHW_back-of-house-audit_20260509_1404_a1b2.jpg
            ├── BOIHW_maintenance-review_20260509_1452_c3d4.jpg
            └── ...
```

The combined PDF is the primary deliverable per the SOP. The raw photos are uploaded alongside (in a `photos/` subfolder) so future tooling can re-process them, and the JSON is kept for searchability and possible future reporting.

The folder template inside each site is configurable globally and per-property in Settings (Section 11). Default: `RDO Property Visits/{date}`.

---

## 10. Microsoft 365 / SharePoint Integration

### 10.1 Auth
- Library: MSAL for React Native (`react-native-msal`).
- App registration in Entra ID (your IT will own this):
  - Public client / mobile redirect URIs for iOS and Android.
  - Delegated permissions (no admin consent surprises): `User.Read`, `Files.ReadWrite.All`, `Sites.ReadWrite.All`.
  - Conditional access supported (the library obeys MFA + device compliance policies).
- Token lifetime: silent refresh handled by MSAL; force re-login if refresh token revoked.

### 10.2 Upload via Microsoft Graph
Each property has its own SharePoint site, so the resolution and upload is per-property:

- **Resolve site + drive** for each property on first use, cache the IDs:
  - `GET /sites/{hostname}:/sites/{innCode}` → `siteId`
  - `GET /sites/{siteId}/drives` → pick the `Documents` library, save `driveId`.
- **Create folder** for the report (idempotent):
  - `POST /drives/{driveId}/root:/RDO Property Visits/{date}:/children` with `folder: {}` and `@microsoft.graph.conflictBehavior: replace`.
- **Upload combined PDF and JSON (small files, < 4 MB):**
  - `PUT /drives/{driveId}/root:/RDO Property Visits/{date}/RDO_Trip_Report_{innCode}_{date}.pdf:/content`
- **Upload photos (use upload session for resumability):**
  - `POST .../createUploadSession` then chunked `PUT` of 10 MB ranges. Required for flaky cellular and for any photo above 4 MB.
- **Set metadata** on each photo (inn code, section, date) so SharePoint can filter and search them later.

### 10.3 Required app registration scopes
| Scope | Why |
|---|---|
| `User.Read` | Show signed-in user's name and email |
| `Files.ReadWrite.All` | Create folders and upload files |
| `Sites.ReadWrite.All` | Resolve sites and drives by URL |
| `Mail.Send` | Send the pre-visit Purpose & Agenda email (optional v1, can defer) |
| `offline_access` | Silent token refresh |

### 10.4 IT/admin actions you'll need
1. Create an Entra ID app registration with the redirect URIs we provide.
2. Approve the delegated scopes above (typically end-user-consentable, but enterprise tenants often require admin consent — confirm with IT).
3. Confirm the URL pattern for the per-property sites. Most likely `https://<tenant>.sharepoint.com/sites/<innCode>` (e.g., `…/sites/BOIHW`); IT to confirm the `<tenant>` and exact pattern. Once confirmed, the app derives all 21 site URLs automatically.
4. Decide distribution: Intune managed app vs. App Store/Play Store. For an internal RDO tool at this scale, Intune is the right answer.

---

## 11. Settings Section (Detailed)

The Settings tab has three sub-screens:

### 11.1 SharePoint
- **Site URL pattern** — single field, default `https://<tenant>.sharepoint.com/sites/{innCode}`. Tokens: `{innCode}`, `{propertyCode}`, `{propertyName}`. The app uses this to derive a site URL for each of the 21 properties.
- **Default document library** — dropdown populated from `GET /sites/{siteId}/drives`. Default to `Documents` per SOP.
- **Default folder template (inside each site)** — text field, default `RDO Property Visits/{date}`. Tokens: `{innCode}`, `{propertyName}`, `{YYYY}`, `{MM}`, `{DD}`, `{date}`.
- **Per-property overrides** — list of all 21 properties with edit buttons. Tap one to override its site URL, library, or folder template. Override only what differs; everything else falls back to defaults.

### 11.2 Offline & Cache
- Show storage used by drafts and pending uploads.
- "Retry pending uploads now" button.
- "Clear submitted reports older than 90 days" toggle (default on — keeps a quarter on-device for quarterly coverage rollups).
- Photo quality slider: Standard (1600 px long edge, ~70% JPEG) / High (3000 px, 85%).

### 11.3 Account
- Signed-in user display.
- App version + build number.
- "Sign out" (clears MSAL cache and local DB).

### 11.4 Who can change settings?
- v1: Any signed-in RDO can change their own settings. The per-property folder mapping is shipped as part of `properties.json` so the field defaults are always sane even if an RDO clears them.
- v2 consideration: Lock the SharePoint settings to an admin role using an Entra ID app role.

---

## 12. Offline Behavior

- Inspections are written to a local SQLite database as the RDO works. Photos go to `expo-file-system` (the app's sandboxed storage), referenced by the inspection's photo IDs.
- On submit, the report goes into an upload queue. The queue runs whenever the app is foregrounded with network access; iOS background uploads are limited, so the model is "open the app once after the inspection to flush uploads," which matches how RDOs already work.
- Failed uploads retry with exponential backoff. Permanent failures (auth expired, folder permission removed) surface a clear "Action needed" indicator and a one-tap "Re-authenticate" or "Pick a different folder."
- If the RDO uninstalls the app with pending uploads, those are lost — call this out in onboarding and add a clear "All synced" indicator on the home screen.

---

## 13. Security & Compliance

- All tokens stored in OS-level secure storage (`expo-secure-store`, which uses Keychain on iOS and Keystore on Android).
- Signature images stored alongside the inspection JSON, never separately exfiltrated.
- No copies of credentials in app code or in logs. Sentry breadcrumbs scrub auth headers.
- Photos and reports never leave the device except via Graph over HTTPS.
- Pinned to TLS 1.2+; certificate pinning optional in v1 (recommend deferring — Microsoft rotates certs regularly).
- App can be wrapped under Intune App Protection Policies (MAM) so IT can wipe corporate data without wiping the device.

---

## 14. Testing Plan

| Layer | Approach |
|---|---|
| Unit | Jest for state, validation, report-builder utilities, and quarterly-coverage logic |
| Component | React Native Testing Library for each screen's happy path |
| E2E | Detox for the full flow on a real device (sign in → inspect all 11 sections → action plan → signatures → submit) |
| Manual field tests | Two RDOs do real inspections at two pilot properties before rollout |
| Network resilience | Test on airplane mode mid-upload, on flaky 3G, and after token expiry |
| Permissions | Camera denied, location denied, storage full, app updated mid-draft |
| PDF quality | Side-by-side compare app-generated PDF vs. the equivalent Word/Excel-rendered baseline so format is acceptable to leadership |

---

## 15. Phased Build Plan

### Phase 1 — MVP (≈ 4–6 weeks)
Goal: One RDO can complete the full Trip Report + Action Plan + signatures and submit it to SharePoint end-to-end.

- Project scaffolding (Expo, TypeScript, navigation, state).
- MSAL sign-in flow + token persistence.
- Property picker (loaded from a static `properties.json` seeded with the 21 properties).
- Trip Report flow: 11 sections → items with Yes/No/NA + question-level notes/photos for No items + section-level Notes + section-level photos.
- Action Plan: add/edit/delete rows; smart pre-population from "No" items.
- Signature capture (Manager + RDO).
- Local draft persistence in SQLite.
- Combined PDF generation (Trip Report → Action Plan → Photo Documentation) with a branded template.
- Microsoft Graph upload of PDF, JSON, and photos with upload sessions.
- Settings: SharePoint defaults, basic offline & account.
- Internal distribution to one tester device per platform.

### Phase 2 — Polish & Pilot (≈ 3–4 weeks)
Goal: Two RDOs use it at two pilot properties and we fix what breaks.

- Per-property folder overrides UI.
- Offline upload queue with retry and clear status indicators.
- Quarterly coverage dashboard.
- Pre-visit Purpose & Agenda composer + email send via Graph.
- Photo watermark overlay (inn code + timestamp baked into the JPEG).
- History view (past reports for the property + ability to mark Action Plan items complete).
- Crash reporting (Sentry) + analytics (basic counts only).
- Field test, fix, repeat.

### Phase 3 — Hardening & Rollout (≈ 2–3 weeks)
Goal: Ship to all 21 properties' RDOs.

- Intune packaging + IT signoff.
- Entra ID app registration moved to production tenant.
- Final accessibility pass (font scaling, VoiceOver labels on the camera screen).
- Documentation: a one-pager for RDOs, a one-pager for IT.
- Remote `properties.json` config (or SharePoint list) so updates don't require an app release.

### Phase 4 — Roadmap (post-v1)
- Web companion for reviewers (read past reports without opening SharePoint).
- Action Plan reminders / overdue notifications.
- Trend dashboards across properties (which items are most often "No" across the portfolio).
- Voice-to-text on Notes fields.
- Brand-specific item variants (Hyatt uses Bob; others use Innspector App — surface the right one based on the property's brand).

---

## 16. Risks & Open Questions

| Risk | Mitigation / Question |
|---|---|
| Entra ID consent policy may require admin consent for `Sites.ReadWrite.All` across 21 sites | Confirm with IT early. With one site per property, scope can be narrowed to `Sites.Selected` if needed and IT grants the app access to each of the 21 sites explicitly. |
| 21 separate SharePoint sites = 21 separate `siteId` resolutions | Cache `siteId` and `driveId` per property after first resolution. Pre-resolve all 21 on first sign-in (sequential or parallel) so subsequent uploads are one HTTP call. |
| Brand-specific items (Hyatt's Bob vs. Innspector App per SOP §5.6) | v1 ships one combined item with brand-conditional label; v2 can fully fork variants. The 2 Hyatt properties (Bloomington, Huntsville) get the Bob label; the other 19 get the Innspector App label. |
| iOS background uploads are limited | Document the "open app to flush" behavior; if unacceptable, add a small Azure Function relay (out of scope for v1). |
| Property list may evolve (new property opens, one closes) | `properties.json` is remotely updatable via Expo Updates; no app store release needed. |
| Photo storage growth on SharePoint | Set a retention policy (e.g., 24 months) and document it. |
| RDO accidentally signs in with personal Microsoft account | App restricts auth to your tenant ID in MSAL config. |
| "Distribute to property leadership team" (per SOP) is not automated in v1 | After upload, app offers a "Share PDF link" sheet (Outlook, Teams, native share). v2 can auto-email a fixed distribution list per property. |

---

## 17. Decisions Already Made

- **Platform:** iOS + Android, cross-platform.
- **Stack:** React Native + Expo.
- **Auth:** Microsoft 365 SSO via MSAL / Entra ID.
- **Save target:** SharePoint — **one site per property**. Default path inside each site: `Documents/RDO Property Visits/{date}/`.
- **Output:** One combined PDF per visit (Trip Report → Action Plan → Photo Documentation) plus raw photos in a `photos/` subfolder plus a JSON copy.
- **Status enum:** Yes / No / NA.
- **Notes are section-level**, not per-item.
- **Signatures:** Manager + RDO/Above Property, captured on-device.
- **Quarterly coverage tracking** built in per SOP rule.
- **Property count: 21** (Starbucks - Bloomington removed).
- **Brand mix: 11 Hilton, 6 Marriott, 2 Hyatt, 2 Extended Stay America.** Drives PDF cover branding and the Bob/Innspector App label.

---

## 18. Next Steps

1. **You + IT:** Confirm the SharePoint URL pattern. Most likely `https://<tenant>.sharepoint.com/sites/<innCode>` — confirm `<tenant>` and that the inn code is the site slug for all 21 sites. If a property uses a different slug, list the exception(s).
2. **You + IT:** Kick off the Entra ID app registration so we have the client ID before development starts. Decide whether to use `Sites.ReadWrite.All` (broad) or `Sites.Selected` with explicit grants to the 21 sites (tighter).
3. **Me (next):** Build a clickable HTML mockup of the 11-section Trip Report flow + Action Plan so you can validate the UX with one or two pilot RDOs before development burns time.
4. **Me (after that):** Scaffold the Expo project and ship a one-screen MSAL sign-in demo you can install on your own phone.

**No data blockers remain.** `properties.json` is now seeded with all 21 properties + brand. Once the SharePoint URL pattern is confirmed, the app can derive all 21 site URLs automatically — no manual list needed.

---

*End of v0.4 spec.*
