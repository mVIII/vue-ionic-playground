<template>
  <ion-page>
    <ion-header class="ion-hide-md-up">
      <ion-toolbar>
        <ion-title>Items</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/catalogues"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="clickedAdd()">Add</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-toolbar style="padding-top: 10px">
        <div slot="end">
          <ion-button slot="end" fill="solid">+ Ingredient</ion-button>
          <ion-button slot="end" fill="solid">+ Category</ion-button>
        </div>
      </ion-toolbar>
      <ion-grid>
        <ion-row>
          <ion-col v-for="item in items" :key="item.name">
            <apexchart
              height="200"
              width="200"
              :options="item.chartOptions"
              :series="item.series"
            ></apexchart>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-row>
              <ion-col>
                <ion-card color="success"
                  ><ion-card-header>Wine</ion-card-header></ion-card
                >
              </ion-col>
              <ion-col>
                <ion-card><ion-card-header>Whiskey</ion-card-header></ion-card>
              </ion-col>
              <ion-col>
                <ion-card><ion-card-header>Vodka</ion-card-header></ion-card>
              </ion-col>
            </ion-row>
            <div>
              <ion-chip
                v-for="sortingOption in sortingOptions"
                :key="sortingOption.name"
                @click="toggleSortingOption(sortingOption)"
              >
                <ion-label>{{ sortingOption.name }}</ion-label>
                <ion-icon
                  v-if="sortingFilter.name === sortingOption.name"
                  :icon="close"
                ></ion-icon>
              </ion-chip>
            </div>

            <ion-item-divider />
            <ion-row>
              <ion-grid>
                <ion-col>
                  <ion-row>
                    <ion-card v-for="item in displayedItems" :key="item.name">
                      <ion-card-content>
                        <ion-avatar slot="start">
                          <img :src="item.image" />
                        </ion-avatar>
                        <h2>
                          <strong>{{ item.name }}</strong>
                        </h2>

                        <p>7 days left</p>
                        <p>10 bottles left</p>
                      </ion-card-content>
                    </ion-card>
                  </ion-row>
                </ion-col>
              </ion-grid>
            </ion-row>
          </ion-col>
          <ion-col size="2" class="ion-hide-md-down">
            <ion-searchbar
              @ionInput="queryDisplayedItems($event.target.value)"
            ></ion-searchbar>
            <ItemFilter
              v-if="!catalogueLoading"
              @apply="applyFilter"
              :catalogue="selectedCatalogue"
              :itemFilter="itemFilter"
            ></ItemFilter>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-modal :is-open="filterModalOpen">
        <ItemFilter
          @dismiss="setFilterModalOpen(false)"
          @apply="applyFilter"
          :catalogue="selectedCatalogue"
          :itemFilter="itemFilter"
        ></ItemFilter>
      </ion-modal>
      <ion-modal :is-open="addEditModalOpen">
        <ItemNewEdit
          @dismiss="setAddEditModalOpen(false)"
          @save="runWrappedCreateItem() && setAddEditModalOpen(false)"
          :catalogue="selectedCatalogue"
          :item="CRUDItem"
        ></ItemNewEdit>
      </ion-modal>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="setFilterModalOpen(true)">
          <ion-icon :icon="options"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-infinite-scroll
        @ionInfinite="infiteLoadCatalogueItems($event)"
        threshold="100px"
        id="infinite-scroll"
      >
        <ion-infinite-scroll-content
          loading-spinner="bubbles"
          loading-text="Loading more data..."
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>

    <ion-loading
      :is-open="catalogueLoading || itemsLoading"
      message="Please wait..."
      :duration="1000"
    >
    </ion-loading>
  </ion-page>
</template>

