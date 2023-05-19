<template>
  <div
    class="__easyv-component"
    v-bind:id="id"
    v-bind:style="{
      position: 'absolute',
      width: width + 'px',
      height: height + 'px',
      left: left + 'px',
      top: top + 'px',
      textAlign: 'center'
    }"
  >
    <div class="swiper-container" ref="mySwiper" style="{height,width}">
      <div class="swiper-wrapper">
        <div class="swiper-slide" style="text-align: center">
          <span>1</span>
        </div>
        <div class="swiper-slide" style="text-align: center">
          <span>2</span>
        </div>
        <div class="swiper-slide" style="text-align: center">
          <span>3</span>
        </div>
        <div class="swiper-slide" style="text-align: center">
          <span>4</span>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import { reduceConfig } from './utils/reduce-config';
import Swiper from 'swiper/swiper-bundle.min.js';
import 'swiper/swiper-bundle.min.css';

export default {
  props: ['id', 'left', 'top', 'width', 'height', 'configuration', 'data'],
  data() {
    return {};
  },
  mounted() {
    this.setSwiper();
  },
  computed: {
    config: function () {
      return reduceConfig(this.configuration);
    }
  },
  methods: {
    // 初始化swiper
    setSwiper() {
      console.log(1111);
      new Swiper('.swiper-container', {
        autoplay: true,
        loop: true,
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'progressbar'
        }
      });
    }
  }
};
</script>

<style scoped>
.swiper {
  width: 600px;
  height: 300px;
}
</style>
