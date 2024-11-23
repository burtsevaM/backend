let counter = 1
const data = [
    {
        id: 1,
        text: 'text',
        isDone: true
    }
]

//функция для проверки на уникальность идентификаторов 
export function initCounter() {
    if (data.length === 0) {
        return
    }
    data.forEach(element => {
        if (element.id >= counter) {
            counter = element.id + 1
        }
    });
}

//преобразование строки в формат JSON
export function getData() {
    return JSON.stringify(data)
}

//создание задачи и преобразование ее в JSON
export function createTask(inputData) {
    const item = {
        ...inputData, //копирует все свойства из объекта inputData
        id: counter++
    }
    data.push(item)
    return JSON.stringify(item)
}

//изменение статуса задачи и 
export function changeStatus(id) {
    const item = data.find(i => i.id === id)
    if (item === undefined) {
        // TODO 404
    }
    item.isDone = !item.isDone
    return JSON.stringify(item)
}

//удаление задачи
export function deleteTask(id) {
    const idx = data.findIndex(i => i.id === id)
    if (idx === -1) {
        console.log('Такого id не существует');
        return
    }
    data.splice(idx, 1)
    return 1
}