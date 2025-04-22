document.querySelectorAll(".username").forEach(el => {
  el.textContent = "Gertrudes"; // Set the username dynamically
});

document.getElementById('create-subject-form').addEventListener('submit', function(e) {
  e.preventDefault(); 

  const subjectName = document.getElementById('subjectName').value.trim();
  const subjectColor = document.getElementById('subjectColor').value.toLowerCase(); 

  if (!subjectName) {
    alert('Please enter a subject name!');
    return;
  }

  const subjectTabs = document.getElementById('subjectTabs');
  
  // Check if the color has already been used
  const colorsUsed = Array.from(subjectTabs.querySelectorAll('.subject-tab'))
    .map(tab => tab.style.backgroundColor.toLowerCase());

  const tempDiv = document.createElement('div');
  tempDiv.style.backgroundColor = subjectColor;
  document.body.appendChild(tempDiv);
  const colorValue = window.getComputedStyle(tempDiv).backgroundColor;
  document.body.removeChild(tempDiv);

  if (colorsUsed.includes(colorValue)) {
    alert('Color already used! Please pick another color.');
    return;
  }

  // Create a new tab for the subject
  const newTab = document.createElement('li');
  newTab.className = 'nav-item text-white';

  const newLink = document.createElement('a');
  newLink.className = 'nav-link subject-tab';
  newLink.href = '#';
  newLink.style.color = 'inherit';
  newLink.style.width = '100px';
  newLink.style.backgroundColor = subjectColor;
  newLink.textContent = subjectName;

  newTab.appendChild(newLink);
  subjectTabs.insertBefore(newTab, subjectTabs.lastElementChild);

  // Store the new subject in localStorage
  const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
  storedSubjects.push({ name: subjectName, color: subjectColor });
  localStorage.setItem('subjects', JSON.stringify(storedSubjects));

  // Reset the form
  document.getElementById('create-subject-form').reset();
});

// Load subjects from localStorage on page load
window.addEventListener('DOMContentLoaded', function() {
  // Load subjects from localStorage
  const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
  const subjectTabs = document.getElementById('subjectTabs');

  // Clear any existing tabs (except the "+" tab)
  subjectTabs.querySelectorAll('.subject-tab').forEach(tab => {
    if (!tab.classList.contains('bg-add')) {
      tab.remove();
    }
  });

  // Create tabs from stored subjects
  storedSubjects.forEach(subject => {
    const newTab = document.createElement('li');
    newTab.className = 'nav-item text-white';

    const newLink = document.createElement('a');
    newLink.className = 'nav-link subject-tab';
    newLink.href = '#';
    newLink.style.color = 'inherit';
    newLink.style.width = '100px';
    newLink.style.backgroundColor = subject.color;
    newLink.textContent = subject.name;

    newTab.appendChild(newLink);
    subjectTabs.insertBefore(newTab, subjectTabs.lastElementChild);
  });
});
