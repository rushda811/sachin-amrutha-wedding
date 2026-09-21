import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { CalendarPlus, Check, MapPin, Music2, Pause, Play, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import portrait from "@/assets/amrutha-sachin-cover.jpeg";
import detail from "@/assets/wedding-detail.jpeg";
import walk from "@/assets/countryside-walk.jpeg";
import gardenWalk from "@/assets/gallery-garden-walk.jpeg";
import bouquet from "@/assets/gallery-bouquet.jpeg";
import laughter from "@/assets/gallery-laughter.jpeg";
import stationery from "@/assets/gallery-stationery.jpeg";
import estate from "@/assets/gallery-estate.jpeg";
import paper from "@/assets/paper.webp";
import frame from "@/assets/frame-avatar.webp";
import house from "@/assets/house-background.webp";
import flower from "@/assets/flower.webp";
import rose from "@/assets/rose.png";
import leaf from "@/assets/leaf-background.webp";
import music from "@/assets/yt-915f7a0b-a1c.mp3";

export const Route = createFileRoute("/")({
head: () => ({
  meta: [
    { title: "Amrutha & Sachin | Wedding Invitation" },
    { name: "description", content: "Join Amrutha and Sachin for their wedding celebrations in October 2026." },
    { property: "og:title", content: "Amrutha & Sachin | Wedding Invitation" },
    { property: "og:description", content: "A celebration of love — 22 & 24 October 2026." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
}),
component: Invitation,
});

const eventDate = new Date("2026-10-22T16:28:00+05:30").getTime();
const calendarDays = [
  ...Array.from({ length: 4 }, () => null),
  ...Array.from({ length: 31 }, (_, index) => index + 1),
];

type Wish = { name: string; message: string };

const galleryPhotos = [
  {
    src: gardenWalk,
    alt: "The couple walking together beside a heritage garden",
  },
  {
    src: bouquet,
    alt: "An ivory bridal bouquet and heirloom jewellery",
  },
  {
    src: laughter,
    alt: "The couple sharing a quiet moment beneath garden trees",
  },
  {
    src: detail,
    alt: "Handcrafted wedding details with flowers",
  },
  {
    src: walk,
    alt: "The couple walking through a wildflower meadow",
  },
  {
    src: stationery,
    alt: "Ivory wedding stationery with dried botanicals",
  },
  {
    src: portrait,
    alt: "Amrutha and Sachin together",
  },
  {
    src: estate,
    alt: "The newlyweds walking toward a countryside estate",
  },
];

function BotanicalRule() {
  return (
    <div className="botanical-rule" aria-hidden="true">
      <span />
      <img src={leaf} alt="" />
      <b>❦</b>
      <img src={leaf} alt="" />
      <span />
    </div>
  );
}

function PhotoFrame({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "polaroid polaroid-compact" : "polaroid"}>
      <img className="polaroid-photo" src={portrait} alt="Amrutha and Sachin together in a countryside garden" width={1024} height={1408} />
      <img className="polaroid-overlay" src={frame} alt="" />
    </div>
  );
}

function Opening({ onOpen }: { onOpen: () => void }) {
  const [celebrating, setCelebrating] = useState(false);
const beginOpening = () => {
  if (celebrating) return;

  setCelebrating(true);

  window.setTimeout(() => {
    onOpen();
  }, 850);
};
  return (
    <div className={celebrating ? "opening is-celebrating" : "opening"} aria-label="Wedding invitation cover">
<div className="petals" aria-hidden="true">
  {Array.from({ length: 24 }, (_, index) => (
    <i
      key={index}
      style={
        {
          "--i": index,
          "--delay": `${(index * 0.37) % 6}s`,
          "--duration": `${11 + ((index * 1.13) % 7)}s`,
          "--left": `${(index * 37) % 108 - 4}%`,
          "--size": `${10 + ((index * 7) % 9)}px`,
          "--rotate": `${(index * 47) % 360}deg`,
        } as CSSProperties
      }
    />
  ))}
</div>
<div className="celebration-burst" aria-hidden="true">
  {Array.from({ length: 32 }, (_, index) => (
    <i
      key={index}
      style={{ "--i": index } as CSSProperties}
    />
  ))}
</div>
      <div className="opening-card">
        <img className="opening-leaf opening-leaf-left" src={leaf} alt="" />
        <img className="opening-flower" src={flower} alt="" />
        <p className="eyebrow">Together with their families</p>
        <h1>Amrutha <em>&</em> Sachin</h1>
        <BotanicalRule />
        <p className="opening-date">October 22, 2026</p>
        <p className="script-line">Cordially Invites</p>
<Button className="open-button" onClick={beginOpening} disabled={celebrating}>
  Open
</Button>
      </div>
    </div>
  );
}

function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const remaining = Math.max(0, eventDate - now);
  const units = [
    [Math.floor(remaining / 86400000), "Days"],
    [Math.floor((remaining / 3600000) % 24), "Hours"],
    [Math.floor((remaining / 60000) % 60), "Minutes"],
    [Math.floor((remaining / 1000) % 60), "Seconds"],
  ];
  return (
    <div className="countdown" aria-label="Countdown to the reception">
      {units.map(([value, label]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}
    </div>
  );
}

function RsvpForm() {
  const [sent, setSent] = useState(false);
  return sent ? (
    <div className="form-success"><Check aria-hidden="true" /><h3>Thank you</h3><p>Your reply has been noted with love.</p></div>
  ) : (
    <form className="editorial-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
      <label>Guest name<Input required name="name" placeholder="Your full name" /></label>
      <fieldset><legend>Will you attend?</legend><div className="radio-row"><label><input required type="radio" name="attendance" value="yes" /> Joyfully accepts</label><label><input type="radio" name="attendance" value="no" /> Regretfully declines</label></div></fieldset>
      <label>Number of guests<Input required name="guests" type="number" min="1" max="8" defaultValue="1" /></label>
      <label>A note for us<Textarea name="note" placeholder="Dietary needs or a small note" /></label>
      <Button type="submit" className="ink-button">Send reply</Button>
    </form>
  );
}

function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("amrutha-sachin-wishes");
      if (stored) {
        const saved = JSON.parse(stored) as Wish[];
        const genuine = saved.filter((wish) => wish.name !== "Anjali & Arun" && wish.name !== "The Menon Family");
        setWishes(genuine);
        if (genuine.length !== saved.length) window.localStorage.setItem("amrutha-sachin-wishes", JSON.stringify(genuine));
      }
    } catch { /* Start with a clean guestbook when storage is unavailable. */ }
  }, []);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next = [...wishes, { name: String(form.get("name")), message: String(form.get("message")) }];
    setWishes(next);
    window.localStorage.setItem("amrutha-sachin-wishes", JSON.stringify(next));
    event.currentTarget.reset();
    setSent(true);
    window.setTimeout(() => setSent(false), 2200);
  }
  return (
    <section className="section guestbook">
      <p className="eyebrow">Letters from loved ones</p><h2>Guestbook</h2>
      {wishes.length > 0 && <div className="wish-list">{wishes.slice(-3).reverse().map((wish, index) => <blockquote key={`${wish.name}-${index}`}><p>“{wish.message}”</p><cite>— {wish.name}</cite></blockquote>)}</div>}
      <form className="editorial-form" onSubmit={submit}>
        <label>Name<Input required name="name" placeholder="Your name" /></label>
        <label>Your wishes<Textarea required name="message" placeholder="Write a few heartfelt words" /></label>
        <Button type="submit" className="ink-button"><Send />{sent ? "Sent with love" : "Send wishes"}</Button>
      </form>
    </section>
  );
}

