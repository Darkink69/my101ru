import { makeAutoObservable } from "mobx"

class removeCount {
    remove = false
    constructor() {
        makeAutoObservable(this)
    }

    one() {
        // this.remove = true
        console.log(this.remove, 'store!')
        let removedTracks = JSON.parse(localStorage.getItem("removedTracks")) || [];
        console.log(removedTracks)
    }

    decrement() {
        this.count = this.count - 1
    }

    
}

export default new removeCount()