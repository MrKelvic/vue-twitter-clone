<template>
    <div v-if="twtOwner">
      <div :style="(()=>{if(nest) return `border-bottom:1px solid;`; return ``})()" class="twt-cont border-color">
          <!-- margin-top:5px; -->
        <div data-focusable="true" tabindex="0" v-on:keyup.enter="handleTweetClick({name:'tweet',params:{id:tweet.id,tweet:tweet}},$event)" @click="handleTweetClick({name:'tweet',params:{id:tweet.id,tweet:tweet}},$event)" :class="(()=>{if(properties.isFleet){return 'twt-bdy nopadding'}else{ return 'twt-bdy'}; })()">
            <div v-if="showOwn.hover"  @mouseover="showOwn.hover=true" @mouseleave="showOwn.hover=false">
                <userInfo :userObj="twtOwner" class="ignore bioffsec"/>
                <!-- here -->
            </div>
            <div  @mouseover="showOwn.hover=true" v-if="!nest&&!properties.preview" class="u_act act c_grey">
                <i class="fa fa-retweet"></i>
                <router-link :to="{name:'user',params:{name:twtOwner.at,user:twtOwner}}">@{{tweet.owner}}</router-link>
                <span>{{action}}</span>
            </div>
            <div :class="(()=>{if(properties.isFleet&&tweet.type==`imge`){return 'fl fl-fleet-contrl'}else{ return 'fl'}; })()">
                <span class="fl-down"  :style="(()=>{if(tweet.type=='txt') return `height:67%;`;return `height:90%;`})()" v-if="!properties.preview&&properties.down&&(tweet.cmnts.length>1||tweet.retweets.length>1)||tweet.thread.length!=0"></span>
                <span class="fl-down" :style="`height:85%;top: 45px;`" v-if="properties.bruteDown"></span>
                <img v-if="!twtOwner" :src="``" alt="">
                <img v-if="twtOwner" :src="imagefix(twtOwner.img[0])" alt="">
                <div class="twt-sec">
                    <div class="twt-own ut">
                        <div @mouseover="showOwn.hover=true"  class="u_act">
                            <p class="ue">{{twtOwner.name}}</p>
                            <router-link :to="{name:'user',params:{name:twtOwner.at,user:twtOwner}}" class="c_grey">@{{twtOwner.at}}</router-link>
                        </div>
                        <span style="margin:0px 4px 0px 0px;width:2px;height:2px;border-radius:20px;background:var(--color);"></span>
                        <!-- <time :datetime="tweet.time">{{tweet.time}}</time> -->
                        <span style="font-size:15px;" :title="tweet.time.toDateString()" class="c_grey">{{setTweetTime(tweet.time)}}</span>
                    </div>
                    <div class="twt-cnt-bdy">
                        <component :is="tweet.type" :content="tweet.cnt" :tweetId="tweet.id" :Atweet="(()=>{if(tweet.type=='imge') return tweet; return undefined;})()"></component>
                    </div>
                    <span v-if="!properties.preview">
                        <span v-if="tweet.main">
                            <div class="mainTwt" v-if="tweet.main.val">
                                <tweets class="mainTwt-cnt"  :properties="{down:false,preview:true,interactions:false}" :tweet="tweet.main.val" :nest="false"/>
                                <div class="fill"></div>
                            </div>
                        </span>
                    </span>
                    <div :style="(()=>{if(properties.isFleet) return 'place-content: space-between;'})()" v-if="properties.interactions" class="interactions">
                        <div :style="(()=>{if(isPreview||properties.isFleet) return 'width:unset;'})()">
                            <div class="ignore interact cmt ch">
                                <button @click="handleInteraction('C',false)" class="ignore cmt-hov inter-icon">
                                <i class="ignore fa fa-comment-o"></i>
                                </button>
                            <span class="ignore">{{tweet.cmnts.length+tweet.retweets.length}}</span>
                            </div>
                        </div>
                        <div :style="(()=>{if(isPreview||properties.isFleet) return 'width:unset;'})()">
                            <div tabindex="1" class="inter-options ignore rtscreen shadow" v-if="mods.rt">
                                <div>
                                    <button class="ignore" @click="handleInteraction('R',false)"><i class="fa fa-retweet ignore"></i> {{(()=>{if(tweet.props.isrwt) return `Undo Retweet`; return 'Retweet';})()}}</button>
                                    <button class="ignore" @click="handleInteraction('RC',false)"><i class="fa fa-pencil ignore"></i> Quote Tweet</button>
                                    <button @click="mods.rt=false" class=" cc ignore">cancel</button>
                                </div>
                            </div>
                            <div class="ignore interact ret rh" :style="(()=>{if(tweet.props.retweetedBy.includes($store.state.user.at)) return `color:rgba(23,191,91);`;})()">
                                <button @click="handleInteraction('R',true);mods.fleet=false" class="ignore ret-hov inter-icon">
                                <i class="ignore fa fa-retweet"></i>
                                </button>
                            <span class="ignore">{{tweet.props.rtwts+tweet.retweets.length}}</span>
                            </div>
                        </div>
                        <div :style="(()=>{if(isPreview||properties.isFleet) return 'width:unset;'})()">
                            <div class="ignore interact like lh" :style="(()=>{if(tweet.props.likedBy.includes($store.state.user.at)) return `color:rgba(224,36,94);`;})()">
                                <button @click="handleInteraction('L',false)" class="ignore like-hov inter-icon">
                                <i class="ignore fa fa-heart-o"></i>
                                </button>
                            <span class="ignore">{{tweet.props.likes}}</span>
                            </div>
                        </div>
                        <div v-if="!properties.isFleet" :style="(()=>{if(isPreview) return 'width:unset;'})()">
                            <div tabindex="1" class="inter-options ignore rtscreen shadow" v-if="mods.fleet">
                                <div>
                                    <button class="ignore" @click="$store.dispatch('setFleetTweet',tweet.id);$router.push({name:'createFleet'})">Share in a Fleet</button>
                                    <button @click="mods.fleet=false" class=" cc ignore">cancel</button>
                                </div>
                            </div>
                            <div class="ignore interact cmt ch">
                                <button @click="handleInteraction('S',false);mods.fleet=true;mods.rt=false" class="ignore cmt-hov inter-icon" style="padding:9px 12px 9px 9px;">
                                <i class="ignore fa fa-share-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!properties.preview">
            <span v-if="tweet.thread.length!=0">
                <tweets v-for="(cmt,i) in 1" :key="`${i}${tweet.owner}`" :properties="{down:tweet.thread.length-1!=i,preview:true,interactions:true}" :action="``" :tweet="tweet.thread[i]" :nest="false"/>
            </span>
            <!--  -->
            <span v-if="tweet.cmnts.length>1">
            <!-- i!=(tweet.cmnts.length-1) -->
                <tweets v-for="(cmt,i) in 1" :key="`${i}${tweet.cmnts[tweet.cmnts.length-1].owner}`" :properties="{down:tweet.cmnts[tweet.cmnts.length-1].cmnts.length!=0||tweet.cmnts[tweet.cmnts.length-1].retweets.length!=0,preview:false,interactions:true}" :action="`replied`" :tweet="tweet.cmnts[tweet.cmnts.length-1]" :nest="false"/>
            </span>
            <span v-if="tweet.retweets.length>1">
                <!-- i!=(tweet.retweets.length-1) -->
                <tweets v-for="(rtw,i) in 1" :key="`${i}${tweet.retweets[tweet.retweets.length-1].owner}`" :properties="{down:tweet.retweets[tweet.retweets.length-1].cmnts.length!=0||tweet.retweets[tweet.retweets.length-1].retweets!=0,preview:false,interactions:true}" :action="`retweeted`" :tweet="tweet.retweets[tweet.retweets.length-1]" :nest="false"/>
            </span>
        </div>
        <div v-if="tweet.thread.length!=0" class="isthread">
            <router-link :to="{name:'tweet',params:{id:tweet.id,tweet:tweet}}">
                <img v-if="properties.preview" class="ignore " :src="imagefix(twtOwner.img[0])" alt="">
                <p>Show this thread</p>
            </router-link>
        </div>
      </div>
    </div>
