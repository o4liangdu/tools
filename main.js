const { BrowserWindow, app } = require("electron");
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
    })
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
