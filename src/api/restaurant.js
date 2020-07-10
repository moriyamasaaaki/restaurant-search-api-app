import axios from "axios";

export default {
  searchShops(shopName, select) {
    // Promiseを返す
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_GURUNAVI_URL, {
          // 店名検索
          params: {
            name: shopName,
            range: select
          }
        })
        // 検索結果をresolve
        .then(shops => {
          resolve(shops.data.rest);
        })
        // エラーハンドリング
        .catch(error => {
          const errorStatus = error.response.status;

          if (errorStatus) {
            reject("お店が見つかりませんでした");
          }
        });
    });
  }
};
