<template>
  <div class="home">
    <Top />
    <Restaurants />
  </div>
</template>

<script>
import Top from "@/components/Top.vue";
import Restaurants from "@/components/Restaurants.vue";

export default {
  name: "Home",
  components: {
    Top,
    Restaurants
  }
};
</script>
