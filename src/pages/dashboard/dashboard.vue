<template>
  <div id="app">
    <fade-transition>
      <div class="bg__loading" v-if="visible">
        <div class="cake-container">
          <i class="cake_logo"></i>
          <div class="cake_logo_text">
            <span class="cake_logo_text__brand">Mune</span>
            <span class="cake_logo_text__shop">Cake Shop</span>
          </div>
        </div>
      </div>
      <template v-else>
        <div class="bg__shared dashboard--container">
          <div @click="openCart()" role="button" class="cart">
            <div class="cart_number">{{ cakesInCart.length }}</div>
            <i class="cart_logo" />
          </div>

          <div class="cake__title">Our Popular Cakes</div>

          <div class="cake__thumbnail-wrapper">
            <div class="hr_wrapper"><hr class="hr_line" /></div>
            <div class="cake__thumbnail-container">
              <i class="cake__thumbnail" />
            </div>
            <div class="hr_wrapper"><hr class="hr_line" /></div>
          </div>

          <div style="width: 100%">
            <swiper :options="swiperOptions">
              <swiper-slide v-for="(cake, i) in cakes" :key="cake.url + i">
                <card>
                  <div>
                    <img
                      class="cake__img"
                      :src="require(`../../assets/items/${cake.url}.png`)"
                    />
                  </div>
                  <template #action>
                    <div>
                      <p class="cake__name">{{ cake.name }}</p>
                      <div class="cake__price--container">
                        <span class="cake__price">{{
                          cake.price.toLocaleString("ja-JP", {
                            style: "currency",
                            currency: "JPY",
                          })
                        }}</span>
                        <div class="add_to_cart--container">
                          <div
                            v-if="
                              checkedCakes.find((item) => cake.url === item.url)
                            "
                          >
                            <i class="add_to_cart_tick" />
                          </div>
                          <div
                            @click="markChecked(cake)"
                            role="button"
                            class="add_to_cart_btn"
                          >
                            <i class="add_to_cart" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </card>
              </swiper-slide>
            </swiper>
          </div>

          <div class="btn-wrapper">
            <fade-transition>
              <div v-if="successToast" class="success__toast">
                <div><i class="add_to_cart_tick_blue" /></div>
                <div>Successfully added to cart</div>
              </div>
            </fade-transition>
            <pp-button :disabled="checkedCakes.length === 0" @click="addToCart"
              >Add to cart</pp-button
            >
          </div>
        </div>
      </template>
    </fade-transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Button from "@/components/Button.vue";
import Card from "@/components/Card.vue";
import FadeTransition from "@/components/FadeTransition.vue";
// eslint-disable-next-line no-unused-vars
import { CakeType } from "@/types";
import { CAKE_KEY, CHECKED_CAKE_KEY } from "@/utils/const";

