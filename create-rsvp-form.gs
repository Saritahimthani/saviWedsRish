/**
 * #RishSavi RSVP Form Builder
 * ---------------------------------------------------------
 * HOW TO RUN (one time, ~2 minutes):
 * 1. Go to https://script.google.com (logged into your Google account)
 * 2. Click "New project", delete any code in the editor,
 *    and paste this entire file.
 * 3. Click the Save icon, then click "Run" (function: createRsvpForm).
 * 4. Approve the permissions prompt (it's your own account creating
 *    your own form — Google shows a warning for all custom scripts).
 * 5. Open the "Executions"/log output: it prints two links —
 *      • FORM LINK (share this / paste into the website)
 *      • RESPONSES SHEET (your single tracking place)
 *    Both also appear in your Google Drive.
 * ---------------------------------------------------------
 */
function createRsvpForm() {
  // ---- Create the form ----
  var form = FormApp.create('RSVP — Savi weds Rishabh · #RishSavi');
  form.setDescription(
    '24–25 November 2026 · Vrindavan\n\n' +
    'We can\'t wait to celebrate with you! Please fill this once per family. ' +
    'It takes less than a minute.'
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false); // guests may not have Google accounts
  form.setAllowResponseEdits(true);       // let guests fix mistakes
  form.setConfirmationMessage(
    'Thank you! Your RSVP is recorded. See you at the shaadi! ✨ #RishSavi'
  );

  // ---- Questions ----
  form.addTextItem()
    .setTitle('Full name (family head)')
    .setHelpText('e.g., Rajesh Sharma')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Whose side are you from?')
    .setChoiceValues(['Bride\'s side (Savi)', 'Groom\'s side (Rishabh)'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('How are you related? (helps us recognize you!)')
    .setHelpText('e.g., "Mama\'s family, Indore" or "College friend of the groom" — ' +
                 'this is how we tell the three Priya Sharmas apart :)')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Phone number (WhatsApp)')
    .setHelpText('So we can share updates, timings, and location pins')
    .setRequired(true);

  form.addTextItem()
    .setTitle('City you\'re travelling from')
    .setHelpText('Helps us plan pickups and hotel rooms')
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Which functions will you attend?')
    .setChoiceValues([
      'Haldi — Tue 24 Nov, morning',
      'Sangeet — Tue 24 Nov, evening',
      'Ghud Chadi (Baraat) — Wed 25 Nov, afternoon',
      'Phere — Wed 25 Nov, evening',
      'Reception — Wed 25 Nov, night'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Number of adults attending')
    .setChoiceValues(['1', '2', '3', '4', '5', '6', 'More than 6'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Number of children attending')
    .setChoiceValues(['0', '1', '2', '3', '4 or more'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Food preference')
    .setChoiceValues(['Vegetarian', 'Jain', 'No preference'])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Anything we should know?')
    .setHelpText('Arrival timings, accessibility needs, a message for the couple…')
    .setRequired(false);

  // ---- Linked response spreadsheet (your single tracking place) ----
  var ss = SpreadsheetApp.create('RSVP Tracker — #RishSavi');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // ---- Output the links ----
  Logger.log('====================================================');
  Logger.log('FORM ID (for rsvp.html CONFIG): ' + form.getPublishedUrl().split('/e/')[1].split('/')[0]);
  Logger.log('FORM LINK (fallback share):     ' + form.getPublishedUrl());
  Logger.log('EDIT FORM (owner only):         ' + form.getEditUrl());
  Logger.log('RESPONSES SHEET (track here):   ' + ss.getUrl());
  Logger.log('====================================================');
  logEntryIds(form);
}

/**
 * Prints the entry.NNN ID for every question — paste these into
 * the CONFIG block at the bottom of rsvp.html.
 * Works by generating a pre-filled URL with marker answers and
 * matching each marker back to its question.
 */
function logEntryIds(form) {
  var markers = {}; // markerValue -> question title
  var response = form.createResponse();
  form.getItems().forEach(function(item, idx){
    var t = item.getType();
    var title = item.getTitle();
    if (t === FormApp.ItemType.TEXT) {
      var m = 'MARKER_' + idx;
      markers[m] = title;
      response.withItemResponse(item.asTextItem().createResponse(m));
    } else if (t === FormApp.ItemType.PARAGRAPH_TEXT) {
      var m2 = 'MARKER_' + idx;
      markers[m2] = title;
      response.withItemResponse(item.asParagraphTextItem().createResponse(m2));
    } else if (t === FormApp.ItemType.MULTIPLE_CHOICE) {
      var mc = item.asMultipleChoiceItem();
      var v = mc.getChoices()[0].getValue();
      markers[v] = title;
      response.withItemResponse(mc.createResponse(v));
    } else if (t === FormApp.ItemType.CHECKBOX) {
      var cb = item.asCheckboxItem();
      var v2 = cb.getChoices()[0].getValue();
      markers[v2] = title;
      response.withItemResponse(cb.createResponse([v2]));
    }
  });
  var url = response.toPrefilledUrl();
  Logger.log('--- ENTRY IDs for rsvp.html CONFIG ---');
  var re = /entry\.(\d+)=([^&]*)/g, match;
  while ((match = re.exec(url)) !== null) {
    var val = decodeURIComponent(match[2].replace(/\+/g, ' '));
    Logger.log((markers[val] || val) + '  →  entry.' + match[1]);
  }
  Logger.log('--------------------------------------');
}
