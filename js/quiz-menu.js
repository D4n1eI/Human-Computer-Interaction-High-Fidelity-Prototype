document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById('tab-content');
  
    function showTab(tab) {
      if (tab === 'saved') {
        content.innerHTML = `
          <div style="position: relative; display: flex; justify-content: space-between; align-items: center; height: 20%; background-color: #f0f0f0; border-radius: 10px; border: 2px solid #ccc;">
            <span style="font-weight: bold;">Quiz 1</span>
            <div style="display: flex; gap: 2%;">
              <a href="quiz-hardcoded.html" style="text-decoration: none; color: inherit;">
                <button class="option">
                  <img src="../assets/icons/play.png" alt="play" class="img-fluid" style="width: 20px; height: 20px;">
                </button>
              </a>
              <button class="option">
                <img src="../assets/icons/edit.png" alt="edit" class="img-fluid" style="width: 20px; height: 20px;">
              </button>
              <button class="option">
                <img src="../assets/icons/trashcan.png" alt="trash" class="img-fluid" style="width: 20px; height: 20px;">
              </button>
            </div>
          </div>
        `;
      } else if (tab === 'create') {
        content.innerHTML = `
          <form>
            <label>Quiz Name: <input type="text" placeholder="..." /></label>
            <label>
              Number of Questions:
              <select id="questionSelect">
                <option disabled selected>...</option>
              </select>
            </label>
            <button class="option">
                Create
            </button>
          </form>
        `;
  
    const selectElement = document.getElementById('questionSelect');
      for (let i = 1; i <= 20; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        selectElement.appendChild(option);
      }
    }
  }

  document.getElementById('saved-tab').addEventListener('click', () => showTab('saved'));
  document.getElementById('create-tab').addEventListener('click', () => showTab('create'));

  // Load default tab
  showTab('saved');
});