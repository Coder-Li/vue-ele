<template>
  <div class="ratings" ref="rating">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="dilivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingsclect v-on:onselectTypeChange="onselectTypeChange" v-on:ononlyContentChange="ononlyContentChange"
                    :select-type="selectType"
                    :only-content="onlyContent" :desc="desc"
                    :ratings="ratings"></ratingsclect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img width="28px" height="28px" :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliverTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend.length > 0">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatData}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  import split from '../split/split.vue';
  import BScroll from 'better-scroll';
  import ratingsclect from '../ratingselect/ratingsclect.vue';
  import {formatDate} from '../../common/js/date';
  const ALL = 2;
  const ERR_OK = 0;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      onselectTypeChange(type) {
        this.selectType = type;
//        this.$nextTick(() => {
//          this.scroll.refresh();
//        });
      },
      ononlyContentChange(onlyContent) {
        this.onlyContent = onlyContent;
//        this.$nextTick(() => {
//          this.scroll.refresh();
//        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.rating, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
      });
    },
    filters: {
      formatData: function (time) {
        let data = new Date(time);
        return formatDate(data, 'yyyy-MM-dd HH:mm');
      }
    },
    components: {
      star,
      split,
      ratingsclect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    width: 100%
    left: 0
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        padding: 6px 0
        flex: 0 0 137px
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, .2)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            vertical-align: top
            margin: 0 12px
            @media only screen and (max-width: 320px)
              margin-right: 6px
          .score
            vertical-align: top
            display: inline-block
            font-size: 12px
            line-height: 18px
            color: rgb(255, 153, 0)
        .dilivery-wrapper
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery-time
            display: inline-block
            line-height: 18px
            font-size: 12px
            margin-left: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7, 17, 27, .1))
        .avatar
          flex: 0 0 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            font-size: 10px
            margin-bottom: 4px
            color: rgb(7, 17, 27)
            line-height: 12px
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, .1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            font-size: 10px
            line-height: 12px
            position: absolute
            right: 0
            top: 0
            color: rgb(147, 153, 159)
</style>
