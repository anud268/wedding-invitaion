import { weddingConfig } from '../weddingConfig';

interface CoverProps {
  onOpen: () => void;
}

export default function Cover({ onOpen }: CoverProps) {
  const { couple, ceremony } = weddingConfig;

  return (
    <section className="cover">
      <div className="cover-photo">
        <img src="/images/cover.png" alt={`${couple.groom.shortName} and ${couple.bride.shortName}`} />
        <p className="cover-date">
          {ceremony.day}, {ceremony.date}
        </p>
      </div>
      <div className="cover-panel">
        <p className="cover-dear">Dear</p>
        <h1 className="cover-names">
          {couple.groom.title} {couple.groom.name} &amp; {couple.bride.title} {couple.bride.name}
        </h1>
        <p className="cover-place">at Guruvayoor</p>
        <button type="button" className="btn-dark" onClick={onOpen}>
          Open Invitation
        </button>
      </div>
    </section>
  );
}
