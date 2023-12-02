import { Game } from "./types";

export function showGraph(games: Game[]) {
  const chartConfig = {
    type: "bar",
    data: {
      labels: games.map((game) => game.id),
      datasets: [
        {
          label: "Red",
          data: games.map((game) =>
            game.extractions.reduce((acc, curr) => acc + curr.r, 0)
          ),
          backgroundColor: "red",
        },
        {
          label: "Green",
          data: games.map((game) =>
            game.extractions.reduce((acc, curr) => acc + curr.g, 0)
          ),
          backgroundColor: "green",
        },
        {
          label: "Blue",
          data: games.map((game) =>
            game.extractions.reduce((acc, curr) => acc + curr.b, 0)
          ),
          backgroundColor: "blue",
        },
      ],
    },
  };

  const chartConfigStr = JSON.stringify(chartConfig);
  const server = Bun.serve({
    async fetch() {
      const body = `
           <html>
             <body>
               <canvas id="myChart"></canvas>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
               <script>
                 const ctx = document.getElementById('myChart');
                 new Chart(ctx, ${chartConfigStr});
               </script>
             </body>
           </html>`;
      return new Response(body, {
        headers: { "Content-Type": "text/html" },
      });
    },
    port: 3000,
  });

  console.log(`Chart on http://localhost:${server.port}`);
}