function MusicPlayer({ active }: { active: boolean }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!active || !audio.current) return;
    audio.current.volume = 0.45;
    audio.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [active]);
  const toggle = () => {
    if (!audio.current) return;
    if (playing) audio.current.pause(); else void audio.current.play();
    setPlaying(!playing);
  };
  return (
    <div className="music-player">
      <audio ref={audio} src={music} loop />
      <Button size="icon" variant="ghost" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>{playing ? <Pause /> : <Play />}</Button>
      <div className={playing ? "wave is-playing" : "wave"} aria-hidden="true">{Array.from({ length: 4 }, (_, i) => <i key={i} />)}</div>
      <span>Our song</span>
    </div>
  );
}
function WeddingTimeline() {
  const events = [
    {
      date: "22",
      month: "OCTOBER",
      title: "Bride's Reception",
      time: "3:00 PM",
      detail: "At Our Residence",
      side: "left",
    },
    {
      date: "23",
      month: "OCTOBER",
      title: "Mullappoo Kalyanam",
      time: "Celebration",
      detail: "A beautiful tradition before the wedding",
      side: "right",
    },
    {
      date: "24",
      month: "OCTOBER",
      title: "Intimate Wedding",
      time: "Muhurtham · 12:10 – 12:50 PM",
      detail: "Cascadia Resort · Family & Friends",
      side: "left",
    },
    {
      date: "25",
      month: "OCTOBER",
      title: "Groom's Reception",
      time: "Reception",
      detail: "A celebration at Groom's Residence",
      side: "right",
    },
  ];

  return (
    <section className="section wedding-timeline">
      <div className="timeline-heading">
        <p className="eyebrow">Four days · One beautiful beginning</p>
        <h2>Our wedding days</h2>
        <BotanicalRule />
        <p className="timeline-intro">
          From the first celebration to the moment we say “I do,” we would love
          to have you with us through every chapter.
        </p>
      </div>

      <div className="timeline">
        <div className="timeline-line" aria-hidden="true" />

        {events.map((event) => (
          <div
            className={`timeline-event timeline-event-${event.side}`}
            key={`${event.date}-${event.title}`}
          >
  <div className="timeline-marker">
  <img src={rose} alt="" />
</div>

            <div className="timeline-card">
              <span className="timeline-month">{event.month}</span>
              <h3>{event.title}</h3>
              <p className="timeline-time">{event.time}</p>
              <p className="timeline-detail">{event.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function DressCode() {
  const colors = [
    "#FFD6D6",
    "#FFC8C8",
    "#FFBABA",
    "#FFAFAF",
    "#FFE3C6",
    "#FFD6AE",
    "#FFCC99",
    "#FFDA87",
    "#FFEB99",
    "#FFF2B5",
    "#F6F4D0",
    "#E4F7BF",
    "#CFF3A8",
    "#BFE7C6",
    "#A9E3BF",
    "#8EDFD1",
    "#A2E4E2",
    "#B3E9EE",
    "#C1ECF8",
    "#D0F0FF",
    "#D6E2FF",
    "#C8CEFF",
    "#B9B8FF",
    "#D8C1FF",
    "#E6CCFF",
    "#F4D6FF",
    "#FFD9F2",
    "#FFC8E1",
    "#FFB2CE",
    "#FFA3C0",
    "#FF9EB7",
    "#FF99AE",
  ];

  return (
    <section className="section dress-code">
      <p className="eyebrow">22 October · Bride's Reception</p>

      <h2>Dress Code</h2>

      <BotanicalRule />

      <div className="dress-code-card">
        <span className="dress-code-label">The colour palette</span>

        <h3>Soft, joyful & elegant</h3>

        <p>
          We invite you to celebrate with us in soft, festive colours.
          Feel free to choose any shade from the palette below and make
          it your own.
        </p>

        <div className="dress-palette" aria-label="Dress code colour palette">
          {colors.map((color) => (
            <span
              key={color}
              className="dress-color"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        <div className="dress-code-line" />

        <span className="dress-code-note">
          Pastels · Florals · Soft festive tones
        </span>
      </div>
    </section>
  );
}
function Invitation() {
  const [opened, setOpened] = useState(false);
  const googleCalendar = useMemo(() => {
    const query = new URLSearchParams({ action: "TEMPLATE", text: "Amrutha & Sachin’s Wedding Reception", dates: "20261022T105800Z/20261022T135800Z", details: "Join us as we celebrate Amrutha and Sachin.", location: "Kottaramukk, Kerala, India" });
    return `https://calendar.google.com/calendar/render?${query}`;
  }, []);
  return (
    <main className="app-shell">
<div className={opened ? "opening-wrap is-opened" : "opening-wrap"}>
  <Opening onOpen={() => setOpened(true)} />
</div>      <MusicPlayer active={opened} />
      <article className="invitation" style={{ backgroundImage: `url(${paper})`, "--flower-art": `url(${flower})`, "--leaf-art": `url(${leaf})` } as CSSProperties}>
        <section className="hero section">
          <img className="hero-leaf" src={leaf} alt="" />
          <p className="eyebrow">The wedding of</p><h1>Amrutha <em>&</em> Sachin</h1>
          <div className="hero-portrait">
            <img className="hero-house" src={house} alt="" />
            <img className="hero-flower" src={flower} alt="" />
            <PhotoFrame />
          </div>
        </section>

        <section className="section ceremony stationery-card">
          <img className="card-botanical card-botanical-left" src={flower} alt="" />
          <img className="card-botanical card-botanical-right" src={leaf} alt="" />
          <p className="eyebrow">Ceremony info</p><h2>With joyful hearts</h2><BotanicalRule />
          <div className="parents"><p><strong>Mr. & Mrs. Radhakrishnan</strong><small>Radhakrishnan & Chandrika<br />Melekoyiloth, Kottaramukk, Balussery</small></p><span>&</span><p><strong>Mr. & Mrs. Raveendran</strong><small>Raveendran & Vilasini<br />Sini Nivas, Punnad, Iritty</small></p></div>
          <p className="announcement">In the presence of God, we joyfully announce the wedding of our children</p>
          <div className="couple-names"><span>Amrutha</span><em>&</em><span>Sachin</span></div>
               </section>

        <WeddingTimeline />
<DressCode />
        <section className="section gallery">
          <p className="eyebrow">A little of our story</p><h2>Us, in quiet moments</h2>
          <div className="photo-grid">
{galleryPhotos.map((photo) => (
  <figure key={photo.src}>
    <img loading="lazy" src={photo.src} alt={photo.alt} />
  </figure>
))}          </div>
        </section>

        <div className="celebration-card stationery-card">
          <img className="card-botanical celebration-botanical" src={leaf} alt="" />
          <section className="section reception">
            <p className="eyebrow">Reception info</p><h2>Come celebrate with us</h2>
            <div className="reception-date"><span>Thursday</span><strong>22</strong><span>October<br />2026</span></div>
            <p className="reception-time">from <strong>3:00 pm at Our Residence</strong></p><Countdown />
          </section>

          <section className="section calendar-section">
            <p className="eyebrow">Save our date</p><h2>October 2026</h2>
            <div className="calendar"><div className="weekdays">{"SMTWTFS".split("").map((day, i) => <span key={`${day}-${i}`}>{day}</span>)}</div><div className="dates">{calendarDays.map((day, index) => <span className={day === 22 ? "chosen" : ""} key={`${day}-${index}`}>{day === 22 && <svg viewBox="0 0 48 44" aria-hidden="true"><path d="M24 40C17 34 5 25 5 14.5 5 7 14 3 20 8l4 4 4-4c6-5 15-1 15 6.5C43 25 31 34 24 40Z" /></svg>}<b>{day}</b></span>)}</div></div>
            <Button asChild variant="outline" className="outline-button"><a href={googleCalendar} target="_blank" rel="noreferrer"><CalendarPlus />Add to calendar</a></Button>
            
          </section>
        </div>

        <section className="section venue">
          <p className="eyebrow">Wedding reception venue</p><h2>Kottaramukk</h2>
          <img className="venue-house" loading="lazy" src={house} alt="Watercolour illustration of the wedding venue" />
          <div className="venue-details"><MapPin aria-hidden="true" /><div><strong>At my Residence</strong><span>Kottaramukk, Kerala, India</span></div></div>
          <Button asChild variant="outline" className="outline-button"><a href="https://maps.app.goo.gl/ja1bNUAQe6F4ndjTA" target="_blank" rel="noreferrer"><MapPin />Get directions</a></Button>
        </section>
<section className="section blessings-note">
  <p className="eyebrow">A note to our loved ones</p>

  <h2>Your blessings mean the world to us</h2>

  <BotanicalRule />

  <p className="blessings-text">
    With our loved ones by our side, we seek your presence, prayers and
    blessings as we begin this beautiful journey together.
  </p>
</section>
        <Guestbook />
        <footer><img src={flower} alt="" /><p>Your presence would be the greatest gift<br />we could receive!</p><BotanicalRule /><h2>Amrutha <em>&</em> Sachin</h2><span>22 · 10 · 2026</span></footer>
      </article>
    </main>
  );
}