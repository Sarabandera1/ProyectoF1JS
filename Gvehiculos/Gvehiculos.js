document.addEventListener('DOMContentLoaded', () => {

    const addCarBtn = document.querySelector('.add-car-btn');
    const addCarModal = document.getElementById('addCarModal');
    const compareModal = document.getElementById('compareModal');
    const selectBtns = document.querySelectorAll('.select-btn');
    const assignBtns = document.querySelectorAll('.assign-btn');
    const editBtns = document.querySelectorAll('.edit-btn');
    const deleteBtns = document.querySelectorAll('.delete-btn');

    addCarBtn.addEventListener('click', () => {
        addCarModal.style.display = 'block';
    });


    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Seleccionar carro
    selectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const carCard = e.target.closest('.car-card');
            
        });
    });

    // Asignar piloto
    assignBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const carCard = e.target.closest('.car-card');
            
        });
    });

    // Editar carro
    editBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const carCard = e.target.closest('.car-card');
           
        });
    });

    // Eliminar carro
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (confirm('¿Estás seguro de que quieres eliminar este carro?')) {
                const carCard = e.target.closest('.car-card');
                
            }
        });
    });

    // Comparar carros
    function compareCars(car1, car2) {
        const comparisonGrid = document.querySelector('.comparison-grid');
        compareModal.style.display = 'block';
       
    }
});