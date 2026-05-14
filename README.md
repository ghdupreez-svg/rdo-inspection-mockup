# RDO Property Inspection Mockup

This is a dependency-free clickable HTML recreation of the RDO inspection app described in `RDO_Inspection_App_Spec.md`.

Open `index.html` in a browser to try it.

Related guides:

- `GITHUB_PAGES_STEPS.md` - publish the clickable mockup with GitHub Pages.
- `IT_Setup_Guide.md` - Microsoft / SharePoint setup notes for IT.
- `APP_STORE_RELEASE_GUIDE.md` - steps to release a production app through the Apple App Store and Google Play.

Implemented flows:

- Property list with all 21 properties and brand metadata.
- Trip Report home with 11 workbook sections and progress tracking.
- Section detail with Yes / No / See Notes / NA statuses.
- Section-level notes and mock photo attachments.
- Hyatt-specific Bob label and Innspector App label for other brands.
- Action Plan rows auto-created from No / See Notes findings.
- Manager and RDO signature capture pads.
- Review and mock SharePoint submit queue.
- Settings for tenant, site URL pattern, library, and folder template.

This is a UX mockup only. It does not yet include Expo, Microsoft 365 auth, Microsoft Graph upload, SQLite persistence, camera access, or PDF generation.
