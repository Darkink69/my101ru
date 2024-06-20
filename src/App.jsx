import { useEffect, useState } from "react";
import "./App.css";
import CardTrack from "./components/CardTrack";
import AllTracksStation from "./components/AllTracksStation";
import Navigation from "./components/Navigation";
import Player from "./components/Player";

function App() {
  const ids = [1, 79, 74, 151];

  return (
    <>
      <Navigation />
      <div className="container mx-auto">
        <h1 className="font-mono text-xl text-center text-slate-600 decoration-solid pt-16">
          Сейчас в эфире
        </h1>
        {/* <audio
          controls
          src="https://content.audioaddict.com/prd/a/8/6/1/f/eaf7d3cbc83d3272de103dbffc1c2ac7f1a.mp4?purpose=playback&audio_token=9c878a6029423f4deaafce9743b75023&network=di&device=chrome_126_windows_10&exp=2024-06-20T03:31:17Z&auth=4611d9e5535334eb29a1510659a482a7ee4cb527"
        ></audio> */}
        <div className="mx-auto grid sm:grid-cols-4 grid-cols-2 gap-4">
          {ids?.map((item) => (
            <CardTrack id={item} key={item} />
          ))}
        </div>
        <AllTracksStation
        // key={nameJsonStation}
        // nameJsonStation={nameJsonStation}
        />
      </div>
      <h1 className="font-mono text-xl text-center text-slate-600 decoration-solid pb-10">
        Подвал
      </h1>
      <Player />
    </>
  );
}

export default App;
