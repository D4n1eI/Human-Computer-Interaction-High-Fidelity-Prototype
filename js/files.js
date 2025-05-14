document.addEventListener('DOMContentLoaded', () => {
    const fileTreeContainer = document.getElementById('fileTree');
    const createFolderButton = document.getElementById('createFolder');
    const createFolderModal = document.getElementById('createFolderModal');
    const closeModal = document.getElementById('closeModal');
    const folderNameInput = document.getElementById('folderNameInput');
    const confirmCreateFolder = document.getElementById('confirmCreateFolder');
    const uploadButton = document.getElementById('uploadFile');
  
    let currentFolder = './calculus'; // Set your initial folder path here
    console.log('Current folder:', currentFolder);

    async function loadFolder() {
      try {
        showLoadingSpinner(true); // Show spinner
        const entries = await api.readFolder(currentFolder);
        fileTreeContainer.innerHTML = ''; // Clear the container
        renderTree(entries, fileTreeContainer);
      } catch (error) {
        console.error('Error loading folder:', error);
      } finally {
        showLoadingSpinner(false); // Hide spinner
      }
    }
  
    function renderTree(data, parentElement) {
      data.forEach((item) => {
        const node = document.createElement('div');
        node.classList.add('tree-node');
  
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item', 'd-flex', 'align-items-center');
  
        const icon = document.createElement('img');
        icon.src = item.type === 'folder' ? '../assets/icons/file_closed.png' : '../assets/icons/file-icon.png';
        icon.classList.add('folder-icon');
        itemDiv.appendChild(icon);
  
        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.name;
        itemDiv.appendChild(nameSpan);
  
        const actions = document.createElement('div');
        actions.classList.add('actions', 'gap-2');

        const toggleButton = document.createElement('button');
        toggleButton.classList.add('toggle-button');
        toggleButton.innerHTML = `<img src="../assets/icons/not_toggled.png" alt="Toggle" class="toggle-icon">`;
        toggleButton.onclick = (e) => {
          e.stopPropagation();
          toggleItem(item, toggleButton, node);
        };
        actions.appendChild(toggleButton);
  
        // Upload Button (only for folders)
        if (item.type === 'folder') {
          const uploadButton = document.createElement('button');
          uploadButton.classList.add('upload-button');
          uploadButton.innerHTML = `<img src="../assets/icons/download.png" alt="Upload" class="toolbar-icon" style="transform: rotate(180deg);">`;
          uploadButton.onclick = async (e) => {
            e.stopPropagation();
            const confirmUpload = confirm(`Do you want to upload a file to "${item.name}"?`);
            if (confirmUpload) {
              console.log(`Uploading to: ${item.name}`);
              const result = await api.uploadFile(item.fullPath);
              if (result.success) {
                console.log('File uploaded:', result.fileName);
                loadFolder(); // Reload the folder
              } else {
                console.error('Error uploading file:', result.error);
              }
            }
          };
          actions.appendChild(uploadButton);
        }
        itemDiv.appendChild(actions);
  
        // Download Button
        const downloadBtn = document.createElement('button');
        downloadBtn.innerHTML = `<img src="../assets/icons/download.png" alt="Download" class="toolbar-icon">`;
        downloadBtn.onclick = async (e) => {
          e.stopPropagation();
          console.log(`Downloading: ${item.name}`);
          const result = await api.downloadFile(item.fullPath);
          if (result.success) {
            console.log('Downloaded:', item.fullPath);
          } else {
            console.error('Error downloading file or folder:', result.error);
          }
        };
        actions.appendChild(downloadBtn);
  
        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<img src="../assets/icons/trashcan.png" alt="Delete" class="toolbar-icon">`;
        deleteBtn.onclick = async (e) => {
          e.stopPropagation();
          const confirmDelete = confirm(`Are you sure you want to delete "${item.name}"?`);
          if (confirmDelete) {
            console.log(`Deleting: ${item.name}`);
            const result = await api.deleteFile(item.fullPath);
            if (result.success) {
              console.log('Deleted:', item.fullPath);
              loadFolder(); // Reload the folder structure
            } else {
              console.error('Error deleting file or folder:', result.error);
            }
          }
        };
        actions.appendChild(deleteBtn);
  
        node.appendChild(itemDiv);
  
        if (item.type === 'folder') {
          const childrenContainer = document.createElement('div');
          childrenContainer.classList.add('children');
          childrenContainer.style.display = 'none';
  
          itemDiv.onclick = async (e) => {
            if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'IMG') {
              if (childrenContainer.childElementCount === 0) {
                const entries = await api.readFolder(item.fullPath);
                renderTree(entries, childrenContainer);
              }
              const isExpanded = childrenContainer.style.display === 'block';
              childrenContainer.style.display = isExpanded ? 'none' : 'block';
              icon.src = isExpanded ? '../assets/icons/file_closed.png' : '../assets/icons/file_open.png';
            }
          };
          node.appendChild(childrenContainer);
        }
  
        parentElement.appendChild(node);
      });
    }

      function toggleItem(item, toggleButton, node) {
      const isToggled = toggleButton.querySelector('img').src.includes('icon1.png');
      const newIcon = isToggled ? '../assets/icons/not_toggled.png' : '../assets/icons/icon1.png';
      toggleButton.querySelector('img').src = newIcon;

      // If it's a folder, toggle all children
      if (item.type === 'folder') {
        const children = node.querySelectorAll('.toggle-button img');
        children.forEach((childToggle) => {
          childToggle.src = newIcon;
        });
      }
    }
  
    // Show or hide the loading spinner
    function showLoadingSpinner(show) {
      const spinner = document.getElementById('loadingSpinner');
      spinner.style.display = show ? 'block' : 'none';
    }
  
    // Toolbar Buttons
    uploadButton.onclick = async (e) => {
      e.stopPropagation();
      const confirmUpload = confirm(`Do you want to upload a file to the current folder "${currentFolder}"?`);
      if (confirmUpload) {
        const result = await api.uploadFile(currentFolder);
        if (result.success) {
          console.log('File uploaded:', result.fileName);
          loadFolder(); // Reload the folder
        } else {
          console.error('Error uploading file:', result.error);
        }
      }
    };
  
    createFolderButton.onclick = () => {
      createFolderModal.style.display = 'block'; // Show the modal
    };
  
    closeModal.onclick = () => {
      createFolderModal.style.display = 'none'; // Hide the modal
      folderNameInput.value = ''; // Clear the input
    };
  
    confirmCreateFolder.onclick = async () => {
      const folderName = folderNameInput.value.trim();
      if (folderName) {
        const result = await api.createFolder(currentFolder, folderName);
        if (result.success) {
          console.log(`Folder created: ${folderName}`);
          loadFolder(); // Reload the folder structure
        } else {
          console.error('Error creating folder:', result.error);
        }
      }
      createFolderModal.style.display = 'none'; // Hide the modal
      folderNameInput.value = ''; // Clear the input
    };
  
    // Close the modal if the user clicks outside of it
    window.onclick = (event) => {
      if (event.target === createFolderModal) {
        createFolderModal.style.display = 'none';
        folderNameInput.value = ''; // Clear the input
      }
    };
  
    loadFolder(); // Load the initial folder structure
  });