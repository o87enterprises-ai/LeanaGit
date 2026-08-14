// ============================================================================
// CAMPAIGN EVENTS
// ============================================================================
// To add an event, copy one of the blocks below and edit it. Only `date`,
// `title` and `time` are required — leave anything else off (or set it to
// null) and the site will simply not show that line.
//
//   date        'YYYY-MM-DD'  the day the event happens
//   title       what shows on the calendar and the card
//   host        e.g. 'Hosted by Silvia Guzmán'
//   time        e.g. '1:00 – 3:00 PM'
//   location    venue name, e.g. 'Concordia Park'
//   address     street address — becomes a tappable map link
//   rsvpUrl     ActBlue / RSVP link. Omit it until you have one.
//   rsvpLabel   button text (defaults to 'RSVP')
//   description one or two sentences shown on the card
//
// Spanish: add titleEs / hostEs / timeEs / locationEs / descriptionEs and the
// site uses them when a visitor switches to Spanish. Leave any of them off and
// that line simply stays in English, so a new event is never broken — it is
// just untranslated until someone fills the Spanish in.
//
// Events sort themselves by date, so you can add them in any order.
// ============================================================================

export const events = [
  {
    date: '2026-08-29',
    title: 'Community Gathering',
    titleEs: 'Reunión Comunitaria',
    host: 'Hosted by Silvia Guzmán',
    hostEs: 'Organizado por Silvia Guzmán',
    time: '1:00 – 3:00 PM',
    timeEs: '1:00 – 3:00 p. m.',
    location: 'Concordia Park',
    locationEs: 'Parque Concordia',
    address: '2901 64th Ave, Oakland, CA 94605',
    description:
      'Come meet LeAna, bring the cubs, and talk with neighbors about what District 6 schools need.',
    descriptionEs:
      'Venga a conocer a LeAna, traiga a los cachorros y converse con sus vecinos sobre lo que necesitan las escuelas del Distrito 6.',
  },
  {
    date: '2026-08-30',
    title: 'House Party',
    titleEs: 'Fiesta en Casa',
    host: 'Hosted by Katie and Cody Rhodes',
    hostEs: 'Organizada por Katie y Cody Rhodes',
    time: '3:00 – 5:00 PM',
    timeEs: '3:00 – 5:00 p. m.',
    description:
      'An afternoon with fellow Burckhalter families and friends of the campaign. RSVP for the address.',
    descriptionEs:
      'Una tarde con familias de Burckhalter y amistades de la campaña. Confirme su asistencia para recibir la dirección.',
    rsvpUrl: 'https://secure.actblue.com/donate/leana-katie',
  },
  {
    date: '2026-09-02',
    title: 'Fundraiser with Chef Nigel',
    titleEs: 'Recaudación de Fondos con el Chef Nigel',
    host: 'Hosted by Chef Nigel',
    hostEs: 'Organizada por el Chef Nigel',
    time: '5:00 – 6:30 PM',
    timeEs: '5:00 – 6:30 p. m.',
    location: 'Calabash',
    address: 'Uptown Oakland',
    addressEs: 'Uptown, Oakland',
    description:
      'Good food and good company in Uptown to fuel the final stretch of the campaign.',
    descriptionEs:
      'Buena comida y buena compañía en Uptown para impulsar la recta final de la campaña.',
    rsvpUrl: 'https://secure.actblue.com/donate/leana-calabash',
  },
];

/** Resolve an event's text for the active language, falling back to English. */
export function localizeEvent(event, language) {
  if (language !== 'es') return event;
  return {
    ...event,
    title: event.titleEs || event.title,
    host: event.hostEs || event.host,
    time: event.timeEs || event.time,
    location: event.locationEs || event.location,
    address: event.addressEs || event.address,
    description: event.descriptionEs || event.description,
    rsvpLabel: event.rsvpLabelEs || event.rsvpLabel,
    // Keep the English venue for the map link — Google finds "Concordia Park",
    // not "Parque Concordia".
    mapLocation: event.location,
    mapAddress: event.address,
  };
}

// --- helpers ---------------------------------------------------------------

/** Local-time 'YYYY-MM-DD' for a Date (never use toISOString here — it shifts
 *  Oakland dates back a day). */
export function toDateStr(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Parse 'YYYY-MM-DD' as local noon so time zones can't nudge it off by a day. */
export function parseDateStr(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

export const sortedEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));

/** { '2026-08-29': [event, ...], ... } */
export const eventsByDate = sortedEvents.reduce((map, event) => {
  (map[event.date] ||= []).push(event);
  return map;
}, {});

/** Events today or later, soonest first. */
export function upcomingEvents(today = new Date()) {
  const todayStr = toDateStr(today);
  return sortedEvents.filter((event) => event.date >= todayStr);
}

/** Events that have already happened, most recent first. */
export function pastEvents(today = new Date()) {
  const todayStr = toDateStr(today);
  return sortedEvents.filter((event) => event.date < todayStr).reverse();
}

/** The month the calendar should open on: the next event's month, else now. */
export function defaultCalendarMonth(today = new Date()) {
  const next = upcomingEvents(today)[0];
  const anchor = next ? parseDateStr(next.date) : today;
  return new Date(anchor.getFullYear(), anchor.getMonth(), 1);
}

export function localeFor(language) {
  return language === 'es' ? 'es-US' : 'en-US';
}

export function formatEventDate(dateStr, options, language) {
  return parseDateStr(dateStr).toLocaleDateString(localeFor(language), {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

/** Month names for the calendar header, in the active language. */
export function monthNames(language) {
  const formatter = new Intl.DateTimeFormat(localeFor(language), { month: 'long' });
  return Array.from({ length: 12 }, (_, i) => {
    const name = formatter.format(new Date(2026, i, 1));
    return name.charAt(0).toUpperCase() + name.slice(1); // Spanish months are lowercase
  });
}

/** Weekday initials for the calendar header, in the active language. */
export function weekdayNames(language) {
  const formatter = new Intl.DateTimeFormat(localeFor(language), { weekday: 'short' });
  // 2026-08-02 is a Sunday, so this walks Sun -> Sat.
  return Array.from({ length: 7 }, (_, i) => {
    const name = formatter.format(new Date(2026, 7, 2 + i)).replace('.', '');
    return name.charAt(0).toUpperCase() + name.slice(1);
  });
}

export function mapUrl(event) {
  const query = [event.mapLocation ?? event.location, event.mapAddress ?? event.address]
    .filter(Boolean)
    .join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
