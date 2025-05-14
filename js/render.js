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

        // Tooltip functionality for Alias
    const aliasTooltip = document.getElementById('alias-tooltip');
    const tooltip = document.getElementById('tooltip');

    aliasTooltip.addEventListener('click', () => {
      // Toggle tooltip visibility
      tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
    });
  
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
  if (!currentPath.includes("hci.html") && !currentPath.includes("hci-events.html")){
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
if (currentPath.includes("index.html")) {
  const subjectsSection = document.querySelector('.row.row-cols-3.g-3'); // Subjects Section

  // Check the boolean flag
  const subjectCreated = sessionStorage.getItem("subjectCreated") === "true";
  if (subjectCreated) {
    const subjects = JSON.parse(sessionStorage.getItem("subjects") || "[]");
    subjects.forEach(subject => {
      addSubjectToSection(subject.name, subject.alias, subject.color, subjectsSection);
    });
  }

  const deadlinesContainer = document.querySelector(".list-group");

  // Check for deadlines in sessionStorage
  const deadlines = JSON.parse(sessionStorage.getItem("deadlines") || "[]");
   if (deadlines.length > 0) {
    deadlines.forEach(deadline => {
      const [year, month, day] = deadline.date.split("-");
      const formattedDate = `${day}/${month}/${year}`;
      const deadlineItem = document.createElement("li");
      deadlineItem.className = "list-group-item d-flex justify-content-between align-items-center bg-hci text-white deadline-card";
      // ADD THESE LINES:
      deadlineItem.setAttribute("data-subject", "Human Computer Interaction");
      deadlineItem.setAttribute("data-event", deadline.name);
      deadlineItem.setAttribute("data-datetime", `${deadline.date}T${deadline.time}`);
      deadlineItem.setAttribute("data-description", deadline.description);

      deadlineItem.innerHTML = `
        ${deadline.name}
        <span class="badge">${formattedDate} ${deadline.time}</span>
      `;

      deadlinesContainer.prepend(deadlineItem);
    });
  }

  function addSubjectToSection(name, alias, color, parentElement) {
    // Prevent duplicate entries
    if (document.querySelector(`.subject-card[title="${name}"]`)) {
      return;
    }

    const newSubjectDiv = document.createElement('div');
    newSubjectDiv.className = 'col';

    const newSubjectLink = document.createElement('a');
    newSubjectLink.href = 'hci.html'; // Link to the HCI page
    newSubjectLink.className = 'btn w-100 bg-hci text-white subject-card';
    newSubjectLink.textContent = alias;
    newSubjectLink.title = name;

    // Insert the new subject before the "Add Subject" button
    const addSubjectButton = parentElement.querySelector('.btn-outline-secondary');
    parentElement.insertBefore(newSubjectDiv, addSubjectButton.parentElement);

    newSubjectDiv.appendChild(newSubjectLink);
  }
}
if (currentPath.includes("hci-events.html")) {
  const addEventButton = document.getElementById("addEventButton");
  const addEventForm = document.getElementById("addEventForm");
  const addDeadlineButton = document.getElementById("addDeadline");
  const deadlineForm = document.getElementById("deadlineForm");
  const createDeadlineButton = document.getElementById("createDeadlineButton");
  const deadlinesList = document.getElementById("deadlinesList");
  const noDeadlinesMessage = document.getElementById("noDeadlinesMessage");
  const timeInput = document.getElementById("deadlineTime");

  // Open the clock picker in a small window
  timeInput.addEventListener("click", () => {
    const clockPickerWindow = window.open(
      "clockpicker.html",
      "ClockPicker",
      "width=400,height=300,top=100,left=100"
    );

    // Listen for the selected time from the small window
    window.addEventListener("message", (event) => {
      if (event.data && event.data.time) {
        timeInput.value = event.data.time;
      }
    });
  });

  // Check for deadlines in sessionStorage
  const deadlines = JSON.parse(sessionStorage.getItem("deadlines") || "[]");
  if (deadlines.length > 0) {
    noDeadlinesMessage.classList.add("d-none");

    const deadlinesListUL = document.createElement("ul");
    deadlinesListUL.className = "list-group";

    deadlines.forEach(deadline => {
      const [year, month, day] = deadline.date.split("-");
      const formattedDate = `${day}/${month}/${year}`;
      const deadlineItem = document.createElement("li");
      deadlineItem.className = "list-group-item d-flex justify-content-between align-items-center bg-hci text-white deadline-card";
      deadlineItem.innerHTML = `
        <div>
          <h6>${deadline.name}</h6>
        </div>
        <span>${formattedDate} ${deadline.time}</span>
      `;
      deadlinesListUL.appendChild(deadlineItem);
    });

    deadlinesList.appendChild(deadlinesListUL);
  }

  // Show the Add Form
  addEventButton.addEventListener("click", () => {
    addEventForm.classList.toggle("d-none");
  });

  // Show Deadline Form
  addDeadlineButton.addEventListener("click", () => {
    deadlineForm.classList.remove("d-none");
  });

  // Create Deadline
  createDeadlineButton.addEventListener("click", () => {
    const name = document.getElementById("deadlineName").value.trim();
    const date = document.getElementById("deadlineDate").value;
    const time = document.getElementById("deadlineTime").value;
    const description = document.getElementById("deadlineDescription").value.trim();

    // Validation
    if (!name || !date || !time || !description) {
      alert("All fields are required.");
      return;
    }

    // Artificial Validation
    if (name !== "HCI Test" || description !== "Main topics:\n1- High Fidelity Prototypes\n2- SUS score") {
      alert("Validation failed. Please ensure all fields match the test values.");
      return;
    }

    // Artificial Validation
    const specificDate = "2025-06-10"; // Example specific date
    const specificTime = "11:00"; // Example specific time
    if (date !== specificDate || time !== specificTime) {
      alert("Validation failed. Please ensure the date and time match the test values.");
      return;
    }

    const deadlines = JSON.parse(sessionStorage.getItem("deadlines") || "[]");
    const newDeadline = { name, date, time, description };
    deadlines.push(newDeadline);
    sessionStorage.setItem("deadlines", JSON.stringify(deadlines));

    const [year, month, day] = date.split("-");
    const formattedDate = `${day}/${month}/${year}`;

    // Add Deadline to List
    const deadlinesListUL = document.createElement("ul");
    deadlinesListUL.className = "list-group";
    deadlinesList.appendChild(deadlinesListUL)
    const deadlineItem = document.createElement("li");
    deadlineItem.className = "list-group-item d-flex justify-content-between align-items-center bg-hci text-white deadline-card";
    deadlineItem.innerHTML = `
      <div>
        <h6>${name}</h6>
      </div>
      <span>${formattedDate} ${time}</span>
    `;
    deadlinesListUL.appendChild(deadlineItem);

    // Hide No Deadlines Message
    noDeadlinesMessage.classList.add("d-none");

    // Reset Form
    addEventForm.classList.add("d-none");
    deadlineForm.classList.add("d-none");
    document.getElementById("deadlineName").value = "";
    document.getElementById("deadlineDate").value = "";
    document.getElementById("deadlineTime").value = "";
    document.getElementById("deadlineDescription").value = "";
  });
}
if (currentPath.includes("hci.html")) {
    const deadlinesContainer = document.querySelector(".deadlines-space");

  // Check for deadlines in sessionStorage
  const deadlines = JSON.parse(sessionStorage.getItem("deadlines") || "[]");
  if (deadlines.length > 0) {
    const deadlinesList = document.createElement("ul");
    deadlinesList.className = "list-group";

    deadlines.forEach(deadline => {
  const [year, month, day] = deadline.date.split("-");
  const formattedDate = `${day}/${month}/${year}`;
  const deadlineItem = document.createElement("li");
  deadlineItem.className = "list-group-item d-flex justify-content-between align-items-center bg-hci text-white deadline-card";
  // Set data attributes for the modal!
  deadlineItem.setAttribute("data-subject", "Human Computer Interaction");
  deadlineItem.setAttribute("data-event", deadline.name);
  deadlineItem.setAttribute("data-datetime", `${deadline.date}T${deadline.time}`);
  deadlineItem.setAttribute("data-description", deadline.description);

  deadlineItem.innerHTML = `
    <div>
      <h6>${deadline.name}</h6>
    </div>
    <span>${formattedDate} ${deadline.time}</span>
  `;
  deadlinesList.appendChild(deadlineItem);
});

    deadlinesContainer.innerHTML = "<h5>Close Deadlines:</h5>";
    deadlinesContainer.appendChild(deadlinesList);
  } else {
    deadlinesContainer.innerHTML = "<h5>Close Deadlines:</h5>You have no deadlines here yet!";
  }
}
});

