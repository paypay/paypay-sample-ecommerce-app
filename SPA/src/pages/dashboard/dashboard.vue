<template>
  <transition name="fade">
    <div class="bg__loading" v-if="visible">
      <div class="cake-container">
        <i class="cake_logo"></i>
        <div class="cake_logo_text">
          <span class="cake_logo_text__brand">{{ $t('cake_shop.mune') }}</span>
          <span class="cake_logo_text__shop">{{
            $t('cake_shop.cake_shop')
          }}</span>
        </div>
      </div>
    </div>
    <div class="dashboard" v-else>
      <Header />
      <div class="dashboard-items">
        <div class="header-image">
          <p class="header-text">
            {{ $t('cake_shop.header_text_one') }}
            <br />
            {{ $t('cake_shop.header_text_two') }}
          </p>
        </div>
        <div class="header-bar"></div>
        <div class="dashboard-content">
          <div class="main-content">
            <div class="main-image">
              <img alt="Cake" src="@/assets/images/cakelogo.png" />
            </div>
            <p class="main-text">{{ $t('cake_shop.main_text') }}</p>
            <div class="main-cakes">
              <div class="cake-contents">
                <Item
                  v-for="(item, index) in allItems"
                  :key="index"
                  :attibutes="item"
                ></Item>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '@/components/dashboard/header.vue'
import Footer from '@/components/dashboard/footer.vue'
import Item from '@/components/item/index.vue'

import { namespace } from 'vuex-class'
// eslint-disable-next-line
import { iItem } from '@/common/interface/item'

const ItemModule = namespace('items')

@Component({
  components: {
    Item,
    Header,
    Footer,
  },
})
export default class Dashboard extends Vue {
  @ItemModule.Getter allItems!: iItem[]
  @ItemModule.Action fetchCakes: any
  visible = true
  created() {
    setTimeout(() => {
      this.visible = false
    }, 800)
  }
  mounted() {
    this.fetchCakes()
  }
}
</script>

<style lang="scss">
@import '@/styles/variables';
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
    background-image: url('../../assets/cake.svg');
    animation: flip 1.2s infinite ease-in;
    background-position: center;
    background-repeat: no-repeat;
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
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.bg__shared ::v-deep .swiper-slide {
  width: 70%;
  transform-style: preserve-3d;
  transition-duration: 0ms;
}
.dashboard {
  height: calc(100vh + 107px);

  .header {
    background-color: rgba(255, 255, 255, 0.8);
  }

  .dashboard-items {
    position: relative;
    top: -107px;

    .header-image {
      background-image: url('./../../assets/images/banner.png');
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

      .header-text {
        font-size: 30px;
        font-weight: bold;
        padding: 181px 0px 110px 7%;
      }
    }

    .header-bar {
      height: 4px;
      background-color: $yellow;
    }

    .dashboard-content {
      .main-content {
        background-image: url('./../../assets/images/Oval.png'),
          url('./../../assets/images/ovalright.png');
        background-position: left top, right top;
        background-repeat: no-repeat, no-repeat;
        padding: 46px 7% 170px 7%;
        background-color: $lightgrey;

        .main-image {
          text-align: center;
          padding-bottom: 16px;
        }

        .main-text {
          text-align: center;
          font-weight: bold;
          color: $grey;
          font-size: 40px;
          padding-bottom: 37px;
        }

        .main-cakes {
          display: flex;
          justify-content: center;

          .cake-contents {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
        }
      }
    }
  }

  .cakes-padding {
    padding-left: 20px;
  }

  .bottom-padding {
    padding-bottom: 20px;
  }
}
</style>
