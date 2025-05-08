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

  if (currentPath.includes("addsubject.html"))  {
  
    const subjectTabs = document.getElementById('subjectTabs');
    const createForm = document.getElementById('create-subject-form');
    const subjectNameInput = document.getElementById('subjectName');
    const subjectAliasInput = document.getElementById('subjectAlias');
    const subjectDescriptionInput = document.getElementById('subjectDescription');
    const subjectColorInput = document.getElementById('subjectColor'); 
  
    // Load subjects from sessionStorage
    function renderSubjects() {
      const savedSubjects = JSON.parse(sessionStorage.getItem("subjects") || "[]");

      // Clear existing subject tabs except the "+" tab
      subjectTabs.querySelectorAll('.subject-tab').forEach(tab => {
        if (!tab.classList.contains('bg-add')) {
          tab.parentElement.remove();
        }
      });

      savedSubjects.forEach(subject => {
        addSubjectToUI(subject.name, subject.alias, subject.description, subject.color);
      });
    }
    
      // Add a subject tab to the UI
    function addSubjectToUI(name, alias, description, color) {
      const newTab = document.createElement('li');
      newTab.className = 'nav-item text-white';

      const newLink = document.createElement('a');
      newLink.className = 'nav-link subject-tab';
      newLink.href = '#';
      newLink.style.color = 'inherit';
      newLink.style.width = '100px';
      newLink.style.backgroundColor = color;
      newLink.style.fontWeight = 'bold';
      newLink.textContent = alias;
      newLink.title = `Name: ${name}\nAlias: ${alias}\nDescription: ${description}`;

      newTab.appendChild(newLink);
      subjectTabs.insertBefore(newTab, subjectTabs.lastElementChild);
    }

    // Tooltip for alias
    document.getElementById('alias-tooltip').addEventListener('click', () => {
      alert("The Alias is a shorthand name or abbreviation for the subject, used for quick reference.");
    });
  
    createForm.addEventListener('submit', (e) => {
      e.preventDefault();
    
      const name = subjectNameInput.value.trim();
      const alias = subjectAliasInput.value.trim();
      const description = subjectDescriptionInput.value.trim();
      const color = subjectColorInput.value;
    
      // Validation
      if (!name || name.length < 5 || name.length > 34) {
        alert("Subject Name must be between 5 and 34 characters.");
        return;
      }
      if (!alias || alias.length < 1 || alias.length > 5) {
        alert("Alias must be between 1 and 5 characters.");
        return;
      }
      if (description.length > 400) {
        alert("Description must not exceed 400 characters.");
        return;
      }
    
      const subjects = JSON.parse(sessionStorage.getItem("subjects") || "[]");
    
      // Check for duplicate name or alias
      const duplicate = subjects.find(subject =>
        subject.name.toLowerCase() === name.toLowerCase() ||
        subject.alias.toLowerCase() === alias.toLowerCase()
      );
    
      if (duplicate) {
        if (duplicate.name.toLowerCase() === name.toLowerCase()) {
          alert("Name already in use.");
        } else {
          alert("Alias already in use.");
        }
        return;
      }
    
      const newSubject = { name, alias, description, color };
      subjects.push(newSubject);
      sessionStorage.setItem("subjects", JSON.stringify(subjects));
    
      addSubjectToUI(name, alias, description, color);
      createForm.reset();
      subjectColorInput.value = "#15ce46"; // Reset to fixed color
    });
    
    // Hardcoded subject data
    const hardcodedSubject = {
      name: "Human-Computer Interaction",
      alias: "IHC",
      description: "This is Human Computer Interaction",
      color: "#15ce46"
    };
    
    // Check if already added (avoid duplication)
    let existingSubjects = JSON.parse(sessionStorage.getItem("subjects") || "[]");
    const alreadyExists = existingSubjects.some(subject =>
      subject.name.toLowerCase() === hardcodedSubject.name.toLowerCase() ||
      subject.alias.toLowerCase() === hardcodedSubject.alias.toLowerCase()
    );
    
    if (!alreadyExists) {
      existingSubjects.push(hardcodedSubject);
      sessionStorage.setItem("subjects", JSON.stringify(existingSubjects));
      addSubjectToUI(
        hardcodedSubject.name,
        hardcodedSubject.alias,
        hardcodedSubject.description,
        hardcodedSubject.color
      );
    }
    
    
    function addSubjectToUI(name, alias, description, color) {
      const newTab = document.createElement('li');
      newTab.className = 'nav-item text-white';
    
      const newLink = document.createElement('a');
      newLink.className = 'nav-link bg-hci subject-tab';
      newLink.href = 'hci.html';
      newLink.style.color = 'inherit';
      newLink.style.width = '100px';
      newLink.style.backgroundColor = color;
      newLink.style.fontWeight = 'bold';
      newLink.textContent = alias;
      newLink.title = `Alias: ${alias}\nDescription: ${description}`;
    
      newTab.appendChild(newLink);
      subjectTabs.insertBefore(newTab, subjectTabs.lastElementChild);
    }
  }
  // Now use the api object from preload.js
  else if (currentPath.includes("ciii-files.html")){

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
