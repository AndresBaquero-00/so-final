// Botones
const btnEnviar: HTMLButtonElement = document.querySelector('#enviar');
const btnEjecutar: HTMLButtonElement = document.querySelector('#ejecutar');
const btnEnviarEjecutar: HTMLButtonElement = document.querySelector('#enviar-ejecutar');
const btnBloquear: HTMLButtonElement = document.querySelector('#bloquear');
// Campos de Texto
const txtProceso: HTMLInputElement = document.querySelector('#nombre-proceso');
const txtLlegada: HTMLInputElement = document.querySelector('#tiempo-llegada');
const txtRafaga: HTMLInputElement = document.querySelector('#rafaga');
// Contenedores
const divRojo: HTMLDivElement = document.querySelector('#rojo');
const divVerde: HTMLDivElement = document.querySelector('#verde');
const tableFCFS: HTMLTableElement = document.querySelector('#table-fcfs');
const tableSTF: HTMLTableElement = document.querySelector('#table-stf');
const tableRR: HTMLTableElement = document.querySelector('#table-rr');
const tableResultados: HTMLTableElement = document.querySelector('#table-resultados');
// Canvas
const canvas: HTMLCanvasElement = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
/**
 * Función que setea la sección crítica a estado ocupado.
 */
const busy = (): void => {
    divVerde.className = 'verde-inactivo';
    divRojo.className = 'rojo-activo';
};
/**
 * Función que setea la sección crítica a estado desocupado.
 */
const free = (): void => {
    divVerde.className = 'verde-activo';
    divRojo.className = 'rojo-inactivo';
};
/**
 * Funcion que permite agregar un proceso a la cola de espera.
 */
const enviarProceso = (): void => {
    const proceso = crearProceso();

    if (!proceso.tipo) {
        swal({
            title: 'Error',
            text: 'Debe seleccionar un algoritmo de procesos.',
            icon: 'error'
        });
        // alert('Debe seleccionar un algoritmo de procesos.');
        return;
    }

    if (!proceso.nombre || isNaN(proceso.tiempo.tiempo_llegada) || isNaN(proceso.rafaga)) {
        swal({
            title: 'Error',
            text: 'No se admiten campos vacíos. Intente nuevamente.',
            icon: 'error'
        });
        // alert('No se admiten campos vacíos. Intente nuevamente.');
        return;
    }

    if (proceso.tiempo.tiempo_llegada < ultimoTiempoLlegada) {
        swal({
            title: 'Error',
            text: `El tiempo del proceso ${proceso.nombre} debe ser mayor o igual a ${ultimoTiempoLlegada}`,
            icon: 'error'
        });
        // alert(`El tiempo del proceso ${proceso.nombre} debe ser mayor o igual a ${ultimoTiempoLlegada}`);
        return;
    }

    switch(proceso.tipo) {
        case 'fcfs':
            registrarProcesoFCFS(proceso);
            colaFCFS.push(proceso);
            break;
        case 'stf':
            registrarProcesoSTF(proceso);
            colaSTF.push(proceso);
            break;
        case 'rr':
            registrarProcesoRR(proceso);
            colaRR.push(proceso);
            break;
    }

    txtProceso.value = ''; txtLlegada.value = ''; txtRafaga.value = '';
    ultimoTiempoLlegada = proceso.tiempo.tiempo_llegada;
};
/**
 * Función que se encarga de ejecutar los procesos que están actualmente en la cola de espera.
 */
const ejecutarProceso = (): void => {
    ejecutar = true;
    alistarProcesos();
};

const timerSC = setInterval(handler, 1000);

// Eventos de los botones
btnEnviar.addEventListener('click', () => enviarProceso() );
btnEjecutar.addEventListener('click', () => ejecutarProceso() );
btnBloquear.addEventListener('click', () => {});
btnEnviarEjecutar.addEventListener('click', () => { enviarProceso(); ejecutarProceso(); });

free();
iniciarDiagrama();

