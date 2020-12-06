<template>
  <div class="root_app">
    <displaySetting v-if="$store.state.mods.displayEdit"/>
    <tweetAndThread v-if="$store.state.mods.tweetAndThread.show"/>
    <userEdit v-if="$store.state.mods.userEdit"/>
    <viewImage v-if="$store.state.mods.imageView.show" />
    <!-- TOPS -->
    <div class="hm" :style="showScroll(this.$store.state.mods.showScroll)">
      <div class="fixedNav border-color">
        <pcNav class="sm-hide"/>
        <mobNav class="sm-show"/>
      </div>
      <div class="border-color" style="border-right:1px solid;">
        <!-- routes -->
        <!-- <transition name="fade"> -->
          <router-view class="route" />
        <!-- </transition> -->
      </div>
      <div class="md-hide">
      </div>
    </div>
  </div>
</template>

<script>
import pcNav from '@/components/pcNav.vue';
import mobNav from '@/components/mobNav.vue';
import displaySetting from '@/components/displaySetting.vue';
const tweetAndThread=()=>import('@/components/tweetAndThread.vue')
const userEdit=()=>import('@/components/userEdit.vue')
const viewImage=()=>import('@/components/viewImage.vue')
import {tweetTemplate} from '@/localedata/dataCreaters.js'
export default {
  name: 'App',
  components: {
    pcNav,
    tweetAndThread,
    mobNav,
    displaySetting,
    userEdit,
    viewImage
  },
   computed:{
      showScroll(){
          return ((i)=>{if(!i) return {overflowY:'hidden'};return {overflowY:'unset'};})
      }
  },
  data(){
    return{

    }
  },
  methods:{
    // run(e){
    //   console.log(e)
    //   alert('rotated')
    // }
  },
  mounted(){
    // setTimeout(()=>{
      let el=document.getElementById('loaderMap');
      if(el){
        el.remove();
      }
    // },2000)
    setTimeout(()=>{
      let tweet=tweetTemplate({},'txt',null,{has:false,val:null},[])
      tweet.cnt[0]=`Hello there,
All dull links and buttons are still under development... for now feel free to try these features
0. Fleet!!!!. (still under review tho).
1.Tweet (poll,image,text).
2.Like,Retweet( with or without comment).
3.Follow and unfollow.
4.Play around with background and text colors like you would have on actual Twitter.
5.Edit the 'mrkelvic' account'
6.Create your own account from 'add an account button'
thank you.
`
//       tweet.cnt[0]=`
// don't fret :)
// Hey... not bad ${navigator.platform} nice OS, erm connection type ${navigator.connection?.effectiveType||`well I don't know that`}, ${(()=>{if(navigator.cookieEnabled)return 'cookie enabled'; return 'awwn cookie disabled'})()}
      // `
      this.$store.dispatch('addTweet',tweet)
    },2000)
     setTimeout(()=>{
      let tweet=tweetTemplate({},'txt',null,{has:false,val:null},[])
      tweet.cnt[0]=`NB:This is a clone built for learning purposes.
I thought it would be cool if twitter was built on my favourite framework (Vue) so I cloned it in VueJs.
This clone has no backed attatched or any form of browser storage so any form of tweet would be lost on a refresh`
      this.$store.dispatch('addTweet',tweet)
    },4000)
    setTimeout(()=>{
      let tweet=tweetTemplate({},'txt',null,{has:false,val:null},[])
      tweet.cnt[0]=`Oh and yh this is still under development feel free too crush it (wink) ;) `
      this.$store.dispatch('addTweet',tweet)
    },6000)
    // console.log(window.onorientationchange)
    // if('onorientationchange' in window){
    //   window.addEventListener('onorientationchange',(e)=>this.run(e))
    // }
  }
}
</script>

<style>
/* 
1125-big screeen
480-mobile
*/

*{
  margin:0px;
  padding:0px;
  font-family:var(--font);
  scroll-behavior:smooth;
  /* transition:all 0.1s linear; */
}
#app{
  color:var(--color);
  background:var(--background);
}
img{
  /* background:#3d4145; */
}
body{
color:var(--color);
  background:var(--background);
}
.root_app{
  min-height:100vh;
  height: fit-content;
  width:100%;
  max-width: 1370px; 
	margin: 0 auto;
}
.route{
  height:100%;
}
ul{
  list-style: none;
}
.inactive{
  opacity:0.4;
}
.shadow{
  box-shadow:var(--shadow);
}
.border-color{
  border-color:var(--bdc) !important;
}
.slideScroll{
  scroll-behavior:smooth;
  /* overflow-x:overlay; */
  overflow-y:overlay;
}
.slideScroll::-webkit-scrollbar {
      width:0px;
      height: 2px;
  }

  /* Track */
  .slideScroll::-webkit-scrollbar-track {
      background:#fff;
  }

  /* Handle */
  .slideScroll::-webkit-scrollbar-thumb {
         background: #00000036;
  }

  /* Handle on hover */
  .slideScroll::-webkit-scrollbar-thumb:hover {
      background: #fff; 
  }
