<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <router-link to="/" class="title">
        <span>レストラン検索</span>
      </router-link>
    </div>
    <v-spacer></v-spacer>
    <span class="mr-2">Home</span>
  </v-app-bar>
</template>

<style lang="scss" scoped>
.title {
  color: white;
  text-decoration: none;
  cursor: pointer;
}
</style>
