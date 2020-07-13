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
          },
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8"
          }
        })
        // 検索結果をresolve
        .then(restaurants => {
          resolve(restaurants.data.rest);
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
