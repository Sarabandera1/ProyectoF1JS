document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('video');
    const form = document.querySelector('form');

    // Ensure video plays and loops correctly
    video.addEventListener('ended', () => {
        video.play();
    });

    // Optional: Add form submission handling
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission
        
        // Example of form validation
        const formData = new FormData(form);
        const username = formData.get('username');
        const password = formData.get('password');

        // Basic validation
        if (!username || !password) {
            alert('Por favor, complete todos los campos');
            return;
        }

        // Here you would typically send data to server
        console.log('Formulario enviado', { username, password });
    });

    // Optional: Add video controls
    const toggleVideoBtn = document.createElement('button');
    toggleVideoBtn.textContent = 'Pausar/Reanudar Video';
    toggleVideoBtn.style.position = 'absolute';
    toggleVideoBtn.style.top = '10px';
    toggleVideoBtn.style.right = '10px';
    toggleVideoBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
    document.body.appendChild(toggleVideoBtn);
});