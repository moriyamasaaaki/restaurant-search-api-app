<template>
  <v-app-bar class="header" app color="success" dark>
    <div class="d-flex align-center">
      <router-link to="/" class="header__title">
        <span>レストラン検索</span>
      </router-link>
    </div>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<style lang="scss" scoped>
.header {
  &__title {
    color: white;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
