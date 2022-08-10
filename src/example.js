const list = [
    {
        id: 12,
        name: 'Luis'
    },
    {
        id: 29,
        name: 'Yepes'
    },
    {
        id: 91,
        name: 'Fernandez'
    }
]
let n

const nameList = (id) => {
    for (let i = 0; i < list.length; i++) {

        if (list[i].id == id) {
            n = list[i].name
            break
        } else {
            n = 'No name'
        }
    }
    return n
}

console.log(nameList(29));