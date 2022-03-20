/**
 * Contador de procesos.
 */
let i = 0;
/**
 * Almacena el tiempo de llegada del último proceso registrado.
 */
let ultimoTiempoLlegada = 0;
/**
 * Almacena el ultimo proceso registrado.
 */
let ultimoProceso: Proceso;
/**
 * Array que almacena los procesos que han sido bloqueados.
 */
const colaBloqueados: Proceso[] = [];
/**
 * Array que guarda los procesos en una cola de espera.
 */
const colaPrincipal: Proceso[] = [];
/**
 * Array que guarda los procesos que serán ejecutados con el algoritmo FCFS.
 */
const colaFCFS: Proceso[] = [];
/**
 * Array que guarda los procesos que serán ejecutados con el algoritmo STF.
 */
const colaSTF: Proceso[] = [];
 /**
 * Array que guarda los procesos que serán ejecutados con el algoritmo RR.
 */
const colaRR: Proceso[] = [];
/**
 * Almacena la cantidad de segundos que ha trabajado la sección crítica.
 */
let seconds = 0;
/**
* Determina si la sección crítica entra en estado de ejecucuón o no.
*/
let ejecutar = false;
/**
 * Tiempo máximo que espera un proceso en una cola de espera.
 */
const tiempoMax = 30;
/**
 * Función encargada de crear un nuevo proceso a partir de una plantilla.
 * @param nombre Nombre del proceso.
 * @param tiempo_llegada Tiempo de llegada del proceso.
 * @param rafaga Rafaga del proceso.
 * @param padre Padre del proceso.
 * @returns El proceso con sus respectivos datos.
 */
const crearProceso = (nombre?: string, tiempo_llegada: number = parseInt(txtLlegada.value), rafaga: number = parseInt(txtRafaga.value), padre?: Proceso, tipo: Simulacion = simulador): Proceso => {
    const proceso: Proceso = {
        nombre: nombre || txtProceso.value,
        rafaga: rafaga,
        tiempo: {
            tiempo_llegada: tiempo_llegada,
            tiempo_ejecutado: 0,
            tiempo_espera: 0,
            tiempo_comienzo: 0,
            tiempo_final: 0,
            tiempo_retorno: 0,
            tiempo_cola: 0
        },
        bloqueo: {
            tiempo_block: 0,
            tiempo_llegada: 0,
            bloqueado: false
        },
        padre: padre,
        tipo: tipo
    }
    return proceso;
}
/**
 * Función encargada de bloquear un proceso.
 */
const bloquearProceso = (): void => {
    if (colaPrincipal.length === 0) {
        return;
    }

    const proceso = datosProceso(colaPrincipal.shift());
    proceso.bloqueo.tiempo_llegada = proceso.tiempo.tiempo_comienzo + proceso.tiempo.tiempo_ejecutado;
    proceso.bloqueo.bloqueado = true;
    colaBloqueados.push(proceso);

    registrarProceso(proceso);
    dibujarProceso(proceso);
    ultimoProceso = proceso;
    i++;

    swal({
        title: 'Info',
        text: `El proceso ${ proceso.nombre } ha sido bloqueado.`,
        icon: 'info'
    });
    // alert(`El proceso ${ proceso.nombre } ha sido bloqueado.`);

    cambiar();
}
/**
 * Función encargada de calcular los tiempos asociados a cada proceso.
 * @param proceso El proceso que se van a calcular sus tiempos.
 * @returns El proceso con todos sus tiempos calculados.
 */
const datosProceso = (proceso: Proceso): Proceso => {
    if (!ultimoProceso) {
        proceso.tiempo.tiempo_comienzo = proceso.tiempo.tiempo_llegada;
    } else {
        proceso.tiempo.tiempo_comienzo = ultimoProceso.tiempo.tiempo_final >= proceso.tiempo.tiempo_llegada ? 
            ultimoProceso.tiempo.tiempo_final : proceso.tiempo.tiempo_llegada;

        if (proceso.bloqueo.bloqueado) {
            proceso.tiempo.tiempo_comienzo += proceso.bloqueo.tiempo_block;
        }
    }

    proceso.tiempo.tiempo_final = proceso.tiempo.tiempo_comienzo + proceso.tiempo.tiempo_ejecutado;
    proceso.tiempo.tiempo_retorno = proceso.bloqueo.bloqueado ?
        proceso.tiempo.tiempo_final - proceso.bloqueo.tiempo_llegada:proceso.tiempo.tiempo_final - proceso.tiempo.tiempo_llegada;
    proceso.tiempo.tiempo_espera += proceso.tiempo.tiempo_retorno - proceso.tiempo.tiempo_ejecutado;
    
    return proceso;
}
/**
 * Función encargada de ordenar los procesos según su ráfaga.
 * @param a Primer proceso.
 * @param b Segundo proceso.
 * @returns Un valor numérico que indica como se deben ordenar los procesos.
 */
const ordenarProcesos = (a: Proceso, b: Proceso): number => {
    if (seconds < a.tiempo.tiempo_llegada || seconds < b.tiempo.tiempo_llegada) {
        return 0;
    }
    return a.rafaga - b.rafaga;
}
/**
 * Función encargada de ir agregando procesos a la cola principal.
 */
