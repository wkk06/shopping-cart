<template>
  <div id="app" class="app-content">
    <Header></Header>
    <div class="goods-list">
      <Goods v-for="item in list" :key="item.id" :id="item.id" :title="item.goods_name" :pic="item.goods_img"
             :status="item.goods_state" :price="item.goods_price" :count="item.goods_count" @statusChange="statusChange"></Goods>
    </div>
    <Footer :full-checked="fullChecked" :totalPrice="totalPrice" :totalNum="totalNum" @fulStatusChange="fulStatusChange"></Footer>
  </div>
</template>

<script>
import axios from "axios";

import Header from "./components/Header/Header.vue";
import Goods from "./components/Goods/Goods.vue";
import Footer from "./components/Footer/Footer.vue";
import bus from '/src/components/eventBus.js'

export default {
  name: 'App',
  components: {
    Header,
    Goods,
    Footer
  },
  data() {
    return {
      list: [],
      fullCheck: false
    }
  },
  computed: {
    fullChecked() {
      return this.list.every(item=> {
        return item.goods_state
      })
    },
    totalPrice() {
      return this.list.filter(item=> item.goods_state).reduce((amount,item)=> {
        return amount+=item.goods_price*item.goods_count
      },0)
    },
    totalNum() {
      return this.list.filter(item=> item.goods_state).reduce((amount,item)=> {
        return amount+=item.goods_count
      },0)
    }
  },
  created() {
    bus.$on('share',val=> {
      this.list.some(item=> {
        if (item.id === val.id) {
          item.goods_count = val.count
          return true
        }
      })
    })
    this.getList()
  },
  methods: {
    async getList() {
      let {data} = await axios.get('https://www.escook.cn/api/cart')
      this.list = data.list
    },
    statusChange(e) {
      this.list.some(item=> {
        if (item.id === e.id) {
          item.goods_state = e.value
          return true
        }
      })
    },
    fulStatusChange(e) {
      this.list.forEach(item=> {
        item.goods_state = e
      })
    }
  }
}
</script>

<style lang="less">
html, body {
  position: relative;
  margin: 0;
  padding: 0;
}

.app-content {
  padding: 40px 0 0 0;

  .goods-list {
    height: calc(100vh - 100px);
    overflow: auto;
  }
}
</style>
