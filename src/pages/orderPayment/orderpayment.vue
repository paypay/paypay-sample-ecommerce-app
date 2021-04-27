<template>
  <div class="orderpayment">
    <div class="orderpayment-contents">
      <div class="main-content">
        <div class="payment-image">
          <img src="@/assets/images/Image 1.png" alt="Cake" />
          <div class="payment-tick">
            <img src="@/assets/images/GreenTick-success.png" alt="Tick" />
          </div>
        </div>
        <div class="main-header">{{ $t('cake_shop.order_success') }}</div>
        <p class="main-date">
          {{
            new Date().toLocaleTimeString('en-us', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          }}
        </p>
        <p class="amount-paid">{{ $t('cake_shop.total_amount') }}</p>
        <p class="payment-amount" v-if="getSum">￥ {{ getSum.toFixed(2) }}</p>

        <div class="cake-description">
          <div
            class="cake-details"
            :key="index"
            v-for="(item, index) in cartItems"
          >
            <p class="cake-name">{{ $t(item.title) }}</p>
            <p class="cake-price">￥{{ item.price.toFixed(2) }}</p>
          </div>
        </div>
        <div class="merchantid">
          <span class="merchant-text">{{ $t('cake_shop.merchant') }}</span>
          <span class="merchant-number"> AKI8797A </span>
        </div>
        <router-link to="/">
          <div class="payment-header">
            <span class="header-text">{{ $t('cake_shop.home') }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
// eslint-disable-next-line
import { iItem } from '@/common/interface/item'
const CartModule = namespace('cart')

@Component
export default class OrderPayment extends Vue {
  @CartModule.Getter cartItems!: iItem[]
  @CartModule.Getter getSum!: number
  @CartModule.Getter getMerchantId!: number
}
</script>

<style lang="scss">
@import '@/styles/variables';
.orderpayment {
  .orderpayment-contents {
    background-image: url('./../../assets/images/Oval.png'),
      url('./../../assets/images/ovalright.png');
    background-position: left top, right top;
    background-repeat: no-repeat, no-repeat;
    padding: 55px 10% 78px 10%;
    background-color: $lightgrey;
    display: flex;
    justify-content: center;
    .main-content {
      width: 635px;
      border-radius: 16px;
      background-color: $white;
      box-shadow: 0 9px 46px 8px rgba(17, 22, 26, 0.08),
        0 11px 15px -7px rgba(17, 22, 26, 0.2);
      .payment-header {
        padding: 21px 0px 0px 13px;
        text-align: center;
        .header-text {
          font-size: 16px;
          color: $red;
          padding-left: 9px;
          position: relative;
          top: -3px;
        }
      }
      .main-header {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        color: $grey;
      }
      .main-date {
        text-align: center;
        font-size: 12px;
        color: $darkblack;
        margin-top: 0px;
        padding-bottom: 15px;
      }
      .payment-image {
        text-align: center;
        height: 125px;
        margin-bottom: 30px;
        img {
          height: 125px;
        }
        .payment-tick {
          position: relative;
          top: -25px;
          height: 36px;
          img {
            height: 36px;
          }
        }
      }
      .amount-paid {
        text-align: center;
        position: relative;
        font-size: 16px;
        color: $matgrey;
        font-weight: bold;
      }
      .payment-amount {
        font-size: 16px;
        font-weight: bold;
        color: $red;
        text-align: center;
        margin-top: -18px;
      }

      .cake-description {
        background-color: $lightviolet;
        margin-top: 26px;
        padding-top: 8px;

        .cake-details {
          display: flex;
          justify-content: center;
          padding-bottom: 5px;

          .cake-name {
            font-size: 11px;
            color: $darkblack;
            border-bottom: 2px solid #e6e8ef;
            padding-bottom: 5px;
          }
          .cake-price {
            padding-left: 11px;
            padding-top: 2px;
            color: $darkash;
            font-size: 10px;
            font-weight: 300;
            border-bottom: 2px solid #e6e8ef;
            padding-bottom: 5px;
            width: 18%;
          }
          .cake-prices {
            padding-left: 10px;
            color: $darkash;
            font-size: 20px;
            font-weight: 300;
            padding-bottom: 5px;
            width: 18%;
          }
        }
      }
      .merchantid {
        padding-top: 24px;
        text-align: center;
        .merchant-text {
          font-size: 12px;
          color: $silver;
        }
        .merchant-number {
          font-size: 12px;
          color: $darkblack;
        }
      }
      .transactionid {
        padding-top: 7px;
        text-align: center;
        .transaction-text {
          font-size: 12px;
          color: $silver;
        }
        .transaction-number {
          font-size: 12px;
          color: $darkblack;
        }
      }
      .paymentid {
        padding-top: 7px;
        padding-bottom: 35px;
        text-align: center;

        .paymentid-text {
          font-size: 12px;
          color: $silver;
        }
        .paymentid-number {
          font-size: 12px;
          color: $darkblack;
        }
      }
    }
  }
  a {
    text-decoration: none;
  }
  .bottom-border {
    border-bottom: none;
  }
}
</style>
