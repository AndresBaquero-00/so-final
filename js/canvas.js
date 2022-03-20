"use strict";
/**
 * Contador de colores.
 */
let cont = 0;
/**
 * Array que almacena los colores que se van a usar para dibujar cada proceso en el diagrama.
 */
const colores = ['red', 'green', 'blue', 'orange', '#7D3C98', 'black'];
/**
 * Función que dibuja la recta numérica inicial del diagrama.
 */
const iniciarDiagrama = () => {
    ctx.fillStyle = '#F4F6F6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.font = '10pt Arial';
    ctx.moveTo(0, 7.5);
    ctx.lineTo(canvas.width, 7.5);
    for (let j = 0; j <= canvas.width / 10; j++) {
        ctx.moveTo(2 + j * 10, 2);
        ctx.lineTo(2 + j * 10, 13);
        ctx.stroke();
        if (j % 5 === 0) {
            if (j >= 10) {
                ctx.fillText(j.toString(), j * 10 - 5, 30);
            }
            else {
                ctx.fillText(j.toString(), j * 10, 30);
            }
        }
    }
};
/**
 * Función que dibuja la recta asociada a cada proceso en el canvas.
 * @param proceso
 */
const dibujarProceso = (proceso) => {
    if (cont === colores.length) {
        cont = 0;
    }
    ctx.strokeStyle = colores[cont];
    cont++;
    /* Dibuja (|) tiempo de llegada */
    ctx.setLineDash([]);
    ctx.beginPath();
    if (proceso.padre) {
        ctx.moveTo(2 + (proceso.padre.tiempo.tiempo_comienzo + proceso.padre.tiempo.tiempo_ejecutado) * 10, 2 + 35 * (i + 1));
        ctx.lineTo(2 + (proceso.padre.tiempo.tiempo_comienzo + proceso.padre.tiempo.tiempo_ejecutado) * 10, 13 + 35 * (i + 1));
    }
    else {
        ctx.moveTo(2 + proceso.tiempo.tiempo_llegada * 10, 2 + 35 * (i + 1));
        ctx.lineTo(2 + proceso.tiempo.tiempo_llegada * 10, 13 + 35 * (i + 1));
    }
    ctx.stroke();
    /* Dibuja (|) tiempo de comienzo */
    ctx.beginPath();
    ctx.moveTo(2 + proceso.tiempo.tiempo_comienzo * 10, 2 + 35 * (i + 1));
    ctx.lineTo(2 + proceso.tiempo.tiempo_comienzo * 10, 13 + 35 * (i + 1));
    ctx.stroke();
    /* Dibuja (|) tiempo ejecutado */
    ctx.beginPath();
    ctx.moveTo(2 + (proceso.tiempo.tiempo_comienzo + proceso.tiempo.tiempo_ejecutado) * 10, 2 + 35 * (i + 1));
    ctx.lineTo(2 + (proceso.tiempo.tiempo_comienzo + proceso.tiempo.tiempo_ejecutado) * 10, 13 + 35 * (i + 1));
    ctx.stroke();
    /* Dibuja linea desde tiempo de llegada hasta tiempo de comienzo (Tiempo Ejecucion) */
    ctx.beginPath();
    ctx.moveTo(2 + proceso.tiempo.tiempo_comienzo * 10, 7.5 + 35 * (i + 1));
    ctx.lineTo(2 + (proceso.tiempo.tiempo_comienzo + proceso.tiempo.tiempo_ejecutado) * 10, 7.5 + 35 * (i + 1));
    ctx.stroke();
    /* Dibuja linea desde tiempo de llegada hasta tiempo de comienzo (Tiempo Espera) */
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    if (proceso.padre) {
        ctx.moveTo(2 + (proceso.padre.tiempo.tiempo_comienzo + proceso.padre.tiempo.tiempo_ejecutado) * 10, 7.5 + 35 * (i + 1));
        ctx.lineTo(2 + proceso.tiempo.tiempo_comienzo * 10, 7.5 + 35 * (i + 1));
    }
    else {
        ctx.moveTo(2 + proceso.tiempo.tiempo_llegada * 10, 7.5 + 35 * (i + 1));
        ctx.lineTo(2 + proceso.tiempo.tiempo_comienzo * 10, 7.5 + 35 * (i + 1));
    }
    ctx.stroke();
    ctx.fillText(proceso.nombre, 15 + (proceso.tiempo.tiempo_comienzo + proceso.tiempo.tiempo_ejecutado) * 10, 13 + 35 * (i + 1));
};