button{
  border:none;    
}
button:hover{
  cursor:pointer;
}
a{
  text-decoration:none;
  color:inherit;
}
.lg-no{
  display:none;
}
.c_grey{
  color: #6E767D;
  font-size:13px;
}
.raw{
  white-space: pre-wrap;
}
/* Page */
.hm{
  display:grid;
  /* grid-template-columns:23% 47% 30%; */
  grid-template-columns:minmax(122px,23%) minmax(auto,47%) minmax(70px,30%);
  height:100vh;
  width:100%;
}
.hm>div{
color:var(--color);
  background:var(--background);
}
.fixedNav{
  position: relative;
  border-right:1px solid;
  /* background:green !important;  */
  /* max-width:1125px; */
}
.interact{
    width:fit-content;
    transition:all 0.2s cubic-bezier(0.59, -0.21, 1, 1);
}
.tweetsEnd{
    width:100%;
    margin:40px 0px;
    text-align:center;
    font-size:2em;
    color:var(--theme) !important;
}
.unavailable-tweet{
  width: 100%;
  text-align: center;
  padding: 20px 0px;
}
.unavailable-tweet p{
  border: 1px solid var(--theme);
  margin: 0px 10px;
  padding: 10px 5px;
  border-radius: 7px;
  font-weight: 600;
  color:var(--theme);
}
.unavailable-tweet ul{
  text-align:left;
  margin-left:25px;
  margin-top:15px;
  color:var(--grey);
  font-size:14px;
  width:95%;
  /* background:red; */
}
.unavailable-tweet li{
  list-style:disc !important;
  margin-bottom:5px;
}
.fill{
    background: transparent;
    display: block;
    width: 100%;
    height:100%;
    position: absolute;
    top: 0px;
    /* background:orange; */
}
.white{
    color:var(--color);
    font-weight:600;
}
.hvu:hover{
    text-decoration:underline;
}
.ffollow{
    background:var(--background) !important;
    color:var(--theme) !important;
    border:1px solid var(--theme) !important;
}
.ffollow:hover{
    background:var(--themehove) !important;
}
.ffollow::after{
    content:"Follow";
    /* background:green; */
}
.ffollowing{
    border:1px solid var(--theme) !important;
    background:var(--theme) !important;
    color:#fff !important;
}
.ffollowing::after{
    content:'Following';
}
.ffollowing:hover{
    background:#B31D4B !important;
    border:1px solid #B31D4B !important;
}
.ffollowing:hover:after{
    content:'Unfollow';
}
.md-hide{
  display:block;
}
.sm-show{
  display:none !important;
}
.line{
    width:100%;
    height:1px;
    background:var(--color);
}
.slideScroll{
  scroll-behavior:smooth;
}
.slideScroll::-webkit-scrollbar {
    width:2px;
    height:2px;
}
.slideScroll::-webkit-scrollbar-track {
  background:transparent;
}

/* Handle */
.slideScroll::-webkit-scrollbar-thumb {
    background:var(--theme);
}

/* Handle on hover */
.slideScroll::-webkit-scrollbar-thumb:hover {
    background:transparent; 
}
@media only screen and (max-width:1250px){
  .sm-pc{
    display:none !important;
  }
  .lg-no{
    display: block;
  }
   .hm{
    /* grid-template-columns:9% 60% 31%; */
    grid-template-columns:minmax(122px,11%) minmax(auto,59%) minmax(70px,30%);
  }
}
@media only screen and (max-width:930px){
  /* Hide third tab */
  .root_app {
  max-width:670px; 
  margin: 0 auto;
    /* width:unset;
    margin: 0px 75px;
    margin-right:145px; */
}
  .md-hide{
    display:none !important;
  }
  .hm{
    grid-template-columns:minmax(122px,11%) minmax(auto,89%);
  }
  
}
@media only screen and (max-width:760px){
.menu{
    margin-left: 0px;
}
.hm {
    grid-template-columns: minmax(83px,11%) minmax(auto,89%);
}
}
@media only screen and (max-width:480px){
  .hm{
    display:block;
  }
.sm-hide{
  display:none !important;
}
.sm-show{
  display:unset !important;
}
.tweetsEnd {
    margin:75px 0px;
}
.fixedNav{
  border:none;
  /* border-right:1px solid #2f3336; */
}
}
@keyframes fadein {
  0%{
    opacity:0;
  }
  100%{
    opacity:1;
  }
}
</style>
