interface Bloqueo {
    tiempo_block?: number;
    bloqueado?: boolean;
    tiempo_llegada?: number;
}

interface Tiempo {
    tiempo_llegada: number;
    tiempo_comienzo?: number;
    tiempo_ejecutado?: number;
    tiempo_final?: number;
    tiempo_retorno?: number;
    tiempo_espera?: number;
    tiempo_cola?: number;
}

interface Proceso {
    nombre: string;
    rafaga: number;
    tiempo: Tiempo;
    tipo: Simulacion;
    padre: Proceso;
    bloqueo?: Bloqueo;
}

type Simulacion = 'fcfs' | 'stf' | 'rr';