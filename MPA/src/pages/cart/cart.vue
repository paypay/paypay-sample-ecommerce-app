<template>
  <div id="app">
    <div class="cart--container">
      <div class="cart--items__container">
        <fade-transition group="group">
          <div
            v-for="(cake, i) in checkedCakes"
            :key="cake.url + i"
            class="cart--items__unit"
          >
            <div class="cart--items__thumbnail">
              <img
                :src="require(`../../assets/items/${cake.url}.png`)"
                alt=""
              />
            </div>
            <div class="cart--items__info">
              <span>{{ cake.name }}</span>
              <span class="cart--items__price">{{
                cake.price.toLocaleString("ja-JP", {
                  style: "currency",
                  currency: "JPY",
                })
              }}</span>
            </div>
            <div class="cart--items__rm_container">
              <i @click="removeItem(cake)" class="cart--items__remove" />
            </div>
          </div>
        </fade-transition>
      </div>

      <div class="cart--items__order">
        <div class="cart--items__details cart--items__line--space">
          <h3 class="cart--items__details--header">Review Order</h3>
          <fade-transition group="group">
            <div
              class="cart--items__per"
              v-for="(cake, i) in checkedCakes"
              :key="cake.url + i"
            >
              <div class="cart--item__name">{{ cake.name }}</div>
              <div class="cart--item__price">
                {{
                  cake.price.toLocaleString("ja-JP", {
                    style: "currency",
                    currency: "JPY",
                  })
                }}
              </div>
            </div>
          </fade-transition>
        </div>

        <div class="hr_wrapper"><hr class="hr_line" /></div>

        <div class="cart--items__summary cart--items__line--space">
          <div class="cart--items__per">
            <div class="cart--item__name">Sub Total</div>
            <div class="cart--item__price">{{ totalPrice }}</div>
          </div>
          <div class="cart--items__per">
            <div class="cart--item__name">Delivery charges</div>
            <div class="cart--item__price">￥0</div>
          </div>
        </div>

        <div class="hr_wrapper"><hr class="hr_line" /></div>

        <div class="cart--items__amount">
          <div class="cart--items__total">
            <div>Total Amount</div>
            <div>{{ totalPrice }}</div>
          </div>
        </div>

        <div class="cart--items__actions">
          <div>
            <pp-button
              :disabled="checkedCakes.length === 0"
              @click="makePayment"
            >
              <div class="btn-slot-wrapper">
                <div class="btn-fisrt-wrapper">
                  <div><i class="btn-icon" /></div>
                  <div class="btn-first">Paypay</div>
                </div>
                <div class="btn-second-wrapper">
                  <span>Pay with Paypay</span>
                </div>
              </div>
            </pp-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Button from "@/components/Button.vue";
import FadeTransition from "@/components/FadeTransition.vue";
// eslint-disable-next-line no-unused-vars
import { CakeType } from "@/types";
import { CHECKED_CAKE_KEY } from "@/utils/const";

@Component({
  name: "Cart",
  components: {
    "pp-button": Button,
    FadeTransition,
  },
})
export default class Cart extends Vue {
  mounted() {
    pp.getStorageData({
      key: CHECKED_CAKE_KEY,
      success: (res: any) => {
        this.checkedCakes = JSON.parse(res[CHECKED_CAKE_KEY]);
      },
    });
  }
  checkedCakes: Array<CakeType> = [];
  get totalPrice() {
    return this.checkedCakes
      .reduce((res, cake) => {
        return res + cake.price;
      }, 0)
      .toLocaleString("ja-JP", {
        style: "currency",
        currency: "JPY",
      });
  }
  removeItem(cake: CakeType) {
    this.checkedCakes = this.checkedCakes.filter(
      (item) => item.url !== cake.url
    );
  }
  makePayment() {
    let totalPrice = this.totalPrice;
    pp.makePayment({
      merchantPaymentId: Math.random().toString(36),
      amount: {
        amount: parseInt(totalPrice.substring(1)),
        currency: "JPY",
      },
      requestedAt: Math.round(new Date().getTime() / 1000),
      merchantAlias: "297397309760667650",
      storeId: "store_id",
      success() {
        pp.navigateTo({
          url: `pages/orderReview/orderReview?price=${encodeURIComponent(
            totalPrice
          )}`,
        });
      },
      fail() {
        // pp.showErrorSheet({
        //   title: 'Payment failed',
        //   text: 'Sorry, the payment failed',
        // });
        pp.navigateTo({
          url: `pages/orderReview/orderReview?price=${encodeURIComponent(
            totalPrice
          )}`,
        });
      },
    });
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.cart--container {
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(0deg, #fff2b5 -6.3%, #ffd051 64.61%);
    mix-blend-mode: normal;
    opacity: 0.2;
  }
  .cart--items__container {
    padding: 0.8rem;
    overflow-y: scroll;
  }

  .cart--items__unit {
    display: flex;
    align-items: center;
    background: $white;
    border-radius: 0.4rem;
    padding: 0.6rem;
    width: 100%;
    margin: 0.2rem 0;
    .cart--items__thumbnail {
      img {
        width: 5.2rem;
        height: 3.5rem;
      }
    }
    .cart--items__info {
      justify-self: flex-start;
      display: flex;
      flex-direction: column;
      padding-left: 0.4rem;
      .cart--items__price {
        padding-top: 0.2rem;
        color: $primary;
        font-weight: $font-weight-bold;
      }
    }
    .cart--items__rm_container {
      margin-left: auto;
      .cart--items__remove {
        display: block;
        background-image: url("../../assets/remove_tick.svg");
        background-size: 1.6rem 1.6rem;
        background-position: center;
        background-repeat: no-repeat;
        width: 1.6rem;
        height: 1.6rem;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .cart--items__order {
    padding: 1.2rem 1.4rem;
    background: #fafafa;
    line-height: $line-height-base;
    min-height: 50vh;
    max-height: 65vh;
    .hr_wrapper {
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
    .cart--items__details {
      &--header {
        margin-block-start: 0;
        margin-block-end: 0;
        padding: 0.5rem 0;
      }
    }
    .cart--items__per {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      .cart--item__name {
        color: #333;
      }
      .cart--item__price {
        color: #8e8e8e;
      }
    }
    .cart--items__line--space {
      margin-bottom: 1rem;
    }
    .cart--items__amount {
      margin: 1rem 0 1.5rem 0;
      .cart--items__total {
        display: flex;
        justify-content: space-between;
        color: $primary;
      }
    }
  }

  .cart--items__actions {
    text-align: center;
    padding: 1.8rem 0;
    .btn-slot-wrapper {
      display: flex;
      .btn-fisrt-wrapper {
        display: flex;
        align-items: center;
      }
      .btn-icon {
        display: block;
        background-image: url("../../assets/paypay.svg");
        background-size: 1rem 1rem;
        background-position: center;
        background-repeat: no-repeat;
        width: 1rem;
        height: 1rem;
      }
      .btn-first {
        padding: 0 0.5rem;
        &:after {
          content: "";
          position: absolute;
          display: inline-block;
          width: 1px;
          height: 56px;
          top: 0px;
          background-color: $white;
          margin-left: 0.5rem;
        }
      }
      .btn-second-wrapper {
        text-align: center;
        width: 100%;
      }
    }
  }
}
</style>