const alistarProcesos = () => {
    if (colaFCFS.length > 0) {
        colaPrincipal.push(colaFCFS.shift());
    } else if (colaSTF.length > 0) {
        colaSTF.sort(ordenarProcesos);
        colaPrincipal.push(colaSTF.shift());
    } else if (colaRR.length > 0) {
        colaPrincipal.push(colaRR.shift());
    }
}
/**
 * Función que permite visualizar el cambio de estado de la sección crítica.
 */
const cambiar = (): void => {
    free();
    alistarProcesos();
    ejecutar = false;
    if (colaPrincipal.length > 0) {
        setTimeout(() => { ejecutar = true }, 1000);
    }
}
/**
 * Función encargada de manejar los procesos con el algoritmo FCFS.
 */
const handlerFCFS = (): void => {
    if (colaPrincipal[0].tiempo.tiempo_ejecutado < colaPrincipal[0].rafaga) {
        busy();
        colaPrincipal[0].tiempo.tiempo_ejecutado++;
        seconds++;
        return;
    }

    const proceso = datosProceso(colaPrincipal.shift());
    registrarProceso(proceso);
    dibujarProceso(proceso);
    ultimoProceso = proceso;
    i++;

    cambiar();
}
/**
 * Función encargada de manejar los procesos con el algoritmo STF.
 */
const handlerSTF = (): void => {
    if (colaPrincipal[0].tiempo.tiempo_ejecutado < colaPrincipal[0].rafaga) {
        busy();
        colaPrincipal[0].tiempo.tiempo_ejecutado++;
        seconds++;
        return;
    }

    const proceso = datosProceso(colaPrincipal.shift());
    registrarProceso(proceso);
    dibujarProceso(proceso);
    ultimoProceso = proceso;
    i++;

    cambiar();
}
/**
 * Función encargada de manejar los procesos con el algoritmo RR.
 */
const handlerRR = (): void => {
    const quantum = 4;
    if (colaPrincipal[0].tiempo.tiempo_ejecutado < colaPrincipal[0].rafaga && colaPrincipal[0].tiempo.tiempo_ejecutado < quantum) {
        busy();
        colaPrincipal[0].tiempo.tiempo_ejecutado++;
        seconds++;
        return;
    }

    const proceso = datosProceso(colaPrincipal.shift());
    registrarProceso(proceso);
    dibujarProceso(proceso);
    ultimoProceso = proceso;
    i++;

    if (proceso.rafaga > quantum) {
        const procesoSobrante: Proceso = crearProceso(
            `$${ proceso.nombre }`,
            proceso.tiempo.tiempo_llegada,
            proceso.rafaga - proceso.tiempo.tiempo_ejecutado,
            proceso,
            proceso.tipo
        );
        colaRR.push(procesoSobrante);
    }

    cambiar();
}
/**
 * Función encargada del manejo global de la sección crítica.
 */
const handler = (): void => {
    if (!ejecutar || colaPrincipal.length === 0) {
        return;
    }

    if (seconds < colaPrincipal[0].tiempo.tiempo_llegada) {
        seconds++;
        return;
    }

    switch(colaPrincipal[0].tipo) {
        case 'fcfs':
            handlerFCFS();
            break;
        case 'stf':
            handlerSTF();
            break;
        case 'rr':
            handlerRR();
            break;
    }
    
    colaSTF.sort(ordenarProcesos);
    colaSTF.forEach((p, i, v) => {
        if (seconds < p.tiempo.tiempo_llegada) {
            return;
        }

        p.tiempo.tiempo_cola++;
        if (p.tiempo.tiempo_cola >= tiempoMax) {
            v[i].tiempo.tiempo_cola = 0;
            colaFCFS.push(...v.splice(i, 1));
            createToast(`El proceso ${ p.nombre } ha sido movido a la cola FCFS.`, 'info');
        }
    });

    colaRR.forEach((p, i, v) => {
        p.tiempo.tiempo_cola++;
        if (p.tiempo.tiempo_cola >= tiempoMax) {
            v[i].tiempo.tiempo_cola = 0;
            colaSTF.push(...v.splice(i, 1));
            createToast(`El proceso ${ p.nombre } ha sido movido a la cola STF.`, 'info');
        }
    });
}
/**
 * Función encargada del manejo de los procesos bloqueados.
 * El tiempo de bloqueo de un proceso es de 5s.
 */
const handlerColaBloqueo = (): void => {
    if (colaBloqueados.length > 0) {
        if (colaBloqueados[0].bloqueo.tiempo_block < 5) {
            colaBloqueados[0].bloqueo.tiempo_block++;
        } else {
            const proceso_bloqueado = colaBloqueados.shift();
            const proceso_reanudado = crearProceso(
                `${ proceso_bloqueado.nombre }*`,
                proceso_bloqueado.tiempo.tiempo_llegada,
                proceso_bloqueado.rafaga - proceso_bloqueado.tiempo.tiempo_ejecutado,
                proceso_bloqueado,
                proceso_bloqueado.tipo
            );

            switch(proceso_bloqueado.tipo) {
                case 'fcfs':
                    colaFCFS.push(proceso_reanudado);
                    break;
                case 'stf':
                    colaSTF.push(proceso_reanudado);
                    break;
                case 'rr':
                    colaRR.push(proceso_reanudado);
                    break;
            }
            
            swal({
                title: 'Info',
                text: `El proceso ${ proceso_bloqueado.nombre } ha sido desbloqueado.`,
                icon: 'info'
            });
            // alert(`El proceso ${ proceso_bloqueado.nombre } ha sido desbloqueado.`);
            ejecutarProceso();
        }
    }
}



