<template>
  <div id="app">
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller">

      </router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  import {urlParse} from './common/js/util';
  const ERR_OK = 0;

  export default{
    data () {
      return {
        seller: {}
      };
    },
    computed: {
      queryParam: function () {
        let queryParam = urlParse();
        console.log(queryParam.id);
        return queryParam;
      }
    },
    created () {
      this.$http.get('/api/seller?id=' + this.queryParam.id).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
//          console.log(this.seller);
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    position relative

  // border-bottom 1px solid rgba(7, 17, 27, 0.1
  // border-1px(rbga(7, 17, 27, .1))
  .tab::after {
    display block
    position absolute
    left: 0
    bottom: 0
    width: 100%
    border-top: 1px solid rgba(7, 17, 27, .1)
    content: ' '
  }

  .tab
    .tab-item {
      flex: 1
      text-align: center
    }

  .tab
    .tab-item
      a {
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
      }

  .tab
    .tab-item
      .active {
        color: rgb(240, 20, 20)
      }
</style>
