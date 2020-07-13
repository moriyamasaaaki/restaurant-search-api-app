<template>
  <div class="restaurantDetail">
    <v-card>
      <v-card-title>{{ restaurant.name }}</v-card-title>
      <v-img
        class="restaurantDetail__img"
        v-if="!restaurant.image_url.shop_image1"
        src="/img/unnamed.png"
      />
      <v-img
        class="restaurantDetail__img"
        v-else
        :src="restaurant.image_url.shop_image1"
      />
      <v-card-text>{{ restaurant.pr.pr_long }}</v-card-text>
      <v-chip-group column>
        <v-chip>{{ restaurant.code.areaname_s }}</v-chip>
        <v-chip>{{ restaurant.tel }}</v-chip>
        <v-chip>{{ restaurant.opentime }}</v-chip>
      </v-chip-group>
      <a :href="restaurant.url">予約する</a>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // restaurants: restaurants,
      restaurants: null,
      restaurant: null,
      restaurantName: null
    };
  },

  async created() {
    let restaurantId = this.$route.params.restaurantId;
    this.restaurant = await this.getRestaurant(restaurantId);
    // console.log(restaurantId);
    // console.log(this.restaurant);
  },

  methods: {
    getRestaurant(restaurantId) {
      axios
        .get(process.env.VUE_APP_GURUNAVI_URLs, {
          params: {
            id: restaurantId
          }
        })
        .then(res => {
          this.restaurants = res.data.rest;
          console.log(this.restaurants);
          this.restaurants.forEach(restaurant => {
            if (restaurant.id == restaurantId) {
              this.restaurant = restaurant;
              // console.log(this.restaurant.name);
            }
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 20px;
}
.restaurantDetail {
  max-width: 500px;
  margin: 24px auto;
  &__img {
    width: 100%;
  }
}
</style>
