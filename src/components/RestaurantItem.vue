<template>
  <v-card class="restaurant">
    <router-link
      :to="{
        name: 'RestaurantDetail',
        params: { restaurantId: id }
      }"
    >
      <img class="restaurant__img" v-if="!img" src="/img/unnamed.png" alt="" />
      <img class="restaurant__img" v-else :src="img" alt="" />
      <div class="restaurant__body">
        <v-card-title class="restaurant__title">{{ name }}</v-card-title>
        <v-card-text>{{ pr }}</v-card-text>
        <div class="restaurant__subtitle my-4 subtitle-1">{{ area }}</div>
      </div>
    </router-link>
  </v-card>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    img: {
      type: String
    },
    area: {
      type: String
    },
    pr: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.restaurant {
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  &:hover {
    opacity: 0.7;
  }
  &__img {
    width: 100%;
    height: 250px;
  }
  &__body {
    flex: 1;
    padding: 8px;
  }
  &__title {
    color: rgba(0, 0, 0, 0.87);
  }
  &__subtitle {
    color: rgba(0, 0, 0, 0.6);
  }
  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.6);
  }
}
</style>
