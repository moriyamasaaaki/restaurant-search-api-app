import axios from "axios";

export default {
  searchShops(name, range, latitude, longitude) {
    // Promiseを返す
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_GURUNAVI_URLs, {
          // 店名検索
          params: {
            name,
            range,
            latitude,
            longitude
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
