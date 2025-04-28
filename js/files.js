document.addEventListener('DOMContentLoaded', () => {
    const fileTreeContainer = document.getElementById('fileTree');
    const uploadButton = document.getElementById('uploadButton');
    const deleteButton = document.getElementById('deleteButton');
    const downloadButton = document.getElementById('downloadButton');
  
    let currentFolder = '../calculus'; // Set your initial folder path here
  
    async function loadFolder() {
      const entries = await api.readFolder(currentFolder);
      renderTree(entries, fileTreeContainer);
    }
  
    function renderTree(data, parentElement) {
      data.forEach(item => {
        const node = document.createElement('div');
        node.classList.add('tree-node');
  
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
  
        const icon = document.createElement('img');
        icon.src = item.type === 'folder' ? 'assets/icons/folder-icon.svg' : 'assets/icons/file-icon.svg';
        itemDiv.appendChild(icon);
  
        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.name;
        itemDiv.appendChild(nameSpan);
  
        const actions = document.createElement('div');
        actions.classList.add('actions');
        actions.style.display = 'none';
  
        const downloadBtn = document.createElement('button');
        downloadBtn.innerHTML = `<img src="assets/icons/download-icon.svg" alt="Download">`;
        downloadBtn.onclick = (e) => {
          e.stopPropagation();
          console.log('Downloading', item.fullPath);
          // Implement download functionality here
        };
        actions.appendChild(downloadBtn);
  
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<img src="assets/icons/delete-icon.svg" alt="Delete">`;
        deleteBtn.onclick = (e) => {
          e.stopPropagation();
          console.log('Deleting', item.fullPath);
          // Implement delete functionality here
        };
        actions.appendChild(deleteBtn);
  
        if (item.type === 'folder') {
          const uploadBtn = document.createElement('button');
          uploadBtn.innerHTML = `<img src="assets/icons/upload-icon.svg" alt="Upload">`;
          uploadBtn.onclick = (e) => {
            e.stopPropagation();
            console.log('Uploading into', item.fullPath);
            // Implement upload functionality here
          };
          actions.appendChild(uploadBtn);
        }
  
        itemDiv.appendChild(actions);
        node.appendChild(itemDiv);
  
        itemDiv.onmouseenter = () => {
          actions.style.display = 'flex';
        };
  
        itemDiv.onmouseleave = () => {
          actions.style.display = 'none';
        };
  
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
              childrenContainer.style.display = 
                childrenContainer.style.display === 'none' ? 'block' : 'none';
            }
          };
          node.appendChild(childrenContainer);
        }
  
        parentElement.appendChild(node);
      });
    }
  
    uploadButton.addEventListener('click', () => {
      console.log('Upload button clicked');
      // Implement upload functionality here
    });
  
    deleteButton.addEventListener('click', () => {
      console.log('Delete button clicked');
      // Implement delete functionality here
    });
  
    downloadButton.addEventListener('click', () => {
      console.log('Download button clicked');
      // Implement download functionality here
    });
  
    loadFolder(); // Load the initial folder structure
  });