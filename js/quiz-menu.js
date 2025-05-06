document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById('tab-content');
  
    function showTab(tab) {
      if (tab === 'saved') {
        content.innerHTML = `
          <div style="position: relative; display: flex; justify-content: space-between; align-items: center; height: 10%; background-color: #f0f0f0; border-radius: 10px; border: 2px solid #ccc;">
            <span style="font-weight: bold;">Quiz 1</span>
            <div style="display: flex; gap: 2%;">
              <button class="option">
                <img src="../assets/icons/play.png" alt="play" class="img-fluid">
              </button>
              <button class="option">
                <img src="../assets/icons/edit.png" alt="edit" class="img-fluid">
              </button>
              <button class="option">
                <img src="../assets/icons/trash.png" alt="trash" class="img-fluid">
              </button>
            </div>
          </div>
        `;
      } else if (tab === 'create') {
        content.innerHTML = `
          <form>
            <label>Quiz Name: <input type="text" /></label><br />
            <button type="submit">Create</button>
          </form>
        `;
      }
    }
  
    document.getElementById('saved-tab').addEventListener('click', () => showTab('saved'));
    document.getElementById('create-tab').addEventListener('click', () => showTab('create'));
  
    // Load default tab
    showTab('saved');
  });
  