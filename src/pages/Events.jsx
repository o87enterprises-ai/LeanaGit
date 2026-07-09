import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Hardcoded dummy events for July 2026
const eventsMap = {
  '2026-07-15': [{ title: 'Community Town Hall', time: '6:00 PM - 8:00 PM', desc: 'Join LeAna and the community at the district office to discuss school funding and safety.' }],
  '2026-07-22': [{ title: 'Parent Volunteer Day', time: '9:00 AM - 12:00 PM', desc: 'Help refurbish the gardens at Burckhalter Elementary alongside our PTO.' }],
  '2026-07-30': [{ title: 'Endorsement Rally', time: '5:00 PM - 7:00 PM', desc: 'Come hear local community leaders and unions officially endorse LeAna for District 6.' }],
};

export default function Events() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 6, 1)); // July 2026
  const [selectedDateStr, setSelectedDateStr] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Generate calendar days
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push({ empty: true });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dateObj = new Date(year, month, i);
      const dateStr = dateObj.toISOString().split('T')[0];
      days.push({ day: i, dateStr: dateStr, hasEvents: !!eventsMap[dateStr] });
    }
    return days;
  };

  const calendarDays = generateCalendar();

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedDateStr(null), 300);
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-warm-ivory relative overflow-hidden">
      {/* Floating paw prints / honeycomb in background (optional, same as home) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <span className="absolute top-10 left-5 text-6xl anim-float-1 text-rooted-black/10">🐾</span>
        <span className="absolute bottom-20 right-10 text-4xl anim-float-2 text-rooted-black/10">🐾</span>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-rooted-black mb-6 text-center">
          Events Calendar
        </h1>

        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="px-4 py-2 rounded-full bg-warm-ivory hover:bg-california-gold transition-colors">
            &larr;
          </button>
          <h2 className="font-playfair text-2xl font-bold text-rooted-black">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="px-4 py-2 rounded-full bg-warm-ivory hover:bg-california-gold transition-colors">
            &rarr;
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 bg-white p-4 rounded-2xl shadow-md border border-gray-100">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-xs sm:text-sm font-bold text-rooted-black/50 text-center py-2">{d}</div>
          ))}
          
          {calendarDays.map((day, i) => (
            <div key={i} className="aspect-square flex items-center justify-center relative">
              {day.empty ? (
                <div className="w-full h-full"></div>
              ) : (
                <motion.button
                  layoutId={day.dateStr}
                  onClick={() => {
                    if(day.hasEvents) {
                      setSelectedDateStr(day.dateStr);
                      setShowModal(true);
                    }
                  }}
                  className={`w-full h-full rounded-full text-base font-medium transition-all flex flex-col items-center justify-center ${day.hasEvents ? 'bg-california-gold/30 text-rooted-black hover:bg-california-gold hover:scale-105 cursor-pointer' : 'text-rooted-black/40 hover:bg-warm-ivory cursor-default'}`}
                >
                  {day.day}
                  {day.hasEvents && <span className="w-1 h-1 rounded-full bg-oakland-terracotta mt-1 block"></span>}
                </motion.button>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/" className="text-oakland-terracotta font-bold underline hover:text-sierra-sage transition-colors">Return Home</Link>
        </div>
      </div>

      {/* Animated Zoom Modal */}
      <AnimatePresence>
        {showModal && selectedDateStr && eventsMap[selectedDateStr] && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-rooted-black/50 backdrop-blur-sm" onClick={closeModal}>
            <motion.div 
              layoutId={selectedDateStr}
              onClick={(e) => e.stopPropagation()}
              className="bg-warm-ivory p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/20"
            >
              <h3 className="font-playfair text-2xl font-bold text-rooted-black mb-2">
                {new Date(selectedDateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>
              <div className="space-y-4 mt-2">
                {eventsMap[selectedDateStr].map((event, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-oakland-terracotta">
                    <h4 className="font-playfair text-lg font-bold text-rooted-black">{event.title}</h4>
                    <p className="text-sm text-oakland-terracotta font-medium mb-1">{event.time}</p>
                    <p className="text-rooted-black/70 text-sm">{event.desc}</p>
                  </div>
                ))}
              </div>
              <button onClick={closeModal} className="mt-6 w-full py-3 rounded-full bg-oakland-terracotta text-white font-bold hover:bg-sierra-sage transition-colors">
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
