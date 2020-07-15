<template>
  <div class="searchList__top">
    <figure class="searchList__background-img"></figure>
    <p class="searchList__title">🍽 今日の外食はどうする！？</p>
  </div>
</template>

<style lang="scss" scoped>
.searchList__top {
  position: relative;
}

.searchList__background-img {
  background: linear-gradient(
      90deg,
      rgba(35, 35, 36, 0.7),
      rgba(35, 35, 36, 0.7)
    ),
    url("/img/top-img.jpg") center / cover;
  width: 100%;
  height: 30rem;
}

.searchList__title {
  font-size: 24px;
  word-break: break-all;
  width: 100%;
  text-align: center;
  text-shadow: 1px 3px 3px #353535;
  color: white;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateY(-50%) translateX(-50%);
  -moz-transform: translateY(-50%) translateX(-50%);
  -ms-transform: translateY(-50%) translateX(-50%);
  -o-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  @include pc {
    font-size: 40px;
  }
}
</style>
