export class F1Ranking extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = /*HTML */`
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

                .sections {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 20px;
                }

                .section {
                    text-align: center;
                    background: #444;
                    padding: 15px;
                    border-radius: 10px;
                    color: white;
                    text-decoration: none;
                    width: 22%;
                    transition: 0.3s;
                }

                .section:hover {
                    background: red;
                }
                
                /* Botón */
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
                
                .hidden {
                    display: none;
                }

                #showRanking {
                    display: block;
                }
            </style>
 <div id="main">
        <nav>
            <a  href="#"><img class="logo" src="Assets\f1.png" alt=""></a>
            <div class="cntr-nav">
                <a href="pilotos.html">Pilotos</a>
                <a href="#">Carreras</a>
                <a href="#">Autos</a>
                <a href="#">Contactar</a>
            </div>
            <i class="ri-search-line"></i>
        </nav>
        <div class="header">
            <h1>FORMULA1</h1>
            <img id="can" src="Assets\pngwing.com.png" alt="">
        </div>
        <div class="about">
            <div class="about-left">
            </div>
            <div class="about-right">
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
                        <tbody id="extra-rows" class="hidden">
                            <tr>
                                <td>6</td>
                                <td><strong>George RUSSELL</strong></td>
                                <td>Mercedes</td>
                                <td>245</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td><strong>Lewis HAMILTON</strong></td>
                                <td>Mercedes</td>
                                <td>230</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td><strong>Sergio PÉREZ</strong></td>
                                <td>Red Bull</td>
                                <td>220</td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td><strong>Fernando ALONSO</strong></td>
                                <td>Aston Martin</td>
                                <td>200</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td><strong>Esteban OCON</strong></td>
                                <td>Alpine</td>
                                <td>180</td>
                            </tr>
                        </tbody>
                    </table>
            
                    <button id="show-more">VER CLASIFICACIÓN COMPLETA</button>
            
                    <div class="sections">
                        <a href="pilotos.html" class="section">
                            <img src="img/piloto.jpg" alt="Impacto">
                            <p>Seccion Pilotos</p>
                        </a>
                        <a href="pistas.html" class="section">
                            <img src="img/pistafondo.jpeg" alt="Calendario de carreras">
                            <p>Pistas</p>
                        </a>
                        <a href="circuito.html" class="section">
                            <img src="podcasts.png" alt="Podcasts">
                            <p>Circuitos</p>
                        </a>
                        <a href="deportes.html" class="section">
                            <img src="deportes.png" alt="Deportes electrónicos">
                            <p>Deportes electrónicos</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="product">
        </div>
    </div>
        `;
    }

    setupEventListeners() {
        const showMoreButton = this.shadowRoot.querySelector("#show-more");
        const extraRows = this.shadowRoot.querySelector("#extra-rows");

        showMoreButton.addEventListener("click", () => {
            extraRows.classList.toggle("hidden");
            showMoreButton.textContent = extraRows.classList.contains("hidden") ? "VER CLASIFICACIÓN COMPLETA" : "OCULTAR CLASIFICACIÓN";
        });
    }
}

customElements.define('f1-ranking', F1Ranking);
