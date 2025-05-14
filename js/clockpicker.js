// Initialize the clock picker
      $(document).ready(() => {
        $('#clockInput').clockpicker({
          autoclose: true,
          default: 'now'
        });

        // Save the selected time and send it back to the main page
        document.getElementById('saveTimeButton').addEventListener('click', () => {
          const selectedTime = document.getElementById('clockInput').value;
          if (selectedTime && window.opener) {
            window.opener.postMessage({ time: selectedTime }, '*');
          }
          window.close();
        });

        // Close the window without saving
        document.getElementById('closeButton').addEventListener('click', () => {
          window.close();
        });
      });