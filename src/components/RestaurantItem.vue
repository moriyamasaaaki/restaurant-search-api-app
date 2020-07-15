<template>
  <v-card class="card">
    <router-link
      :to="{
        name: 'RestaurantDetail',
        params: { restaurantId: id }
      }"
    >
      <img class="img" v-if="!img" src="/img/unnamed.png" width="100%" />
      <img v-else :src="img" />
      <div class="card-body">
        <v-card-title class="title">{{ name }}</v-card-title>
        <div class="my-4 subtitle-1">{{ area }}</div>
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
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 250px;
}

.card {
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  &:hover {
    opacity: 0.7;
  }
}

a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
}


.card-body {
  flex: 1;
  padding: 8px;
}
.subtitle-1 {
  color: rgba(0, 0, 0, 0.6);
}

.title {
  color: rgba(0, 0, 0, 0.87);
}

</style>
