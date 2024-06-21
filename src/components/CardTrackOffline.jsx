import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import station from "../store/station";
import { CloseCircleOutlined } from "@ant-design/icons";

const CardTrackOffline = observer(({ data }) => {
  const removeTrack = () => {
    console.log("Remove!", data.mdbUidTrack);
    station.lastRemovedTrack = data.mdbUidTrack;
    let removedTracks = JSON.parse(localStorage.getItem("removedTracks")) || [];
    removedTracks.push(data.mdbUidTrack);
    localStorage.setItem("removedTracks", JSON.stringify(removedTracks));
  };

  const setPlayer = () => {
    console.log(data);
    station.currentPlaying = data;
  };

  return (
    <>
      <div className="p-6 max-w-[300px] mx-auto bg-white rounded-xl shadow-lg space-x-4">
        {data && (
          <div className="flex flex-col items-end">
            <CloseCircleOutlined
              className="relative top-0 right-0"
              onClick={() => removeTrack()}
              style={{ color: "#b7b7b7", fontSize: "28px", textAlign: "end" }}
            />
            <p
              onClick={() => setPlayer()}
              className="sm:text-xl text-center text-slate-600 cursor-pointer decoration-solid p-2 hover:underline text-sm"
            >
              {data.title}
            </p>

            <p className="mt-2 text-sm text-center text-slate-600">
              {data.album.albumTitle}
            </p>
            <img className="w-full rounded-xl" src={data.cover.cover400}></img>
            {/* <p>{data.mdbUidTrack}</p> */}
            {/* <audio controls src={dataTrack.result.short.audiofile}></audio> */}
            {/* <a href={data.audiofile} target="_blank">
              Download
            </a> */}

            {/* <button onClick={() => removeTrack()}>Скрыть</button> */}
            <button onClick={() => station.addFavorite()}>Фэворит</button>
          </div>
        )}
      </div>
    </>
  );
});

export default CardTrackOffline;
