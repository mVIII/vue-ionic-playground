<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <div v-for="item in items" :key="item.name">
          <apexchart
            height="300"
            width="300"
            :options="item.chartOptions"
            :series="item.series"
          ></apexchart>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { ApexOptions } from 'apexcharts';
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'Home',
  components: {
    //IonHeader,
    //IonToolbar,
    //IonTitle,
    IonContent,
    IonPage,
    apexchart: VueApexCharts,
  },
  setup() {
    const seriesRadar = [
      {
        name: 'Series 1',
        data: [80, 50, 30, 40, 100],
      },
    ];

    const seriesPie = [44, 55, 13, 43, 22];

    const items: {
      name: string;
      chartOptions: ApexOptions;
      series: { name: string; data: number[] }[] | number[];
    }[] = [
      {
        name: 'Add new item',
        chartOptions: {
          chart: {
            height: 350,
            width: 500,
            type: 'radar',
          },
          title: {
            text: 'Client preferences',
          },
          xaxis: {
            categories: ['Fish', 'Meat', 'Salad', 'Fruit', 'Wine'],
          },
          markers: {
            size: 6,
          },
        },
        series: seriesRadar,
      },
      {
        name: 'Pie chart',
        chartOptions: {
          title: {
            text: 'Stock',
          },
          chart: {
            width: '100',
            type: 'pie',
          },
          labels: ['Meat', 'Fish', 'Salad', 'Fruit', 'Wine'],
        },
        series: seriesPie,
      },
      {
        name: 'Line chart',
        chartOptions: {
          title: {
            text: 'Sales',
          },
          chart: {
            height: 100,
            type: 'line',
            zoom: {
              enabled: false,
            },
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
        },
        series: [
          { name: 'series 2', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
        ],
      },
    ];
    return {
      items,
    };
  },
};
</script>
<style scoped>
.container {
  /* display: flex;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  */
}
</style>
