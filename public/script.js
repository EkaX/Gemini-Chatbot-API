const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  // Send message to backend using fetch
  fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userMessage }),
  })
  .then(response => {
    if (!response.ok) {
      // If the response is not OK, try to parse the error message from the backend
      return response.json().then(err => {
        throw new Error(err.reply || `HTTP error! status: ${response.status}`);
      }).catch(() => {
        // If parsing error fails, throw a generic error
        throw new Error(`HTTP error! status: ${response.status}`);
      });
    }
    return response.json();
  })
  .then(data => {
    appendMessage('bot', data.reply);
  })
  .catch(error => {
    console.error('Error sending message:', error);
    appendMessage('bot', `Sorry, something went wrong: ${error.message}`);
  });
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
