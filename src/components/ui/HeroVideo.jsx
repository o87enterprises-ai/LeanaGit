import { useEffect, useRef, useState } from 'react';

// Drop the campaign video in at public/media/hero.mp4 and it plays automatically.
// Until then (or if a browser refuses to play it) the poster photo below carries
// the hero on its own — no blank screen, ever.
const VIDEO_SRC = '/media/hero.mp4';
const POSTER_SRC = '/images/kickoff.jpg';

export default function HeroVideo({ videoSrc = VIDEO_SRC, poster = POSTER_SRC }) {
  const videoRef = useRef(null);
  const [videoOk, setVideoOk] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // Some mobile browsers block autoplay even when muted; if play() is rejected
  // we stay on the poster rather than showing a frozen first frame.
  useEffect(() => {
    if (reduceMotion || !videoRef.current) return;
    const playPromise = videoRef.current.play();
    if (playPromise?.catch) playPromise.catch(() => setVideoOk(false));
  }, [reduceMotion, videoSrc]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-rooted-black">
      {/* Poster photo: the fallback, and what shows while the video buffers */}
      <img
        src={poster}
        alt="LeAna Powell with Oakland families and kids at a campaign kickoff"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
          videoOk ? 'opacity-0' : 'opacity-100'
        } ${reduceMotion ? '' : 'anim-slow-zoom'}`}
      />

      {!reduceMotion && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onPlaying={() => setVideoOk(true)}
          onError={() => setVideoOk(false)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
            videoOk ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Warm scrim keeps the headline readable over whatever is playing */}
      <div className="absolute inset-0 bg-gradient-to-b from-rooted-black/50 via-rooted-black/30 to-warm-ivory" />
      <div className="absolute inset-0 bg-oakland-terracotta/10 mix-blend-multiply" />
    </div>
  );
}
