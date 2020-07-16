<template>
  <div class="searchList">
    <Top />
    <RestaurantSearch @catchMessage="loadShops" :loading="loading" />
    <p>{{ latitude }}、{{ longitude }}</p>
    <v-alert v-if="error_msg" type="error">{{ error_msg }}</v-alert>
    <p v-if="restaurants" class="text-center hit">
      全{{ restaurants.length }}件ヒットしました。
    </p>
    <div class="searchList-items" v-if="restaurants">
      <RestaurantItem
        v-for="(restaurant, index) in restaurantLists"
        :key="index"
        :id="restaurant.id"
        :name="restaurant.name"
        :img="restaurant.image_url.shop_image1"
        :area="restaurant.code.areaname_s"
      />
    </div>
    <div v-if="restaurants" class="text-center">
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
import Top from "@/components/Top.vue";
import RestaurantItem from "@/components/RestaurantItem.vue";
import RestaurantSearch from "@/components/RestaurantSearch.vue";

export default {
  components: {
    Top,
    RestaurantItem,
    RestaurantSearch
  },
  data() {
    return {
      restaurants: null,
      restaurant: null,
      error_msg: null,
      loading: false,

      latitude: 0,
      longitude: 0,

      page: 1,
      length: 0,
      restaurantLists: null,
      pageSize: 15
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
    loadShops(name, range) {
      this.restaurants = null;
      this.error_msg = null;
      this.loading = true;
      restaurant
        .searchRestaurants(name, range, this.latitude, this.longitude)
        .then(res => {
          this.restaurants = res;
          let url = `/restaurants/${name}/${range}/${this.latitude}/${this.longitude}`;
          const encoded = encodeURI(url);
          console.log(encoded);

          this.$router.push({ path: encoded });
          this.pageLength();
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
      window.scrollTo({
        top: 0,
        behavior: "auto"
      });
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
          this.pageLength();
        })
        .catch(error => {
          console.error(error);
        });
    },
    pageLength() {
      this.length = Math.ceil(this.restaurants.length / this.pageSize);
      this.restaurantLists = this.restaurants.slice(
        this.pageSize * (this.page - 1),
        this.pageSize * this.page
      );
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

.searchList {
  box-sizing: border-box;
}

.hit {
  font-weight: 600;
}
</style>
