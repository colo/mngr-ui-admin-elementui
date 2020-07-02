<template>
  <div class="app-container">

    <div style="margin-bottom: 10px">
      <el-row>
        <el-col :span="10">
          <el-input v-model="filters[0].value" placeholder="&quot;uri&quot; or &quot;host&quot;"></el-input>
        </el-col>
      </el-row>
    </div>

    <data-tables :data="vhosts" :filters="filters" :table-props="tableProps">
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
        <template v-if="column.prop === 'uri'">
          {{scope.row.uri}}
          <!-- <el-button type="primary" icon="el-icon-edit" size="small"><el-link type="info">info</el-link></el-button> -->
          <el-link :underline="false" :href="scope.row.schema+'://'+scope.row.uri+':'+scope.row.port" target="_blank">
            <el-button type="text">
              <font-awesome-icon icon="external-link-alt" />
            </el-button>
          </el-link>
        </template>
        <template v-else-if="column.prop === 'timestamp'">{{ format_time(scope.row.timestamp) }}</template>
        <template v-else>{{scope.row[column.prop]}}</template>
      </template>
      </el-table-column>

    </data-tables>
  </div>

</template>

<script>
import Vue from 'vue'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)
// Vue.component('font-awesome-layers', FontAwesomeLayers)
// Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
// import { faSpinner } from '@fortawesome/pro-light-svg-icons/faSpinner'

library.add(faExternalLinkAlt)

import * as Debug from 'debug'
const debug = Debug('apps:vhosts')

import JSPipeline from 'js-pipeline'
import PeriodicalPipeline from '@apps/vhosts/pipelines/periodical/index'

import * as PeriodicalSources from '@apps/vhosts/sources/periodical/index'

import DataSourcesMixin from '@mixins/dataSources'

import moment from 'moment'

import { DataTables } from 'vue-data-tables'

