// ========================================
// Funciones para visualizar Grafos
// ========================================

class GraphVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.edges = [];
    this.nodeRadius = 20;
    this.padding = 50;
  }

  // Dibujar un grafo simple
  drawGraph(nodes, edges) {
    this.nodes = nodes;
    this.edges = edges;
    this.clearCanvas();
    this.drawEdges();
    this.drawNodes();
  }

  // Limpiar canvas
  clearCanvas() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Dibujar aristas
  drawEdges() {
    this.ctx.strokeStyle = '#2ecc71';
    this.ctx.lineWidth = 2;

    for (let edge of this.edges) {
      const fromNode = this.nodes.find(n => n.id === edge.from);
      const toNode = this.nodes.find(n => n.id === edge.to);

      if (fromNode && toNode) {
        // Dibujar línea
        this.ctx.beginPath();
        this.ctx.moveTo(fromNode.x, fromNode.y);
        this.ctx.lineTo(toNode.x, toNode.y);
        this.ctx.stroke();

        // Dibujar flecha si es dirigido
        if (edge.directed) {
          this.drawArrow(fromNode.x, fromNode.y, toNode.x, toNode.y);
        }

        // Dibujar peso si existe
        if (edge.weight) {
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          this.ctx.fillStyle = '#27ae60';
          this.ctx.font = 'bold 12px Arial';
          this.ctx.fillText(edge.weight, midX, midY);
        }
      }
    }
  }

  // Dibujar flecha para grafos dirigidos
  drawArrow(fromX, fromY, toX, toY) {
    const headlen = 15;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    // Ajustar para que no se superponga con el nodo
    const endX = toX - Math.cos(angle) * this.nodeRadius;
    const endY = toY - Math.sin(angle) * this.nodeRadius;

    this.ctx.beginPath();
    this.ctx.moveTo(endX - headlen * Math.cos(angle - Math.PI / 6), endY - headlen * Math.sin(angle - Math.PI / 6));
    this.ctx.lineTo(endX, endY);
    this.ctx.lineTo(endX - headlen * Math.cos(angle + Math.PI / 6), endY - headlen * Math.sin(angle + Math.PI / 6));
    this.ctx.strokeStyle = '#2ecc71';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  // Dibujar nodos
  drawNodes() {
    for (let node of this.nodes) {
      // Dibujar círculo
      this.ctx.fillStyle = '#2ecc71';
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, this.nodeRadius, 0, 2 * Math.PI);
      this.ctx.fill();

      // Dibujar borde
      this.ctx.strokeStyle = '#27ae60';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      // Dibujar etiqueta
      this.ctx.fillStyle = 'white';
      this.ctx.font = 'bold 14px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(node.label, node.x, node.y);
    }
  }

  // Posicionar nodos en círculo
  arrangeInCircle(count) {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(centerX, centerY) - this.padding - this.nodeRadius;

    const nodes = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
      nodes.push({
        id: i,
        label: String.fromCharCode(65 + i),
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      });
    }
    return nodes;
  }
}

// Grafo No Dirigido de Ejemplo (Post 1)
function drawExampleGraph1() {
  const visualizer = new GraphVisualizer('graphCanvas1');
  if (!visualizer.canvas) return;

  const nodes = visualizer.arrangeInCircle(5);
  const edges = [
    { from: 0, to: 1, directed: false },
    { from: 1, to: 2, directed: false },
    { from: 2, to: 3, directed: false },
    { from: 3, to: 4, directed: false },
    { from: 4, to: 0, directed: false },
    { from: 0, to: 2, directed: false }
  ];

  visualizer.drawGraph(nodes, edges);
}

// Grafo Dirigido de Ejemplo (Post 1)
function drawDirectedGraph() {
  const visualizer = new GraphVisualizer('graphCanvas2');
  if (!visualizer.canvas) return;

  const nodes = visualizer.arrangeInCircle(4);
  const edges = [
    { from: 0, to: 1, directed: true },
    { from: 1, to: 2, directed: true },
    { from: 2, to: 3, directed: true },
    { from: 3, to: 0, directed: true }
  ];

  visualizer.drawGraph(nodes, edges);
}

// Grafo Ponderado de Ejemplo (Post 1)
function drawWeightedGraph() {
  const visualizer = new GraphVisualizer('graphCanvas3');
  if (!visualizer.canvas) return;

  const nodes = visualizer.arrangeInCircle(4);
  const edges = [
    { from: 0, to: 1, directed: false, weight: '5' },
    { from: 1, to: 2, directed: false, weight: '3' },
    { from: 2, to: 3, directed: false, weight: '7' },
    { from: 3, to: 0, directed: false, weight: '2' },
    { from: 0, to: 2, directed: false, weight: '8' }
  ];

  visualizer.drawGraph(nodes, edges);
}

