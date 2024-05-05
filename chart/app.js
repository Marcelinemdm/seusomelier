// app.js
const bitcoinChart = document.getElementById('bitcoinChart').getContext('2d');
let chart;

// Function to fetch real-time Bitcoin price data from CoinGecko API
async function getBitcoinPrice() {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const data = await response.json();
    return data.bitcoin.usd;
}

// Function to update the chart with new data
async function updateChart() {
    const price = await getBitcoinPrice();
    const timestamp = new Date().toLocaleTimeString();
    
    if (!chart) {
        chart = new Chart(bitcoinChart, {
            type: 'line',
            data: {
                labels: [timestamp],
                datasets: [{
                    label: 'Bitcoin Price (USD)',
                    data: [price],
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Price (USD)'
                        }
                    }
                }
            }
        });
    } else {
        chart.data.labels.push(timestamp);
        chart.data.datasets[0].data.push(price);
        chart.update();
    }
}

// Update the chart every 10 seconds
setInterval(updateChart, 10000);

document.getElementById('short').addEventListener('click', function () {
    alert('Short option selected');
});

document.getElementById('long').addEventListener('click', function () {
    alert('Long option selected');
});
