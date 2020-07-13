<template>
  <div class="home">
    <SearchList />
  </div>
</template>

<script>
import SearchList from "@/components/SearchList.vue";

export default {
  name: "RestaurantList",
  components: {
    SearchList
  }
};
</script>
