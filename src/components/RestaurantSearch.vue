<template>
  <v-form class="Restaurant-search">
    <v-row class="Restaurant-search__input">
      <v-col cols="12" xs="10" sm="6" md="5">
        <v-text-field label="店名・ジャンル" outlined v-model="name" />
      </v-col>
      <v-col cols="12" xs="10" sm="6" md="5">
        <v-select
          v-model="range"
          :items="categories"
          item-text="categoryName"
          item-value="id"
          label="現在地からの距離"
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn
          class="Restaurant-search__button"
          color="secondary"
          x-large
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
      name: "焼肉",
      range: 2,
      categories: [
        { id: 1, categoryName: "300m" },
        { id: 2, categoryName: "500m" },
        { id: 3, categoryName: "1km" },
        { id: 4, categoryName: "2km" },
        { id: 5, categoryName: "3km" }
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
    padding: 20px;
  }
  &__input {
    margin: 48px auto;
  }
  &__button,
  &__input {
    width: 100%;
    @include pc {
      width: 70%;
    }
  }
}

.col-sm-8,
.col-md-5,
.col-12 {
  padding: 0 8px;
}
</style>
