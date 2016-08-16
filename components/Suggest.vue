<template lang="html">
  <div class="vui-suggest">
    <input type="search" autocomplete="off"
      :placeholder="placeholder"
      v-model="query"
      @input="update"
      @keydown.up="up"
      @keydown.down="down"
      @keydown.enter="hit"
      @keydown.esc="reset"
      @blur="showDropdown = false"
    />
    <ul :style="{display: (showDropdown ? 'block' : 'none') }" v-el:dropdown>
      <li v-for="item in items" :class="{'active': isActive($index)}">
        <a @mousedown.prevent="hit" @mousemove="setActive($index)">
          <partial :name="templateName"></partial>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import coerceBoolean from '../utils/coerceBoolean'
import ajax from '../utils/ajax'

export default {
  props: {
    placeholder: {
      type: String
    },
    src: {
      type: String
    },
    ret: {
      type: String,
      default: null
    },
    key: {
      type: String
    },
    limit: {
      type: Number,
      default: 8
    },
    data: {
      type: Array
    },
    templateName: {
      type: String,
      default: 'default'
    },
    template: {
      type: String
    },
    matchCase: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    matchStart: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    onHit: {
      type: Function,
      default(item) {
        this.reset()
        this.query = item[this.key] || item
      }
    }
  },
  partials: {
    'default': '<span v-html="item | highlight query"></span>'
  },
  data() {
    return {
      query: '',
      items: [],
      showDropdown: false,
      noResults: true,
      current: 0
    }
  },
  computed: {
    primitiveData() {
      if(this.data) {
        return this.data.filter(value => {
          value = this.matchCase ? value : value.toLowerCase()
          var query = this.matchCase ? this.query : this.query.toLowerCase()
          return this.matchStart ? value.indexOf(query) === 0 : value.indexOf(query) !== -1
        }).slice(0, this.limit)
      }
    }
  },
  created() {
    this.items = this.primitiveData
  },
  ready() {
    if(this.templateName && this.templateName !== 'default') {
      // Notice: 这里需要用到全局 Vue，使用该组件该方法时要注意引入 Vue
      Vue.partial(this.templateName, this.template)
    }
  },
  methods: {
    update() {
      if(!this.query) {
        this.reset()
        return false
      }
      if(this.data) {
        this.items = this.primitiveData
        this.showDropdown = this.items.length ? true : false
      }
      if(this.src) {
        ajax(this.src + this.query, (data) => {
          // TODO: 目前 ret 对应支持数据格式为：data = {ret:xxx, data: {}}
          // this.items = (this.ret ? data[this.ret] : data).slice(0, this.limit)
          this.items = (this.ret ? data.data[this.ret] : data).slice(0, this.limit)
          this.showDropdown = this.items.length ? true : false
        })
      }
    },
    reset() {
      this.items = []
      this.query = ''
      this.showDropdown = false
    },
    hit(e) {
      e.preventDefault()
      this.onHit(this.items[this.current], this)
    },
    up() {
      if(this.current > 0) this.current--
    },
    down() {
      if(this.current < this.items.length -1) this.current++
    },
    isActive(index) {
      return this.current === index
    },
    setActive(index) {
      this.current = index
    }
  },
  filters: {
    highlight(value, phrase) {
      return value.replace(new RegExp('(' +phrase+ ')', 'gi'), '<strong>$1<strong>')
    }
  }
}
</script>

<style lang="css">
.vui-suggest {
  width: 200px;
}
.vui-suggest input {
  width: 100%;
}
.vui-suggest ul {
  margin: 0;
  background-color: #f1f1f1;
}
.vui-suggest a {
  cursor: pointer;
  display: block;
}
.vui-suggest .active {
  background-color: pink;
}
</style>
