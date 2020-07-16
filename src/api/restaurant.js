import axios from "axios";

export default {
  searchRestaurants(name, range, latitude, longitude) {
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_GURUNAVI_URLs, {
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
        .then(restaurants => {
          resolve(restaurants.data.rest);
        })
        .catch(error => {
          const errorStatus = error.response.status;

          if (errorStatus) {
            reject("お店が見つかりませんでした");
          }
        });
    });
  }
};
