<template>
  <div class="searchList">
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
    <!-- <v-row v-if="restaurants">
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(restaurant, index) in restaurantLists"
        :key="index"
    >-->
    <p v-if="restaurants" class="text-center hit">
      全{{ restaurants.length }}件ヒットしました。
    </p>
    <div class="searchList-items" v-if="restaurants">
      <v-card
        class="card"
        v-for="(restaurant, index) in restaurantLists"
        :key="index"
      >
        <router-link
          :to="{
            name: 'RestaurantDetail',
            params: { restaurantId: restaurant.id }
          }"
        >
          <img
            class="img"
            v-if="!restaurant.image_url.restaurant_image1"
            src="/img/unnamed.png"
            width="100%"
          />
          <img v-else :src="restaurant.image_url.restaurant_image1" />
          <div class="card-body">
            <v-card-title class="title">{{ restaurant.name }}</v-card-title>
            <div class="my-4 subtitle-1">{{ restaurant.code.areaname_s }}</div>
          </div>
        </router-link>
      </v-card>
      <!-- </v-col>
      </v-row>-->
    </div>
    <div v-if="restaurantLists" class="text-center">
      <v-pagination
        v-model="page"
        :length="length"
        @input="pageChange"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import restaurant from "@/api/restaurant.js";
import axios from "axios";

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
      restaurants: null,
      restaurant: null,
      error_msg: null,
      loading: false,
      hover: null,

      latitude: 0,
      longitude: 0,

      page: 1,
      length: 0,
      restaurantLists: null,
      pageSize: 10
    };
  },

  mounted() {
    this.getLocation();
  },

  async created() {
    let restaurantName = this.$route.params.restaurantName;
    let restaurantRange = this.$route.params.restaurantRange;
    let latitude = this.$route.params.latitude;
    let longitude = this.$route.params.longitude;
    this.restaurants = await this.getRestaurant(
      restaurantName,
      restaurantRange,
      latitude,
      longitude
    );
  },

  methods: {
    loadShops() {
      this.restaurants = null;
      this.error_msg = null;
      this.loading = true;
      restaurant
        .searchShops(this.name, this.range, this.latitude, this.longitude)
        .then(res => {
          this.restaurants = res;
          let url = `/restaurants/${this.name}/${this.range}/${this.latitude}/${this.longitude}`;
          const encoded = encodeURI(url);
          console.log(encoded);

          this.$router.push({ path: encoded });
          this.length = Math.ceil(this.restaurants.length / this.pageSize);

          this.restaurantLists = this.restaurants.slice(
            this.pageSize * (this.page - 1),
            this.pageSize * this.page
          );
          console.log(this.name);
          console.log(this.range);
          console.log(this.restaurants);
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
      this.restaurantLists = this.restaurants.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },
    getRestaurant(restaurantName, restaurantRange, latitude, longitude) {
      axios
        .get(process.env.VUE_APP_GURUNAVI_URLs, {
          params: {
            name: restaurantName,
            range: restaurantRange,
            latitude,
            longitude
          }
        })
        .then(res => {
          this.restaurants = res.data.rest;
          this.length = Math.ceil(this.restaurants.length / this.pageSize);
          this.restaurantLists = this.restaurants.slice(
            this.pageSize * (this.page - 1),
            this.pageSize * this.page
          );
          console.log(this.restaurants);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.searchList-items {
  width: 100%;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, 350px);
  margin: 0 auto 80px;
  justify-content: center;
}
.card {
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  &:hover {
    opacity: 0.7;
  }
}

.card-body {
  flex: 1;
  padding: 8px;
}

img {
  width: 100%;
  height: 250px;
}

.searchList {
  padding: 8px;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
}
.subtitle-1 {
  color: rgba(0, 0, 0, 0.6);
}

.title {
  color: rgba(0, 0, 0, 0.87);
}

.hit {
  font-weight: 600;
}
</style>
