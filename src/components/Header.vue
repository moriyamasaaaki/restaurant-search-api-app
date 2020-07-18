<template>
  <v-app-bar class="header" color="primary" app>
    <div class="d-flex align-center">
      <router-link to="/" class="header__title">
        <span>Eating out immediately</span>
      </router-link>
    </div>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<style lang="scss" scoped>
.header {
  &__title {
    color: white;
    font-size: 24px;
    font-weight: 700;
    font-family: cursive;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
