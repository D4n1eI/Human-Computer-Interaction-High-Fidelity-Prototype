window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })

  const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

contextBridge.exposeInMainWorld('api', {
  readFolder: (folderPath) => {
    return new Promise((resolve, reject) => {
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files.map(file => {
            const filePath = path.join(folderPath, file);
            const stats = fs.statSync(filePath);
            return {
              name: file,
              type: stats.isDirectory() ? 'folder' : 'file',
              fullPath: filePath
            };
          }));
        }
      });
    });
  },
  // Add any other API methods you want to expose
});