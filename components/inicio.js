class paginaPrincipal extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/ `
      <style>
        /* Contenedor del video */
        .video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1;
        }
  
        /* Ajustes para que el video cubra todo */
        .video-background video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
  
        /* Contenido principal */
        main {
          position: relative;
          z-index: 1;
        }
  
        /* Ocultar scrollbar */
        body::-webkit-scrollbar {
          display: none;
        }
  
        /* Estilos del nav */
        nav {
          position: fixed;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 10vh;
          padding: 0 10vw;
          z-index: 99;
          background: rgba(0, 0, 0, 0.8);
        }
  
        .cntr-nav {
          display: flex;
          gap: 5vw;
        }
  
        nav a, nav i {
          font-size: 1.5vw;
          text-decoration: none;
          color: white;
          transition: 0.3s;
        }
  
        nav a:hover {
          text-shadow: 0 0 10px red, 0 0 20px red;
        }
  
        /* Sección de encabezado */
        .header {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100vh;
          background: url('Assets/road.png') repeat-x;
          background-size: cover;
          animation: roadMove 3s linear infinite;
        }
  
        @keyframes roadMove {
          from { background-position: 0 0; }
          to { background-position: -200% 0; }
        }
  
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
  
        .header h1 {
          font-size: 15vw;
          font-family: 'Orbitron', sans-serif;
          color: red;
          animation: blink 1s infinite;
          text-shadow: 0 0 20px red;
        }
  
        /* Contenedor del ranking */
        .ranking-container {
          width: 90%;
          margin: auto;
          background: #222;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
          text-align: left;
        }
  
        .top-drivers {
          display: flex;
          justify-content: space-around;
          gap: 20px;
        }
  
        .driver {
          text-align: center;
          background: white;
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          color: black;
        }
  
        .champion {
          border: 3px solid gold;
        }
  
        .ranking-table {
          width: 100%;
          margin-top: 20px;
          border-collapse: collapse;
        }
  
        .ranking-table th, .ranking-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
  
        .ranking-table th {
          background: #333;
          color: white;
        }
  
        button {
          margin-top: 20px;
          padding: 10px 20px;
          background: red;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s;
          display: block;
        }
  
        button:hover {
          background: darkred;
        }
  
        /* Estilos para la sección de noticias */
        .news-section {
          margin-top: 50px;
          text-align: center;
          color: white;
        }
  
        .news-item {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 20px;
          padding: 10px;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
        }
  
        .news-item img {
          max-width: 200px;
          border-radius: 10px;
          margin-right: 20px;
        }
  
        .news-item div {
          text-align: left;
        }
  
        .news-item h3 {
          color: red;
          margin: 0;
        }
  
        .news-item p {
          margin: 10px 0;
        }
      </style>
  
      <div class="video-background">
        <video autoplay muted loop>
          <source src="./video/fondo.mp4" type="video/mp4">
        </video>
      </div>
      <div id="main">
        <nav>
          <a href="#"><img class="logo" src="Assets/f1.png" alt="Logo"></a>
          <div class="cntr-nav">
            <a href="./pilotos.js">Pilotos</a>
            <a href="carreras.html">Carreras</a>
            <a href="autos.html">Autos</a>
            <a href="contactar.html">Contactar</a>
          </div>
          <i class="ri-search-line"></i>
        </nav>
        <div class="header">
          <h1>FORMULA1</h1>
          <img id="can" src="Assets/pngwing.com.png" alt="">
        </div>
        <div class="ranking-container">
          <div class="top-drivers">
            <div class="driver">
              <img src="img/lando2.jpeg" alt="Lando Norris">
              <p>Lando <strong>NORRIS</strong></p>
            </div>
            <div class="driver champion">
              <img src="img/max.jpeg" alt="Max Verstappen">
              <p>Máximo <strong>VERSTAPPEN</strong></p>
            </div>
            <div class="driver">
              <img src="img/charles.jpeg" alt="Charles Leclerc">
              <p>Charles <strong>LECLERC</strong></p>
            </div>
          </div>
          <table class="ranking-table" id="ranking-table">
            <tr>
              <th>#</th>
              <th>Piloto</th>
              <th>Equipo</th>
              <th>Puntos</th>
            </tr>
            <tr>
              <td>1</td>
              <td><strong>Máximo VERSTAPPEN</strong></td>
              <td>Red Bull</td>
              <td>437</td>
            </tr>
            <tr>
              <td>2</td>
              <td><strong>Lando NORRIS</strong></td>
              <td>McLaren</td>
              <td>374</td>
            </tr>
            <tr>
              <td>3</td>
              <td><strong>Charles LECLERC</strong></td>
              <td>Ferrari</td>
              <td>356</td>
            </tr>
            <tr>
              <td>4</td>
              <td><strong>Óscar PIASTRI</strong></td>
              <td>McLaren</td>
              <td>292</td>
            </tr>
            <tr>
              <td>5</td>
              <td><strong>Carlos SAINZ</strong></td>
              <td>Ferrari</td>
              <td>290</td>
            </tr>
          </table>
        </div>
        <div class="news-section">
          <h2>Últimas Noticias</h2>
          <div class="news-item">
            <img src="img/news1.jpeg" alt="Noticia 1">
            <div>
              <h3>Red Bull domina la temporada</h3>
              <p>Red Bull continúa su racha imparable, logrando múltiples victorias esta temporada.</p>
            </div>
          </div>
          <div class="news-item">
            <img src="img/news2.jpeg" alt="Noticia 2">
            <div>
              <h3>McLaren se acerca al podio</h3>
              <p>El equipo británico ha demostrado un impresionante rendimiento con Norris y Piastri.</p>
            </div>
          </div>
        </div>
      </div>
      `;
    }
  }
  
  customElements.define('pag-principal', paginaPrincipal);
  