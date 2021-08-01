/////////////////////   Graficos   //////////////////////
const viewGraph = document.getElementById('viewGraph');
const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio'];
const ViewsData = {
    label: "Visitas por mes",
    data: [1500, 1000, 2000, 3000,2500,1750], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(54, 162, 235, 1)', // Color de fondo
    borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
    borderWidth: 2,// Ancho del borde
};
new Chart(viewGraph, {
    type: 'bar',// Tipo de gráfica
    data: {
        labels: months,
        datasets: [
            ViewsData,
            // Aquí más datos...
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {beginAtZero: true},
                
            }]
        }
        
    }
});


