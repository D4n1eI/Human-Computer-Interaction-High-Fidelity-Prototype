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
  readFolder: (folderPath) => ipcRenderer.invoke('read-folder', folderPath),
  uploadFile: (folderPath) => ipcRenderer.invoke('upload-file', folderPath),
  deleteFile: (filePath) => ipcRenderer.invoke('delete-file', filePath),
  downloadFile: (filePath) => ipcRenderer.invoke('download-file', filePath),
  createFolder: (folderPath, folderName) => ipcRenderer.invoke('create-folder', folderPath, folderName),
});