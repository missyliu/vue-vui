<template lang="html">
  <div class="vui-pager">
    <ul>
      <li class="item" v-if="cur != 1"><a @click="cur--"><</a></li>
      <li class="item" v-for="index in indexs" :class="{ active: cur == index }">
        <a v-if='index == "..."'>{{ index }}</a>
        <a v-else @click="goto(index)">{{ index }}</a>
      </li>
      <li class="item" v-if="cur != total"><a @click="cur++">></a></li>
    </ul>
    共<span>{{total}}</span>页
    跳转到第<input type="text" style="width:30px;" v-model='num'>页
    <input type="button" name="确定" value="确定" @click='gotoPage'>
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
    cur: {
      type: Number,
      default: 1
    },
    onChange: {
      type: Function,
      default() {}
    }
  },
  data() {
    return {
      total: 0,
      num: '',
      indexs: [],
      pageLeft: 0,
  	  pageRight: 0
    }
  },
  computed: {
    total() {
      this.cur = 1
      return ~~(this.count / this.pageSize) + (~~(this.count % this.pageSize) == 0 ? 0 : 1)
    },
    indexs() {
      let bigger = this.total <= 9
      let indexs = []
      let start = bigger ? 1 : this.pageLeft
      let end = bigger ? this.total : this.pageRight
      for(let i = start; i <= end; i++) {
        indexs.push(i)
      }
      return indexs
    },
    pageLeft() {
      let left = Math.max(1, this.cur - 2)
      if(this.total - this.cur <= 2) {
        left = this.total - 4
      }
      return left
    },
    pageRight() {
      let right = Math.min(this.cur + 2, this.total)
      if(this.cur - 1 <= 2) {
        right = 1 + 4
      }
      return right
    }
  },
  watch: {
    cur() {
      this.onChange(this.cur)
    }
  },
  methods: {
    goto(data) {
      if(data != this.cur) {
        this.cur = data
      }
    },
    gotoPage() {
      if(!!this.num && this.num > 0 && this.num <= this.total){
        this.cur = +this.num
        this.num = ''
      }
    }
  }
}
</script>

<style lang="scss">
// .vui-pager {
//   position: absolute;
//   right: 18px;
//   top: 0;
// }
.vui-pager ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-block;
}
.vui-pager .item {
  margin: 0 4px;
  display: inline-block;
  min-width: 28px;
  line-height: 28px;
  text-align: center;
  font-size: 12px;
  background-color: #fff;
  color: #666;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
}
.vui-pager a {
  padding: 3px 5px;
  display: block;
  cursor: pointer;
  height: 12px;
  line-height: 14px;
  text-decoration: none;
}
.vui-pager .item.active {
  background-color: #369be9;
  border-color: #369be9;
  color: #fff;
}
</style>
