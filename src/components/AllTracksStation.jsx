import { useEffect, useState } from "react";
import CardTrackOffline from "./CardTrackOffline";
import { observer } from "mobx-react-lite";
import station from "../store/station";
import { Input, Space } from "antd";

const { Search } = Input;

const AllTracksStation = observer(() => {
  const [trackData, setTrackData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTracks, setShowTracks] = useState(0);
  const [shownCurrentTracks, setShownCurrentTracks] = useState([]);

  const handleRemoveOne = () => {
    console.log(station.currentPlaying.mdbUidTrack);
  };

  const onSearch = (value, _e, info) => {
    const x = trackData;
    if (value.length === 0) {
      console.log(value.length, "!!");
      // setTrackData(x);
    }
    // console.log(x);
    const resultSearch = [];
    const wordsSearch = value.toLowerCase().split(" ");
    // console.log(wordsSearch);
    trackData.map((item) => {
      const wordsTrack = item.title.toLowerCase().split(" ");
      const filteredArray = wordsSearch.filter((val) =>
        wordsTrack.includes(val)
      );

      if (filteredArray.length !== 0) {
        console.log(item.title);
        resultSearch.push(item);
      }
      // console.log(filteredArray);
    });

    setTrackData(resultSearch);
    setShowTracks(resultSearch.length);
    // setTrackData(trackData);
  };

  const shuffleTracks = () => {
    setTrackData(trackData.sort(() => Math.random() - 0.5));
    setShowTracks(showTracks + 1);
  };

  const reverseTracks = () => {
    setTrackData(trackData.reverse());
    setShowTracks(showTracks + 1);
  };

  const handleloading = () => {
    setShowTracks(showTracks + 50);
  };

  useEffect(() => {
    let removedTracks = JSON.parse(localStorage.getItem("removedTracks")) || [];
    const idStation = localStorage.getItem("idStation") || 74;
    const JsonStation = {
      1: "80x",
      74: "eurodance",
      79: "cyber_space",
      151: "rave",
    };
    const nameJsonStation = JsonStation[idStation];

    fetch(
      `https://raw.githubusercontent.com/Darkink69/selenium_101ru/main/db101_${nameJsonStation}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        const tracks = [];
        data.tracks.map((i) => {
          const keyTrack = Object.keys(i)[0];
          if (!removedTracks.includes(i[keyTrack].mdbUidTrack)) {
            tracks.push(i[keyTrack]);
          }
          setTrackData(tracks);
          // handleRemoveOne();
          setShowTracks(50);
          setIsLoaded(true);
        });
      })
      .catch((error) => console.error(error));
  }, [station.nameStation, station.id, isLoaded]);

  useEffect(() => {
    setShownCurrentTracks(trackData?.slice(0, showTracks));
  }, [showTracks]);

  useEffect(() => {
    setTrackData(
      trackData?.filter((item) => item.mdbUidTrack !== station.lastRemovedTrack)
    );
    setShowTracks(showTracks - 1);
  }, [station.lastRemovedTrack]);

  useEffect(() => {
    setShowTracks(showTracks - 1);
  }, [station.nameStation]);

  return (
    <>
      <button onClick={() => doIt()}>КНОПКА</button>
      <button onClick={() => handleRemoveOne()}>КНОПКА2</button>
      <h1 className="font-mono text-xl text-center text-slate-600 decoration-solid pt-8 pb-4">
        Все треки радиостанции «{station.nameStation}»
      </h1>
      <button
        className="px-4 py-2 text-center font-semibold text-sm bg-sky-500 text-white rounded-md shadow-sm opacity-100"
        onClick={() => shuffleTracks()}
      >
        Перемешать
      </button>

      <button
        className="px-4 py-2 ml-2 text-center font-semibold text-sm bg-sky-500 text-white rounded-md shadow-sm opacity-100"
        onClick={() => reverseTracks()}
      >
        Развернуть
      </button>

      <Search
        className="pl-4"
        placeholder="Поиск треков"
        onSearch={onSearch}
        style={{ width: 200 }}
        allowClear={true}
      />

      {/* <button
        className="px-4 py-2 ml-2 text-center font-semibold text-sm bg-sky-500 text-white rounded-md shadow-sm opacity-100"
        onClick={() => reverseTracks()}
      >
        Сбросить
      </button> */}

      <div className="grid sm:grid-cols-5 grid-cols-2 gap-4 pt-4">
        {isLoaded ? (
          shownCurrentTracks?.map((item) => {
            return <CardTrackOffline data={item} key={item.mdbUidTrack} />;
          })
        ) : (
          <p className="font-mono text-center text-slate-600 decoration-solid">
            Загрузка...
          </p>
        )}
      </div>
      <button
        className="px-4 py-2 text-center font-semibold text-sm bg-sky-500 text-white rounded-md shadow-sm opacity-100"
        onClick={() => handleloading()}
      >
        Показать еще
      </button>
    </>
  );
});

export default AllTracksStation;
