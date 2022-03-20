const fcfsCheck: HTMLInputElement = document.querySelector('#fcfs');
const stfCheck: HTMLInputElement = document.querySelector('#stf');
const rrCheck: HTMLInputElement = document.querySelector('#rr');

let simulador: Simulacion = undefined;

function validarOpt($e: Event, type: Simulacion) {
    switch(type) {
        case 'fcfs':
            if (fcfsCheck.checked) {
                stfCheck.checked = false;
                rrCheck.checked = false;
                simulador = type;
            } else {
                simulador = undefined;
            }
            break;
        case 'stf':
            if (stfCheck.checked) {
                fcfsCheck.checked = false;
                rrCheck.checked = false;
                simulador = type;
            } else {
                simulador = undefined;
            }
            break;
        case 'rr':
            if (rrCheck.checked) {
                fcfsCheck.checked = false;
                stfCheck.checked = false;
                simulador = type;
            } else {
                simulador = undefined;
            }
            break;
    }
}

fcfsCheck.addEventListener('change', $e => validarOpt($e, 'fcfs'));
stfCheck.addEventListener('change', $e => validarOpt($e, 'stf'));
rrCheck.addEventListener('change', $e => validarOpt($e, 'rr'));