document.addEventListener('DOMContentLoaded', () => {
  const deadline = document.getElementById('calculus-deadline');
  if (deadline) {
    deadline.addEventListener('click', () => {
      // Optionally, set modal fields here if dynamic
      document.getElementById('modal-subject').value = "Calculus III";
      document.getElementById('modal-event').value = "Calculus III Test";
      document.getElementById('modal-datetime').value = "2025-06-23T13:00";
      document.getElementById('modal-description').value = "Final major exam covering all course material from Calculus III.";

      const modal = new bootstrap.Modal(document.getElementById('deadlineFormModal'));
      modal.show();
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.deadline-card').forEach(item => {
    item.addEventListener('click', function() {
      // Get data from attributes
      const subject = this.getAttribute('data-subject');
      const eventName = this.getAttribute('data-event');
      const datetime = this.getAttribute('data-datetime');
      const description = this.getAttribute('data-description');

      // Fill modal fields
      document.getElementById('modal-subject').value = subject;
      document.getElementById('modal-event').value = eventName;
      document.getElementById('modal-datetime').value = datetime;
      document.getElementById('modal-description').value = description;

      // Show modal
      const modal = new bootstrap.Modal(document.getElementById('deadlineFormModal'));
      modal.show();
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', function(e) {
    const item = e.target.closest('.deadline-card');
    if (item) {
      // Get data from attributes
      document.getElementById('modal-subject').value = item.getAttribute('data-subject');
      document.getElementById('modal-event').value = item.getAttribute('data-event');
      document.getElementById('modal-datetime').value = item.getAttribute('data-datetime');
      document.getElementById('modal-description').value = item.getAttribute('data-description');

      // Show modal
      const modal = new bootstrap.Modal(document.getElementById('deadlineFormModal'));
      modal.show();
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', function(e) {
    const item = e.target.closest('.deadline-card');
    if (item) {
      document.getElementById('modal-subject').value = item.getAttribute('data-subject');
      document.getElementById('modal-event').value = item.getAttribute('data-event');
      document.getElementById('modal-datetime').value = item.getAttribute('data-datetime');
      document.getElementById('modal-description').value = item.getAttribute('data-description');
      const modal = new bootstrap.Modal(document.getElementById('deadlineFormModal'));
      modal.show();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', function(e) {
    const item = e.target.closest('.deadline-card');
    if (item && document.getElementById('viewDeadlineModal')) {
      // Get data from attributes
      document.getElementById('view-subject-name').textContent = item.getAttribute('data-subject');
      document.getElementById('view-event-name').textContent = item.getAttribute('data-event');
      // Format date & time for display
      const datetime = item.getAttribute('data-datetime');
      if (datetime) {
        const [date, time] = datetime.split('T');
        const [year, month, day] = date.split('-');
        document.getElementById('view-date-time').textContent = `${day}/${month}/${year} ${time}`;
      } else {
        document.getElementById('view-date-time').textContent = '';
      }
      document.getElementById('view-description').textContent = item.getAttribute('data-description');
      // Show modal
      const modal = new bootstrap.Modal(document.getElementById('viewDeadlineModal'));
      modal.show();
    }
  });
});