class PagPilotos extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/ `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap');
        
        body {
            margin: 0;
            font-family: 'Orbitron', sans-serif;
            background-color: #0d1117;
            color: white;
        }
  
        .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            padding: 20px;
        }
  
        .card {
            width: 250px;
            background: linear-gradient(135deg, rgba(0, 183, 255, 0.2), rgba(0, 0, 0, 0.9));
            border: 2px solid rgba(0, 183, 255, 0.7);
            border-radius: 15px;
            padding: 15px;
            text-align: center;
            box-shadow: 0 0 15px rgba(0, 183, 255, 0.5);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
  
        .card:hover {
            transform: scale(1.05);
            box-shadow: 0 0 25px rgba(0, 183, 255, 0.9);
        }
  
        .card img {
            width: 100%;
            border-radius: 10px;
            margin-bottom: 10px;
        }
  
        .card h2 {
            font-size: 20px;
            margin: 10px 0 5px;
        }
  
        .card p {
            font-size: 14px;
            margin: 5px 0;
            color: rgba(255, 255, 255, 0.8);
        }
  
        .role {
            background: rgba(0, 183, 255, 0.7);
            padding: 5px 10px;
            border-radius: 10px;
            font-size: 12px;
            display: inline-block;
            text-transform: uppercase;
        }
  
        .register-btn {
            display: block;
            margin: 30px auto;
            background: linear-gradient(135deg, #00b7ff, #005b96);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 18px;
            font-family: 'Orbitron', sans-serif;
            border-radius: 30px;
            cursor: pointer;
            text-decoration: none;
            box-shadow: 0 0 15px rgba(0, 183, 255, 0.9);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            text-transform: uppercase;
        }
  
        .register-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 0 25px rgba(0, 183, 255, 1);
        }
  
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            justify-content: center;
            align-items: center;
        }
  
        .modal-content {
            background: rgba(0, 183, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 0 20px rgba(0, 183, 255, 0.9);
            color: white;
        }
  
        .close-btn {
            background: red;
            color: white;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            margin-top: 10px;
            border-radius: 5px;
            transition: 0.3s;
        }
  
        .close-btn:hover {
            background: darkred;
        }
      </style>
  
      <div class="container">
          <div class="card" onclick="showInfo('JANEL', 'Leader of the team, known for aggressive driving.')">
            <img src="img/max.jpeg" alt="JANEL">
            <h2>JANEL</h2>
            <p class="role">Leader</p>
          </div>
          
          <div class="card" onclick="showInfo('HAMEL', 'A strategic second driver with great overtaking skills.')">
            <img src="img/lando2.jpeg" alt="HAMEL">
            <h2>HAMEL</h2>
            <p class="role">Second</p>
          </div>
          
          <div class="card" onclick="showInfo('DEVEL', 'Young talent with high potential and fast reflexes.')">
            <img src="img/charles.jpeg" alt="DEVEL">
            <h2>DEVEL</h2>
            <p class="role">Second</p>
          </div>
      </div>
  
      <a href="form-pilotos.html" class="register-btn">Registrar Piloto</a>
  
      <div class="modal" id="infoModal">
        <div class="modal-content">
          <h2 id="driverName"></h2>
          <p id="driverInfo"></p>
          <button class="close-btn" onclick="closeModal()">Cerrar</button>
        </div>
      </div>  
      `;
    }
  }
  
  customElements.define('pag-pilotos', PagPilotos);
  
  function showInfo(name, info) {
    const modal = document.getElementById('infoModal');
    document.getElementById('driverName').innerText = name;
    document.getElementById('driverInfo').innerText = info;
    modal.style.display = 'flex';
  }
  
  function closeModal() {
    const modal = document.getElementById('infoModal');
    modal.style.display = 'none';
  }
  