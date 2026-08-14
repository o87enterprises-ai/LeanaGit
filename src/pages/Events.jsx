import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  eventsByDate,
  upcomingEvents,
  pastEvents,
  defaultCalendarMonth,
  formatEventDate,
  parseDateStr,
  toDateStr,
  mapUrl,
} from '../data/events';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function EventDetails({ event, compact = false }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 border-oakland-terracotta ${compact ? 'p-4' : 'p-6'}`}>
      <h4 className="font-playfair text-lg sm:text-xl font-bold text-rooted-black">{event.title}</h4>
      {event.host && <p className="text-rooted-black/70 text-sm italic">{event.host}</p>}

      <p className="text-sm text-oakland-terracotta font-semibold mt-2">{event.time}</p>

      {(event.location || event.address) && (
        <a
          href={mapUrl(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-rooted-black/70 hover:text-oakland-terracotta transition-colors mt-1"
        >
          📍 {[event.location, event.address].filter(Boolean).join(' · ')}
        </a>
      )}

      {event.description && (
        <p className="text-rooted-black/70 text-sm mt-3 leading-relaxed">{event.description}</p>
      )}

      {event.rsvpUrl ? (
        <a
          href={event.rsvpUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-oakland-terracotta text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-sierra-sage transition-colors"
        >
          {event.rsvpLabel || 'RSVP'} &rarr;
        </a>
      ) : (
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-rooted-black/40">
          RSVP link coming soon — just come on by
        </p>
      )}
    </div>
  );
}

export default function Events() {
  const [currentMonth, setCurrentMonth] = useState(() => defaultCalendarMonth());
  const [selectedDateStr, setSelectedDateStr] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const upcoming = upcomingEvents();
  const past = pastEvents();
  const todayStr = toDateStr(new Date());

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push({ empty: true });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = toDateStr(new Date(year, month, i));
      days.push({
        day: i,
        dateStr,
        hasEvents: !!eventsByDate[dateStr],
        isToday: dateStr === todayStr,
      });
    }
    return days;
  };

  const calendarDays = generateCalendar();

  const openDate = (dateStr) => {
    setSelectedDateStr(dateStr);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedDateStr(null), 300);
  };

  const goToMonth = (offset) =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));

  return (
    <div className="min-h-screen py-20 px-6 bg-warm-ivory relative overflow-hidden">
      {/* Floating paw prints in background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <span className="absolute top-10 left-5 text-6xl anim-float-1 text-rooted-black/10">🐾</span>
        <span className="absolute bottom-20 right-10 text-4xl anim-float-2 text-rooted-black/10">🐾</span>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-rooted-black mb-3 text-center">
          Events Calendar
        </h1>
        <p className="text-center text-rooted-black/60 mb-10 max-w-xl mx-auto">
          Meet the mama bear in the wild. Tap a highlighted day for details and RSVP links.
        </p>

        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <button
            onClick={() => goToMonth(-1)}
            aria-label="Previous month"
            className="px-4 py-2 rounded-full bg-warm-ivory hover:bg-california-gold transition-colors"
          >
            &larr;
          </button>
          <h2 className="font-playfair text-2xl font-bold text-rooted-black">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <button
            onClick={() => goToMonth(1)}
            aria-label="Next month"
            className="px-4 py-2 rounded-full bg-warm-ivory hover:bg-california-gold transition-colors"
          >
            &rarr;
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 bg-white p-4 rounded-2xl shadow-md border border-gray-100">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="text-xs sm:text-sm font-bold text-rooted-black/50 text-center py-2">{d}</div>
          ))}

          {calendarDays.map((day, i) => (
            <div key={i} className="aspect-square flex items-center justify-center relative">
              {day.empty ? (
                <div className="w-full h-full" />
              ) : (
                <motion.button
                  layoutId={day.dateStr}
                  onClick={() => day.hasEvents && openDate(day.dateStr)}
                  aria-label={day.hasEvents ? `Events on ${formatEventDate(day.dateStr)}` : undefined}
                  className={`w-full h-full rounded-full text-base font-medium transition-all flex flex-col items-center justify-center ${
                    day.hasEvents
                      ? 'bg-california-gold/30 text-rooted-black hover:bg-california-gold hover:scale-105 cursor-pointer'
                      : 'text-rooted-black/40 hover:bg-warm-ivory cursor-default'
                  } ${day.isToday ? 'ring-2 ring-oakland-terracotta' : ''}`}
                >
                  {day.day}
                  {day.hasEvents && <span className="w-1 h-1 rounded-full bg-oakland-terracotta mt-1 block" />}
                </motion.button>
              )}
            </div>
          ))}
        </div>

        {/* Upcoming events list */}
        <section className="mt-14">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-rooted-black mb-6">
            Upcoming Events
          </h2>

          {upcoming.length === 0 ? (
            <p className="text-rooted-black/60 bg-white rounded-xl p-6 border border-gray-100">
              No events on the calendar right now — check back soon, or{' '}
              <Link to="/volunteer" className="text-oakland-terracotta font-bold underline">
                sign up to host one
              </Link>
              .
            </p>
          ) : (
            <div className="space-y-6">
              {upcoming.map((event, idx) => (
                <div key={`${event.date}-${idx}`} className="flex gap-4 items-start">
                  <button
                    onClick={() => openDate(event.date)}
                    aria-label={`Details for ${event.title} on ${formatEventDate(event.date)}`}
                    className="flex-shrink-0 w-16 sm:w-20 rounded-xl bg-oakland-terracotta text-white text-center py-3 shadow-sm hover:bg-sierra-sage transition-colors"
                  >
                    <span className="block text-xs uppercase tracking-wide">
                      {parseDateStr(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="block font-playfair text-2xl font-bold leading-tight">
                      {parseDateStr(event.date).getDate()}
                    </span>
                  </button>
                  <div className="flex-grow">
                    <EventDetails event={event} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Past events */}
        {past.length > 0 && (
          <section className="mt-12">
            <h2 className="font-playfair text-xl font-bold text-rooted-black/60 mb-4">Past Events</h2>
            <ul className="space-y-2">
              {past.map((event, idx) => (
                <li key={`${event.date}-${idx}`} className="text-sm text-rooted-black/50">
                  <span className="font-semibold">{formatEventDate(event.date, { weekday: undefined })}</span>
                  {' — '}
                  {event.title}
                  {event.host ? `, ${event.host.replace(/^Hosted by /, 'hosted by ')}` : ''}
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <p className="text-rooted-black/70 mb-4">
            Want to host a gathering, house party, or meet-and-greet for LeAna?
          </p>
          <Link
            to="/volunteer"
            className="inline-block bg-oakland-terracotta text-white px-6 py-3 rounded-full font-bold hover:bg-sierra-sage transition-colors"
          >
            Get in touch &rarr;
          </Link>
        </div>

        <div className="mt-10 text-center">
          <Link to="/" className="text-oakland-terracotta font-bold underline hover:text-sierra-sage transition-colors">
            Return Home
          </Link>
        </div>
      </div>

      {/* Animated Zoom Modal */}
      <AnimatePresence>
        {showModal && selectedDateStr && eventsByDate[selectedDateStr] && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-rooted-black/50 backdrop-blur-sm overflow-y-auto"
            onClick={closeModal}
          >
            <motion.div
              layoutId={selectedDateStr}
              onClick={(e) => e.stopPropagation()}
              className="bg-warm-ivory p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/20 my-8"
            >
              <h3 className="font-playfair text-2xl font-bold text-rooted-black mb-4">
                {formatEventDate(selectedDateStr)}
              </h3>
              <div className="space-y-4">
                {eventsByDate[selectedDateStr].map((event, idx) => (
                  <EventDetails key={idx} event={event} compact />
                ))}
              </div>
              <button
                onClick={closeModal}
                className="mt-6 w-full py-3 rounded-full bg-oakland-terracotta text-white font-bold hover:bg-sierra-sage transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
