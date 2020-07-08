<template>
  <div class="home">
    <SearchList msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import SearchList from "@/components/SearchList.vue";

export default {
  name: "Home",
  components: {
    SearchList
  }
};
</script>
