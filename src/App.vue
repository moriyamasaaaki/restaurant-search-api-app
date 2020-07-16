<template>
  <v-app>
    <Header />
    <main class="wrapper">
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",

  components: {
    Header
  }
};
</script>

<style lang="scss">
.wrapper {
  padding: 56px 0;
}
</style>
