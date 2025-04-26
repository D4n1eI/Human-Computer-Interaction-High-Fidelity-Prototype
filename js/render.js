document.querySelectorAll(".username").forEach(el => {
  el.textContent = "Gertrudes"; 
});

const subjectTabs = document.getElementById('subjectTabs');
const createForm = document.getElementById('create-subject-form');
const subjectNameInput = document.getElementById('subjectName');
const subjectColorInput = document.getElementById('subjectColor');
const submitButton = createForm.querySelector('button[type="submit"]'); 
let editingSubjectIndex = null; 

function renderSubjects() {
  const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];

  subjectTabs.querySelectorAll('.subject-tab').forEach(tab => {
    if (!tab.classList.contains('bg-add')) {
      tab.parentElement.remove();
    }
  });

  storedSubjects.forEach((subject, index) => {
    const newTab = document.createElement('li');
    newTab.className = 'nav-item text-white';

    const newLink = document.createElement('a');
    newLink.className = 'nav-link subject-tab';
    newLink.href = '#';
    newLink.style.color = 'inherit';
    newLink.style.width = '100px';
    newLink.style.backgroundColor = subject.color;
    newLink.textContent = subject.name;
    newLink.dataset.index = index; 

    newTab.appendChild(newLink);
    subjectTabs.insertBefore(newTab, subjectTabs.lastElementChild);
  });

  renderSubjectListInForm();
}

function renderSubjectListInForm() {
  let listContainer = document.getElementById('subjectList');
  if (!listContainer) {
    listContainer = document.createElement('div');
    listContainer.id = 'subjectList';
    createForm.appendChild(listContainer);
  }
  listContainer.innerHTML = ''; // Clear previous list

  const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];

  storedSubjects.forEach((subject, index) => {
    const subjectItem = document.createElement('div');
    subjectItem.className = 'd-flex justify-content-between align-items-center mb-2 p-2 border rounded';
    subjectItem.style.backgroundColor = "#f8f9fa";

    const subjectInfo = document.createElement('span');
    subjectInfo.textContent = `${subject.name}`;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'd-flex gap-2';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm btn-warning';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      subjectNameInput.value = subject.name;
      subjectColorInput.value = subject.color;
      editingSubjectIndex = index;
      submitButton.textContent = "Save Changes"; 
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-danger';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      if (confirm(`Are you sure you want to delete "${subject.name}"?`)) {
        storedSubjects.splice(index, 1);
        localStorage.setItem('subjects', JSON.stringify(storedSubjects));
        editingSubjectIndex = null;
        createForm.reset();
        submitButton.textContent = "Create Subject"; 
        renderSubjects();
      }
    });

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    subjectItem.appendChild(subjectInfo);
    subjectItem.appendChild(buttonsDiv);

    listContainer.appendChild(subjectItem);
  });
}

createForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const subjectName = subjectNameInput.value.trim();
  const subjectColorInputValue = subjectColorInput.value.trim();

  if (!subjectName) {
    alert('Please enter a subject name!');
    return;
  }

  const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];

  // Get the *actual* browser-computed color
  const tempDiv = document.createElement('div');
  tempDiv.style.backgroundColor = subjectColorInputValue;
  document.body.appendChild(tempDiv);
  const computedColor = window.getComputedStyle(tempDiv).backgroundColor;
  document.body.removeChild(tempDiv);

  // Check if color already exists (ignore the one we're editing if any)
  const isColorUsed = storedSubjects.some((subject, index) => {
    if (editingSubjectIndex !== null && index === editingSubjectIndex) {
      return false; // Ignore current editing subject
    }
    // Create a temp div to get browser interpretation of saved colors
    const colorDiv = document.createElement('div');
    colorDiv.style.backgroundColor = subject.color;
    document.body.appendChild(colorDiv);
    const savedComputedColor = window.getComputedStyle(colorDiv).backgroundColor;
    document.body.removeChild(colorDiv);

    return savedComputedColor === computedColor;
  });

  if (isColorUsed) {
    alert('This color is already used by another subject. Please pick a different color.');
    return;
  }

  if (editingSubjectIndex === null) {
    // CREATING
    storedSubjects.push({ name: subjectName, color: subjectColorInputValue });
  } else {
    // EDITING
    storedSubjects[editingSubjectIndex] = { name: subjectName, color: subjectColorInputValue };
    editingSubjectIndex = null;
    submitButton.textContent = "Create Subject";
  }

  localStorage.setItem('subjects', JSON.stringify(storedSubjects));
  createForm.reset();
  renderSubjects();
});
