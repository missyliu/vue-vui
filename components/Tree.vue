<template lang="html">
  <ul>
    <li v-for="item in items">
      <div @click="toggle">
        {{ item.name }}
        <span class="glyphicon" :class="{'glyphicon-chevron-right':(!open && (item.children && item.children.length)),'glyphicon-chevron-down':(open && (item.children && item.children.length))}" aria-hidden="true"></span>
      </div>
      <vui-tree v-if="item.children" :items="item.children" v-show="open"></vui-tree>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'vuiTree',
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    toggle(e) {
      this.open = !this.open
    }
  }
}
</script>

<style lang="css">
</style>
