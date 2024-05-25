// popup.js
document.addEventListener('DOMContentLoaded', function() {
  const clearBtn = document.getElementById('clearBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  clearBtn.addEventListener('click', function() {
    document.getElementById('filename').value = '';
  });

  downloadBtn.addEventListener('click', function() {
    const filename = document.getElementById('filename').value.trim();
    if (filename === '') {
      alert('Please enter a filename');
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs.length === 0) {
        console.error('No active tab found.');
        return;
      }
      const tab = tabs[0];
      const newTitle = filename;
      const path = `file:///Users/aveg/Desktop/MS/Extension/${newTitle}.pdf` ;
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: function(newTitle,path) {
          document.title = newTitle;
          window.print()
          alert(path)
        },
        args: [newTitle,path]
      });
    });
  });
});


