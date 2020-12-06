<template>
  <div>
    <div v-if="!isPreview" class="mini-nav border-color">
        <button @click="$router.go(-1)"><i class="fa fa-arrow-left"></i></button>
        <div v-if="Tweet">
          <span v-if="Tweet.def">
            <h3 v-if="Tweet.def.thread.length==0" style="line-height: 35px;" class="white usname">Tweet</h3>
            <h3 v-if="Tweet.def.thread.length!=0" style="line-height: 35px;" class="white usname">Thread</h3>
          </span>
        </div>
    </div>
    <div v-if="Tweet">
      <div v-if="Tweet.def">
        <div id="top-tweet" v-if="Tweet.top&&showTop">
          <tweets class="twt-top" v-for="tweet in [Tweet.top]" :key="tweet.id" :properties="{down:true,preview:true,interactions:true,bruteDown:true}" :tweet="tweet" :nest="false"/>
          <!-- <span class="fl-down" :style="`height:66%;`"></span> -->
            <!-- <p>top: {{Tweet.top.owner}} {{Tweet.top.id}}</p> -->
        </div>
        <div id="default" v-if="Tweet.def">
          <div class="default-tweet border-color">
            <!-- <div v-if="!nest" class="u_act act c_grey">
                <i class="fa fa-retweet"></i>
                <router-link :to="{name:'user',params:{name:twtOwner.at,user:twtOwner}}">@{{tweet.owner}}</router-link>
                <span>{{action}}</span>
            </div> -->
            <div class="default-bdy">
              <div class="whodet" @click="$router.push({name:'user',params:{name:owns.at,user:owns}})">
                <img :src="imagefix(owns.img[0])" alt="">
                <div>
                  <p class="ue">{{owns.name}}</p>
                  <router-link :to="{name:'user',params:{name:owns.at,user:owns}}" class="c_grey">@{{owns.at}}</router-link>
                </div>
              </div>
            </div>
            <div class="twt-cnt-bdy">
                <component :is="Tweet.def.type" :toImg="true" :isPreview="isPreview" :content="Tweet.def.cnt" :tweetId="Tweet.def.id" :Atweet="(()=>{if(Tweet.def.type=='imge') return Tweet.def; return undefined;})()"></component>
            </div>
            <div class="mainTwt" v-if="Tweet.main">
              <tweets class="mainTwt-cnt border-color" :properties="{down:false,preview:true,interactions:false}" :tweet="Tweet.main" :nest="false"/>
            </div>
            <div class="time bb-down border-color">
              <p style="display:flex;place-items: center;" class="c_grey">
                <span :title="Tweet.def.time.toTimeString().split(' ')[0]">{{Tweet.def.time.toTimeString().split(' ')[0]}}</span>
                <span style="display:inline-block;margin:0px 5px;width:2px;height:2px;border-radius:20px;background:var(--color);"></span>
                <span :title="Tweet.def.time.toDateString()">{{Tweet.def.time.toDateString()}}</span>
                <span style="display:inline-block;margin:0px 5px;width:2px;height:2px;border-radius:20px;background:var(--color);"></span>
                <span class="tfw">Twitter for Web</span>
                <!-- <time :datetime="Tweet.def.time" >{{setTweetTime(Tweet.def.time)}}</time> -->
              </p>
            </div>
            <div :style="(()=>{if(isPreview) return 'font-size:13px;'})()" class="rwtandlikes bb-down border-color">
              <span>{{Tweet.def.props.rtwts}} <span class="c_grey">Retweets</span> </span>
              <span>{{Tweet.def.retweets.length}} <span class="c_grey">Quote Tweets</span> </span>
              <span>{{Tweet.def.props.likes}} <span class="c_grey">Likes</span> </span>
            </div>
            <div class="interactions ">
              <div class="interact cmt">
                <span @click="handleInteraction('C',false)" class="ignore cmt-hov inter-icon" style="padding:8px 9px 9px 9px;">
                  <i class="ignore fa fa-comment-o"></i>
                </span>
              </div>
              <div style="position:relative;" class="interact ret">
                <div tabindex="1" style="width:215px;" class="inter-options ignore rtscreen shadow" v-if="mods.rt">
                    <div class="" style="width:100%;">
                        <button class="ignore" @click="handleInteraction('R',false)"><i class="fa fa-retweet ignore"></i> {{(()=>{if(Tweet.def.props.isrwt) return `Undo Retweet`; return 'Retweet';})()}}</button>
                        <button class="ignore" @click="handleInteraction('RC',false)"><i class="fa fa-pencil ignore"></i>Quote Tweet</button>
                        <button @click="mods.rt=false" class=" cc ignore">cancel</button>
                    </div>
                </div>
                <span @click="handleInteraction('R',true);mods.fleet=false" class="ignore ret-hov inter-icon" :style="(()=>{if(Tweet.def.props.retweetedBy.includes($store.state.user.at)) return `color:rgba(23,191,91);`;})()">
                  <i class="ignore fa fa-retweet"></i>
                </span>
              </div>
              <div class="interact like">
                <span @click="handleInteraction('L',false)" class="ignore like-hov inter-icon" :style="(()=>{if(Tweet.def.props.likedBy.includes($store.state.user.at)) return `color:rgba(224,36,94);`;})()" style="padding:9px 9px 8px 9px;">
                  <i class="ignore fa fa-heart-o"></i>
                </span>
              </div>
              <div style="position:relative;" class="interact cmt ch inactive">
                <div style="width:215px;right:0%;" tabindex="1" class="inter-options ignore rtscreen shadow" v-if="mods.fleet">
                    <div style="width:100%;">
                        <button class="ignore" @click="$store.dispatch('setFleetTweet',Tweet.def.id);$router.push({name:'createFleet'})">Share in a Fleet</button>
                        <button @click="mods.fleet=false" class=" cc ignore">cancel</button>
                    </div>
                </div>
                <span @click="handleInteraction('S',false);mods.fleet=true;mods.rt=false" class="ignore cmt-hov inter-icon" style="padding:9px 12px 9px 9px;">
                  <i class="ignore fa fa-share-alt"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="thread" v-if="Tweet.def.thread.length!=0">
            <tweets v-for="(tweet,i) in Tweet.def.thread" :key="tweet.id" :properties="{down:(Tweet.def.thread.length-1)!=i,preview:true,interactions:true}" :tweet="tweet" :nest="(Tweet.def.thread.length-1)==i" :isPreview="isPreview"/>
          </div>
          <div class="repandrtwts">
            <tweets v-for="(tweet,i) in createInview(Tweet.def.cmnts,Tweet.def.retweets)" :key="tweet.id" :properties="{down:i!=((Tweet.def.cmnts.length+Tweet.def.retweets.length)-1),preview:true,interactions:true}" :tweet="tweet" :nest="true" :isPreview="isPreview"/>
            <p class="tweetsEnd">.</p>
          </div>
            <!-- <p>def: {{Tweet.def.owner}} {{Tweet.def.id}}</p>
            <p v-if="Tweet.main">main: {{Tweet.main.owner}} {{Tweet.main.id}}</p> -->
        </div>
      </div>
      <div class="unavailable-tweet" v-if="!Tweet.def">
        <p>Tweet unavailable</p>
        <ul>
          <li>Tweets you entered were not saved and are not available after a page referesh :(</li>
          <li>Or something bad happened and you don't have to worry I'll fix it</li>
        </ul>
      </div>
    </div>
    <div class="unavailable-tweet" v-if="!Tweet">
      <p>Tweet unavailable</p>
      <ul>
        <li>Tweets you entered were not saved and are not available after a page referesh :(</li>
        <li>Or something bad happened and you don't have to worry I'll fix it</li>
      </ul>
    </div>
  </div>
</template>


<script>
const txt=()=>import('@/components/tweetText.vue')
const imge=()=>import('@/components/tweetImg.vue')
const vid=()=>import('@/components/tweetVid.vue')
const poll=()=>import('@/components/tweetPoll.vue')
import tweets from '@/components/tweets.vue'
import {getTweet,searchUser,createInview,imagefix} from '@/dataParser/deepSearch.js'
export default {
  name: 'Tweetroute',
  components:{
    tweets,
    txt,
    imge,
    poll,
    vid
  },
  props: {
      tweet:Object,
      isPreview:Boolean
  },
  data(){
    return{ 
        none:false,
        Tweet:null,
        owns:null,
        showTop:false,
        userIndex:null,
        mods:{
          rt:false,
          fleet:null,
        }
    }
  },
  methods: {
     setTweetTime(time){
        let calc =Math.round((((new Date()-time) % 86400000) % 3600000) / 60000);
        if(calc==0) return 'now';
        if(calc>60) return calc%60+'hrs';
        return calc+'min';
    },
    handleInteraction(action,showOptions){
        if(!showOptions){
            switch (action) {
                case 'C':
                    //comment tweet
                    this.$store.dispatch('toggletweetAndThread',{bool:true,params:this.Tweet.def,action:'C'})
                    break;
                case 'RC':
                    this.$store.dispatch('toggletweetAndThread',{bool:true,params:this.Tweet.def,action:'R'})
                    this.mods.rt=false
                    break;
                case 'L':
                    this.$store.dispatch('likeTweet',this.Tweet.def)
                    break;
                case 'R':
                    this.$store.dispatch('onlyRetweet',this.Tweet.def)
                    this.mods.rt=false
                    break;
                default:
                    break;
            }
        }else{
            switch (action) {
                case 'R':
                    this.mods.rt=true
                    break;
            
                default:
                    break;
            }
        }
    },
    doScrollThing(){
      setTimeout(()=>{
        this.scroll('default',this.Tweet?.def,80,{behavior: "smooth", block: "start", inline: "start"},()=>{this.showTop=true;})
      },20)
      setTimeout(()=>{
        this.scroll('top-tweet',this.Tweet?.top,600,{behavior: "smooth", block: "end", inline: "end"})
        this.scroll('default',this.Tweet?.def,1000,{behavior: "smooth", block: "start", inline: "start"})
      },300)
    },
    scroll(ele,condition,timeout,b,cb){
      if(!condition) return 0;
      if(cb) cb();
      ele=document.getElementById(ele);
      if(!ele) return 0;
      setTimeout(()=>{ele.scrollIntoView(b);},timeout)
    },
    setTweet(){
      // console.log('isPreview ',this.isPreview,' tweet ',this.tweet)
      if(this.isPreview){
        // console.log('is preview LOL')
        this.Tweet={def:this.$store.state.mods.imageView.content}
        let temp=this.setUser(this.Tweet.def.owner)
        this.owns=temp.user;
        this.userIndex=temp.index
        return 0;
      }
      if(this.$store.state.mods.imageView.show){
        this.$store.dispatch('setViewImage',{event:'tweet',content:null,show:false,index:0})
      }
      this.Tweet=getTweet(this.$route.params.id,this.$store.state.tweets,this.tweet)
      // console.log('tweet was:',this.tweet,' what came from getTweet fubction:',this.Tweet)
      // console.log(this.Tweet.def?.main.val)
      if(this.Tweet?.def?.main.val) this.Tweet.main=this.Tweet.def.main.val;
      // console.log('got',this.Tweet)
      if(this.Tweet&&this.Tweet?.def){
        let temp=this.setUser(this.Tweet.def.owner)
        this.owns=temp.user;
        this.userIndex=temp.index
      }
      if(this.Tweet?.top) this.doScrollThing();
      // console.log('got this from deepsearch ',this.Tweet)
    },
    setUser(id){
        return searchUser(id,this.$store.state.users)
    },
    createInview(arr1,arr2){
      return createInview(arr1,arr2)
    },
    imagefix(par){
        return imagefix(par)
    },
  },
  mounted() {
    this.setTweet()
      // console.log(getTweet(this.$route.params.id,this.$store.state.tweets,this.tweet))
    // { top: null, def: null, main: null }
  },
  watch:{
    '$route.params.id':function(){
      this.setTweet()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tfw{
  font-size:1.1em;
  color:var(--tags);
}
.tfw:hover{
  cursor:default;
}
.mini-nav{
    font-family:var(--bold-font);
    width:100%;
    border-bottom:1px solid;
    display:flex;
    font-size:17px;
    padding:9px 0px;
    position:sticky;
    top:0px;
    z-index:1;
    background:var(--background);
    color:var(--color);
}
.mini-nav button{
    width:37px;
    height:37px;
    border-radius:30px;
    font-size:15px;
    padding:8px 8px 26px 6px;
    color:var(--theme);
    background:none;
    margin:0px 12px;
    /* background:red; */
}
.mini-nav button:hover{
    cursor: pointer;
    background:#1da1f245;
}
.mini-nav span{
    font-size:15px;
}
.mini-nav span{
    color:#6E767D;
}
.default-tweet{
  padding:5px 15px;
  border-bottom:1px solid;
}
.mainTwt-cnt{
  border:1px solid;
  border-radius:10px;
  overflow: hidden;
  margin-top:15px;
}
.mainTwt-cnt:hover{
  cursor: pointer;
  background:var(--hove);
}
.twt-top{
  margin-bottom: 25px;
  /* animation:fadein 0s ease-in backwards; */
}
.default-bdy{

}
.whodet{
  display:flex;
  font-size:15px;
}
.whodet:hover{
  cursor:pointer;
}
.whodet img{
  width:50px;
  height:50px;
  border-radius:50px;
  margin-right:8px;
}
.whodet>div{
  position:relative;
  margin-top:6px;
}
.whodet>div p{
  margin-bottom:2px;
}
.whodet>div a{
  
}
.twt-cnt-bdy{
  margin-top:20px;
  font-size:19px;
}
.time{
  
}
.time p{
  font-size:14px;
}
.bb-down{
  border-bottom:1px solid;
  padding:15px 5px;
}
.rwtandlikes{
  font-size:17px;
}
.rwtandlikes span:nth-child(1){
  margin-right:10px;
}
.rwtandlikes span>span{
  font-size:15px;
}
.interactions{
  padding:15px 5px;
  display:flex;
}
.interactions div{
  width:25%;
  text-align:center;
  opacity:1;
}
.inter-icon{
  /* background:red; */
  padding:9px;
  border-radius:50px;
}
.inter-icon:hover{
  cursor: pointer;
}
.cmt:hover{
    
}
.cmt-hov:hover{
    background:#1da1f220;
    color:rgba(29,161,242,1.0);
}
.ret-hov:hover{
  color:rgba(23,191,91);
  background:#17bf5b20;
}
.like-hov:hover{
  color:rgba(224,36,94);
  background:#e0245e73;
}
.inter-options{
    position:absolute;
    width:160px;
    height:fit-content;
    background:var(--background);
    color:var(--color) !important;
    width:fit-content;
    min-width: 150px;
    /* background: red; */
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
.cc{
    width:100%;
    text-align:center !important;
    background:var(--altback) !important;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width:480px){
.rwtandlikes{
  font-size: 12px;
}
.bb-down{
    padding: 15px 0px;
}
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
    position: absolute;
    bottom: 0%;
    height: fit-content;
    left: 0px;
    width: 100%;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    background: var(--background);
    padding: 25px 0px;
    text-align: center;
    display: block;
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
