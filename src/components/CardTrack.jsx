import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import station from "../store/station";

const CardTrack = observer(({ id }) => {
  const [i, setId] = useState(1);
  const [dataTrack, setDataTrack] = useState("");
  const [dataChannel, setDataChannel] = useState("");

  const getStation = () => {
    console.log("Station!!", id);
    station.id = id;
    localStorage.setItem("idStation", id);
    station.nameStation = dataChannel.result.eng_name;
  };

  const setPlayer = () => {
    station.currentPlaying = dataTrack.result.short;
  };

  useEffect(() => {
    const x = fetch(`https://101.ru/api/channel/getTrackOnAir/${id}`)
      .then((response) => response.json())
      .then((data) => setDataTrack(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const x = fetch(`https://101.ru/api/channel/AboutChannel/${id}`)
      .then((response) => response.json())
      .then((data) => setDataChannel(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="p-6 max-w-[300px] mx-auto bg-slate-50 rounded-xl shadow-lg space-x-4">
        {dataChannel && (
          <p
            onClick={() => getStation()}
            className=" text-white bg-cyan-700 w-auto p-2 pt-1 pb-1 inline-block cursor-pointer rounded-xl"
          >
            {dataChannel.result.eng_name}
          </p>
        )}
        {dataTrack ? (
          <div>
            <p
              onClick={() => setPlayer()}
              className="sm:text-xl text-center text-slate-600 decoration-solid p-2 cursor-pointer hover:underline text-sm"
            >
              {dataTrack.result.short.title}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {dataTrack.result.short.album.albumTitle}
            </p>
            <img
              className="w-full rounded-xl"
              src={dataTrack.result.short.cover.cover400}
            ></img>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
});

export default CardTrack;
