// Endorsement flyers — the shareable graphics the campaign posts to social.
// Each has a square poster image and, in most cases, a short video clip that
// plays when the flyer is tapped.
//
// Files live in public/flyers/ as <slug>.jpg and <slug>.mp4. To add one:
//   1. Upload <slug>.jpg (and optional <slug>.mp4) to public/flyers/
//   2. Add a line below with the same slug and the person's name.
// Leave `image: false` if there is only a video, `video: false` if only an image.
//
// Order here is the order shown on the page; it mirrors the endorsements list.

export const flyers = [
  { slug: 'nate-miley',       name: 'Nate Miley' },
  { slug: 'cesar-cruz',       name: 'Dr. César Cruz' },
  { slug: 'patrice-berry',    name: 'Patrice Berry' },
  { slug: 'mike-hutchinson',  name: 'Mike Hutchinson', image: false },
  { slug: 'shanthi-gonzales', name: 'Shanthi Gonzales' },
  { slug: 'sam-davis',        name: 'Sam Davis' },
  { slug: 'jorge-lerma',      name: 'Jorge Lerma' },
  { slug: 'mya-whitaker',     name: 'Mya Whitaker' },
  { slug: 'luan-huynh',       name: 'Luan Huynh' },
  { slug: 'jt-mates-muchin',  name: 'JT Mates-Muchin' },
  { slug: 'hector-salazar',   name: 'Hector Salazar' },
  { slug: 'john-jones',       name: 'John Jones III' },
  { slug: 'silvia-guzman',    name: 'Silvia Guzmán' },
  { slug: 'cynthia-adams',    name: 'Cynthia Adams' },
  { slug: 'jerry-wolfe',      name: 'Jerry Wolfe' },
  { slug: 'odiaka-gonzalez',  name: 'Odiaka Gonzalez' },
  { slug: 'andrea-dawson',    name: 'Andrea Dawson' },
  { slug: 'sheila-haynes',    name: 'Sheila Haynes' },
  {
    slug: 'madres-lideres',
    name: 'María Jiménez, Laura Ochoa & Cecilia Rodríguez',
    nameEs: 'María Jiménez, Laura Ochoa y Cecilia Rodríguez',
  },
].map((f) => ({
  image: true,
  video: true,
  ...f,
  imageSrc: f.image === false ? null : `/flyers/${f.slug}.jpg`,
  videoSrc: f.video === false ? null : `/flyers/${f.slug}.mp4`,
}));
