const { Menu } = require("electron")

const createMenu = (win) => {
    const menu = [
        {
            label: '菜单',
            submenu: [
                {
                    label: 'add',
                    click: () => {
                        win.webContents.send('add', 2)
                    }
                }
            ]
        }
    ]
    Menu.setApplicationMenu(Menu.buildFromTemplate(menu))
}
module.exports = {
    createMenu
}
