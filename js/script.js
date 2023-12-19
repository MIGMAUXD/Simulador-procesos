/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


let PROCESS = [];
let cyclesDispatcher = 0;
let cyclesInterrupts = 0;
const estadoProcesos = {};
const estadoProcesos2 = {};
let timeTotal = 0;

function addProcess() {
    const inputElement = document.getElementById('processInput');
    const infoProcess = inputElement.value.trim();

    // Validar que los datos sean números o los caracteres 'I', 'F', 'T'
    const isValidData = /^([1-9]\d{0,3}|10000)(,([0-9]|[1-9]\d{0,3}|I|F|T))*$/i.test(infoProcess);

    if (isValidData) {
        // Divide la cadena de entrada en procesos utilizando la coma como separador
        const separatedProcesses = infoProcess.split(',');

        // Validar que el primer elemento sea un número
        const firstElement = separatedProcesses[0].trim();
        if (!isNaN(firstElement)) {
            // Filtra procesos vacíos y agrega al array bidimensional
            const validProcesses = separatedProcesses.filter(process => process.trim() !== '');
            PROCESS.push(validProcesses);

            inputElement.value = '';

            document.getElementById("size").textContent = PROCESS.length;
        } else {
            document.getElementById("size").textContent = ('Datos no válidos.');
            // Puedes tomar otras acciones según tus necesidades, como mostrar un mensaje de error.
        }
    } else {
        document.getElementById("size").textContent = ('Datos no válidos.');
        // Puedes tomar otras acciones según tus necesidades, como mostrar un mensaje de error.
    }
}











function showR() {
    const outBody = document.getElementById('outBody');
    outBody.innerHTML = '';

    for (let i = 0; i < PROCESS.length; i++) {
        const Out = procesarinfoProcess(PROCESS[i]);

        const row = document.createElement('tr');
        const cellinfoProcess = document.createElement('td');
        const cellOut = document.createElement('td');

        cellinfoProcess.textContent = "P-" + i;
        cellOut.textContent = PROCESS[i];

        row.appendChild(cellinfoProcess);
        row.appendChild(cellOut);

        outBody.appendChild(row);
    }
}

function procesarinfoProcess(infoProcess) {
    // Aquí puedes realizar cualquier procesamiento necesario en la infoProcess
    // En este ejemplo, simplemente devolvemos la longitud de la infoProcess
    return infoProcess.length;
}

function dispatcher() {
    planificarRoundRobin();
    document.getElementById("outDistpatcher").textContent = "Must print the dispatcher run table";
    let time = 1;
    const cuerpo = document.getElementById('cuerpo');
    cuerpo.innerHTML = '';

    for (let i = 0; i < PROCESS.length; i++) {
        const rows = document.createElement('tr');
        const celdaProcessIndex = document.createElement('td');
        celdaProcessIndex.textContent = "P-" + i;
        rows.appendChild(celdaProcessIndex);
        const procesoActual = PROCESS[i][0];

        let indiceLineaActual = estadoProcesos2[procesoActual] || 0;

        for (let j = 0; j < cyclesInterrupts; j++) {
            const celdaData = document.createElement('td');
            const linea = PROCESS[i][indiceLineaActual];
            if (linea != null) {
                if (linea.toLowerCase() === 'i' || linea.toLowerCase() === 't') {
                    celdaData.textContent = PROCESS[i][indiceLineaActual];
                    indiceLineaActual = indiceLineaActual + 1;
                    estadoProcesos2[procesoActual] = indiceLineaActual;
                    time++;
                    j = cyclesInterrupts + 1;
                    cuerpo.appendChild(rows);

                    if (PROCESS[i][indiceLineaActual].includes('F')) {
                        celdaData.style.backgroundColor = 'red'; // Si contiene "F", se cambia el color de fondo a rojo
                    } else if (!isNaN(PROCESS[i][indiceLineaActual])) {
                        celdaData.style.backgroundColor = 'green'; // Si es un número, cambia el color de fondo a verde
                    }
                    rows.appendChild(celdaData);
                }else {
                    celdaData.textContent = PROCESS[i][indiceLineaActual];
                    indiceLineaActual = indiceLineaActual + 1;
                    estadoProcesos2[procesoActual] = indiceLineaActual;
                    time++;
                    cuerpo.appendChild(rows);
                }
                
            }
        }
    }
}


function readAndDisplayData() {
    // read window :
    cyclesDispatcher = prompt("Dispatcher Cycles:");
    cyclesInterrupts = prompt("Interrupts Cycles:");



    // Show data
    document.getElementById("result").innerHTML = `
        <p>Dispatcher Cycles: ${cyclesDispatcher}</p>
        <p>Interrupts Cycles: ${cyclesInterrupts}</p>
      `;
}


function planificarRoundRobin() {


    let todasLasLineasEjecutadas = false;
    let time = 1 - (cyclesDispatcher);

    const table = document.createElement('table');
    table.innerHTML = '<tr><th>Time</th><th>Trace</th></tr>';


    const intervalId = setInterval(() => {
        let todasLasLineasEjecutadas = true; // Flag para verificar si todas las líneas se han ejecutado
        for (let i = 0; i < PROCESS.length; i++) {
            let disp = 100;

            for (let k = 0; k < cyclesDispatcher; k++) {

                const row = table.insertRow();
                const timeCell = row.insertCell(0);
                const traceCell = row.insertCell(1);

                if (time > 0) {
                    timeCell.textContent = time;
                }
                traceCell.textContent = disp;
                disp = disp + 1;
                time++
            }
            const procesoActual = PROCESS[i][0];

            let indiceLineaActual = estadoProcesos[procesoActual] || 0;

            for (let j = 0; j < cyclesInterrupts; j++) {
                const linea = PROCESS[i][indiceLineaActual];
                if (linea != null) {
                    if (linea.toLowerCase() === 'i' || linea.toLowerCase() === 't') {

                        todasLasLineasEjecutadas = false;


                        const row = table.insertRow();
                        const timeCell = row.insertCell(0);
                        const traceCell = row.insertCell(1);

                        timeCell.textContent = time;
                        traceCell.textContent = linea;

                        indiceLineaActual = indiceLineaActual + 1;
                        estadoProcesos[procesoActual] = indiceLineaActual;
                        time++
                        j = cyclesInterrupts + 1;
                    } else {
                        todasLasLineasEjecutadas = false;


                        const row = table.insertRow();
                        const timeCell = row.insertCell(0);
                        const traceCell = row.insertCell(1);

                        if (!isNaN(linea)) {
                            traceCell.style.backgroundColor = 'green'; // Si es un número, cambia el color de fondo a verde
                        }

                        timeCell.textContent = time;
                        traceCell.textContent = linea;

                        indiceLineaActual = indiceLineaActual + 1;
                        estadoProcesos[procesoActual] = indiceLineaActual;
                        time++
                        timeTotal = time - 1;

                    }
                }



            }






        }
        tiempoTotal();

        if (todasLasLineasEjecutadas || cyclesInterrupts <= 0) {
            clearInterval(intervalId);
            document.getElementById("outDistpatcher").innerHTML = '';
            document.getElementById("outDistpatcher").appendChild(table);
        };

    }, 1000);


}

function tiempoTotal() {
    document.getElementById("output").textContent = ('Tiempo consumido por el sistema: ' + timeTotal);
}
