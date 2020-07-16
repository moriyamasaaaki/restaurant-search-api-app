<template>
  <div class="home">
    <Restaurants />
  </div>
</template>

<script>
import Restaurants from "@/components/Restaurants.vue";

export default {
  name: "RestaurantList",
  components: {
    Restaurants
  }
};
</script>
