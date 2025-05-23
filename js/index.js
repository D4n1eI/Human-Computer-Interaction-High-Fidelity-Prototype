const { app, BrowserWindow, ipcMain, dialog } = require('electron')
// include the Node.js 'path' module at the top of your file
const path = require('node:path')
const fs = require('fs-extra');

const isDev = !app.isPackaged;
console.log('isDev:', isDev);

function getCalculusPath() {
  if (isDev) {
    // In dev, use the repo folder
    return path.join(__dirname, '..', 'calculus');
  } else {
    // In production, use user data dir
    return path.join(app.getPath('userData'), 'calculus');
  }
}

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
        if (!isDev) {
      const bundledCalculusPath = path.join(process.resourcesPath, 'app.asar.unpacked', 'calculus');
      const userCalculusPath = getCalculusPath();
      console.log('Bundled calculus path:', bundledCalculusPath);
      console.log('User calculus path:', userCalculusPath);
      if (!fs.existsSync(userCalculusPath)) {
        try {
          fs.copySync(bundledCalculusPath, userCalculusPath);
          console.log('Copied calculus folder to userData');
        } catch (err) {
          console.error('Failed to copy calculus folder:', err);
        }
      }
    }

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
    const calculusPath = getCalculusPath();
    const targetPath = path.join(calculusPath, folderPath.replace(/^\.\/calculus\/?/, ''));
    const entries = fs.readdirSync(targetPath, { withFileTypes: true });
    return entries.map((entry) => {
      const rel = folderPath.replace(/^\.\/calculus\/?/, '');
      const fullPath = './calculus/' + (rel ? rel + '/' : '') + entry.name;
      return {
        name: entry.name,
        type: entry.isDirectory() ? 'folder' : 'file',
        fullPath: fullPath,
      };
    });
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
    const calculusPath = getCalculusPath();
    const rel = folderPath.replace(/^\.\/calculus\/?/, '');
    const destination = path.join(calculusPath, rel, fileName);

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
  const result = await dialog.showSaveDialog({
    defaultPath: path.basename(filePath), // Suggest the original file name
  });

  if (!result.canceled && result.filePath) {
    try {
      const calculusPath = getCalculusPath();
      const rel = filePath.replace(/^\.\/calculus\/?/, '');
      const realPath = path.join(calculusPath, rel);
      fs.copyFileSync(realPath, result.filePath);
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
    const calculusPath = getCalculusPath();
    const rel = filePath.replace(/^\.\/calculus\/?/, '');
    const userDataPath = path.join(calculusPath, rel);
    // Also try deleting from resources (unpacked)
    const resourcesPath = path.join(process.resourcesPath, 'calculus', rel);

    // Try deleting from userData
    try {
      const stats = fs.statSync(userDataPath);
      if (stats.isDirectory()) {
        fs.rmdirSync(userDataPath, { recursive: true });
      } else {
        fs.unlinkSync(userDataPath);
      }
    } catch (e) {
      // Ignore if not found
    }

    // Try deleting from resources
    try {
      const stats = fs.statSync(resourcesPath);
      if (stats.isDirectory()) {
        fs.rmdirSync(resourcesPath, { recursive: true });
      } else {
        fs.unlinkSync(resourcesPath);
      }
    } catch (e) {
      // Ignore if not found
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting file or folder:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('create-folder', async (event, folderPath, folderName) => {

  try {
    const calculusPath = getCalculusPath();
    const rel = folderPath.replace(/^\.\/calculus\/?/, '');
    const newFolderPath = path.join(calculusPath, rel, folderName);
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