// Representación con Lista de Adyacencia (Post 2)
function drawAdjacencyList() {
  const visualizer = new GraphVisualizer('graphCanvasList');
  if (!visualizer.canvas) return;

  const nodes = visualizer.arrangeInCircle(5);
  const edges = [
    { from: 0, to: 1, directed: true },
    { from: 0, to: 2, directed: true },
    { from: 1, to: 3, directed: true },
    { from: 2, to: 3, directed: true },
    { from: 3, to: 4, directed: true }
  ];

  visualizer.drawGraph(nodes, edges);
}

// Representación con Matriz de Adyacencia (Post 2)
function drawAdjacencyMatrix() {
  const visualizer = new GraphVisualizer('graphCanvasMatrix');
  if (!visualizer.canvas) return;

  const nodes = visualizer.arrangeInCircle(4);
  const edges = [
    { from: 0, to: 1, directed: false },
    { from: 1, to: 2, directed: false },
    { from: 2, to: 3, directed: false },
    { from: 3, to: 0, directed: false },
    { from: 0, to: 2, directed: false }
  ];

  visualizer.drawGraph(nodes, edges);
}

// BFS Visualization (Post 3)
function drawBFSGraph() {
  const visualizer = new GraphVisualizer('graphCanvasBFS');
  if (!visualizer.canvas) return;

  const nodes = visualizer.arrangeInCircle(6);
  const edges = [
    { from: 0, to: 1, directed: false },
    { from: 0, to: 2, directed: false },
    { from: 1, to: 3, directed: false },
    { from: 1, to: 4, directed: false },
    { from: 2, to: 5, directed: false }
  ];

  visualizer.drawGraph(nodes, edges);
}

// DFS Visualization (Post 3)
function drawDFSGraph() {
  const visualizer = new GraphVisualizer('graphCanvasDFS');
  if (!visualizer.canvas) return;

  const nodes = visualizer.arrangeInCircle(6);
  const edges = [
    { from: 0, to: 1, directed: true },
    { from: 0, to: 2, directed: true },
    { from: 1, to: 3, directed: true },
    { from: 2, to: 4, directed: true },
    { from: 3, to: 5, directed: true }
  ];

  visualizer.drawGraph(nodes, edges);
}

// Simular BFS
function simulateBFS() {
  const output = document.getElementById('bfsOutput');
  if (!output) return;

  const bfsSteps = [
    'Inicio: Cola = [A]',
    'Procesar A: Vecinos = [B, C]',
    'Cola = [B, C]',
    'Procesar B: Vecinos = [D, E]',
    'Cola = [C, D, E]',
    'Procesar C: Vecinos = [F]',
    'Cola = [D, E, F]',
    'Procesar D, E, F...',
    'BFS Completado ✓'
  ];

  let html = '<h4>Pasos de BFS:</h4><ol>';
  bfsSteps.forEach(step => {
    html += `<li>${step}</li>`;
  });
  html += '</ol>';

  output.innerHTML = html;
}

// Simular DFS
function simulateDFS() {
  const output = document.getElementById('dfsOutput');
  if (!output) return;

  const dfsSteps = [
    'Inicio: Pila = [A]',
    'Procesar A: Vecinos = [B, C]',
    'Pila = [B, C]',
    'Procesar C: Vecinos = [F]',
    'Pila = [B, F]',
    'Procesar F: Sin vecinos no visitados',
    'Pila = [B]',
    'Procesar B: Vecinos = [D, E]',
    'DFS Completado ✓'
  ];

  let html = '<h4>Pasos de DFS:</h4><ol>';
  dfsSteps.forEach(step => {
    html += `<li>${step}</li>`;
  });
  html += '</ol>';

  output.innerHTML = html;
}

// Inicializar cuando el documento carga
document.addEventListener('DOMContentLoaded', function() {
  // Dibujar gráficos del Post 1
  drawExampleGraph1();
  drawDirectedGraph();
  drawWeightedGraph();

  // Dibujar gráficos del Post 2
  drawAdjacencyList();
  drawAdjacencyMatrix();

  // Dibujar gráficos del Post 3
  drawBFSGraph();
  drawDFSGraph();
});
