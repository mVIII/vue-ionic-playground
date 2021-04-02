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
      <ion-grid style="margin-top: 60px">
        <ion-row class="ion-hide-md-down">
          <ion-grid>
            <ion-row>
              <ion-col>
                <!---CHARTS--->
                <ion-row>
                  <ion-col v-for="item in items" :key="item.name">
                    <apexchart
                      height="200"
                      :options="item.chartOptions"
                      :series="item.series"
                    ></apexchart>
                  </ion-col>
                </ion-row>
                <!---CATEGORIES--->
                <ion-row>
                  <ion-col>
                    <ion-card><ion-card-header>Meat</ion-card-header></ion-card>
                  </ion-col>
                  <ion-col>
                    <ion-card color="primary"
                      ><ion-card-header>Seafood</ion-card-header></ion-card
                    >
                  </ion-col>
                  <ion-col>
                    <ion-card
                      ><ion-card-header>Vegetables</ion-card-header></ion-card
                    >
                  </ion-col>
                </ion-row>
                <!---SUBCATEGORIES--->
                <ion-row>
                  <ion-col>
                    <ion-card
                      ><ion-card-header>Sharks</ion-card-header></ion-card
                    >
                  </ion-col>
                  <ion-col>
                    <ion-card
                      ><ion-card-header>Clams</ion-card-header></ion-card
                    >
                  </ion-col>
                </ion-row>
              </ion-col>
              <!---NOTIFICATIONS--->
              <ion-col size="2">
                <ion-list-header>
                  <ion-label>
                    <ion-icon :icon="notifications" />
                    Notifications
                  </ion-label>
                </ion-list-header>
                <ion-content>
                  <ion-list>
                    <ion-item
                      :color="notification.color"
                      v-for="notification in liveNotifications"
                      :key="notification.title"
                      @click="hoverNotification(notification)"
                    >
                      <ion-avatar slot="start">
                        <img :src="notification.icon" />
                      </ion-avatar>
                      <ion-label>
                        <h2>{{ notification.title }}</h2>
                        <p>{{ notification.description }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-popover
                      :is-open="notificationPopOverOpen"
                      css-class="my-custom-class"
                      :translucent="true"
                      @onDidDismiss="setNotificationPopOverOpen(false)"
                    >
                      <ion-card>
                        <ion-card-content>
                          <div
                            style="display: flex; justify-content: space-evenly"
                          >
                            <ion-avatar slot="start">
                              <img :src="hoveredNotification.icon" />
                            </ion-avatar>
                          </div>
                          <strong>{{ hoveredNotification.title }}</strong>
                          <br />
                          <strong>{{ hoveredNotification.description }}</strong>
                          <br />
                        </ion-card-content>
                      </ion-card>
                    </ion-popover>
                  </ion-list>
                </ion-content>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-row>
        <ion-item-divider style="margin-top:12px;" />
        <!----ITEM DISPLAY--->
        <ion-row v-if="!itemsLoading">
          <ion-col>
            <ItemGrid :displayItems="displayedItems" class="ion-hide-sm-down" />
            <ItemList :displayItems="displayedItems" class="ion-hide-md-up" />
          </ion-col>
          <ion-col size="2" class="ion-hide-md-down">
            <ion-toolbar>
              <ion-searchbar
                @ionInput="queryDisplayedItems($event.target.value)"
              ></ion-searchbar>
            </ion-toolbar>
            <ItemFilter
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

      <ion-fab
        class="ion-hide-md-up"
        vertical="bottom"
        horizontal="end"
        slot="fixed"
      >
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
import ItemGrid from '@/components/ItemGrid.vue';
import ItemList from '@/components/ItemList.vue';
import {
  IonPopover,
  IonItemDivider,
  IonPage,
  IonSearchbar,
  IonContent,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
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
} from '@ionic/vue';

import { useItem } from '@/composables/useItem';
import { useNotifications } from '@/composables/useNotifications';
import { onUpdated } from '@vue/runtime-core';
import router from '@/router';
import { useCatalogue } from '@/composables/useCatalogue';
import { options, close, notifications } from 'ionicons/icons';
import ItemFilter from './Filter.vue';
import { ref } from 'vue';
import {
  Filter,
  SortingFilter,
  SortingType,
  Notification,
} from '@/services/dtos/';
import ItemNewEdit from './NewEdit.vue';

export default {
  name: 'Catalogue',
  components: {
    apexchart: VueApexCharts,
    IonPopover,
    ItemList,
    ItemGrid,
    IonItemDivider,
    IonButtons,
    IonTitle,
    // IonSearchbar,
    // IonLabel,
    IonHeader,
    IonToolbar,
    IonCard,
    IonCardHeader,
    //IonCardContent,
    IonContent,
    IonPage,
    IonLoading,
    IonBackButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    //IonAvatar,
    IonFabButton,
    IonFab,
    ItemFilter,
    IonModal,
    IonIcon,
    IonButton,
    ItemNewEdit,
    //IonChip,
    IonGrid,
    IonRow,
    IonCol,
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

    const { liveNotifications, listenForNotifications } = useNotifications();

    onUpdated(async () => {
      try {
        const catalogueId = router.currentRoute.value.params.id as string;
        console.log(catalogueId);
        await runWrappedGetCatalogue(catalogueId);
        catalogueID.value = catalogueId;
        await runWrappedGetItemsByCatalogue();

        listenForNotifications();
      } catch (error) {
        console.log(error);
      }
    });

    const hoveredNotification = ref<Notification>({
      title: '',
      description: '',
      icon: '',
      color: '',
    });

    const filterModalOpen = ref(false);
    const setFilterModalOpen = (state: boolean) =>
      (filterModalOpen.value = state);

    const addEditModalOpen = ref(false);
    const setAddEditModalOpen = (state: boolean) =>
      (addEditModalOpen.value = state);

    const notificationPopOverOpen = ref(false);
    const setNotificationPopOverOpen = (state: boolean) =>
      (notificationPopOverOpen.value = state);

    const applyFilter = (newItemFilter: Filter) => {
      itemFilter.value = newItemFilter;
      setFilterModalOpen(false);
    };

    const toggleSortingOption = (sortingOption: SortingFilter) => {
      if (sortingFilter.value.name === sortingOption.name) {
        sortingFilter.value = {
          name: '',
          type: SortingType.none,
        };
      } else {
        sortingFilter.value = sortingOption;
      }
    };

    const sortingOptions: SortingFilter[] = [
      {
        name: 'Show newest first',
        type: SortingType.sortNewstFirst,
      },
      {
        name: 'Sort oldest first',
        type: SortingType.sortAlphabetically,
      },
      {
        name: 'Sort alphabetically',
        type: SortingType.sortAlphabetically,
      },
    ];

    const clickedAdd = () => {
      CRUDItem.value = {
        id: '',
        catalogue: '',
        name: '',
        fields: [],
      };
      setAddEditModalOpen(true);
    };

    const hoverNotification = (noti: Notification) => {
      hoveredNotification.value = noti;
      setNotificationPopOverOpen(true);
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

    function randomColor() {
      const colors = ['warning', 'danger', 'light'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    return {
      randomColor,
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
      notifications,
      liveNotifications,
      notificationPopOverOpen,
      setNotificationPopOverOpen,
      hoveredNotification,
      hoverNotification,
    };
  },
};
</script>
