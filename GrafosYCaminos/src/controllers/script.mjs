import Graph from "../models/Graph.mjs";

const graph = new Graph();

document.addEventListener('DOMContentLoaded', () => {
    const btnAgregarDestino = document.getElementById("agregarDestinoBtn");
    const btnAgregarConexion = document.getElementById("agregarRutaBtn");
    const btnRecorridoProfundidad = document.getElementById("btnProfundidad");
    const btnRecorridoAnchura = document.getElementById("btnAnchura");
    const imprimir = document.getElementById("mostrarRecorridos");
    const imprimir2 = document.getElementById("mostrarRecorridosAn");

    btnAgregarDestino.addEventListener("click", () => {
        const destino = document.getElementById("destinoInput").value;
        
        if (destino.trim() !== '') {
            if (graph.addVertex(destino)) {
                Swal.fire("Registro exitoso", destino, "success");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El destino ya está registrado",
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ingrese un destino válido",
            });
        }
    });

    btnAgregarConexion.addEventListener("click", () => {
        const inicio = document.getElementById("inicioInput").value;
        const destino = document.getElementById("destinoFinalInput").value;
        const peso = parseInt(document.getElementById("distanciaInput").value);
        
        if (inicio.trim() !== '' && destino.trim() !== '' && !isNaN(peso)) {
            if (graph.addEdge(inicio, destino, peso)) {
                Swal.fire("Ruta agregada");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se pudo agregar la ruta",
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ingrese datos válidos para la ruta",
            });
        }
    });

    btnRecorridoProfundidad.addEventListener("click", () => {
        imprimir.innerHTML = '';
        const vertices = [...graph.getVertices()][0]; 
        graph.dfs(vertices, (vertex) => {
            imprimir.innerHTML += `${vertex} `;
            console.log(vertex);
        });
        Swal.fire("Recorrido en profundidad completado");
    });

    btnRecorridoAnchura.addEventListener("click", () => {
        imprimir2.innerHTML = '';
        const vertices = [...graph.getVertices()][0]; 
        graph.bfs(vertices, (vertex) => {
            imprimir2.innerHTML += `${vertex} `;
            console.log(vertex);
        });
        Swal.fire("Recorrido en anchura completado");
    });
});
