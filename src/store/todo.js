import { makeAutoObservable } from "mobx"

class Todo{
    todos = [
        {id:1, title:'11111', completed: false},
        {id:2, title:'222222222', completed: false},
        {id:3, title:'333333', completed: false}
    ]

    tracks = []

    constructor() {
        makeAutoObservable(this)
    }

    addTodo(todo) {
        this.todos.push(todo)
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }

    completeTodo(id) {
        this.todos = this.todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)

    }

    fetchTodos() {
        fetch(`https://raw.githubusercontent.com/Darkink69/selenium_101ru/main/db101_eurodance.json`)
        .then((response) => response.json())
        .then((data) => {
            data.tracks.map((i) => {
                const keyTrack = Object.keys(i)[0]
                // console.log(i[keyTrack].title)
                this.tracks.push(i[keyTrack])
            })
            // const keyTrack = Object.keys(data.tracks[0])
            // console.log(data.tracks[0][keyTrack[0]])
            // this.tracks = [...this.tracks, ...data.tracks[0][keyTrack[0]]]
            // this.tracks = [...this.tracks, ...data.tracks[0][keyTrack[0]]]
        })
        .catch((error) => console.error(error))
    }

}


export default new Todo()