export default {
  mixins: [DataSourcesMixin],
  // extends: DataSourcesMixin,
  components: { DataTables, FontAwesomeIcon },
  name: 'Vhosts',

  // computed: {
  //   sortOptions () {
  //     // Create an options list from our fields
  //     return this.fields
  //       .filter(f => f.sortable)
  //       .map(f => {
  //         return { text: f.label, value: f.key }
  //       })
  //   }
  // },
  // mounted () {
  //   // Set the initial number of items
  //   this.totalRows = this.vhosts.length
  // },

  req_components: {
    'input.vhosts.periodical': {
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

      vhosts: [],

      // data: [
      //   { name: 'USA', rank: 1 },
      //   { name: 'China', rank: 2 }
      // ],
      columns: [
        { name: 'schema', label: 'Schema', prop: 'schema', sortable: true, align: 'left' },
        {
          name: 'uri',
          required: true,
          label: 'URI',
          align: 'left',
          prop: 'uri',
          // field: row => row.name,
          // format: val => `${val}`,
          sortable: true
          // classes: 'bg-grey-2 ellipsis',
          // style: 'max-width: 100px',
          // headerClasses: 'bg-secondary text-white'
        },
        { name: 'port', align: 'left', label: 'Port', prop: 'port', sortable: true },
        { name: 'host', align: 'left', label: 'Host', prop: 'host', sortable: true },
        {
          name: 'timestamp',
          align: 'left',
          label: 'Last Update',
          prop: 'timestamp',
          sortable: true,
          formatter: function (row) {
            return this.format_time(row.timestamp)
          }.bind(this)
          // format: (val, row) => `${val}%`
          // format: val => moment(val).format('dddd, MMMM Do YYYY, h:mm:ss a')
        },
        { name: 'path', align: 'left', label: 'Type', prop: 'path', sortable: true }
      ],
      filters: [
        {
          prop: ['uri', 'host'],
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
      * b-table
      **/
      // items: [
      //   { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
      //   { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
      //   {
      //     isActive: false,
      //     age: 9,
      //     name: { first: 'Mini', last: 'Navarro' },
      //     _rowVariant: 'success'
      //   },
      //   { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
      //   { isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
      //   { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
      //   { isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
      //   {
      //     isActive: true,
      //     age: 87,
      //     name: { first: 'Larsen', last: 'Shaw' },
      //     _cellVariants: { age: 'danger', isActive: 'warning' }
      //   },
      //   { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
      //   { isActive: false, age: 22, name: { first: 'Genevieve', last: 'Wilson' } },
      //   { isActive: true, age: 38, name: { first: 'John', last: 'Carney' } },
      //   { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } }
      // ],
      // fields: [
      //   { key: 'schema', label: 'Schema', sortable: true }, //, sortDirection: 'desc'
      //   { key: 'uri', label: 'URI', sortable: true, class: 'text-center' },
      //   {
      //     key: 'timestamp',
      //     label: 'Last Update',
      //     formatter: (timestamp, key, item) => {
      //       return moment(timestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')
      //     },
      //     sortable: true,
      //     // sortByFormatted: true,
      //     filterByFormatted: true
      //   },
      //   { key: 'actions', label: 'Actions' }
      // ],
      // totalRows: 1,
      // currentPage: 1,
      // perPage: 25,
      // pageOptions: [25, 50, 100],
      // sortBy: '',
      // sortDesc: false,
      // sortDirection: 'asc',
      // filter: null,
      // filterOn: [],
      // infoModal: {
      //   id: 'info-modal',
      //   title: '',
      //   content: ''
      // },
      /**
      * b-table
      **/

      /**
      * q-table
      **/
      // filter: '',
      // loading: true,
      // allColumns: ['schema', 'uri', 'port', 'host', 'timestamp', 'path'],
      // visibleColumns: ['schema', 'uri'],
      // pagination: {
      //   rowsPerPage: 10
      // },
      // columns: [
      //   { name: 'schema', label: 'Schema', field: 'schema', sortable: true, align: 'left' },
      //   {
      //     name: 'uri',
      //     required: true,
      //     label: 'URI',
      //     align: 'left',
      //     field: 'uri',
      //     // field: row => row.name,
      //     // format: val => `${val}`,
      //     sortable: true
      //     // classes: 'bg-grey-2 ellipsis',
      //     // style: 'max-width: 100px',
      //     // headerClasses: 'bg-secondary text-white'
      //   },
      //   { name: 'port', align: 'left', label: 'Port', field: 'port', sortable: true },
      //   { name: 'host', align: 'left', label: 'Host', field: 'host', sortable: true },
      //   {
      //     name: 'timestamp',
      //     align: 'left',
      //     label: 'Last Update',
      //     field: 'timestamp',
      //     sortable: true
      //     // format: (val, row) => `${val}%`
      //     // format: val => moment(val).format('dddd, MMMM Do YYYY, h:mm:ss a')
      //   },
      //   { name: 'path', align: 'left', label: 'Type', field: 'path', sortable: true }
      //   // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
      //   // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      // ],
      // sortedBy: { uri: 'asc' },
      /**
      * q-table
      **/

      /**
      * dataSources
      **/
      store: false,
      pipeline_id: [
        'input.vhosts.periodical',
      ],

      id: 'vhosts',
      path: 'all',

      // components: {
      //   'input.vhosts.periodical': {
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
      return Math.ceil(this.vhosts.length / this.pagination.rowsPerPage)
    }
  },
  methods: {
    // info (item, index, button) {
    //   this.infoModal.title = `Row index: ${index}`
    //   this.infoModal.content = JSON.stringify(item, null, 2)
    //   this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    // },
    // resetInfoModal () {
    //   this.infoModal.title = ''
    //   this.infoModal.content = ''
    // },
    // onFiltered (filteredItems) {
    //   // Trigger pagination to update the number of buttons/pages due to filtering
    //   this.totalRows = filteredItems.length
    //   this.currentPage = 1
    // },
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
