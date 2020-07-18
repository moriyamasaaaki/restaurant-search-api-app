<template>
  <div class="restaurantDetail">
    <div>
      <v-card-title class="restaurantDetail__title">
        <span class="material-icons">restaurant</span>
        {{ restaurant.name }}
      </v-card-title>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>
            <div class="restaurantDetail__location">
              <span class="material-icons">location_on</span>
              {{ restaurant.code.areaname_s }}
              /
              {{ restaurant.access.line }}
              {{ restaurant.access.station }}
              {{ restaurant.access.station_exit }}
              徒歩{{ restaurant.access.walk }}分
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div class="restaurantDetail__container">
        <div class="restaurantDetail__img-list">
          <v-img
            class="restaurantDetail__img"
            v-if="!restaurant.image_url.shop_image1"
            src="/img/unnamed.png"
            alt=""
          />
          <v-img
            class="restaurantDetail__img"
            v-else
            :src="restaurant.image_url.shop_image1"
            alt=""
          />
        </div>
        <div class="restaurantDetail__content">
          <v-card-text>{{ restaurant.pr.pr_long }}</v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-list class="transparent">
            <v-list-item class="restaurantDetail__list">
              <span class="material-icons">home</span>
              <span>{{ restaurant.address }}</span>
            </v-list-item>
            <v-list-item class="restaurantDetail__list">
              <span class="material-icons">schedule</span>
              <span>{{ restaurant.opentime }}</span>
            </v-list-item>
            <v-list-item class="restaurantDetail__list">
              <span class="material-icons">settings_phone</span>
              <span>{{ restaurant.tel }}</span>
            </v-list-item>
            <v-list-item class="restaurantDetail__list">
              <span class="material-icons">money</span>
              <span>平均予算: {{ restaurant.budget }}円</span>
            </v-list-item>
            <v-list-item class="restaurantDetail__list">
              <span class="material-icons">warning</span>
              <span>{{ restaurant.holiday }}</span>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <a class="restaurantDetail__btn" :href="restaurant.url">
              <v-btn class="ma-2" outlined color="indigo">予約する</v-btn>
            </a>
          </v-card-actions>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      restaurants: null,
      restaurant: null,
      restaurantName: null
    };
  },

  async created() {
    let restaurantId = this.$route.params.restaurantId;
    this.restaurant = await this.getRestaurant(restaurantId);
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
.restaurantDetail {
  max-width: 1000px;
  margin: 24px auto;
  padding: 0 8px;
  &__img {
    margin-bottom: 16px;
    width: 100%;
    @include pc {
      margin: 0;
    }
  }
  &__container {
    @include pc {
      display: flex;
      justify-content: space-between;
      align-items: top;
    }
  }
  &__img-list {
    @include pc {
      width: 40%;
    }
  }
  &__content {
    @include pc {
      width: 55%;
    }
  }
  &__list {
    display: flex;
    align-items: flex-start;
  }
  &__btn {
    margin: 0 0 0 auto;
    text-decoration: none;
  }
  &__title,
  &__location {
    display: flex;
    align-items: center;
  }
}

.material-icons {
  color: rgba(0, 0, 0, 0.6);
  margin-right: 8px;
}

.v-card__title,
.v-card__text,
.v-list-item,
.v-card__actions {
  padding: 0;
}

.v-card__text {
  line-height: 2;
  padding-bottom: 16px;
}
</style>
