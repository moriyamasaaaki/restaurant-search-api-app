<template>
  <div class="restaurants">
    <RestaurantSearch @catchMessage="loadShops" :loading="loading" />
    <div class="restaurants__result">
      <v-alert
        class="restaurants__error-message"
        v-if="error_msg"
        type="error"
        >{{ error_msg }}</v-alert
      >
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
          :pr_text="restaurant.pr.pr_short"
        />
      </div>
      <div class="text-center">
        <v-progress-circular
          v-if="!restaurants && !error_msg"
          :size="50"
          color="primary"
          indeterminate
          :loading="loading"
        ></v-progress-circular>
      </div>
      <div v-if="restaurants" class="text-center">
        <v-pagination
          v-model="page"
          :length="length"
          @input="pageChange"
          color="primary"
        ></v-pagination>
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
    const route = this.$route.params;
    const restaurantName = route.restaurantName;
    const restaurantRange = route.restaurantRange;
    const latitude = route.latitude;
    const longitude = route.longitude;
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
          setTimeout(() => {
            this.restaurants = res;
            let url = `/restaurants/${name}/${range}/${this.latitude}/${this.longitude}`;
            const encoded = encodeURI(url);
            this.$router.push({ path: encoded });
            this.pageLength();
            this.loading = false;
          }, 1000);
        })
        .catch(err => {
          setTimeout(() => {
            this.loading = false;
            this.error_msg = err;
          }, 1000);
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
    pageLength() {
      this.length = Math.ceil(this.restaurants.length / this.pageSize);
      this.restaurantLists = this.restaurants.slice(
        this.pageSize * (this.page - 1),
        this.pageSize * this.page
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
          setTimeout(() => {
            this.restaurants = res.data.rest;
            this.pageLength();
            this.loading = false;
          }, 1000);
        })
        .catch(error => {
          setTimeout(() => {
            console.error(error);
            this.loading = false;
          }, 1000);
        });
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
    gap: 24px;
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
