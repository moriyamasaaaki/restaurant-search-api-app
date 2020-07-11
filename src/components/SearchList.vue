<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="10" sm="8" md="6" lg="4">
        <v-text-field label="店名・ジャンル" v-model="name" />
        <v-select
          v-model="range"
          :items="categories"
          item-text="categoryName"
          item-value="id"
          label="現在地からの距離"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-btn @click="loadShops" :loading="loading">検索</v-btn>
      </v-col>
    </v-row>
    <p>{{ latitude }}、{{ longitude }}</p>
    <v-alert v-if="error_msg" type="error">{{ error_msg }}</v-alert>

    <v-row v-if="shops">
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(shop, index) in shopLists"
        :key="index"
      >
        <router-link
          :to="{ name: 'RestaurantDetail', params: { restaurantId: shop.id } }"
        >
          <v-card>
            <v-img
              v-if="!shop.image_url.shop_image1"
              src="/img/unnamed.png"
              width="100%"
            />
            <v-img v-else :src="shop.image_url.shop_image1" />
            <v-card-title>{{ shop.name }}</v-card-title>
            <v-chip>{{ shop.code.areaname_s }}</v-chip>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
    <div v-if="shopLists" class="text-center">
      <v-pagination
        v-model="page"
        :length="length"
        @input="pageChange"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import restaurant from "@/api/restaurant.js";
export default {
  data() {
    return {
      name: null,
      range: 2,
      categories: [
        { categoryName: "300m", id: 1 },
        { categoryName: "500m", id: 2 },
        { categoryName: "1km", id: 3 },
        { categoryName: "2km", id: 4 },
        { categoryName: "3km", id: 5 }
      ],
      shops: null,
      error_msg: null,
      loading: false,

      latitude: 0,
      longitude: 0,

      page: 1,
      length: 0,
      shopLists: null,
      pageSize: 10
    };
  },

  mounted() {
    this.getLocation();
  },

  created() {
    // this.loadShops();
    // this.getLocation();
  },

  methods: {
    loadShops() {
      this.shops = null;
      this.error_msg = null;
      this.loading = true;
      restaurant
        .searchShops(this.name, this.range, this.latitude, this.longitude)
        .then(res => {
          this.shops = res;
          this.length = Math.ceil(this.shops.length / this.pageSize);

          this.shopLists = this.shops.slice(
            this.pageSize * (this.page - 1),
            this.pageSize * this.page
          );
          console.log(this.name);
          console.log(this.range);
          console.log(this.shops);
          console.log(this.latitude);
          console.log(this.longitude);
        })
        .catch(err => {
          this.error_msg = err;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          let coords = position.coords;
          this.latitude = coords.latitude;
          this.longitude = coords.longitude;
          console.log(this.latitude, this.longitude);
        });
      } else {
        alert("現在位置が取得できませんでした");
      }
    },
    pageChange(pageNumber) {
      this.shopLists = this.shops.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    }
  }
};
</script>
