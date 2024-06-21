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

  const resetSearch = () => {
    setTrackData(station.jsonData);
    setShowTracks(50);
    setIsLoaded(true);
  };

  const onSearch = (value, _e, info) => {
    // if (value.length === 0) {
    //   console.log(value.length, "!!");
    //   setTrackData(station.jsonData);
    //   setShowTracks(50);
    //   setIsLoaded(true);
    // }

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
    });

    setTrackData(resultSearch);
    setShowTracks(resultSearch.length);
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
    station.fetchJsonData();
  }, [station.nameStation]);

  useEffect(() => {
    setTrackData(station.jsonData);
    setShowTracks(50);
    setIsLoaded(true);
  }, [station.jsonData]);

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
      <button onClick={() => station.x()}>КНОПКА2</button>
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
        // allowClear={true}
      />

      <button
        className="px-4 py-2 ml-2 text-center font-semibold text-sm text-slate-600"
        onClick={() => resetSearch()}
      >
        Сбросить
      </button>

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
