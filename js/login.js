function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    if (email && password) {
        alert('Inicio de sesión exitoso');
        window.location.href = 'carritos.html';
    } else {
        alert('Por favor, complete todos los campos');
    }
}

function signup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    if (name && email && password) {
        alert('Registro exitoso');
        window.location.href = 'carritos.html';
    } else {
        alert('Por favor, complete todos los campos');
    }
}