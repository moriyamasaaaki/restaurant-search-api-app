<template>
  <div class="restaurants">
    <RestaurantSearch @catchMessage="loadShops" :loading="loading" />
    <div class="restaurants__result">
      <p>{{ latitude }}、{{ longitude }}</p>
      <v-alert class="restaurants__error-message" v-if="error_msg" type="error">{{ error_msg }}</v-alert>
      <div v-if="restaurants" class="restaurants__hit text-center">
        <strong>全{{ restaurants.length }}件ヒットしました</strong>
        <span>/</span>
        <p>{{ page }}ページ目を表示中</p>
      </div>

      <div class="restaurants__items" v-if="restaurants">
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
        <v-pagination v-model="page" :length="length" @input="pageChange"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import restaurant from "@/api/restaurant.js";
import axios from "axios";
import RestaurantItem from "@/components/RestaurantItem.vue";
import RestaurantSearch from "@/components/RestaurantSearch.vue";

export default {
  components: {
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
.restaurants {
  margin-bottom: 56px;
  &__result {
    padding: 0 8px;
  }
  &__items {
    width: 100%;
    display: grid;
    gap: 16px;
    margin: 0 auto 80px;
    justify-content: center;
    @include tab {
      grid-template-columns: repeat(auto-fill, 350px);
    }
  }
  &__hit {
    display: flex;
    justify-content: center;
    align-items: baseline;
    margin-bottom: 24px;
  }
  &__error-message {
    max-width: 500px;
    margin: 80px auto;
  }
  strong {
    font-size: 16px;
    @include pc {
      font-size: 18px;
    }
  }
}
</style>
