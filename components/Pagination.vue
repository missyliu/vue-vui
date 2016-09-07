<template lang="html">
  <div class="vui-pagination">
    每页显示
    <select @change="optionSelected($event)" v-model="pageSize">
      <option
        v-for="option in options"
        selected="{{option == pageSize}}"
      >{{option}}</option>
    </select>
    条，共<span>{{count}}</span>条
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    options: {
      type: Array,
      default() {
        return [0, 10, 20, 30, 40]
      }
    },
    onSelect: {
      type: Function,
      default() {}
    }
  },
  methods: {
    optionSelected() {
      this.onSelect(this.pageSize)
    }
  }
}
</script>

<style lang="css">
</style>
