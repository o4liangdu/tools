const { BrowserWindow, app, ipcMain } = require("electron");
const path = require('path')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 300,
        height: 300,
        x: 1500,
        y: 600,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.resolve(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    })
    mainWindow.webContents.openDevTools();
    mainWindow.setAspectRatio(1)
    mainWindow.loadFile(path.resolve(__dirname, 'src/index.html'))
    app.requestSingleInstanceLock();
}

app.whenReady().then(()  => {
    createWindow()
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
        return;
    }
    app.releaseSingleInstanceLock();
})

app.on('activate', ()=>{
    if(!app.hasSingleInstanceLock()) createWindow();
})

ipcMain.on('saveFile', () => {
    console.log('save file')
})
