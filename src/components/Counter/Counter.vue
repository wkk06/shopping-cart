<template>
  <div>
    <el-input-number v-model="goodsCount" @change="handleChange" :min="1" :max="99" size="mini" label="描述文字"></el-input-number>
  </div>
</template>

<script>
import bus from '/src/components/eventBus.js'
export default {
  name: "Counter",
  props: {
    id: {
      require: true,
      type: Number
    },
    count: {
      default: 1,
      type: Number
    }
  },
  data() {
    return {
      goodsCount: 1
    }
  },
  created() {
    this.goodsCount = this.count
  },
  methods: {
    handleChange(e) {
      let obj = {id:this.id, count: this.goodsCount}
      bus.$emit('share', obj)
    }
  }
}
</script>

<style scoped>

</style>