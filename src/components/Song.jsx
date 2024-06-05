import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './Song.css';
import { Link } from 'react-router-dom';

export default function Song(props) {
  const music_list = useMemo(() => props.songData || [], [props.songData]);

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [totalDuration, setTotalDuration] = useState('00:00');
  const [seekPosition, setSeekPosition] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const curr_track = useRef(new Audio());
  const updateTimer = useRef(null);

  const reset = () => {
    setCurrentTime('00:00');
    setTotalDuration('00:00');
    setSeekPosition(0);
  };

  const loadTrack = useCallback((index) => {
    clearInterval(updateTimer.current);
    reset();

    curr_track.current.src = music_list[index].AudioUrl;
    curr_track.current.load();

    curr_track.current.addEventListener('canplaythrough', playTrack);

    document.querySelector('.track-name').textContent = music_list[index].Name;

    updateTimer.current = setInterval(setUpdate, 1000);

    curr_track.current.addEventListener('ended', nextTrack);
  }, [music_list]);

  const nextTrack = useCallback(() => {
    curr_track.current.removeEventListener('canplaythrough', playTrack);
    if (trackIndex < music_list.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  }, [trackIndex, music_list]);

  const randomTrack = () => {
    setIsRandom(!isRandom);
  };

  useEffect(() => {
    if (music_list.length > 0) {
      loadTrack(trackIndex);
    }

    const currentTrack = curr_track.current;
    return () => {
      clearInterval(updateTimer.current);
      currentTrack.pause();
      currentTrack.currentTime = 0;
      currentTrack.removeEventListener('canplaythrough', playTrack);
      currentTrack.removeEventListener('ended', nextTrack);
    };
  }, [trackIndex, music_list, loadTrack, nextTrack]);

  useEffect(() => {
    if (music_list.length > 0) {
      setTrackIndex(0);
    }
  }, [music_list]);

  const playTrack = () => {
    curr_track.current.play().then(() => {
      setIsPlaying(true);
      document.querySelector('.track-art').classList.add('rotate');
      document.getElementById('wave').classList.add('loader');
      document.querySelector('.playpause-track').innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
    }).catch(error => {
      console.error("Error attempting to play track:", error);
    });
  };

  const pauseTrack = () => {
    curr_track.current.pause();
    setIsPlaying(false);
    document.querySelector('.track-art').classList.remove('rotate');
    document.getElementById('wave').classList.remove('loader');
    document.querySelector('.playpause-track').innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
  };

  const prevTrack = () => {
    curr_track.current.removeEventListener('canplaythrough', playTrack);
    if (trackIndex > 0) {
      setTrackIndex(trackIndex - 1);
    } else {
      setTrackIndex(music_list.length - 1);
    }
  };

  const seekTo = (e) => {
    let seekto = curr_track.current.duration * (e.target.value / 100);
    curr_track.current.currentTime = seekto;
    setSeekPosition(e.target.value);
  };

  const setVolumeHandler = (e) => {
    curr_track.current.volume = e.target.value / 100;
    setVolume(e.target.value / 100);
  };

  const setUpdate = () => {
    if (!isNaN(curr_track.current.duration)) {
      let seekPosition = curr_track.current.currentTime * (100 / curr_track.current.duration);
      setSeekPosition(seekPosition);

      let currentMinutes = Math.floor(curr_track.current.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.current.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.current.duration / 60);
      let durationSeconds = Math.floor(curr_track.current.duration - durationMinutes * 60);

      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

      setCurrentTime(`${currentMinutes}:${currentSeconds}`);
      setTotalDuration(`${durationMinutes}:${durationSeconds}`);
    }
  };

  return (
    <div>
      <div className="seek bg-zinc-800">
        <input type="range" className="seek_slider" value={seekPosition} onChange={seekTo} />
      </div>
      <div className="player flex gap-10 justify-center items-center font-sans bg-zinc-800 text-indigo-100 w-screen p-4">
        {music_list.length > 0 ? (
          <>
            <div className='flex justify-center items-center'>
              <img className='track-art' src={music_list[trackIndex].imgUrl} alt="" height="100px" width="100px" />
            </div>
            <div className="track-name"></div>
            <div className="buttons gap-3">
              <button className="prev-track" onClick={prevTrack}><i className="bi bi-chevron-left "></i></button>
              <button className="playpause-track" onClick={isPlaying ? pauseTrack : playTrack}>
                <i className={`fa fa-${isPlaying ? 'pause' : 'play'}-circle fa-3x`}></i>
              </button>
              <button className="next-track" onClick={nextTrack}><i className="bi bi-chevron-right"></i></button>
            </div>
            <div className="volume relative">
              <button onClick={() => setShowVolumePopup(!showVolumePopup)}>
                <i className="fa fa-volume-up fa-2x"></i>
              </button>
              {showVolumePopup && (
                <div className="volume-popup">
                  <input type="range" className="volume_slider" value={volume * 100} onChange={setVolumeHandler} />
                </div>
              )}
            </div>
            <div id="wave"></div>
            <i className={`fa fa-random ${isRandom ? 'randomActive' : ''}`} onClick={randomTrack}></i>
            <div className='menu'>
            <i className="fa fa-ellipsis-v fa-2x" onClick={() => setShowDropdown(!showDropdown)}></i>
              {showDropdown && 
                 <Link to='playlist'> <div className="dropdown-menu active" >playlist</div> </Link>
              }
                </div>
            <div className="time-display">{currentTime}</div>
            <div className="time-display">{totalDuration}</div>
          </>
        ) : (
          <p>No song data available</p>
        )}
      </div>
    </div>
  );
}