</template>

<script>
const txt=()=>import('@/components/tweetText.vue')
const imge=()=>import('@/components/tweetImg.vue')
const vid=()=>import('@/components/tweetVid.vue')
const poll=()=>import('@/components/tweetPoll.vue')
const userInfo=()=>import('@/components/personInfo.vue')
import tweets from '@/components/tweets.vue'
import {searchUser,imagefix,time} from '@/dataParser/deepSearch.js'
export default {
name: 'tweets',
props: {
    tweet:Object,
    nest:Boolean,
    action:String,
    properties:Object,
    isPreview:Boolean,
},
components:{
    tweets,
    txt,
    imge,
    poll,
    vid,
    userInfo
},
data(){
    return{
        twtOwner:null,
        userIndex:null,
        showOwn:{
            hover:false,
            who:null
        },
        mods:{
            rt:false,
            fleet:false
        }
    }
},
methods:{
    setTweetTime(date){
       return time(date);
    },
    imagefix(par){
        return imagefix(par)
    },
    setUser(id){
        return searchUser(id,this.$store.state.users)
    },
    handleTweetClick(route,$event){

        // console.log('remo',$event)
        if([...$event.target.classList].includes('ignore')){
            return 0;
        }else{
            this.mods.rt=false
        } 
        this.$router.push(route)
    },
    handleInteraction(action,showOptions){
        // console.log(action,showOptions,' handling interaction')
        //action show options
        if(!showOptions){
            switch (action) {
                case 'C':
                    //comment tweet
                    this.$store.dispatch('toggletweetAndThread',{bool:true,params:this.tweet,action:'C'})
                    break;
                case 'RC':
                    this.$store.dispatch('toggletweetAndThread',{bool:true,params:this.tweet,action:'R'})
                    this.mods.rt=false
                    break;
                case 'L':
                    this.$store.dispatch('likeTweet',this.tweet)
                    break;
                case 'R':
                    this.$store.dispatch('onlyRetweet',this.tweet)
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
    }
    // dohover(id,show){
    //     this.showOwn.hover=show;
    //     if(!show) return 0
    //     this.showOwn.who=this.setUser(id)
    // }
},
mounted(){
    // console.log('mounted=> ',this.tweet.owner)
    let temp=this.setUser(this.tweet.owner)
    this.twtOwner=temp.user;
    this.userIndex=temp.index;

    // console.log('now ',this.twtOwner.at,' ',this.tweet.id)
    // console.log(this.tweet)
},
// created(){
//     this.set()
// }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
    width:40px;
    height:40px;
}
.twt-cont{
 font-family:var(--font);
 font-size:14px;
 color:var(--color) !important;
}
.twt-bdy{
    transition:all 0.1s cubic-bezier(0.59, -0.21, 1, 1);
    display:block;
    /* background:green; */
}
.twt-bdy:hover{
    cursor: pointer;
    /* background:#ffffff0d; */
    background:var(--altback);
    /* background:rgba(21,23,24); */
}
.ut:hover .ue{
    text-decoration:underline;
}
.u_act{
    /* background:red; */
    display:flex;
    width:fit-content;
}
.act{
    left:32px;
    position:relative;
}
.act span{
    margin:0px 5px;
}
.act i{
    margin-right:14px;
}
.act a:hover{
    text-decoration:underline;
}
.fl{
    display:flex;
    position: relative;
    /* background:none !important; */
}
.fl-fleet-contrl{
    width:400px;
}
.twt-bdy{
    padding:5px 15px;
}
.fl>img{
    min-width:45px;
    min-height:45px;
    width:45px;
    height:45px;
    border-radius:50px;
    margin-right:15px;
    position:relative;
    top:4px;
}
.twt-sec{
    width:100%;
}
.twt-own{
   display: flex;
    font-size: 15px;
    place-items: center;
    margin: 5px 0px;
    width: fit-content;
}
.twt-own p{
    font-weight:600;
}
.twt-own a{
    margin:0px 5px;
    font-size:15px;
}
.twt-cnt-bdy{
    margin-bottom:1px;
}
.interactions{
    display:flex;
    font-size:13px;
    position:relative;
    left:-13px;
    color:grey;
    margin-top:3px;
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
.fl-down{
    width: 2px;
    /* background: #2f3336; */
    background:var(--bdc);
    display: block;
    position: absolute;
    left: 20px;
    top: 59px;
    /* top: 54px; */
}


/* .bioffsec>div{
    
} */

.isthread{
    width: 100%;
    height: 30px;
    color:var(--theme);
    padding:4px 12px;
    /* background: red; */
}
.isthread:hover{
    cursor: pointer;
    background:var(--altback);
}
.isthread a{
    display:inline-flex;
    /* padding: 3px 22px; */
    width:100%;
    height:100%;
}
.isthread img{
    width:27px;
    height:27px;
    border-radius:50px;
    margin-left:10px;
    margin-right: 15px;
}
.isthread p{
    position: relative;
    top: 21%;
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
    top: 80%;
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
.mainTwt{
    /* background:red; */
    position: relative;
  border:1px solid var(--bdc);
  border-radius:10px;
  overflow: hidden;
  margin-top:15px;
}
/* .mainTwt-cnt{
} */
.mainTwt-cnt:hover{
  cursor: pointer;
  background:rgba(21,23,24);
}
.cc{
    width:100%;
    text-align:center !important;
    background:var(--altback) !important;
    /* background:#202327bd !important; */
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width: 480px){
.rtscreen{
    position:fixed;
    top:0px;
    left:0px;
    width:100%;
    height:100vh;
    background:#44424280;
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
    /* width:100%; */
    padding: 12px 20px;
    margin-bottom:5px;
    /* background:green; */
}
.cc{
    width:88%;
    border-radius:30px;
}
.nopadding{
    padding:0px !important;
}
}
@media only screen and (max-width: 425px){
.fl-fleet-contrl{
    width:320px;
}
}
@media only screen and (max-width:340px){
.fl-fleet-contrl{
    width:unset;
}
}
</style>
