const { app, BrowserWindow, ipcMain, dialog } = require('electron')
// include the Node.js 'path' module at the top of your file
const path = require('node:path')
const fs = require('fs');

// modify your existing createWindow() function
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    minWidth: 800,
    height: 600,
    minHeight: 600,
    icon: path.join(__dirname, '..', 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,  // Disabling remote module
      nodeIntegration: false,  // Disabling Node.js integration
      sandbox: false,  // Disable sandboxing to allow 'fs' usage
    }
  })
  win.maximize()
  win.loadFile(path.join(__dirname, '..', 'html', 'index.html'))
}

  app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  // IPC Handlers
ipcMain.handle('read-folder', async (event, folderPath) => {
  try {
    const entries = fs.readdirSync(folderPath, { withFileTypes: true });
    return entries.map((entry) => ({
      name: entry.name,
      type: entry.isDirectory() ? 'folder' : 'file',
      fullPath: path.join(folderPath, entry.name),
    }));
  } catch (error) {
    console.error('Error reading folder:', error);
    throw error;
  }
});

ipcMain.handle('upload-file', async (event, folderPath) => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
  });

  if (!result.canceled && result.filePaths.length > 0) {
    const filePath = result.filePaths[0];
    const fileName = path.basename(filePath);
    const destination = path.join(folderPath, fileName);

    try {
      fs.copyFileSync(filePath, destination); // Copy the file to the folder
      return { success: true, fileName };
    } catch (error) {
      console.error('Error uploading file:', error);
      return { success: false, error: error.message };
    }
  }

  return { success: false };
});

ipcMain.handle('download-file', async (event, filePath) => {
  const { dialog } = require('electron');
  const path = require('path');
  const fs = require('fs');

  const result = await dialog.showSaveDialog({
    defaultPath: path.basename(filePath), // Suggest the original file name
  });

  if (!result.canceled && result.filePath) {
    try {
      fs.copyFileSync(filePath, result.filePath); // Copy the file to the selected location
      return { success: true };
    } catch (error) {
      console.error('Error downloading file:', error);
      return { success: false, error: error.message };
    }
  }

  return { success: false };
});

ipcMain.handle('delete-file', async (event, filePath) => {
  try {
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      fs.rmdirSync(filePath, { recursive: true }); // Delete folder recursively
    } else {
      fs.unlinkSync(filePath); // Delete file
    }
    return { success: true };
  } catch (error) {
    console.error('Error deleting file or folder:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('create-folder', async (event, folderPath, folderName) => {
  const fs = require('fs');
  const path = require('path');

  try {
    const newFolderPath = path.join(folderPath, folderName);
    if (!fs.existsSync(newFolderPath)) {
      fs.mkdirSync(newFolderPath); // Create the folder
      return { success: true };
    } else {
      return { success: false, error: 'Folder already exists' };
    }
  } catch (error) {
    console.error('Error creating folder:', error);
    return { success: false, error: error.message };
  }
});