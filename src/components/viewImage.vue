<template>
  <div>
    <div class="cnt">
      <div class="main mx">
        <!-- is tweet -->
        <div v-if="$store.state.mods.imageView.event=='tweet'" :style="(()=>{if(!mod.viewTweet) return 'grid-template-columns:100%;'})()" class="istweet">
          <div class="imagewrapper" v-if="tweet">
            <!-- smshow -->
            <button @click="mod.more=true" class="smshow" style="top:1%;right:2%;font-size:19px;background:#402c2a69;"><i class="fa fa-ellipsis-h"></i></button>
            <button @click="$store.dispatch('setViewImage',{event:'tweet',content:null,show:false,index:0})" style="top:1%;left:2%;background:#402c2a69;"><i class="fa fa-close"></i></button>
            <button @click="mod.viewTweet=!mod.viewTweet" class="smhide" style="top:1%;right:2%;font-size:19px;background:#402c2a69;"><i :class="(()=>{if(mod.viewTweet) return 'fa fa-angle-double-right';return 'fa fa-angle-double-left'})()"></i></button>
            <div class="bugbtn" v-if="tweet.cnt[1]">
              <button v-if="tweet.cnt[1].imgs.length!=0&&mod.index!=0" @click="handleIndex(-1)" style="top:45%;left:2%;"><i class="fa fa-arrow-left"></i></button>
              <button v-if="tweet.cnt[1].imgs.length!=0&&mod.index!=(tweet.cnt[1].imgs.length-1)" @click="handleIndex(1)" style="top:45%;right:2%;"><i class="fa fa-arrow-right"></i></button>
            </div>
            <div v-if="mod.more" class="mobViewTweet shadow">
              <router-link :to="{name:'tweet',params:{id:tweet.id,tweet:tweet}}">View Tweet</router-link>
              <button @click="mod.more=false">cancel</button>
            </div>
            <div class="twtimg">
              <div v-if="tweet.cnt[1]" style="width:100%;height:100%;display:flex;place-items:center;place-content: center;">
                <img v-if="tweet.cnt[1].imgs[mod.index]" :src="imagefix(tweet.cnt[1].imgs[mod.index])" alt="">
              </div>
              <div class="interactions">
                <div>
                    <div class="ignore interact cmt ch">
                        <button @click="handleInteraction('C',false)" class="ignore cmt-hov inter-icon">
                        <i class="ignore fa fa-comment-o"></i>
                        </button>
                    <span class="ignore">{{tweet.cmnts.length+tweet.retweets.length}}</span>
                    </div>
                </div>
                <div style="position:relative;">
                    <div style="width:215px;" class="inter-options ignore rtscreen shadow" v-if="mod.rt">
                        <div>
                            <button class="ignore" @click="handleInteraction('R',false)"><i class="fa fa-retweet ignore"></i> {{(()=>{if(tweet.props.isrwt) return `Undo Retweet`; return 'Retweet';})()}}</button>
                            <button class="ignore" @click="handleInteraction('RC',false)"><i class="fa fa-pencil ignore"></i>Quote Tweet</button>
                            <button style="text-align:center;" @click="mod.rt=false" class=" cc ignore">cancel</button>
                        </div>
                    </div>
                    <div class="ignore interact ret rh" :style="(()=>{if(tweet.props.retweetedBy.includes($store.state.user.at)) return `color:rgba(23,191,91);`;})()">
                        <button @click="handleInteraction('R',true)" class="ignore ret-hov inter-icon">
                        <i class="ignore fa fa-retweet"></i>
                        </button>
                    <span class="ignore">{{tweet.props.rtwts+tweet.retweets.length}}</span>
                    </div>
                </div>
                <div>
                    <div class="ignore interact like lh" :style="(()=>{if(tweet.props.likedBy.includes($store.state.user.at)) return `color:rgba(224,36,94);`;})()">
                        <button @click="handleInteraction('L',false)" class="ignore like-hov inter-icon">
                        <i class="ignore fa fa-heart-o"></i>
                        </button>
                    <span class="ignore">{{tweet.props.likes}}</span>
                    </div>
                </div>
                <div>
                    <div class="ignore interact cmt ch inactive">
                        <button @click="handleInteraction('S',false)" class="ignore cmt-hov inter-icon" style="padding:9px 12px 9px 9px;">
                        <i class="ignore fa fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
            </div>
          </div>
          <div v-if="mod.viewTweet" class="twntcnt smhide">
            <tweetRoute :tweet="tweet" :isPreview="true" />
          </div>
        </div>
        <!-- regular image -->
        <div v-if="$store.state.mods.imageView.event=='image'">
          <div class="imagewrapper">
            <button @click="$store.dispatch('setViewImage',{event:'tweet',content:null,show:false,index:0})" style="top:1%;left:2%;background:#402c2a69;"><i class="fa fa-close"></i></button>
            <div class="bugbtn" v-if="images">
              <button v-if="images.length!=0&&mod.index!=0" @click="handleIndex(-1)" style="top:45%;left:2%;"><i class="fa fa-arrow-left"></i></button>
              <button v-if="images.length!=0&&mod.index!=(images.length-1)" @click="handleIndex(1)" style="top:45%;right:2%;"><i class="fa fa-arrow-right"></i></button>
            </div>
            <div v-if="images" style="width:100%;height:100vh;display:flex;place-items:center;place-content: center;">
              <img style="max-width:100%;max-height:96%;" v-if="images[mod.index]" :src="imagefix(images[mod.index])" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {imagefix} from '@/dataParser/deepSearch.js';
