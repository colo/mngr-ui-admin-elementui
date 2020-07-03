<template>
  <div class="app-container">

    <div style="margin-bottom: 10px">
      <el-row>
        <el-col :span="10">
          <el-input v-model="filters[0].value" placeholder="&quot;status&quot;, &quot;hostname&quot; or &quot;host&quot;"></el-input>
        </el-col>
      </el-row>
    </div>

    <data-tables :data="checks" :filters="filters" :table-props="tableProps" :sort-method="sortMethod">
      <el-table-column
        type="expand"
        sortable="custom"
      >
      <template slot-scope="scope">
        <json-viewer :value="scope.row" theme="my-awesome-json-theme" copyable></json-viewer>
      </template>
      </el-table-column>
      <el-table-column
        v-for="column in columns"
        :prop="column.prop"
        :label="column.label"
        :key="column.prop"
        sortable="custom"
      >
      <!-- :formatter="(column.prop === 'timestamp') ? format_time : null" -->
      <template slot-scope="scope">
        <!-- <el-tag :type="scope.row.tag === 'Home' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}</el-tag> -->
        <template v-if="column.prop === 'hostname'">
          <!-- <el-link :underline="false">
            <el-button @click="scope.expand = !scope.expand" type="text" size="big">
              <font-awesome-icon :icon="scope.expand ? 'sort-up' : 'sort-down'" @click="scope.expand = !scope.expand"/>
            </el-button>
          </el-link> -->
          {{ scope.row.uri || scope.row.hostname}}
          <!-- {{scope.row.uri}} -->
          <el-link :underline="false" v-if="/^http/.test(scope.row.protocol)" :href="scope.row.protocol+'//'+scope.row.hostname" target="_blank">
            <el-button type="text">
              <font-awesome-icon icon="external-link-alt" />
            </el-button>
          </el-link>
        </template>
        <template v-else-if="column.prop === 'timestamp'">{{ format_time(scope.row.timestamp) }}</template>
        <template v-else-if="column.name === 'status'">
          <!-- <el-button type="success"> -->
            <font-awesome-icon
              :icon="(scope.row.errno || scope.row.code >= 399) ? 'exclamation-circle' : 'check-circle'"
              :style="{ color: (scope.row.errno || scope.row.code >= 399 || scope.row.code === 'ETIMEDOUT' ) ? 'red' : 'green' }"
            />
          <!-- </el-button> -->
           <!-- :class="(scope.row.code >= 399 || scope.row.errno) ?  'text-negative' : 'text-positive'" -->
          {{ scope.row.code || scope.row.errno }}
        </template>
        <template v-else>{{scope.row[column.prop]}}</template>
      </template>
      </el-table-column>

    </data-tables>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import * as Debug from 'debug'
const debug = Debug('apps:checks')

import JsonViewer from 'vue-json-viewer'

import JSPipeline from 'js-pipeline'
import PeriodicalPipeline from '@apps/checks/pipelines/periodical/index'
import * as PeriodicalSources from '@apps/checks/sources/periodical/index'

import DataSourcesMixin from '@mixins/dataSources'

import moment from 'moment'

import Vue from 'vue'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)
// Vue.component('font-awesome-layers', FontAwesomeLayers)
// Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExternalLinkAlt, faExclamationCircle, faCheckCircle, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
// import { faSpinner } from '@fortawesome/pro-light-svg-icons/faSpinner'

library.add(faExternalLinkAlt, faExclamationCircle, faCheckCircle, faSortDown, faSortUp)

import { DataTables } from 'vue-data-tables'

