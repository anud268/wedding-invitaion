import { useEffect, useRef, useState } from 'react';
// import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // return (
    // <>
    //   <audio
    //     ref={audioRef}
    //     src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    //     loop
    //     preload="auto"
    //   />
    //   <button
    //     type="button"
    //     className="audio-toggle-btn"
    //     onClick={() => setIsPlaying((value) => !value)}
    //     aria-label={isPlaying ? 'Mute music' : 'Play music'}
    //   >
    //     {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
    //   </button>
    // </>
  // );
}
