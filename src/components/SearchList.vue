<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="10" sm="8" md="6" lg="4">
        <v-text-field label="店名・ジャンル" v-model="shopName" />
      </v-col>
      <v-col cols="2">
        <v-btn @click="loadShops" :loading="loading">検索</v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="error_msg" type="error">{{ error_msg }}</v-alert>

    <v-row v-if="shops">
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(shop, index) in shops"
        :key="index"
      >
        <v-card>
          <v-img :src="shop.image_url.shop_image1" />
          <v-card-title>{{ shop.name }}</v-card-title>
            <v-chip>{{ shop.code.areaname_s }}</v-chip>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import restaurant from "@/api/restaurant.js";

export default {
  name: "HelloWorld",

  data() {
    return {
      shopName: null,
      shops: null,
      error_msg: null,
      loading: false
    };
  },

  methods: {
    loadShops() {
      this.shops = null;
      this.error_msg = null;
      this.loading = true;

      restaurant
        .searchShops(this.shopName)
        .then(res => {
          this.shops = res;
          console.log(this.shops);
        })
        .catch(err => {
          this.error_msg = err;
        })
        .finally(() => {
          this.loading = false;
        });
      this.shopName = "";
    }
  }
};
</script>
