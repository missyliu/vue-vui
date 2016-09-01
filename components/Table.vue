<template lang="html">
  <div class="vui-table">
    <div class="vui-table-bd">
      <table>
        <thead>
          <tr>
            <th v-for="col in columns">
              {{col.title}}
            </th>
          </tr>
        </thead>
        <tbody v-el:render>
          <tr v-for="row in data">
            <td v-for="col in columns">
              {{{!col.render && col.dataIndex ? row[col.dataIndex] : ''}}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="vui-table-ft">
      <!-- <vui-pagination></vui-pagination> -->
    </div>
  </div>
</template>

<script>
import vuiPagination from 'vue'

export default {
  props: {
    columns: {
      type: Array
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  ready() {
    this.compileRender()
  },
  methods: {
    compileRender() {
      this.$nextTick(() => {
        const $el = this.$els.render

        for(let i=0; i<this.columns.length; i++) {
          const curCol = this.columns[i]
          const dataIndex = curCol.dataIndex
          const renderFn = curCol.render
          if(renderFn) {
            for(let j=0; j<this.data.length; j++) {
              const value = this.data[j]
              const template = renderFn(value[dataIndex], value, j)
              const cell = document.createElement('DIV')
              cell.innerHTML = template
              // TODO: 这一部分的写法还是需要商榷下
              this.$parent.$compile(cell)

              const _el = $el.children[j].children[i]
              _el.appendChild(cell)
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.vui-table {
  position: relative;
  &-bd {
    position: absolute;
    width: 100%;
    table {
      width: 100%;
      max-width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
    }
    thead tr {
      border: 1px solid rgb(212, 212, 212);
    }
    th {
      padding: 12px 4px;
      background-color: rgb(248, 248, 248);
      font-size: 12px;
      text-align: left;
    }
    tbody tr {
      border: 1px solid rgb(212, 212, 212);
      border-width: 0 1px;
    }
    tbody tr:hover {
      background-color: rgba(87, 197, 247, 0.2);
    }
    td {
      padding: 10px 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 12px;
    }
    tr:not(:last-child) {
      border-bottom: 1px solid rgb(243, 243, 243);
    }
    tr:last-child {
      border-bottom: 1px solid rgb(212, 212, 212);
    }
  }
  &-divider {
    display: inline-block;
    margin: 0 4px;
    width: 1px;
    height: 8px;
    background-color: #ccc;
  }
}
</style>