export default {
  mixins: [DataSourcesMixin],

  components: { JsonViewer, DataTables, FontAwesomeIcon },
  // extends: DataSourcesMixin,

  name: 'Checks',

  // pipelines: {},
  // __pipelines_cfg: {},
  // unwatch_store: undefined,
  req_components: {
    'input.checks.periodical': {
      range: {
        source: {
          requests: PeriodicalSources.requests
          // store: store
        }
      }
    }
  },

  data () {
    return {
      height: '0px',

      checks: [],
      sortMethod: {
        code (a, b) {
          // console.log('custom sort funtion is called: ', a, b)
          // debug('sortMethod status', a, b)
          return (a >= 399 && b < 399) ? 1 : (b >= 399 && a < 399) ? -1 : 0
        }
      },
      columns: [
        { name: 'status',
          label: 'Status',
          // sort: (a, b, rowA, rowB) => {
          //   return ((a.code >= 399 || a.errno) && (b.code < 399 || !b.errno)) ? 1 : ((b.code >= 399 || b.errno) && (a.code < 399 || !a.errno)) ? -1 : 0
          // },
          prop: 'code',
          sortable: true,
          align: 'left'
        },
        { name: 'protocol', label: 'Protocol', prop: 'protocol', sortable: true, align: 'left' },
        {
          name: 'hostname',
          required: true,
          label: 'Host Name',
          align: 'left',
          prop: 'hostname',
          // prop: row => row.name,
          // format: val => `${val}`,
          sortable: true
          // classes: 'bg-grey-2 ellipsis',
          // style: 'max-width: 100px',
          // headerClasses: 'bg-secondary text-white'
        },
        { name: 'port', align: 'left', label: 'Port', prop: 'port', sortable: true },
        { name: 'host', align: 'left', label: 'Host', prop: 'host', sortable: true },
        { name: 'timestamp', align: 'left', label: 'Last Update', prop: 'timestamp', sortable: true },
        { name: 'path', align: 'left', label: 'Type', prop: 'path', sortable: true }
        // { name: 'calcium', label: 'Calcium (%)', prop: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        // { name: 'iron', label: 'Iron (%)', prop: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      filters: [
        {
          prop: ['code', 'hostname', 'host'],
          value: ''
        }
      ],
      tableProps: {
        stripe: true,
        defaultSort: {
          prop: 'timestamp',
          order: 'descending'
        }
      },
      /**
      * dataSources
      **/
      store: false,
      pipeline_id: [
        'input.checks.periodical',
      ],

      id: 'checks',
      path: 'all',

      // components: {
      //   'input.checks.periodical': {
      //     range: {
      //       source: {
      //         requests: PeriodicalSources.requests
      //         // store: store
      //       }
      //     }
      //   }
      // }
    }
  },
  computed: {
    pagesNumber () {
      return Math.ceil(this.checks.length / this.pagination.rowsPerPage)
    }
  },
  methods: {
    format_time: function (timestamp) {
      return moment(timestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')
    },
    /**
    * @start pipelines
    **/
    create_pipelines: function (create_id, next) {
      debug('create_pipelines %o', this.$options.pipelines)

      // if (
      //   this.$options.pipelines['input.o.periodicals.host.periodical'] data&
      //   this.$options.pipelines['input.os.host.periodical'].get_input_by_id('input.os.host.periodical')
      // ) {
      //   // let requests = this.__components_sources_to_requests(this.components)
      //   // if (requests.once) {
      //   //   this.$options.pipelines['input.os.host'].get_input_by_id('input.os').conn_pollers[0].options.requests.once.combine(requests.once)
      //   //   this.$options.pipelines['input.os.host'].get_input_by_id('input.os').conn_pollers[0].fireEvent('onOnceRequestsUpdated')
      //   // }
      //   //
      //   // if (requests.periodical) {
      //   //   this.$options.pipelines['input.os.host'].get_input_by_id('input.os').conn_pollers[0].options.requests.periodical.combine(requests.periodical)
      //   //   this.$options.pipelines['input.os.host'].get_input_by_id('input.os').conn_pollers[0].fireEvent('onPeriodicalRequestsUpdated')
      //   // }
      // } else {
      const pipelines = [PeriodicalPipeline] //, HourPipeline, DayPipeline
      Array.each(pipelines, function (Pipeline) {
        let template = Object.clone(Pipeline)

        debug('create_pipelines template %o', template)

        let pipeline_id = template.input[0].poll.id
        if (!create_id || create_id === undefined || create_id === pipeline_id) {
          // template.input[0].poll.conn[0].requests = this.__components_sources_to_requests(this.components[pipeline_id], pipeline_id)
          Array.each(template.input[0].poll.conn, function (conn, index) {
            template.input[0].poll.conn[index].requests = this.__components_sources_to_requests(this.$options.req_components[pipeline_id], pipeline_id)
          }.bind(this))

          let pipe = new JSPipeline(template)

          this.$options.__pipelines_cfg[pipeline_id] = {
            ids: [],
            connected: [],
            suspended: pipe.inputs.every(function (input) { return input.options.suspended }, this)
          }

          // this.__after_connect_inputs(
          //   pipe,
          //   this.$options.__pipelines_cfg[pipeline_id],
          //   this.__resume_pipeline.pass([pipe, this.$options.__pipelines_cfg[pipeline_id], this.id, function () {
          //     debug('__resume_pipeline CALLBACK')
          //     pipe.fireEvent('onOnce')
          //   }], this)
          // )

          this.$options.pipelines[pipeline_id] = pipe
        }
      }.bind(this))

      debug('create_pipelines %o', this.$options.pipelines)

      if (next) { next() }
      // }
    },

    /**
    * @end pipelines
    **/

  }
}
</script>

<style lang="css" scoped>
.my-sticky-header-table {
/* height or max-height is important */
height: 310px;
/* this is when the loading indicator appears */;
}

.my-sticky-header-table .q-table__top,
.my-sticky-header-table .q-table__bottom,
.my-sticky-header-table thead tr:first-child th {
/* bg color is important for th; just specify one */
background-color: #c1f4cd;
}

.my-sticky-header-table thead tr th {
position: sticky;
z-index: 1;
}

.my-sticky-header-table thead tr:first-child th {
top: 0;
}

.my-sticky-header-table.q-table--loading thead tr:last-child th {
/* height of all previous header rows */
top: 48px;
}
</style>

<style lang="css">
// values are default one from jv-light template
.my-awesome-json-theme {
  background: #1d1d1d;
  white-space: nowrap;
  color: #525252;
  font-size: 14px;
  font-family: Consolas, Menlo, Courier, monospace;

  .jv-ellipsis {
    color: #999;
    background-color: #eee;
    display: inline-block;
    line-height: 0.9;
    font-size: 0.9em;
    padding: 0px 4px 2px 4px;
    border-radius: 3px;
    vertical-align: 2px;
    cursor: pointer;
    user-select: none;
  }
  .jv-button { color: #49b3ff }
  .jv-key { color: #111111 }
  .jv-item {
    &.jv-array { color: #111111 }
    &.jv-boolean { color: #fc1e70 }
    &.jv-function { color: #067bca }
    &.jv-number { color: #fc1e70 }
    &.jv-object { color: #111111 }
    &.jv-undefined { color: #e08331 }
    &.jv-string {
      color: #42b983;
      word-break: break-word;
      white-space: normal;
    }
  }
  .jv-code {
    .jv-toggle {
      &:before {
        padding: 0px 2px;
        border-radius: 2px;
      }
      &:hover {
        &:before {
          background: #eee;
        }
      }
    }
  }
}
</style>
