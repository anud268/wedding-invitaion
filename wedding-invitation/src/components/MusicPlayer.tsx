import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Traditional Carnatic Flute or serene wedding instrumental music
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"; // High quality soothing track

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />
      <button 
        onClick={togglePlay}
        className="audio-toggle-btn"
        title={isPlaying ? "Mute Music" : "Play Music"}
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <Volume2 size={22} className="animate-pulse" />
        ) : (
          <VolumeX size={22} />
        )}
      </button>
    </>
  );
}
