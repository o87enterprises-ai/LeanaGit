# Hero video

The home page hero plays `public/media/hero.mp4` behind the headline.

**To swap the video:** drop your file in this folder named exactly `hero.mp4` and
redeploy. Nothing else to change.

Until that file exists — or on a browser that blocks autoplay, or for visitors
who have "reduce motion" turned on — the hero automatically falls back to the
campaign kickoff photo (`public/images/kickoff.jpg`), so the page never shows a
blank or frozen screen.

Tips for the file itself:

- **Format:** MP4 (H.264 + AAC). Web-safe everywhere.
- **Length:** 10–30 seconds, cut so it loops without a jarring jump.
- **Size:** aim under ~10 MB — it is the first thing every visitor downloads.
- **Audio:** it plays muted (browsers require that for autoplay), so don't rely
  on sound to tell the story.
- **Framing:** the video is cropped to fill the screen and the headline sits in
  the middle, so keep faces out of the dead center and away from the edges.

To use a different filename or poster image, pass props in
`src/pages/Home.jsx`:

```jsx
<HeroVideo videoSrc="/media/my-video.mp4" poster="/images/my-photo.jpg" />
```
