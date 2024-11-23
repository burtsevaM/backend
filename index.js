import { createServer } from 'node:http'; //функция для создания HTTP-сервера
import fs from 'node:fs'
import { changeStatus, createTask, deleteTask, getData, initCounter } from './storage.js'; //импорт функций из storage.js

//настройка сервера (ip адрес и порт)
const hostname = '127.0.0.1';
const port = 5500;

function init() {
    initCounter()
}

//создание сервера
const server = createServer((req, res) => {
    const url = req.url
    const method = req.method
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    if (method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        res.end();
    }

    //TODO Create Task
    if (url === '/tasks' && method === 'POST') {
        let body = [];  // пустой массив для накопления данных
        req.on('data', chunk => {   // chunk - данные поступают по частям
            body.push(chunk);
            console.log(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString(); // объединяет части данных в одно целое
            const item = JSON.parse(body)  //преобразует строку JSON в объект JavaScript
            const result = createTask(item)
            console.log(result);
            res.end(result)  //отправляет результат создания задачи
        });
    }

    // TODO Change Status
    if (url === '/tasks/edit' && method === 'PATCH') {
        let body = [];
        req.on('data', chunk => {
            body.push(chunk);
            console.log(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            const requestData = JSON.parse(body)
            const changedData = changeStatus(requestData.id)
            res.end(changedData)
        });
    }

    // ToDO Delete Task
    if (url === '/tasks' && method === 'DELETE') {
        let body = [];
        req.on('data', chunk => {
            body.push(chunk);
            console.log(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            const requestData = JSON.parse(body)
            const result = deleteTask(requestData.id)
            res.end()
        });
    }

    //получение всех задач
    if (url === '/tasks' && method === 'GET') {
        const result = getData()
        res.end(result)
    }

});

//запуск сервера
server.listen(port, hostname, () => {
    init()
    console.log(`Server running at http://${hostname}:${port}/`);
});