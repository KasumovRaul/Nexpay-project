async function fetchEurUsdStats() {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
  
    const format = (d) => d.toISOString().split("T")[0];
    const apiUrl = `https://api.frankfurter.app/${format(startDate)}..${format(endDate)}?from=EUR&to=USD`;
  
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      const rates = Object.entries(data.rates).map(([date, rate]) => ({
        date,
        value: rate.USD,
      }));
  
      const ranges = [30, 10, 7, 3];
      const stats = ranges.map((days) => {
        const recent = rates.slice(-days).map((r) => r.value);
        const high = Math.max(...recent).toFixed(4);
        const low = Math.min(...recent).toFixed(4);
        const avg = (recent.reduce((a, b) => a + b, 0) / recent.length).toFixed(4);
        return { period: `Last ${days}`, high, low, avg };
      });
  
      renderStatsTable(stats);
      renderChart(rates);
    } catch (error) {
      console.error("Failed to load EUR/USD data:", error);
    }
  }
  
  function renderStatsTable(stats) {
    const tBody = document.getElementById("stats-table-body");
    tBody.innerHTML = stats.map(
      (stat) =>
        `<tr>
          <td>${stat.period}</td>
          <td>${stat.high}</td>
          <td>${stat.low}</td>
          <td>${stat.avg}</td>
        </tr>`
    ).join("");
  }
  
  function renderChart(data) {
    const ctx = document.getElementById("eurUsdChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map(d => d.date),
        datasets: [
            {
              label: "EUR ",
              data: data.map(d => d.value),
              borderColor: "rgb(75, 192, 192)",
              tension: 0.3,
              fill: false
            },
            {
              label: "USD ",
              data: data.map(d => 1 / d.value),
              borderColor: "rgb(255, 99, 132)",
              tension: 0.3,
              fill: false
            }
          ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", fetchEurUsdStats);
  