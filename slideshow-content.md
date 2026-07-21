// *Contextual info*
The goal of this project is to create a gorgeous slideshow presentation to commemorate the 20th of July, which is Colombia’s Independence Day, and to be displayed to students in a classroom. The slideshow will be projected in an Epson projector attached to the ceiling and which is mirroring the screen of an iPad pro device (Apple TV wireless screen mirroring) controlled by the teacher in landscape mode (which has a screen resolution of 2732 × 2048 pixels – 4:3 aspect ratio). This slideshow will be uploaded as a GitHub repo.

// *Local assets*
**School logo**
`assets/school-logo.png`
- Place in a corner on every scene (title, videos, quiz, congratulations). Keep it small and non-intrusive.

**National anthem audio (for “Solo audio” mode)**
`assets/Himno Nacional de la Republica de Colombia.mp3`
- Prefer this local MP3 for the listen-only control so playback works even if YouTube is slow/blocked.
- Keep the YouTube embed for “Ver video” mode.

// *Videos section*

**Fist, second and third grade video**
<iframe width="560" height="315" src="https://www.youtube.com/embed/8DaNSJifI60?si=rX1REUdiV6FbJ91G" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

**Fourth and fifth grade video**
<iframe width="560" height="315" src="https://www.youtube.com/embed/qjIiUdCGcrI?si=n0AWfvPNj67gv9BI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

**National anthem video**
<iframe width="560" height="315" src="https://www.youtube.com/embed/oBtJ--lICJg?si=BXTJBiXifCEhZB36" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

**Download link**
https://we.tl/t-eBE6kuL8CifgpSWF


// *Images section*

**Slideshow background image links**
https://images.unsplash.com/photo-1714686495394-73e2bb1bbd39?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

https://caracol.com.co/resizer/v2/2MUKDSYJT5GQFEZEGL4D377PBY.jpg?auth=d8c65fe198d8615f2fcb01df74ca95721c71dac5378ccf71ff2e2738415993de

https://images.pexels.com/photos/4011450/pexels-photo-4011450.jpeg

https://images.pexels.com/photos/38238660/pexels-photo-38238660.jpeg

https://images.pexels.com/photos/17413264/pexels-photo-17413264.jpeg


**First, second and third grade question images**

*Question 2 (options have images in them)*
*Option - flag*
https://spanishglory.com/wp-content/uploads/2024/09/spain-379535_1280-1024x768.jpg
*Option - hat*
https://mundodelganadero.com/cdn/shop/products/image_cfb3f664-edec-4994-8262-96bd24c282e4_1200x1200.heic?v=1650406282
*Option - flower vase*
https://raw.githubusercontent.com/JhamG9/api-viaja/refs/heads/main/uploads/museo-de-la-independencia-casa-del-florero/florero-de-llorente-museo.webp
*Option - sword*
https://i00.eu/img/602/1024x1024/43nal3sz/30452.jpg

*Question 3 - visual aid image*
https://www.superprof.co/blog/wp-content/uploads/2025/02/crioillos-dia-independencia.jpg

*Question 4 - visual aid image*
https://media.cnn.com/api/v1/images/stellar/prod/cnne-1423852-colombia-independence-anniversary.jpg?c=16x9&q=h_833,w_1480,c_fill

**Fourth and fifth grade question images**

*Question 1 - visual aid image*
https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/07/18192150/Florero-Guerra-Colombia-21.jpg

*Question 2 - visual aid image*
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqY-ohzgbbWTis99IbrkZ_ats7XPkHT0Q9qX75wId4SS4U_0YtyUidYaw&s=10

*Question 4 - visual aid image*
https://archivobogota.secretariageneral.gov.co/sites/default/files/Captura%20de%20pantalla%202018-02-16%20a%20la%28s%29%2010.38.43.png

*Question 5 - visual aid image*
https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Reyerta_del_20_de_julio_de_1810.jpg/960px-Reyerta_del_20_de_julio_de_1810.jpg



**# Quiz Format — Style & Animation Reference**

## 1. Color Palette

| Color | Usage |
|---|---|
| **Primary Red** | Intro background, question header banner |
| **Navy Blue** | Both circle *and* rectangle of option buttons (single tone, not two-tone) |
| **Cream / Off-white** | "PREGUNTA" text, question number, option text |
| **Yellow** | Logo text, tagline, image border, decorative corner blobs — **also used as quiz background per this spec** |
| **Green** | Horizontal timer/progress bar under the image |

## 2. Typography

| Role | Style description | Closest available font |
|---|---|---|
| Headers / Titles ("PREGUNTA," options, final answer) | Thick, rounded, bubble-style sans-serif | **Poppins Black** (or Baloo 2) — `[Likely]` visual match, not confirmed source font |
| Question text | Bold, clean sans-serif with outline/drop-shadow | **Poppins Bold** or **Nunito ExtraBold** — `[Guessing]` |

## 3. Scene Breakdown

### Scene 1: Intro / Question Number
- Full red background.
- Centered: "PREGUNTA" (cream) above large "N° [Number]" (cream, oversized).
- Yellow logo text + tagline beneath.
- Small outlined decorative shapes (circle, sunburst, diamond-with-triangles) scattered around, appearing to rotate or morph slightly across frames.
- **Entrance animation:** likely pop/scale-in based on general format conventions — `[Guessing]`, not directly confirmed by stills.

### Transition
- **Not a directional wipe.** A white spiral/coil shape unwinds and expands outward from the center, progressively revealing the white background beneath the red. `[Certain]`
- A yellow blob decoration enters from the bottom-left as the transition completes. `[Likely]`

### Scene 2: Question & Options
- Header: dark red banner, full width, bold outlined cream/white all-caps text.
- **Background: yellow** (per this spec).
- Left: landscape photo in a thick yellow-bordered frame.
- Right: three stacked pill-shaped buttons — navy circle (letter) fused to navy rectangle (answer text), cream text throughout.
- Option C appears truncated/off-screen in an early frame, then fully in position in a later one — consistent with slide-in-from-right, but exact stagger timing/easing is unconfirmed. `[Guessing on motion, certain on end-state]`
- A green horizontal bar appears beneath the image — likely a countdown/timer visual. `[Likely]`

### Scene 3: Answer Reveal
- Wrong answers (A, B) **shrink/scale down in place** — they remain visible but smaller, not an instant disappear. `[Certain]`
- Correct answer (C) **does not change color** — stays navy blue with cream text throughout. `[Certain]`
- Correct answer **stays on the right side** and scales up to become dominant — it does not slide to center-left. `[Certain]`
- The image on the left **remains visible** in the final frame — it does not fade out. `[Certain]`

## 4. Build Logic Summary

```
State 1: Mount Intro → shapes animate (pop/rotate, unconfirmed easing) → Wait ~2s → Trigger spiral transition
State 2: Mount Question Layout (yellow background) → Header + image in place → Options slide in from right (stagger unconfirmed) → Start timer, drive green progress bar
State 3: Timer ends → Wrong answers scale down in place (stay visible, don't vanish) → Correct answer scales up in place (position + color unchanged) → Image stays visible
```

## 5. Open Items (need more frames to confirm)
- Exact stagger delay between option A/B/C entrances
- Whether entrance has spring/overshoot
- Total duration per scene
- Whether wrong answers eventually disappear fully after shrinking
