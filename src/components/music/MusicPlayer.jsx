
import { useEffect, useRef, useState } from 'react';
import './MusicPlayer.css';

const playlist = [
  {
    title: 'Our Little Sunshine',
    artist: 'A song just for you, Harry 💛',
    src: '/music/birthday-song.mp3',
  },
];

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

export default function MusicPlayer() {
  const audioRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState('');

  const track = playlist[currentTrack];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    setError('');

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
        setError('Unable to play the song. Check your MP3 file.');
      }
    } else {
      audio.pause();
    }
  }

  async function changeTrack(index) {
    if (index < 0 || index >= playlist.length) return;

    const audio = audioRef.current;
    if (!audio) return;

    const shouldResume = !audio.paused;

    setError('');
    setCurrentTime(0);
    setDuration(0);
    setCurrentTrack(index);

    if (index === currentTrack) {
      audio.currentTime = 0;

      if (shouldResume) {
        try {
          await audio.play();
        } catch {
          setError('Unable to play the song.');
        }
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function handleSeek(event) {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;

    const time = Number(event.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  }

  function handleEnded() {
    if (currentTrack < playlist.length - 1) {
      changeTrack(currentTrack + 1);
    } else {
      setIsPlaying(false);
      setCurrentTime(duration);
    }
  }

  return (
    <section className="music-card" id="music-player">
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
        onLoadedMetadata={(event) =>
          setDuration(event.currentTarget.duration)
        }
        onDurationChange={(event) =>
          setDuration(event.currentTarget.duration || 0)
        }
        onPlay={() => {
          setIsPlaying(true);
          setError('');
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        onError={() => {
          setIsPlaying(false);
          setError('Music file not found. Add your MP3 to public/music/.');
        }}
      />

      <div className="music-card-header">
        <div>
          <span className="music-kicker">
            A LITTLE MOMENT OF MAGIC
          </span>
          <h2>Our Little Playlist 💛</h2>
          <p>A melody to make you smile, Harry 🦋</p>
        </div>

        <div className={`music-sun-icon ${isPlaying ? 'is-playing' : ''}`}>
          ☀️
        </div>
      </div>

      <div className="music-card-content">
        <div className={`music-album-art ${isPlaying ? 'is-playing' : ''}`}>
          <span className="music-big-sun">☀️</span>
          <span className="music-butterfly">🦋</span>
          <span className="music-tiny-heart">♥</span>
        </div>

        <div className="music-player-details">
          <div className="music-track-info">
            <span className="music-now-playing">
              {isPlaying ? '♫ NOW PLAYING' : '♪ MADE FOR YOU'}
            </span>
            <h3>{track.title}</h3>
            <p>{track.artist}</p>
          </div>

          <div className="music-progress">
            <input
              type="range"
              aria-label="Song progress"
              min="0"
              max={duration || 1}
              step="0.1"
              value={Math.min(currentTime, duration || 1)}
              onChange={handleSeek}
              style={{
                '--progress': `${
                  duration ? (currentTime / duration) * 100 : 0
                }%`,
              }}
            />

            <div className="music-time">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="music-controls">
            <button
              type="button"
              className="music-skip-button"
              onClick={() =>
                changeTrack(Math.max(0, currentTrack - 1))
              }
              disabled={currentTrack === 0}
              aria-label="Previous song"
            >
              |◀
            </button>

            <button
              type="button"
              className="music-play-button"
              onClick={togglePlayback}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? 'Ⅱ' : '▶'}
            </button>

            <button
              type="button"
              className="music-skip-button"
              onClick={() =>
                changeTrack(
                  Math.min(playlist.length - 1, currentTrack + 1)
                )
              }
              disabled={currentTrack === playlist.length - 1}
              aria-label="Next song"
            >
              ▶|
            </button>
          </div>
        </div>
      </div>

      <div className="music-volume-row">
        <button
          type="button"
          className="music-mute-button"
          onClick={() => setIsMuted((previous) => !previous)}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted || volume === 0 ? '🔇' : '🔊'}
        </button>

        <input
          type="range"
          aria-label="Music volume"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
        />

        <span>🦋</span>
      </div>

      {error && (
        <p className="music-error" role="status">
          {error}
        </p>
      )}

      <div className="music-card-footer">
        <span>♡</span>
        Every song holds a little sunshine
        <span>♡</span>
      </div>
    </section>
  );
}
