import { makeAutoObservable } from "mobx"

class Station {
    id = localStorage.getItem("idStation") || 74
    tracks = []
    lastRemovedTrack = 0
    currentPlaying = JSON.parse(localStorage.getItem("currentPlaying")) || {title:'', cover:'', audiofile:''};
    nameStation = 'Авторадио. Дискотека 90-х'
    constructor() {
        makeAutoObservable(this)
    }

    doIt() {
      console.log(this.lastRemovedTrack)
        
    }

    // async makeSome() {
    //   let removedTracks = JSON.parse(localStorage.getItem("removedTracks")) || [];
    //   const idStation = localStorage.getItem("idStation") || 74
    //   const JsonStation = {
    //     1: "80x",
    //     74: "eurodance",
    //     79: "cyber_space",
    //     151: "rave",
    //   };
    //   const nameJsonStation = JsonStation[idStation];
        
    //   fetch(
    //       `https://raw.githubusercontent.com/Darkink69/selenium_101ru/main/db101_${nameJsonStation}.json`
    //     )
    //       .then((response) => response.json())
    //       .then((data) => {
    //         // const tracks = []
    //         data.tracks.map((i) => {
    //             const keyTrack = Object.keys(i)[0]
    //             // console.log(keyTrack)
    //             if (!removedTracks.includes(i[keyTrack].mdbUidTrack)) {
    //               this.tracks.push(i[keyTrack])
    //             }
                  
    //           }
    //         )
    //         // this.tracks = tracks

    //         // this.tracks = [...this.tracks, ...tracks]
    //           // console.log(data)
    //         // const tracks = [];
    //         // let removedTracks =
    //         //   JSON.parse(localStorage.getItem("removedTracks")) || [];
    //         // data.tracks.map((i) => {
    //         //   const keyTrack = Object.keys(i)[0];
    
    //         //   if (!removedTracks.includes(i[keyTrack].mdbUidTrack)) {
    //         //     this.tracks.push(i[keyTrack]);
    //         //   }
    //         // });

    //       })
    //       .catch((error) => console.error(error));        
        
    // }



    
}

export default new Station()