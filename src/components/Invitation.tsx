import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { weddingConfig } from '../weddingConfig';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// interface Wish {
//   name: string;
//   message: string;
// }

export default function Invitation() {
  const { couple, ceremony, reception, invitationMessage, closingMessage, storyPhotos, journey } =
    weddingConfig;

  const [time, setTime] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  // const [name, setName] = useState('');
  // const [guests, setGuests] = useState('1');
  // const [wishName, setWishName] = useState('');
  // const [wishMessage, setWishMessage] = useState('');
  // const [rsvpDone, setRsvpDone] = useState(false);
  // const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    // const stored = localStorage.getItem('wedding_wishes_v2');
    // if (stored) setWishes(JSON.parse(stored));

    const target = new Date(
      `${weddingConfig.countdownTarget.date}T${weddingConfig.countdownTarget.time}:00+05:30`
    );

    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // const submitRsvp = (event: FormEvent) => {
  //   event.preventDefault();
  //   if (!name.trim()) return;
  //   const records = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
  //   records.push({ name: name.trim(), guests, at: new Date().toISOString() });
  //   localStorage.setItem('wedding_rsvps', JSON.stringify(records));
  //   setRsvpDone(true);
  // };

  // const submitWish = (event: FormEvent) => {
  //   event.preventDefault();
  //   if (!wishName.trim() || !wishMessage.trim()) return;
  //   const next = [{ name: wishName.trim(), message: wishMessage.trim() }, ...wishes];
  //   setWishes(next);
  //   localStorage.setItem('wedding_wishes_v2', JSON.stringify(next));
  //   setWishName('');
  //   setWishMessage('');
  // };

  return (
    <div className="invite">
      <header className="hero-photo">
        <img src="/images/hero.jpeg" alt="The couple" />
        <div className="hero-caption">
          <h1>
            {couple.groom.shortName} &amp; {couple.bride.shortName}
          </h1>
          <p>
            {ceremony.day}, {ceremony.date}
          </p>
        </div>
      </header>

      <section className="section">
        <h2 className="section-title">Our Love Story</h2>
        <p className="section-sub">{invitationMessage}</p>
        <div className="story-grid">
          {storyPhotos.map((src) => (
            <img key={src} src={src} alt="A moment from our story" />
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 8 }}>
        <div className="couple-row">
          <div>
            <img className="avatar" src={couple.groom.photo} alt={couple.groom.name} />
            <p className="person-label">Groom</p>
            <h3 className="person-name">{couple.groom.name}</h3>
            <p className="person-note">{couple.groom.note}</p>
          </div>
          <div>
            <img className="avatar" src={couple.bride.photo} alt={couple.bride.name} />
            <p className="person-label">Bride</p>
            <h3 className="person-name">{couple.bride.name}</h3>
            <p className="person-note">{couple.bride.note}</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 8 }}>
        <div className="venue-photos">
          <img src={ceremony.image} alt={ceremony.venue} />
          <img src={reception.image} alt={reception.venue} />
        </div>
        <div className="event-cards">
          {[ceremony, reception].map((event) => (
            <article className="event-card" key={event.title}>
              <h3>{event.title}</h3>
              <p>
                {event.day}, {event.date}
                <br />
                {event.time}
                <br />
                {event.venue}
                <br />
                {event.location}
              </p>
              <a className="btn-light" href={event.mapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin size={14} />
                See Location
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="countdown">
        <h2>Counting Days</h2>
        <div className="countdown-row">
          <div className="time-block">
            <strong>{String(time.days).padStart(2, '0')}</strong>
            <span>Days</span>
          </div>
          <div className="time-block">
            <strong>{String(time.hours).padStart(2, '0')}</strong>
            <span>Hours</span>
          </div>
          <div className="time-block">
            <strong>{String(time.minutes).padStart(2, '0')}</strong>
            <span>Minutes</span>
          </div>
          <div className="time-block">
            <strong>{String(time.seconds).padStart(2, '0')}</strong>
            <span>Seconds</span>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Love Journey</h2>
        <p className="section-sub">A few quiet chapters before this day.</p>
        <div className="journey">
          {journey.map((item) => (
            <div className="journey-item" key={item.year}>
              <img src={item.photo} alt={item.title} />
              <h4>{item.title}</h4>
              <p>{item.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* <section className="section" style={{ paddingTop: 8 }}>
        <div className="forms">
          <form className="form-card" onSubmit={submitRsvp}>
            <h3>RSVP</h3>
            {rsvpDone ? (
              <p className="thanks">Thank you. We have your response.</p>
            ) : (
              <>
                <div className="field">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="field">
                  <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>
                <button className="btn-dark" type="submit">
                  Send RSVP
                </button>
              </>
            )}
          </form>

          <form className="form-card" onSubmit={submitWish}>
            <h3>Wishes</h3>
            <div className="field">
              <input
                value={wishName}
                onChange={(e) => setWishName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div className="field">
              <textarea
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                placeholder="Leave a wish for us"
                required
              />
            </div>
            <button className="btn-dark" type="submit">
              Send Wish
            </button>
            {wishes.length > 0 && (
              <div className="wishes-list" style={{ marginTop: 16 }}>
                {wishes.map((wish, index) => (
                  <div className="wish" key={`${wish.name}-${index}`}>
                    <strong>{wish.name}</strong>
                    <p>{wish.message}</p>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      </section> */}

      <footer className="site-footer">
        <img src="/images/footer.jpeg" alt="" />
        <div className="footer-copy">
          <h2>
            {couple.groom.shortName} &amp; {couple.bride.shortName}
          </h2>
          <p>{closingMessage}</p>
        </div>
      </footer>
    </div>
  );
}
