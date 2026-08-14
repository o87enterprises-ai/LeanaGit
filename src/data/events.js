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
// Events sort themselves by date, so you can add them in any order.
// ============================================================================

export const events = [
  {
    date: '2026-08-29',
    title: 'Community Gathering',
    host: 'Hosted by Silvia Guzmán',
    time: '1:00 – 3:00 PM',
    location: 'Concordia Park',
    address: '2901 64th Ave, Oakland, CA 94605',
    description:
      'Come meet LeAna, bring the cubs, and talk with neighbors about what District 6 schools need.',
  },
  {
    date: '2026-08-30',
    title: 'House Party',
    host: 'Hosted by Katie and Cody Rhodes',
    time: '3:00 – 5:00 PM',
    description:
      'An afternoon with fellow Burckhalter families and friends of the campaign. RSVP for the address.',
    rsvpUrl: 'https://secure.actblue.com/donate/leana-katie',
  },
  {
    date: '2026-09-02',
    title: 'Fundraiser with Chef Nigel',
    host: 'Hosted by Chef Nigel',
    time: '5:00 – 6:30 PM',
    location: 'Calabash',
    address: 'Uptown Oakland',
    description:
      'Good food and good company in Uptown to fuel the final stretch of the campaign.',
    rsvpUrl: 'https://secure.actblue.com/donate/leana-calabash',
  },
];

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

export function formatEventDate(dateStr, options) {
  return parseDateStr(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

export function mapUrl(event) {
  const query = [event.location, event.address].filter(Boolean).join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
