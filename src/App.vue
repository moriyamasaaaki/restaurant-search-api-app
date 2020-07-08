<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <span>レストラン検索</span>
      </div>

      <v-spacer></v-spacer>

      <span class="mr-2">Home</span>
    </v-app-bar>

    <v-content>
      <SearchList />
    </v-content>
  </v-app>
</template>

<script>
import SearchList from "./components/SearchList";

export default {
  name: "App",

  components: {
    SearchList
  },

  data: () => ({
    //
  })
};
</script>
