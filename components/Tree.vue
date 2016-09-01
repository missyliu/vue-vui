<template lang="html">
  <ul class="vui-tree">
    <li v-for="(index, item) in items" class="item">
      <a @click="toggle(index, item)">
        {{ item.name }}
      </a>
      <vui-tree v-if="item.children" :items="item.children" v-show="item[hasChildren]" class="vui-tree-leaf"></vui-tree>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'vuiTree',
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    },
    hasChildren: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggle(index, item) {
      let that = this
      if(item.children && item.children.length) {
        if(item[that.hasChildren]) {
          item[that.hasChildren] = !item[that.hasChildren]
        }else {
          Vue.set(that.items[index], true, true)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
ul, li {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
.vui-tree {
  line-height: 2.5;

  .item a {
    display: block;
    padding: 0 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  .item a:hover {
    background-color: #ff5402;
  }

  &-leaf {
    padding-left: 15px;
  }
}
</style>