import tweetRoute from '@/routes/tweetRoute.vue'
export default {
name: 'viewImage',
props: {

},
components:{
    tweetRoute
},
data(){
return{
  tweet:null,
  images:[],
  mod:{
    index:0,
    viewTweet:true,
    rt:false,
    more:false,
  }
}
},
methods:{
  keyboardInteract(event){
    if(event.keyCode===37){
      // leftArrow
      this.handleIndex(-1)
    }
    if(event.keyCode===39){
      // rightArrow
      this.handleIndex(1)
    }
    if(event.keyCode===27){
      // exit
      this.$store.dispatch('setViewImage',{event:'tweet',content:null,show:false,index:0})
    }
  },
  handleMount(){
    if(this.$store.state.mods.imageView.event=='tweet'){
      // console.log('got index of ',this.$store.state.mods.imageView.index)
      this.mod.index=this.$store.state.mods.imageView.index;
      this.tweet=this.$store.state.mods.imageView.content;
    }else if(this.$store.state.mods.imageView.event=='image'){
      this.images=this.$store.state.mods.imageView.content;
    }
  },
  handleIndex(ind){
    // 0,1,2,3 //// leng 4
    let len=0;
    if(this.$store.state.mods.imageView.event=='tweet'){
      len =this.tweet.cnt[1].imgs.length-1;
    
    }else{
      len =this.images.length-1;
    }
    if(((this.mod.index+ind)>len)||((this.mod.index+ind)<0)){
      if(ind==-1){
        this.mod.index=len;
        return 0
      }
      this.mod.index=0;
      return 0;
    }
    this.mod.index+=ind;
  },
  handleInteraction(action,showOptions){
        if(!showOptions){
            switch (action) {
                case 'C':
                    //comment tweet
                    this.$store.dispatch('toggletweetAndThread',{bool:true,params:this.tweet,action:'C'})
                    break;
                case 'RC':
                    this.$store.dispatch('toggletweetAndThread',{bool:true,params:this.tweet,action:'R'})
                    this.mod.rt=false
                    break;
                case 'L':
                    this.$store.dispatch('likeTweet',this.tweet)
                    break;
                case 'R':
                    this.$store.dispatch('onlyRetweet',this.tweet)
                    this.mod.rt=false
                    break;
                default:
                    break;
            }
        }else{
            switch (action) {
                case 'R':
                    this.mod.rt=true
                    break;
            
                default:
                    break;
            }
        }
    },
  imagefix(par){
    return imagefix(par)
  },
},
mounted(){
  this.handleMount();
  // @keydown="keyboardInteract"
  window.onkeyup=this.keyboardInteract;
  // console.log()
/*
  tweet link with caption
*/
  // window.addEventListener('keypress',this.keyboardInteract)
  // console.log(this.tweet.cnt[1].imgs[this.mod.index])
},
destroyed(){
  window.onkeyup=null
  // window.removeEventListener('keypress')
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.smshow{
  display:none;
  visibility:hidden;
}
.mx{
  max-width: 1370px;
  height:100vh;
  background:var(--background) 
}
.cnt{
   position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    background: rgba(110,118,125,.4);
    display: grid;
    place-items: start center;
    z-index:3;
  /* background:green; */
}
.main{
  width:100%;
}
.istweet{
  display:grid;
  height:100vh;
  grid-template-columns:minmax(auto,85%) minmax(340px,25%);
}
.mobViewTweet{
  position:absolute;
  top:1%;
  right:2%;
  background:var(--background);
  text-align:center;
  width:fit-content;
  overflow:hidden;
  border-radius:5px;
}
.mobViewTweet button{
  width:100%;
  margin-top:2px;
}
.mobViewTweet a,.mobViewTweet button{
  color:var(--color) !important;
  display:block;
  background:none;
  font-size:1em;
  padding:10px 13px;
}
.mobViewTweet a:hover{
  background:var(--altback);
}
.mobViewTweet button:hover{
  cursor: pointer;
  background:var(--altback);
}
.imagewrapper{
  background:#402c2ab8;
  position:relative;
  /* display: flex;
  place-items: center; */
}
.imagewrapper>button,.bugbtn>button {
  position: absolute;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  color: #fff;
  background:#402c2ab8;
  font-size:16px;
}
.bugbtn>button:hover{
  cursor:pointer;
  background:#614c4a82 !important;
}
.imagewrapper>button:hover{
  cursor:pointer;
  background:#614c4a82 !important;
}
.twtimg{
  display: grid;
  place-items:center;
  height: 100vh;
  row-gap:5px;
  grid-template-rows:90% 10%;
  /* background:#402c2ab8; */
}
.twtimg img{
  /* max-width:80%; */
  max-width:100%;
  max-height:96%;
}
.twntcnt{
    height: 100Vh;
    overflow: auto;
  /* background:grey; */
}


.interactions{
    display:flex;
    font-size:16px;
    position:relative;
    color:#fff;
    width:60%;
    /* background:red; */
}
.interactions button{
  position:relative;
}
.inter-icon{
    font-size:16px;
    margin-right:4px;
    display: inline-flex;
    padding:9px 9px 10px 9px;
    border-radius:20px;
    background:none;
    color:inherit;
}
.inter-icon:hover{
    cursor: pointer;
}
.interactions>div{
    width:25%;
    margin-left:5px;
    text-align:left;
}
.cmt:hover{
    color:rgba(29,161,242,1.0);
}
.ch:hover .cmt-hov{
    background:#1da1f220;
}
.ret:hover{
color:rgba(23,191,91);
}
.rh:hover .ret-hov{
    background:#17bf5b20;
}
.like:hover{
  color:rgba(224,36,94);
}
.lh:hover .like-hov{
    background:#e0245e20;
}
.interact{
    width:fit-content;
    transition:all 0.2s cubic-bezier(0.59, -0.21, 1, 1);
}
.interact:hover{
    cursor:pointer;
}
.inter-options{
    position:absolute;
    width:160px;
    height:fit-content;
    background:var(--background);
    color:var(--color) !important;
    width:fit-content;
    min-width: 150px;
    bottom: 0px;
    padding: 3px;
    z-index:1;
    border-radius:6px;
}
.inter-options button{
    display: block;
    background: none;
    color: inherit;
    padding: 12px 16px;
    width: 100%;
    margin-bottom: 3px;
    text-align: left;
    font-size:15px;
    /* background:blue; */
}
.inter-options button:hover{
    cursor: pointer;
    background:#80808014;
}
.inter-options i{
    margin-right:8px;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width:830px){
.interactions{
    width:100%;
}
.interactions>div{
  text-align:center;
}
.interact{
  width:100%;
}
}
@media only screen and (max-width:720px){
.smhide{
  display:none;
  visibility:hidden;
}
.smshow{
  display:unset;
  visibility:unset;
}
.istweet{
  grid-template-columns:100%;
}
}
@media only screen and (max-width: 480px){
.rtscreen{
    position:fixed;
    top:0px;
    left:0px;
    width:100%;
    height:100vh;
    background:#44424280;
    width:100% !important;
}
.rtscreen>div{
    position:absolute;
    bottom: 0%;
    height: 25%;
    /* bottom:0px;
    height:22%; */
    left:0px;
    width:100% !important;
    border-top-right-radius:30px;
    border-top-left-radius:30px;
    background:var(--background);
    padding-top:25px;
    text-align: center;
    display:block;
    /* background:red; */
}
.rtscreen button{
    width:100%;
    padding: 12px 20px;
    margin-bottom:5px;
    /* background:green; */
}
.cc{
    /* width:88% !important; */
     border-radius:30px;
}
}
</style>
