
const scriptURL = 'https://script.google.com/macros/s/AKfycbwS8QzTRmIWVDBbgzwZD3t6q7sSB4ufBtebPURZuVbWH4BBC773KGlPxjPKvNZsmVdCQ/exec'; // URL del Apps Script

document.getElementById('voteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const category = document.getElementById('category').value;
    const name = document.getElementById('name').value;

    if (!category || !name) {
        document.getElementById('message').textContent = 'Por favor, completa todos los campos.';
        return;
    }

    // Verificar si ya se ha votado
    if (localStorage.getItem('hasVoted')) {
        document.getElementById('message').textContent = 'Ya has emitido tu voto. Solo se permite uno por persona.';
        return;
    }

    // Enviar datos a Google Sheets
    fetch(scriptURL, {
        method: 'POST',
        body: new URLSearchParams({ 'category': category, 'name': name })
    })
    .then(response => {
        localStorage.setItem('hasVoted', 'true');
        document.getElementById('message').textContent = '¡Voto registrado con éxito!';
        document.getElementById('voteForm').reset();
    })
    .catch(error => {
        document.getElementById('message').textContent = 'Error al enviar el voto. Intenta nuevamente.';
        console.error('Error:', error);
    });
});
