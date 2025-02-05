class VehicleManager extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.getElementById('vehicle-manager-template');
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
        this.vehicles = [];
        this.apiUrl = 'http://localhost:3000';
    }

    connectedCallback() {
        this.setupEventListeners();
        this.loadVehicles();
    }

    async loadVehicles() {
        try {
            const response = await fetch(`${this.apiUrl}/vehicles`);
            this.vehicles = await response.json();
            this.renderVehicles();
        } catch (error) {
            console.error('Error loading vehicles:', error);
        }
    }

    setupEventListeners() {
        const addBtn = this.shadowRoot.querySelector('.btn-add');
        const compareBtn = this.shadowRoot.querySelector('.btn-compare');
        const form = this.shadowRoot.querySelector('.vehicle-form');
        const formDialog = this.shadowRoot.querySelector('.vehicle-form-dialog');
        const compareDialog = this.shadowRoot.querySelector('.compare-dialog');

        addBtn.addEventListener('click', () => formDialog.showModal());
        compareBtn.addEventListener('click', () => this.showComparison());
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const vehicleData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${this.apiUrl}/vehicles`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vehicleData)
            });

            if (response.ok) {
                this.loadVehicles();
                event.target.reset();
                this.shadowRoot.querySelector('.vehicle-form-dialog').close();
            }
        } catch (error) {
            console.error('Error saving vehicle:', error);
        }
    }

    renderVehicles() {
        const grid = this.shadowRoot.querySelector('.vehicles-grid');
        grid.innerHTML = this.vehicles.map(vehicle => this.createVehicleCard(vehicle)).join('');
        
        
        grid.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => this.editVehicle(e.target.dataset.id));
        });
        
        grid.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => this.deleteVehicle(e.target.dataset.id));
        });
    }

    createVehicleCard(vehicle) {
        return `
            <div class="vehicle-card ${vehicle.type.toLowerCase()}">
                <h3>${vehicle.name}</h3>
                <p>Team: ${vehicle.team}</p>
                <p>Driver: ${vehicle.driver}</p>
                <div class="vehicle-stats">
                    <div class="stat-item">Speed: ${vehicle.speed} km/h</div>
                    <div class="stat-item">Acceleration: ${vehicle.acceleration}s</div>
                    <div class="stat-item">Fuel: ${vehicle.fuelConsumption}L/100km</div>
                    <div class="stat-item">Tyre Wear: ${vehicle.tyreDegradation}%</div>
                </div>
                <div class="card-actions">
                    <button class="btn-edit" data-id="${vehicle.id}">Edit</button>
                    <button class="btn-delete" data-id="${vehicle.id}">Delete</button>
                </div>
            </div>
        `;
    }

    async deleteVehicle(id) {
        if (confirm('Are you sure you want to delete this vehicle?')) {
            try {
                await fetch(`${this.apiUrl}/vehicles/${id}`, { method: 'DELETE' });
                this.loadVehicles();
            } catch (error) {
                console.error('Error deleting vehicle:', error);
            }
        }
    }

    showComparison() {
        const dialog = this.shadowRoot.querySelector('.compare-dialog');
        const container = dialog.querySelector('.comparison-grid');
        
    
        container.innerHTML = this.vehicles.map(vehicle => `
            <div class="vehicle-card ${vehicle.type.toLowerCase()}">
                <h3>${vehicle.name}</h3>
                <div class="vehicle-stats">
                    <div class="stat-item">Speed: ${vehicle.speed} km/h</div>
                    <div class="stat-item">Acceleration: ${vehicle.acceleration}s</div>
                    <div class="stat-item">Fuel: ${vehicle.fuelConsumption}L/100km</div>
                    <div class="stat-item">Tyre Wear: ${vehicle.tyreDegradation}%</div>
                </div>
            </div>
        `).join('');

        dialog.showModal();
    }
}

customElements.define('vehicle-manager', VehicleManager);