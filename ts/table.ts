/**
 * Función que se encarga de agregar un nuevo proceso a la tabla del algoritmo FCFS.
 * @param proceso El proceso registrado
 */
const registrarProcesoFCFS = (proceso: Proceso) => {
    tableFCFS.children[1].innerHTML +=
        `<tr>
            <td>${proceso.nombre}</td>
            <td>${proceso.tiempo.tiempo_llegada}</td>
            <td>${proceso.rafaga}</td>
         </tr>`;
};
/**
 * Función que se encarga de agregar un nuevo proceso a la tabla del algoritmo STF.
 * @param proceso El proceso registrado
 */
const registrarProcesoSTF = (proceso: Proceso) => {
    tableSTF.children[1].innerHTML +=
        `<tr>
            <td>${proceso.nombre}</td>
            <td>${proceso.tiempo.tiempo_llegada}</td>
            <td>${proceso.rafaga}</td>
         </tr>`;
};
/**
 * Función que se encarga de agregar un nuevo proceso a la tabla del algoritmo RR.
 * @param proceso El proceso registrado
 */
const registrarProcesoRR = (proceso: Proceso) => {
    tableRR.children[1].innerHTML +=
        `<tr>
            <td>${proceso.nombre}</td>
            <td>${proceso.tiempo.tiempo_llegada}</td>
            <td>${proceso.rafaga}</td>
         </tr>`;
};
/**
 * Funcion encargada de eliminar un proceso de la tabla de procesos STF.
 * @param proceso El proceso que se va a eliminar.
 */
const eliminarProcesoSTF = (proceso: Proceso) => {
    for (const child of tableSTF.children[1].children) {
        if (child.children[0].innerHTML === proceso.nombre) {
            child.remove();
            break;
        }
    }
};
/**
 * Funcion encargada de eliminar un proceso de la tabla de procesos RR.
 * @param proceso El proceso que se va a eliminar.
 */
const eliminarProcesoRR = (proceso: Proceso) => {
    for (const child of tableRR.children[1].children) {
        if (child.children[0].innerHTML === proceso.nombre) {
            child.remove();
            break;
        }
    }
};
/**
 * Función que agrega el proceso en ejecución a la tabla de procesos ejecutados.
 * @param proceso 
 */
const registrarProceso = (proceso: Proceso): void => {
    tableResultados.children[1].innerHTML +=
        `<tr>
            <td>${proceso.nombre}</td>
            <td>${proceso.tiempo.tiempo_llegada}</td>
            <td>${proceso.rafaga}</td>
            <td>${proceso.tiempo.tiempo_comienzo}</td>
            <td>${proceso.tiempo.tiempo_final}</td>
            <td>${proceso.tiempo.tiempo_retorno}</td>
            <td>${proceso.tiempo.tiempo_espera}</td>
         </tr>`;
}