@Component({
  name: "DashBoard",
  components: {
    Card,
    "pp-button": Button,
    FadeTransition,
  },
})
export default class DashBoard extends Vue {
  visible = true;
  successToast = false;
  cakes: Array<CakeType> = [
    {
      url: "banana",
      name: "Banana Cake",
      price: 90,
    },
    {
      url: "butterscotch",
      name: "Butterscotch",
      price: 155,
    },
    {
      url: "carrot",
      name: "Carrot",
      price: 165,
    },
    {
      url: "choco",
      name: "Choco",
      price: 77,
    },
    {
      url: "chocochip",
      name: "Chocochip",
      price: 130,
    },
    {
      url: "darkforest",
      name: "Darkforest",
      price: 100,
    },
    {
      url: "darkforestcake",
      name: "Darkforest cake",
      price: 120,
    },
    {
      url: "lemon",
      name: "Lemon",
      price: 80,
    },
    {
      url: "orange",
      name: "Orange",
      price: 80,
    },
    {
      url: "pineapple",
      name: "Pineapple",
      price: 110,
    },
    {
      url: "rainbow",
      name: "Rainbow",
      price: 200,
    },
    {
      url: "redvelvet",
      name: "Red velvet",
      price: 190,
    },
  ];
  checkedCakes: Array<CakeType> = [];
  cakesInCart: Array<CakeType> = [];
  swiperOptions = {
    slidesPerView: "auto",
    centeredSlides: true,
    watchSlidesProgress: true,
    on: {
      progress: function () {
        for (let i = 0; i < (this as any).slides.length; i++) {
          const slide = (this as any).slides[i];
          const progress = slide.progress;
          const es = slide.style;
          es.opacity = 1 - Math.min(Math.abs(progress / 2), 1);
          es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = `perspective(500px) translate3d(0,0,${-Math.abs(
            progress * 150
          )}px)`;
        }
      },
      SetTransition: function (speed: number) {
        for (let i = 0; i < (this as any).slides.length; i++) {
          const es = (this as any).slides[i].style;
          es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration =
            speed + "ms";
        }
      },
    },
  };
  created() {
    pp.pageWillAppear({
      success: () => {
        pp.getStorageData({
          key: CHECKED_CAKE_KEY,
          success: (res: any) => {
            this.cakesInCart = JSON.parse(res[CHECKED_CAKE_KEY] || "[]");
            this.checkedCakes = this.cakesInCart.slice();
          },
        });
      },
    });
    setTimeout(() => {
      this.visible = false;
    }, 800);
    pp.setStorageData({
      key: CAKE_KEY,
      value: JSON.stringify(this.cakes),
    });
  }
  markChecked(cake: CakeType) {
    const index = this.checkedCakes.findIndex((item) => item.url === cake.url);
    if (index > -1) {
      this.checkedCakes.splice(index, 1);
    } else {
      this.checkedCakes.push(cake);
    }
  }
  openCart() {
    pp.navigateTo({
      url: `pages/cart/cart`,
    });
  }
  async addToCart() {
    this.successToast = true;
    this.cakesInCart = this.checkedCakes.slice();
    pp.setStorageData({
      key: CHECKED_CAKE_KEY,
      value: JSON.stringify(this.checkedCakes),
      complete: this.hideToast(),
    });
  }
  async hideToast() {
    await new Promise((r) => setTimeout(() => r(), 2000));
    this.successToast = false;
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
@import "@/styles/classes";
.cake-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  display: flex;
  align-items: flex-end;
  .cake_logo {
    display: block;
    height: 48px;
    width: 56px;
    background-image: url("../../assets/cake.svg");
    background-position: center;
    background-repeat: no-repeat;
    animation: flip 1.2s infinite ease-in;
    transform-origin: 0 80%;
    transform-style: preserve-3d;
    &_text {
      color: $primary;
      display: flex;
      flex-direction: column;
      line-height: $line-height-sm;
      font-weight: $font-weight-bold;
      padding-left: 1rem;
      &__brand {
        font-size: $font-size-lg;
      }
      &__shop {
        font-size: $font-size-sm;
      }
    }
  }
}
@keyframes flip {
  35% {
    transform: rotateX(360deg);
  }
  100% {
    transform: rotatex(360deg);
  }
}

.bg__shared ::v-deep .swiper-slide {
  width: 70%;
  transform-style: preserve-3d;
  transition-duration: 0ms;
}

.dashboard--container {
  display: flex;
  flex-direction: column;
}

.cart {
  position: absolute;
  right: 1vh;
  top: 10vh;
  &:hover {
    cursor: pointer;
  }
  &_number {
    font-size: $font-size-sm;
    color: $white;
    padding-left: 15px;
    padding-top: 3px;
    position: relative;
    top: 0.5rem;
    z-index: 1;
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      top: 5px;
      left: 10px;
      z-index: -1;
      width: 1.2rem;
      height: 1.2rem;
      background-color: $red;
      border-radius: 50%;
      border: 1px solid $white;
    }
  }
  &_logo {
    display: block;
    background-image: url("../../assets/cart_logo.svg");
    background-repeat: no-repeat;
    background-size: 1.6rem 1.6rem;
    width: 1.6rem;
    height: 1.6rem;
  }
}

.cake__thumbnail-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3vh;
  .hr_wrapper {
    padding: 0 0.5rem;
    .hr_line {
      display: block;
      width: 3.5rem;
      background-color: $primary;
      height: 1px;
      border: none;
      margin-block-start: 0;
      margin-block-end: 0;
    }
  }
  .cake__thumbnail-container {
    display: flex;
    justify-content: center;
    align-items: center;
    .cake__thumbnail {
      display: block;
      background-image: url("../../assets/cake_log.svg");
      background-repeat: no-repeat;
      background-size: 1.8rem 1.8rem;
      width: 1.8rem;
      height: 1.8rem;
    }
  }
}

.cake__title {
  color: #50576b;
  font-size: 1.2rem;
  font-weight: $font-weight-bold;
  padding-top: 13vh;
  padding-bottom: 3vh;
  text-align: center;
}

.cake__img {
  display: block;
  width: 100%;
  margin: 0 auto;
}

.cake__name {
  color: #333;
  font-size: 1.2rem;
  font-weight: $font-weight-bold;
  padding-left: 0.6rem;
}

.cake__price--container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2vh;
  .cake__price {
    color: $primary;
    font-size: 1.2rem;
    font-weight: $font-weight-bold;
    padding-left: 0.6rem;
  }
  .add_to_cart--container {
    display: flex;
    .add_to_cart_tick {
      display: block;
      background-image: url("../../assets/tick.svg");
      background-repeat: no-repeat;
      background-size: 1.6rem 1.6rem;
      width: 1.6rem;
      height: 1.6rem;
      margin-right: 0.5rem;
    }
    .add_to_cart_btn {
      background: $orange;
      width: 3.4rem;
      height: 1.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.2rem;
      margin: 0 0.5rem;
      &:hover {
        cursor: pointer;
      }
      .add_to_cart {
        display: block;
        background-image: url("../../assets/cart.svg");
        background-repeat: no-repeat;
        background-size: 0.8rem 0.8rem;
        width: 0.8rem;
        height: 0.8rem;
      }
    }
  }
}

.btn-wrapper {
  position: relative;
  width: 70%;
  margin-top: 12vh;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .success__toast {
    position: absolute;
    top: -2.8rem;
    left: 0.8rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0.4rem;
    background-color: #333;
    color: $white;
    border-radius: 0.3rem;
    margin-bottom: 0.3rem;
  }
  .add_to_cart_tick_blue {
    display: block;
    background-image: url("../../assets/tick_blue.svg");
    background-repeat: no-repeat;
    background-size: 1.6rem 1.6rem;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.5rem;
  }
}
</style>
