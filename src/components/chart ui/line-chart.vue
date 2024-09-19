<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

// Chart.js modullarini ro'yxatdan o'tkazish
Chart.register(...registerables);

const myChart = ref(null);

onMounted(() => {
  if (myChart.value) {
    new Chart(myChart.value, {
      type: 'line',
      data: {
        labels: ['10-09', '11-09', '12-09', '13-09', '14-09', '15-09', '16-09', '17-09', '18-09', '19-09'],
        datasets: [{
          label: 'qiymat',
          data: [12, 10, 9, 15, 8, 13, 19, 20, 9, 21],
          borderWidth: 5,
					borderColor: '#731DD8',
					pointRadius: 3, // Nuqtalarni yashirish
					tension: 0.3
        }]
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false // X o'qidagi to'rni yashirish
            },
            ticks: {
              display: true // X o'qidagi yozuvlarni yashirish
            },
						border: {
							display: false
						}
          },
          y: {
            grid: {
              display: true // Y o'qidagi to'rni yashirish
            },
            ticks: {
              display: true // Y o'qidagi yozuvlarni yashirish
            },
						border: {
							display: false
						}
          }
        },
        plugins: {
          legend: {
            display: false // Legenda (yaxshilab ko'rsatilgan ma'lumotlar) yashirish
          },
          
        }
      }
    });
  }
});
</script>

<template>
		<canvas ref="myChart"></canvas>
</template>