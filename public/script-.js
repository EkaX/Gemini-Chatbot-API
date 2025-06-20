appendMessage('user', userMassage);
input.value = '';

//Simulasi Dummy Balasan Bot (Placeholder)
setTimeout(() => {
    appendMessage('bot', 'Gemini Sedang Berfikir wkwkwkwkkwk');
}, 1000);

// Send message to backend using fetch
fetch('api/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userMassage }),
})
.then(response => {
    if (response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    appendMessage('bot', data.reply);
})
.catch(error => {
    console.error('Error kirim pesan:', error);
    appendMessage('bot', 'Maaf, Gemini sedang mengalami kesalahan');
});