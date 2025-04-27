document.querySelectorAll(".username").forEach(el => {
  el.textContent = "Gertrudes"; 
});

const subjectTabs = document.getElementById('subjectTabs');
const createForm = document.getElementById('create-subject-form');
const subjectNameInput = document.getElementById('subjectName');
const subjectAliasInput = document.getElementById('subjectAlias');
const subjectDescriptionInput = document.getElementById('subjectDescription');
const subjectColorInput = document.getElementById('subjectColor');
const submitButton = createForm.querySelector('button[type="submit"]'); 

// Function to render subjects from localStorage
function renderSubjects() {
  const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];

  // Remove existing subject tabs
  subjectTabs.querySelectorAll('.subject-tab').forEach(tab => {
    if (!tab.classList.contains('bg-add')) {
      tab.parentElement.remove();
    }
  });

  // Loop through stored subjects and create the tabs
  storedSubjects.forEach((subject) => {
    const newTab = document.createElement('li');
    newTab.className = 'nav-item text-white';

    const newLink = document.createElement('a');
    newLink.className = 'nav-link subject-tab';
    newLink.href = '#';
    newLink.style.color = 'inherit';
    newLink.style.width = '100px';
    newLink.style.backgroundColor = subject.color;
    newLink.textContent = subject.name;

    // Display Alias as a tooltip (optional)
    newLink.title = `Alias: ${subject.alias}\nDescription: ${subject.description}`;

    newTab.appendChild(newLink);
    subjectTabs.insertBefore(newTab, subjectTabs.lastElementChild);
  });
}

// Handle form submission to create a new subject
createForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = subjectNameInput.value.trim();
  const alias = subjectAliasInput.value.trim();
  const description = subjectDescriptionInput.value.trim();
  const color = subjectColorInput.value;

  // Validation for Subject Name
  if (name.length < 5 || name.length > 34) {
    alert("Subject Name must be between 5 and 34 characters.");
    return;
  }

  // Validation for Alias
  if (alias.length < 1 || alias.length > 5) {
    alert("Alias must be between 1 and 5 characters.");
    return;
  }

  // Validation for Description
  if (description.length > 400) {
    alert("Description must not exceed 400 characters.");
    return;
  }

  // Validate if Subject Name is empty
  if (!name) {
    alert("Please enter a subject name.");
    return;
  }

  // Get stored subjects from localStorage
  let storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];

  // Check if color is already in use
  const colorInUse = storedSubjects.some((subject) => subject.color.toLowerCase() === color.toLowerCase());

  if (colorInUse) {
    alert("This color is already used by another subject. Please pick a different color.");
    return;
  }

  // Add new subject to storedSubjects array
  storedSubjects.push({ name, alias, description, color });

  // Save the updated subjects back to localStorage
  localStorage.setItem('subjects', JSON.stringify(storedSubjects));

  // Reset the form and re-render subjects
  createForm.reset();
  renderSubjects();
});

// Initial render when the page loads
renderSubjects();
