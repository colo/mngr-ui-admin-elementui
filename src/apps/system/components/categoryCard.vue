<template>
  <el-card class="box-card" :style="{width: '100%'}">
    <div slot="header" class="clearfix">
      <!-- <span>Card name</span> -->
      <router-link
        :to="{
          name: 'system_category',
          params: { category: category },
        }"
        v-slot="{ href, route, navigate, isActive, isExactActive }"
      >
        <el-button
          type="text"
          :href="href"
          @click="navigate"
        >
        {{category}}
        </el-button>

      </router-link>

    </div>

    <router-link
      v-for="host in hosts"
      :key="category+'.'+host"
      :to="'/system/categories/'+category+'#'+host"
      v-slot="{ href, route, navigate, isActive, isExactActive }"
    >
      <el-button
        type="text"
        :href="'/system/categories/'+category+'#'+host"
        @click="navigate"
      >
      {{host}}
      </el-button>
    </router-link>
  </el-card>
    <!-- <b-button-toolbar key-nav aria-label="Toolbar with button groups" :justified="true">
      <b-button-group class="mx-1">
        <b-button
          variant="primary"
          :to="{
            name: 'system_category',
            params: { category: category },
          }"
        >
          {{category}}
        </b-button>
      </b-button-group>
      <b-button-group class="mx-1" size="sm">
        <b-button
          variant="outline-info"
          v-for="host in hosts"
          :key="category+'.'+host"
          :href="'/system/categories/'+category+'#'+host"
        >
          {{host}}
        </b-button>
      </b-button-group>
    </b-button-toolbar> -->

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import * as Debug from 'debug'
const debug = Debug('apps:system:components:categoryCard')

// import JSPipeline from 'js-pipeline'
// import Pipeline from '@apps/system/pipelines/index'

// import DataSourcesMixin from '@mixins/dataSources'

// import { requests, store } from './sources/index'

export default {
  // mixins: [DataSourcesMixin],
  // extends: DataSourcesMixin,

  name: 'OsCategoryCard',

  // pipelines: {},
  // __pipelines_cfg: {},
  // unwatch_store: undefined,
  props: {
    category: {
      type: String,
      default: ''
    },
    hosts: {
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
