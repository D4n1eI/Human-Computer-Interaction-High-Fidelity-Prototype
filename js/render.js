document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;

  document.querySelectorAll(".username").forEach(el => {
    el.textContent = "L.Leiteiro";   
  });

  if (!currentPath.includes("cciii-files.html")){
    const modal = new bootstrap.Modal(document.getElementById('notImplementedModal'));

    document.querySelectorAll('.btn-not-implemented').forEach(button => {
      button.addEventListener('click', () => {
        modal.show();
      });
    });
  }

  if (currentPath.includes("addsubject.html")) {
    const createForm = document.getElementById('create-subject-form');
    const subjectNameInput = document.getElementById('subjectName');
    const subjectAliasInput = document.getElementById('subjectAlias');
    const subjectDescriptionInput = document.getElementById('subjectDescription');
    const subjectColorInput = document.getElementById('subjectColor');
  
    createForm.addEventListener('submit', (e) => {
      e.preventDefault();
    
      const name = subjectNameInput.value.trim();
      const alias = subjectAliasInput.value.trim();
      const description = subjectDescriptionInput.value.trim();
      const color = subjectColorInput.value;
    
      // Validation
      if (
        name !== "Human Computer Interaction" ||
        alias !== "HCI" ||
        description !== "This is Human Computer Interaction!" ||
        color !== "#15ce46"
      ) {
        alert("Validation failed. Please ensure all fields match the test values.");
        return; // Do not reset the form
      }
    
      const subjects = JSON.parse(sessionStorage.getItem("subjects") || "[]");
    
      // Check for duplicate name, alias, or color
      const duplicate = subjects.find(subject =>
        subject.name.toLowerCase() === name.toLowerCase() ||
        subject.alias.toLowerCase() === alias.toLowerCase() ||
        subject.color.toLowerCase() === color.toLowerCase()
      );
    
      if (duplicate) {
        if (duplicate.name.toLowerCase() === name.toLowerCase()) {
          alert("Name already in use.");
        } else if (duplicate.alias.toLowerCase() === alias.toLowerCase()) {
          alert("Alias already in use.");
        } else {
          alert("Color already in use.");
        }
        return; // Do not reset the form
      }
    
      const newSubject = { name, alias, description, color };
      subjects.push(newSubject);
      sessionStorage.setItem("subjects", JSON.stringify(subjects));
    
      // Set the boolean flag to true
      sessionStorage.setItem("subjectCreated", "true");
    
      addSubjectToUI(name, alias, description, color);
      createForm.reset(); // Reset the form only after successful submission
      subjectColorInput.value = "#15ce46"; // Reset to fixed color
    });
  }
  // Now use the api object from preload.js
  if (!currentPath.includes("hci.html")){
    const subjectTabs = document.getElementById('subjectTabs');
  
    // Check the boolean flag
    const subjectCreated = sessionStorage.getItem("subjectCreated") === "true";
    if (subjectCreated) {
      const subjects = JSON.parse(sessionStorage.getItem("subjects") || "[]");
      subjects.forEach(subject => {
        addSubjectToUI(subject.name, subject.alias, subject.description, subject.color);
      });
    }
  
    function addSubjectToUI(name, alias, description, color) {
      const newTab = document.createElement('li');
      newTab.className = 'nav-item text-white';
  
      const newLink = document.createElement('a');
      newLink.className = 'nav-link subject-tab';
      newLink.href = 'hci.html'; // Link to the HCI page
      newLink.style.color = 'inherit';
      newLink.style.width = '100px';
      newLink.style.backgroundColor = color;
      newLink.style.fontWeight = 'bold';
      newLink.textContent = alias;
      newLink.title = `Name: ${name}\nAlias: ${alias}\nDescription: ${description}`;
  
      newTab.appendChild(newLink);
      subjectTabs.insertBefore(newTab, subjectTabs.lastElementChild);
    }
  }
  if (currentPath.includes("ciii-files.html")){

    const { api } = window;

    const fileTreeContainer = document.getElementById('fileTree');
    let currentFolder = './calculus'; // Set your initial folder path here

    async function loadFolder() {
      try {
        const entries = await window.api.readFolder(currentFolder);
        renderTree(entries, fileTreeContainer);
      } catch (error) {
        console.error('Error loading folder:', error);
      }
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
                const entries = await window.api.readFolder(item.fullPath);
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

  loadFolder(); // Load the initial folder structure
}
});
