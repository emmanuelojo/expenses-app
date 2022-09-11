<script lang="ts" setup>
import { computed, ref } from "vue";
import { Chart, registerables } from "chart.js";
import { DoughnutChart, LineChart, PieChart } from "vue-chart-3";

Chart.register(...registerables);

const lineChartRef = ref();
const doughnutChartRef = ref();
const pieChartRef = ref();

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
});

const lineChartData = computed(() => ({
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],

  datasets: [
    {
      label: "Income",
      data: [5, 25, 30, 40, 60, 45, 15, 70, 5, 45, 30, 10],

      fill: false,
      borderColor: "rgb(75, 192, 192)",
    },
    {
      label: "Expenses",
      data: [10, 50, 30, 40, 60, 70, 5, 30, 40, 60, 70, 5],

      fill: false,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: ["#ff0000"],
    },
  ],
}));

const doughnutChartData = computed(() => ({
  labels: ["Male", "Female"],
  datasets: [
    {
      data: [40, 60],
      backgroundColor: ["#77CEFF", "#0079AF"],
    },
  ],
}));
</script>

<template>
  <div class="p-4 lg:p-10">
    <p class="text-white text-2xl font-semibold">Charts</p>

    <div class="mt-10 md:w-full grid gap-24">
      <div class="w-full p-5 bg-white shadow-md rounded-md">
        <LineChart
          ref="lineChartRef"
          :chartData="lineChartData"
          :options="options"
          style="z-index: 10"
        />
      </div>
    </div>
  </div>
</template>
