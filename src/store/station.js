import { makeAutoObservable } from "mobx"

class Station {
    id = localStorage.getItem("idStation") || 74
    tracks = []
    lastRemovedTrack = 0
    currentPlaying = JSON.parse(localStorage.getItem("currentPlaying")) || {title:'', cover:'', audiofile:''}
    // currentPlaying = currentPlaying === undefined ? {title:'', cover:'', audiofile:''}: JSON.parse(localStorage.getItem("currentPlaying")) 
    nameStation = '...'
    jsonData = {}

    constructor() {
        makeAutoObservable(this)
    }

    doIt() {
      console.log(this.lastRemovedTrack)
        
    }

    async fetchJsonData() {
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
          })
          this.jsonData = tracks
        })
    }

    addFavorite() {
      console.log("Add to favorite!", this.currentPlaying.mdbUidTrack);
      let favoriteTracks =
        JSON.parse(localStorage.getItem("favoriteTracks")) || [];
      favoriteTracks.push(this.currentPlaying.mdbUidTrack);
      localStorage.setItem("favoriteTracks", JSON.stringify(favoriteTracks));
    };

    nextTrack() {
      let indexTrack
      this.jsonData.map((i) => {
        if (i.mdbUidTrack === this.currentPlaying.mdbUidTrack) {
          indexTrack = this.jsonData.indexOf(i)
          console.log(this.jsonData[indexTrack + 1].title)
          
        }
         
      })
      this.currentPlaying = this.jsonData[indexTrack + 1] 
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