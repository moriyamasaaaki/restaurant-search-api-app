<template>
  <v-form class="Restaurant-search">
    <v-row class="Restaurant-search__input">
      <v-col cols="12" xs="10" sm="8" md="5">
        <v-text-field label="店名・ジャンル" v-model="name" />
      </v-col>
      <v-col cols="12" xs="10" sm="8" md="5">
        <v-select
          v-model="range"
          :items="categories"
          item-text="categoryName"
          item-value="id"
          label="現在地からの距離"
        ></v-select>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn
          class="Restaurant-search__button"
          color="primary"
          @click="sendMessage"
          :loading="loading"
        >
          検索
          <span class="material-icons">search</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      name: null,
      range: 2,
      categories: [
        { categoryName: "300m", id: 1 },
        { categoryName: "500m", id: 2 },
        { categoryName: "1km", id: 3 },
        { categoryName: "2km", id: 4 },
        { categoryName: "3km", id: 5 }
      ]
    };
  },
  methods: {
    sendMessage() {
      this.$emit("catchMessage", this.name, this.range, this.loading);
    }
  }
};
</script>

<style lang="scss" scoped>
.Restaurant-search {
  &__button {
    display: block;
    width: 100%;
    padding: 20px;
  }
  &__input {
    width: 100%;
    @include pc {
      width: 70%;
      margin: 0 auto;
    }
  }
}
</style>
