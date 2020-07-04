<template>
  <el-card class="box-card" :style="{width: '100%'}">
  <div slot="header" class="clearfix">
    <!-- <span>Card name</span> -->
    <router-link
      :to="{
        name: 'system_host',
        params: { host: host },
      }"
      v-slot="{ href, route, navigate, isActive, isExactActive }"
    >
      <el-button
        type="text"
        :href="href"
        @click="navigate"
      >
      {{host}}
      </el-button>

    </router-link>

  </div>
  <!-- <div > -->

  <!-- <el-row :gutter="32">
    <el-col :xs="24" :sm="24" :lg="24">
      <div class="chart-wrapper" :style="{width: '100%', height: '300px'}"> -->
      <el-row :gutter="40" class="panel-group">
      <template v-if="Object.getLength(host_data) > 0">

          <el-col :xs="12" :sm="12" :lg="3" >
          <vue-easy-pie-chart-wrapper
            :id="host+'.loadavg'"
            :chart="{
              class: 'netdata-chart netdata-easypiechart-chart',
              params:{
                'bar-color': '#66AA00',
                'size': 130,
                /* 'percent': host_data['os.loadavg']['1_min'] || 0, */
                'percent': (100 * host_data['os.loadavg']['1_min']  / host_data['os.loadavg.max']) || 0,
                'value': host_data['os.loadavg']['1_min'],
                'max': host_data['os.loadavg.max'] || 0,
                'title': 'Load',
                unit: '1min avg',
                /**minValue: 0,
                maxValue: 100,
                unit: '%',
                value: host_data['os.cpus.percentage'] || 0,
                height: '200px',
                width: '334px' */
              }
            }"
          />
          </el-col>
          <el-col :xs="12" :sm="12" :lg="3" >
          <vue-easy-pie-chart-wrapper
            :id="host+'.net.out'"
            :chart="{
              class: 'netdata-chart netdata-easypiechart-chart',
              params:{
                'bar-color': '#3366CC',
                'size': 150,
                'percent': (100 * host_data['os.networkInterfaces.out'] / host_data['os.networkInterfaces.max.out']) || 0,
                'value': host_data['os.networkInterfaces.out'] / 125,
                'max': host_data['os.networkInterfaces.max.out'] || 0,
                title: 'Net Outbound',
                unit: 'kilobits/s',
              }
            }"
          />
          </el-col>
          <el-col :xs="12" :sm="12" :lg="3" >
          <vue-easy-pie-chart-wrapper
            :id="host+'.net.in'"
            :chart="{
              class: 'netdata-chart netdata-easypiechart-chart',
              params:{
                'bar-color': '#DC3912',
                'size': 150,
                'percent': (100 * host_data['os.networkInterfaces.in'] / host_data['os.networkInterfaces.max.in']) || 0,
                'value': host_data['os.networkInterfaces.in'] / 125,
                'max': host_data['os.networkInterfaces.max.in'] || 0,
                'title': 'Net Inbound',
                'unit': 'kilobits/s'//'kilobits/s',
              }
            }"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6">
          <v-gauge-wrapper
            :id="host+'.cpu'"
            :chart="{
              class: 'netdata-chart netdata-gauge-chart',
              params:{
                height: '180px',
                title: 'CPU',
                minValue: 0,
                maxValue: 100,
                value: host_data['os.cpus.percentage'] || 0,
              }
            }"
          />
        </el-col>

        <template v-for="(used, mount) in host_data['os.mounts.used']">
          <el-col :xs="12" :sm="12" :lg="3"  :key="host+'.'+mount+'.used'">
            <vue-easy-pie-chart-wrapper
              :id="host+'.'+mount+'.used'"
              :chart="{
                class: 'netdata-chart netdata-easypiechart-chart',
                params:{
                  'bar-color': '#AD69AD',
                  'size': 150,
                  'percent': used || 0,
                  'title': 'Used: '+ mount,
                  /* unit: 'kilobits/s', */
                }
              }"
            />
          </el-col>
        </template>
          <el-col :xs="12" :sm="12" :lg="3" >
          <vue-easy-pie-chart-wrapper
            :id="host+'.ram'"
            :chart="{
              class: 'netdata-chart netdata-easypiechart-chart',
              params:{
                'bar-color': '#66AA00',
                'size': 130,
                'percent': host_data['os.memory.percentage'] || 0,
                'title': 'Used RAM',
                /* unit: '%', */
                /**minValue: 0,
                maxValue: 100,
                unit: '%',
                value: host_data['os.cpus.percentage'] || 0,
                height: '200px',
                width: '334px' */
              }
            }"
          />
          </el-col>

      </template>
      <!-- </div>
    </el-col> -->
  </el-row>
  <!-- </div> -->
  </el-card>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import * as Debug from 'debug'
const debug = Debug('apps:system:components:hostCard')

// import JSPipeline from 'js-pipeline'
// import Pipeline from '@apps/os/pipelines/index'

// import DataSourcesMixin from '@mixins/dataSources'

// import { requests, store } from './sources/index'

import vGaugeWrapper from './wrappers/vGauge'
import vueEasyPieChartWrapper from './wrappers/vueEasyPieChart'

export default {
  // mixins: [DataSourcesMixin],
  // extends: DataSourcesMixin,
  components: { vGaugeWrapper, vueEasyPieChartWrapper },

  name: 'systemHostCard',

  // pipelines: {},
  // __pipelines_cfg: {},
  // unwatch_store: undefined,

  props: {
    show_categories: {
      type: Boolean,
      default: true
    },
    host: {
      type: String,
      default: ''
    },
    host_data: {
      type: Object,
      default: () => ({})
    },
    categories: {
      type: Array,
      default: function () { return [] }
    }
  },
  data () {
    return {

    }
  }

}
</script>

<style>
/**
* vue-element-admin
**/
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

</style>
