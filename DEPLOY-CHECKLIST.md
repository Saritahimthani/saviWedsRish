# #RishSavi — Launch Checklist (~10 minutes total)

## Step 1 — Create the RSVP form (2 min)
1. Open https://script.google.com → **New project**
2. Paste the contents of `create-rsvp-form.gs`, save, click **Run**
3. Approve the permission prompt (it's your own script on your own account)
4. Copy the **FORM LINK** and the **RESPONSES SHEET** link from the log
   (View → Logs, or the Execution log panel)

## Step 2 — Wire the in-site RSVP page (3 min)
The invitation's "RSVP Now" button opens `rsvp.html` — a styled RSVP page
that submits straight into your Google Form's response sheet.
1. Open `rsvp.html`, scroll to the CONFIG block at the bottom
2. Paste the FORM ID (the script's log prints it)
3. Paste each entry ID from the log's "ENTRY IDs" section
   (name → entry.NNN, side → entry.NNN, etc.)
4. Test once: submit a dummy RSVP and confirm a row appears in the sheet.
   Delete the test row after.
IMPORTANT: if you ever edit the Google Form's questions later,
re-run logEntryIds and re-paste — editing questions can change their IDs.

## Step 3 — Fill in your real details (5 min)
Search for `[` in index.html — every placeholder is bracketed:
- `Savi` / `Rish` → real names (cover, couple section, and both `og:` meta tags)
- `[Mother's name]` / `[Father's name]` (x2)
- `[Venue name]` per event + the 5 Google Maps links
  (get real links: open the venue in Google Maps → Share → copy link)
- Event timings if different from the assumed ones
- Photos: replace the BRIDE PHOTO / GROOM PHOTO / PHOTO 1–3 placeholder
  divs with `<img src="images/yourphoto.jpg">` (put photos in an images/ folder)
- Music: the site auto-plays a file named `music.mp3` from your repo after
  the envelope is opened (guests get a mute button). Add any track as
  `music.mp3` in the same folder as index.html. Use a ROYALTY-FREE track —
  Bollywood songs are copyrighted and risky on a public site. Good free
  sources: Pixabay Music, YouTube Audio Library (search "shehnai", "sitar
  romantic", "Indian wedding instrumental"). No file = no music, no error.

## Step 4 — Host on GitHub Pages (2 min)
1. github.com → New repository → name it e.g. `RishSavi` → Public → Create
2. **Add file → Upload files** → drag in `index.html`, `rsvp.html` (and your images/ folder)
   → Commit
3. Repo **Settings → Pages** → Source: "Deploy from a branch" →
   Branch: `main`, folder `/ (root)` → Save
4. Wait ~1 minute → your invite is live at:
   `https://YOUR-USERNAME.github.io/RishSavi/`

## Updating later
Edit `index.html` directly on github.com (pencil icon) → Commit.
The live site updates itself in about a minute.

## Tracking RSVPs
Everything lands in the **RSVP Tracker sheet**, one row per family:
- Filter column "Whose side are you from?" → independent bride/groom views
- The "How are you related?" column is your same-name disambiguator
- Headcounts per function: Insert → Pivot table → rows = functions column,
  or use COUNTIF on the checkbox column
- Share the sheet with both families (View or Edit access as you prefer)
