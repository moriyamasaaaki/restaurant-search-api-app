<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link to="/" class="app-title">
          <span>レストラン検索</span>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <span class="mr-2">Home</span>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>

<style lang="scss" scoped>
.app-title {
  color: white;
  text-decoration: none;
  cursor: pointer;
}
</style>
