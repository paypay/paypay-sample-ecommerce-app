<template>
  <div class="header">
    <div class="header-contents">
      <div class="header-logo">
        <img src="@/assets/images/Logo.png" alt="logo" />
      </div>
      <div class="header-cart" @click="navigate()">
        <img src="@/assets/images/cart.png" alt="cart" />
        <div class="cart-item">{{ cartItems.length }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'
// eslint-disable-next-line
import { iItem } from '@/common/interface/item'
const CartGetter = namespace('cart', Getter)
@Component({
  components: {},
})
export default class Header extends Vue {
  @CartGetter cartItems!: iItem[]
  navigate() {
    this.$router.push({
      name: 'orderreview',
    })
  }
}
</script>

<style lang="scss">
@import '@/styles/index';
.header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: $white;
  z-index: 999;
  .header-contents {
    display: flex;
    justify-content: space-between;
    padding: 26px 7%;
    .header-logo {
      cursor: pointer;
    }
    .header-cart {
      position: fixed;
      right: 25px;
      top: 30px;
      cursor: pointer;
      .cart-item {
        top: 12px;

        position: fixed;
        right: 25px;
        background-color: $red;
        text-align: center;
        border-radius: 50%;

        padding: 1px 6px;
        color: $white;
        font-weight: bold;
      }
    }
  }
}
</style>
