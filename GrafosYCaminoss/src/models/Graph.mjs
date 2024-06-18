import LinkedList from "./LinkedList.mjs";

export default class Graph {
    
    #matrizAdyacencia = []; 
    #map = new Map(); 

    constructor() {}

    // Método para agregar múltiples vértices
    addVertices(...vertices) {
        for (let vertex of vertices) {
            this.addVertex(vertex);
        }
    }

    // Método para agregar un solo vértice
    addVertex(vertex) {
        if (!this.#map.has(vertex)) { 
            this.#matrizAdyacencia.push(new LinkedList()); 
            this.#map.set(vertex, this.#matrizAdyacencia.length - 1); 
            return true;
        }
        return false;
    }

    // Método para agregar una conexión
    addEdge(node1, node2, weight = 1) {
        if (this.#map.has(node1) && this.#map.has(node2)) { 
            this.#matrizAdyacencia[this.#map.get(node1)].push(node2, weight);
            return true;
        }
        return false;
    }

    // Dijkstra
    dijkstra(startVertex, endVertex) {

        const inf = Infinity;
        const distances = new Array(this.numVertices()).fill(inf);
        const visited = new Array(this.numVertices()).fill(false);
        const startIndex = this.#map.get(startVertex);
        const endIndex = this.#map.get(endVertex);
        distances[startIndex] = 0;
    
        while (true) {
            let u = -1;
            let minDistance = inf;
            for (let i = 0; i < this.numVertices(); i++) {
                if (!visited[i] && distances[i] < minDistance) {
                    minDistance = distances[i];
                    
                    u = i;
                }
            } 
            if (u === -1) {
                break;
            }
            visited[u] = true;
            const neighbors = this.#matrizAdyacencia[u];
            let current = neighbors.head;
    
            while (current) {
                const neighborIndex = this.#map.get(current.value.node);
                const weight = current.value.weight;
                if (distances[u] + weight < distances[neighborIndex]) {
                    distances[neighborIndex] = distances[u] + weight;
                }
                current = current.next;
            }
        }
        return distances[endIndex];
    }

    // Recorrido en profundidad (DFS)
    dfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }

        const visited = {}; 
        const stack = []; 
        stack.push(startVertex); 

        while (stack.length > 0) {
            const currentVertex = stack.pop(); 
            if (!visited[currentVertex]) { 
                callback(currentVertex); 
                visited[currentVertex] = true; 
                const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)]; 
                let current = neighborsLinkedList.head; 
                while (current) {
                    const neighborVertex = current.value.node; 
                    if (!visited[neighborVertex]) {
                        stack.push(neighborVertex); 
                    }
                    current = current.next; 
                }
            }
        }
    }

    // Recorrido en anchura (BFS)
    bfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }

        const visited = {}; 
        const queue = []; 
        queue.push(startVertex); 

        while (queue.length > 0) {
            const currentVertex = queue.shift(); 
            if (!visited[currentVertex]) { 
                callback(currentVertex); 
                visited[currentVertex] = true; 
                const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)];
                let current = neighborsLinkedList.head; 
                while (current) {
                    const neighborVertex = current.value.node; 
                    if (!visited[neighborVertex]) {
                        queue.push(neighborVertex); 
                    }
                    current = current.next; 
                }
            }
        }
    }

    // Obtener todos los vértices
    getVertices() {
        return this.#map.keys();
    }

    // Obtener el número de vértices
    numVertices() {
        return this.#map.size;
    }

    // Obtener el número de aristas
    numEdges() {
        let numEdges = 0;
        for (let linkedList of this.#matrizAdyacencia) {
            numEdges += linkedList.size();
        }
        return numEdges;
    }
}