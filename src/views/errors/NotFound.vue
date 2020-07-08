<template>
  <section class="notFound">
    <h1 class="notFound__title">ページが見つかりませんでした...😭</h1>
    <router-link to="/">
      <v-btn depressed large color="primary">トップページへ</v-btn>
    </router-link>
  </section>
</template>

<style lang="scss" scoped>
.notFound {
  text-align: center;
  &__title {
    margin: 80px 0;
  }
}
</style>
