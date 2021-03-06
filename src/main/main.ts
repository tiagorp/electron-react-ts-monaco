import { app, BrowserWindow } from 'electron'
import path from 'path'
import url from 'url'

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
        },
    })

    if (process.env.NODE_ENV === 'development') {
        win.loadURL(`http://localhost:4000`)
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'dist', 'index.html'),
                protocol: 'file:',
                slashes: true,
            })
        )
    }

    win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

class MyClass {
    mymethod = (): void => {
        console.log('hi')
    }
}
