/**
 * @Author: liangdu
 * @Date: 2023-06-10 00:41:28
 * @description: 能使用部分electron模块
 */
// const fs = require('fs')
// const path = require('path')

const { contextBridge } = require("electron");

// const content = fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8')
// console.log(content, 'package.json')

// save file    preload.js->electron
const { ipcRenderer } = require("electron");
// ipcRenderer.send('saveFile')

contextBridge.exposeInMainWorld('api', {
    close: () => ipcRenderer.invoke('close'),
    saveFile: () => ipcRenderer.send('saveFile'),
    addValue: (cb) => {
        ipcRenderer.on('add', (event, num = 1) => {
            cb(num)
        })
    },
    upload: () => {
        return ipcRenderer.invoke('selectFile')
    }
})

// ipcRenderer.on('add', (event, num = 1) => {
//     console.log('add', num)
// })

// contextBridge.exposeInMainWorld('api', {
//     saveFile: () => ipcRenderer.send('saveFile')
// })

ipcRenderer.on('msg', (event, msg = '') => {
    console.log('receive msg from main:', msg)
})
