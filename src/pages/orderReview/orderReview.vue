<template>
  <div id="app">
    <div class="bg__shared orderReview">
      <div>
        <i class="orderReview--cake" />
        <i class="orderReview--tick" />
      </div>
      <div>
        <h3 class="orderReview--success__label">Order Success</h3>
        <div class="orderReview--success__date">{{ orderDate }}</div>
      </div>
      <div>
        <h3 class="orderReview--success__amount__label">Total Amount Paid</h3>
        <div class="orderReview--success__amount__number">{{ price }}</div>
      </div>
      <div class="hr_wrapper"><hr class="hr_line" /></div>
      <div role="button" @click="backHome" class="orderReview--back-btn">
        <a>Back to Home</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import dayjs from "dayjs";
import { CHECKED_CAKE_KEY } from "@/utils/const";

@Component({
  name: "OrderReview",
  components: {},
})
export default class OrderReview extends Vue {
  price: string = "0";
  mounted() {
    const params = new URLSearchParams(window.location.search);
    this.price = decodeURIComponent(params.get("price") || "￥0");
    pp.backButtonDidTap({
      success: () => {
        this.backHome();
      },
    });
  }
  get orderDate() {
    return dayjs().format("MMM D, YYYY HH:mm:ss");
  }
  backHome() {
    pp.setStorageData({
      key: CHECKED_CAKE_KEY,
      value: JSON.stringify([]),
      complete: pp.popAll(),
    });
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
@import "@/styles/classes";

.orderReview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  h3 {
    margin-block-start: 0.5rem;
    margin-block-end: 0;
  }
  &--cake {
    display: block;
    background-image: url("../../assets/order_review_cake.svg");
    background-repeat: no-repeat;
    background-size: 6rem 7rem;
    width: 6rem;
    height: 7rem;
  }
  &--tick {
    display: block;
    background-image: url("../../assets/tick_blue.svg");
    background-repeat: no-repeat;
    background-size: 2rem 2rem;
    width: 2rem;
    height: 2rem;
    position: relative;
    top: -1.3rem;
    left: 1.7rem;
  }
  &--success {
    &__label {
      font-size: 1.4rem;
      color: #50576b;
    }
    &__date {
      font-size: 0.8rem;
      color: #222;
      margin-bottom: 1.2rem;
    }
    &__amount {
      &__label {
        font-size: 1.3rem;
        font-weight: $font-weight-base;
        color: #515151;
      }
      &__number {
        font-size: 1.2rem;
        color: $primary;
        margin-bottom: 1.2rem;
      }
    }
  }

  .hr_wrapper {
    width: 80%;
    margin: 0 auto;
    .hr_line {
      display: block;
      width: 100%;
      background-color: #e6e8ef;
      height: 2px;
      border: none;
      margin-block-start: 0;
      margin-block-end: 0;
    }
  }
  &--back-btn {
    color: $primary;
    margin-top: 0.5rem;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
