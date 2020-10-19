<template>
<div>
    <div class="goods">
        <div class="menu-wrapper" ref="left">
            <ul ref="leftUl">
                <li class="menu-item" @click="clickItem(index)"
                 :class="{current:currentIndex==index}" v-for="(good,index) in goods" :key="good.name">
                    <span class="text bottom-border-1px">
                        <img  class="icon" v-if="good.icon" :src="good.icon">
                        {{good.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="right">
          <ul ref="rightUl">
            <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
              <h1 class="title">{{good.name}}</h1>
              <ul>
                <li class="food-item bottom-border-1px"
                  @click="showFood(food)"
                 v-for="(food,index) in good.foods" :key="index">
                  <div class="icon">
                    <img width="57" height="57" :src="food.icon">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">
                        月售 {{food.sellCount}} 份
                      </span>
                      <span>好评率 {{food.rating}}%</span>
                    </div>
                    <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                     <CartControl :food="food"/>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <ShopCart/>
    </div>
    <Food :food="food" ref="food"/>
</div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Food from "@/components/Food/Food"
import ShopCart from "@/components/ShopCart/ShopCart"
import { mapState } from "vuex";
export default {
  components:{
    Food,
    ShopCart
  },
  data(){
    return{
      // 1). 右侧列表滑动的Y轴坐标: scrollY  在滑动过程中不断改变
      scrollY:0,
       // 2). 右侧每个分类<li>的top值的数组tops: 第一次列表显示后统计后面不再变化
      tops:[],
      food:{}//需要显示的good
    }
  },
  computed:{
    ...mapState({
      goods: state=>state.shop.goods
    }),
    currentIndex:{
      get:function(){
        const{scrollY,tops}=this;
        const index= tops.findIndex((top,index)=> scrollY>=top && scrollY<tops[index+1])
         if (index!==this.index && this.leftScroll) {
          // 让左侧列表滑动到当前分类处
          const li = this.$refs.leftUl.children[index]
          this.leftScroll.scrollToElement(li, 300)
        }
      return index
      }
    }
  },
  methods:{
    _initScroll(){
      if(!this.leftScroll){
          this.leftScroll= new BScroll(this.$refs.left,{
          click:true
        })
        this.rightScroll= new BScroll(this.$refs.right,{
            probeType:1,
            click:true
        });
        this.rightScroll.on('scroll',({x,y})=>{
            console.log('scroll',x,y);
            this.scrollY=Math.abs(y)
          });
        this.rightScroll.on('scrollEnd',({x,y})=>{
            console.log('scroll',x,y);
            this.scrollY = Math.abs(y)
          })
      }else{
        this.leftScroll.refresh()
        this.rightScroll.refresh()
      }
    },
     /* 
      统计右侧所有分类li的top的数组
      */
    _initTops(){
      const tops=[];
      let top=0;
      tops.push(top)
      const lis= Array.prototype.slice.call(this.$refs.rightUl.children);
      console.log(lis);
      lis.forEach(li=>{
        top+=li.clientHeight
        console.log(li.clientHeight);
        tops.push(top)
         // 更新tops数据
        this.tops = tops
        console.log('tops', tops)
      })

    },
    clickItem(index){
      const top=this.tops[index]
      this.scrollY=top
     this.rightScroll.scrollTo(0,-top,300)

    },
    showFood(food){
      this.food=food
      this.$refs.food.toggleShow()//父组件调用子组件的方法通过ref
    }
  },
  watch:{
    goods(){
      /* 
        将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
        它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上
         */
        //  console.log('watch goods', this.goods)
        this.$nextTick(()=>{
            this._initTops();
            this._initScroll();
        })
    }
  }
}
</script>


<style  lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../common/stylus/mixins.styl"
  .goods
    display flex
    position absolute
    top 225px
    bottom 46px
    width 100%
    background #fff
    overflow hidden
    .menu-wrapper
      flex 0 0 auto 
      width 80px
      background: #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex 0 0 57px
          margin-right: 10px
        .content
          flex 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc,.extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height 12px
            margin-bottom 8px 
          .extra
            .count
              margin-right: 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
    



</style>
