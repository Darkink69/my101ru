import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import station from "../store/station";

const Player = observer(() => {
  const timerIdRef = useRef(null);

  useEffect(() => {
    if (station.currentPlaying !== undefined) {
      localStorage.setItem(
        "currentPlaying",
        JSON.stringify(station.currentPlaying)
      );
    }

    document.title = `${station.currentPlaying?.title}`;

    console.log("timer on", station.currentPlaying?.duration);

    timerIdRef.current = setTimeout(() => {
      console.log("timer off!");
      station.nextTrack();
    }, station.currentPlaying?.duration * 1000 + 5000);
    return () => {
      timerIdRef.current && clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
      console.log("timer clear?");
    };
  }, [station.currentPlaying]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 h-[50px] w-full shadow-xl bg-sky-800 text-black">
      <div className="flex items-center justify-evenly">
        <img
          className="w-50 rounded-xl"
          src={station.currentPlaying?.cover.cover50}
        ></img>
        <p className="text-white">{station.currentPlaying?.title}</p>
        <audio
          controls
          autoPlay
          src={station.currentPlaying?.audiofile}
        ></audio>
        {/* <p>{station.currentPlaying?.duration}</p> */}
        <button onClick={() => station.nextTrack()} className="text-white">
          Вперед
        </button>
        <button onClick={() => station.addFavorite()} className="text-white">
          Добавить в любимые
        </button>

        <button onClick={() => (station.id = 151)}>
          Тут будет настоящий плеер
        </button>
      </div>
    </div>
  );
});

export default Player;
