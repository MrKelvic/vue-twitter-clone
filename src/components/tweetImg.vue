<template>
  <div>
      <div class="cont">
        <p class="cap">{{content[0]}}</p>
        <div v-if="!isPreview" class="ignore img-hold">
          <div v-if="content[1].imgs.length==1&&toImg" class="ignore spec">
            <img @click="viewImage(0)" class="ignore " :src="imagefix(content[1].imgs[0])" alt="">
          </div>
          <div v-if="content[1].imgs.length==1&&!toImg" class="ignore one">
            <div @click="viewImage(0)" class="ignore rad" :style="`background:url(${imagefix(content[1].imgs[0])}) 50% 50% / cover;background-position: center;`"></div>
          </div>
          <div v-if="content[1].imgs.length==2" class="ignore two">
            <div @click="viewImage(i)" class="ignore " v-for="(image,i) in content[1].imgs" :key="i" :style="`background:url(${imagefix(image)}) 50% 50% / cover;`"></div>
          </div>
          <div v-if="content[1].imgs.length==3" class="ignore three">
            <div class="ignore ">
              <div @click="viewImage(i)" class="ignore " v-for="i in [0]" :key="i" :style="`background:url(${imagefix(content[1].imgs[i])}) 50% 50% / cover;`"></div>
            </div>
            <div class="ignore ">
              <div @click="viewImage(i)" class="ignore " v-for="i in [1,2]" :key="i" :style="`background:url(${imagefix(content[1].imgs[i])}) 50% 50% / cover;`"></div>
            </div>
          </div>
          <div v-if="content[1].imgs.length==4" class="ignore four">
            <div class="ignore ">
              <div @click="viewImage(i)" class="ignore " v-for="i in [0,1]" :key="i" :style="`background:url(${imagefix(content[1].imgs[i])}) 50% 50% / cover;`"></div>
            </div>
            <div class="ignore ">
              <div @click="viewImage(i)" class="ignore " v-for="i in [2,3]" :key="i" :style="`background:url(${imagefix(content[1].imgs[i])}) 50% 50% / cover;`"></div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {imagefix} from '@/dataParser/deepSearch.js'
export default {
name: 'tweetImg',
props: {
content:Array,
isPreview:Boolean,
Atweet:Object,
toImg:Boolean
},
components:{
    
},
data(){
return{
}
},
methods:{
  viewImage(index){//event:'tweet',content:null,show:false,index
  // console.log('sending image index ',index)
  this.$store.dispatch('setViewImage',{event:'tweet',content:this.Atweet,show:true,index:index})
  // if(this.toImg&&this.Atweet){
  //   this.$store.dispatch('setViewImage',{event:'image',content:[...this.Atweet.cnt[1].imgs],show:true,index:0})
  // }else{
  // }
  },
  imagefix(par){
    return imagefix(par)
  },
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .cont{

} */
.cap{
  margin-bottom:10px;
}
.img-hold{
  }
.img-hold>div{
  overflow: hidden;
  height:290px;
  border-radius:15px;
  /* height:100%; */
}
.spec{
  height:100% !important;
}
.spec img{
  width:100%;
}
.one{
  width:100%;
}
.one>div{
  width:100%;
  height:100%;
}
.two{
  display:grid;
  grid-template-columns:50% 50%;
  grid-gap:2px;
}
.two>div{
  width:100%;
  height:100%;
  background:red;
}
.four, .three{
  grid-gap:2px;
  display:grid;
  grid-template-columns:50% 50%;
}
.four>div{
  grid-gap:2px;
  display:grid;
  grid-template-rows:50% 50%;
}
.three>div{
  display:grid;
}
.three>div:nth-child(2){
  grid-gap:2px;
  grid-template-rows:50% 50%;
}
.three>div:nth-child(1){
  grid-template-rows:100%;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width: 480px){

}
</style>
