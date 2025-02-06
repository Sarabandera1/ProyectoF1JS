import "simulador.css"
import Spline from '@splinetool/react-spline'

function simulador(){

    return (
        <div className="simulador">
            <h1>Bienvenidos</h1>
            <Spline scene="https://prod.spline.design/bYya5zo8dYJDUJJC/scene.splinecode"></Spline>
        </div>
    )

}
import { Application } from '@splinetool/runtime';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/bYya5zo8dYJDUJJC/scene.splinecode');
