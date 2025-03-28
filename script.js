class ResourceAllocationSimulator {
    constructor() {
        this.nodes = [];
        this.graph = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('add-node').addEventListener('click', () => this.addNode());
        document.getElementById('run-simulation').addEventListener('click', () => this.runSimulation());
    }

    addNode() {
        const nameInput = document.getElementById('node-name');
        const capacityInput = document.getElementById('node-capacity');

        const node = {
            id: this.nodes.length + 1,
            name: nameInput.value,
            capacity: Number(capacityInput.value)
        };

        this.nodes.push(node);
        this.renderGraph();
        
        // Clear inputs
        nameInput.value = '';
        capacityInput.value = '';
    }

    renderGraph() {
        const graphCanvas = document.getElementById('graph-canvas');
        graphCanvas.innerHTML = ''; // Clear previous graph

        const svg = d3.select('#graph-canvas')
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%');

        const simulation = d3.forceSimulation(this.nodes)
            .force('charge', d3.forceCollide().radius(50))
            .force('center', d3.forceCenter(300, 250));

        const nodeElements = svg.selectAll('.node')
            .data(this.nodes)
            .enter()
            .append('g')
            .attr('class', 'node');

        nodeElements.append('circle')
            .attr('r', 20)
            .attr('fill', 'steelblue');

        nodeElements.append('text')
            .text(d => d.name)
            .attr('text-anchor', 'middle')
            .attr('dy', '.3em')
            .attr('fill', 'white');

        simulation.on('tick', () => {
            nodeElements
                .attr('transform', d => `translate(${d.x}, ${d.y})`);
        });
    }

    runSimulation() {
        const strategy = document.getElementById('strategy-selector').value;
        console.log(`Running ${strategy} Allocation Strategy`);
        
        // Placeholder for simulation logic
        this.visualizeResults();
    }

    visualizeResults() {
        const ctx = document.getElementById('results-chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.nodes.map(node => node.name),
                datasets: [{
                    label: 'Resource Allocation',
                    data: this.nodes.map(node => node.capacity),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.simulator = new ResourceAllocationSimulator();
});