<script lang="ts">
import { ApexOptions } from 'apexcharts';
import VueApexCharts from 'vue3-apexcharts';
import {
  IonItemDivider,
  IonPage,
  IonList,
  IonSearchbar,
  IonContent,
  IonLabel,
  IonItem,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonListHeader,
  IonCardContent,
  IonCardHeader,
  IonBackButton,
  IonLoading,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonAvatar,
  IonFab,
  IonFabButton,
  IonModal,
  IonIcon,
  IonButton,
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
} from "@ionic/vue";

import { useItem } from "@/composables/useItem";
import { onMounted } from "@vue/runtime-core";
import router from "@/router";
import { useCatalogue } from "@/composables/useCatalogue";
import { options, close } from "ionicons/icons";
import ItemFilter from "./Filter.vue";
import { ref } from "vue";
import { Filter, SortingFilter, SortingType } from "@/services/dtos/";
import ItemNewEdit from "./NewEdit.vue";

export default {
  name: "Catalogue",
  components: {
    apexchart: VueApexCharts,
    IonItemDivider,
    IonButtons,
    IonTitle,
    IonSearchbar,
    IonLabel,
    IonHeader,
    IonToolbar,
    // IonItem,
    IonCard,
    IonCardHeader,
    IonCardContent,
    // IonList,
    IonContent,
    IonPage,
    // IonListHeader,
    IonLoading,
    IonBackButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonAvatar,
    IonFabButton,
    IonFab,
    ItemFilter,
    IonModal,
    IonIcon,
    IonButton,
    ItemNewEdit,
    IonChip,
    IonGrid,
    IonRow,
    IonCol,
    //IonPopover,
  },
  setup() {
    const {
      runWrappedGetItemsByCatalogue,
      queryDisplayedItems,
      itemsLoading,
      displayedItems,
      itemFilter,
      sortingFilter,
      infiteLoadCatalogueItems,
      catalogueID,
      page,
      CRUDItem,
      runWrappedCreateItem,
    } = useItem();

    const {
      runWrappedGetCatalogue,
      catalogueLoading,
      selectedCatalogue,
    } = useCatalogue();

    onMounted(async () => {
      try {
        const catalogueId = router.currentRoute.value.params.id as string;
        await runWrappedGetCatalogue(catalogueId);
        catalogueID.value = catalogueId;
        await runWrappedGetItemsByCatalogue();
      } catch (error) {
        console.log(error);
      }
    });
    const filterModalOpen = ref(false);
    const setFilterModalOpen = (state: boolean) =>
      (filterModalOpen.value = state);

    const addEditModalOpen = ref(false);
    const setAddEditModalOpen = (state: boolean) =>
      (addEditModalOpen.value = state);

    const applyFilter = (newItemFilter: Filter) => {
      itemFilter.value = newItemFilter;
      setFilterModalOpen(false);
    };

    const toggleSortingOption = (sortingOption: SortingFilter) => {
      if (sortingFilter.value.name === sortingOption.name) {
        sortingFilter.value = {
          name: "",
          type: SortingType.none,
        };
      } else {
        sortingFilter.value = sortingOption;
      }
    };

    const sortingOptions: SortingFilter[] = [
      {
        name: "Show newest first",
        type: SortingType.sortNewstFirst,
      },
      {
        name: "Sort oldest first",
        type: SortingType.sortAlphabetically,
      },
      {
        name: "Sort alphabetically",
        type: SortingType.sortAlphabetically,
      },
    ];

    const clickedAdd = () => {
      CRUDItem.value = {
        id: "",
        catalogue: "",
        name: "",
        fields: [],
      };
      setAddEditModalOpen(true);
    };

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
      selectedCatalogue,
      catalogueLoading,
      itemsLoading,
      queryDisplayedItems,
      displayedItems,
      infiteLoadCatalogueItems,
      filterModalOpen,
      setFilterModalOpen,
      itemFilter,
      options,
      applyFilter,
      page,
      addEditModalOpen,
      setAddEditModalOpen,
      clickedAdd,
      CRUDItem,
      runWrappedCreateItem,
      close,
      sortingOptions,
      sortingFilter,
      toggleSortingOption,
    };
  },
};
</script>
