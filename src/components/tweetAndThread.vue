<template>
  <div class="cnt">
     <div class="bdy shadow">
         <div class="top-bar">
             <button @click="$store.dispatch('toggletweetAndThread',{bool:false,params:{}});$store.dispatch('setPostType','txt')"><i class="fa fa-close"></i></button>
             <button @click="addtweet" class="Topaddtweet sm-show" :disabled="compo.allow">{{compo.btnPhrase}}</button>
         </div>
         <div class="thread">
             <div style="position:relative;">
                 <span class="fl-down"  style="height:75%;top:72px;" v-if="tweet.thread.length>0"></span>
                <compose :compo="compo" :tweetValue="tweet"
                    v-on:addNextThread="addNextThreadHandle" 
                    v-on:disAllow="disAllowHandle" v-on:createThread="addtweet" 
                    v-on:bruteUpdateTweet="bruteUpdateTweetHandle"
                    :top="true" />
                    <!-- Object.assign({catchPhrase:`What's happening?`},compo) -->
             </div>
            <div class="ext-thread" v-for="(trd,i) in tweet.thread" :key="i">
                <button @click="remThread(i)"><i class="fa fa-close"></i></button>
                <span class="fl-down"  :style="(()=>{if(trd.type=='txt') return `height:67%;`;return `height:90%;`})()" v-if="i!=(tweet.thread.length-1)"></span>
                <compose :compo="compo" :tweetValue="trd" 
                v-on:addNextThread="addNextThreadHandle" v-on:disAllow="disAllowHandle"
                v-on:createThread="addtweet" :threadIndex="i" v-on:updateThread="updateThread" :top="false"/>
                <div :id="`stapm${i}`" style="width:100%;height:1px;"></div>
            </div>
             <div id="btttmmm" style="width:100%;height:1px;"></div>
         </div>
     </div>
  </div>
</template>

<script>
import {tweetTemplate} from '@/localedata/dataCreaters.js';
import compose from '@/components/composeTweet.vue';
export default {
  name: 'composeTweet',
  components:{
      compose
  },
  props: {
    },
  data(){
    return{
        compo:{is:true,index:0,allow:true,catchPhrase:`What's happening`,btnPhrase:`Tweet`,d:4},
        tweet:tweetTemplate(this.$store.state.user,'txt',null,{has:false,val:null},[]),
         //   whoIsTweeting,type,track, main, thread
    }
  },
  computed:{
 
  },
  methods:{
    doFilt(val){
        if(this.tweet.thread.length==0){
            this.compo.btnPhrase=`Tweet`;
            this.compo.catchPhrase=`What's happening`
        }
        if(this.tweet.cnt[0].replace(/\s/g,'').length==0){
            this.compo.allow=true;
            this.setToTweetReply()
            return 0;
        }
        for(let i=0;i<this.tweet.thread.length;i++){
            if(this.tweet.thread[i].cnt[0].replace(/\s/g,'').length==0){
                this.compo.allow=true;
                return 0;
            }
        }
        this.setToTweetReply()
        this.compo.allow=val
    },
    updateThread(payload){
        // console.log('got from brute thread ',payload)
        this.tweet.thread[payload.index]=payload.data
    },
    bruteUpdateTweetHandle(tweet){
        // console.log('handling brute got ',tweet.data.cnt)
        // this.$emit('bruteUpdateTweet',{type:'thread',param:this.threadIndex,data:this.tweet});
        // if(tweet.type=='tweet'){
            tweet.id=this.tweet.id;
            tweet.track=this.tweet.track
            tweet.thread=this.tweet.thread
            this.tweet=tweet
        // }else if(tweet.type=='thread'){
        //     this.tweet.thread[tweet.params]=tweet.data;
        // }
        // console.log('brute value ',this.tweet.thread)
    },
    disAllowHandle(val){
        this.doFilt(val)
        // this.setToTweetReply()
    },
    setToTweetReply(){
        if(['C','R'].includes(this.$store.state.mods.tweetAndThread.action)){
            this.compo.d=1
            if(this.$store.state.mods.tweetAndThread.action=='C'){
                this.compo.catchPhrase=`Tweet your reply`;
                this.compo.btnPhrase=`Reply`
            }else{
                this.compo.catchPhrase=`Add a comment`;
                this.compo.btnPhrase=`Retweet`
            }
        }else{
            this.compo.d=4
            if(this.$store.state.mods.tweetAndThread.postType=='poll'){
                this.compo.catchPhrase=`Ask a question...`;
                this.compo.d=1
            }else{
                this.compo.btnPhrase=`Tweet`;
                this.compo.catchPhrase=`What's happening`
            }
        }
    },
    //   emits:Add next thread(addNextThread())
    addNextThreadHandle(){//add to thread
        this.tweet.thread.push(tweetTemplate(this.$store.state.user,'txt',[this.tweet.id.split('-').pop(),`t${this.tweet.thread.length}`],{has:false,val:null},[]))
        this.compo.btnPhrase=`Tweet all`;
        this.compo.catchPhrase=`Add another tweet`;
        // console.log('adding thread',this.tweet.thread)
        // this.setToTweetReply()
        this.compo.allow=true
        setTimeout(()=>{
            document.getElementById('btttmmm').scrollIntoView()
        },100)
    },
    remThread(rm){//remove from thread
        this.tweet.thread=this.tweet.thread.filter((e,index)=>index!=rm);
        this.doFilt()
        // console.log('removing:',rm,' scrolling to: ',rm-1)
        if(rm-1>0){
            let p=document.getElementById(`stapm${rm-1}`)
            if(p) p.scrollIntoView()
        }
    },
    addtweet(){
        //
            // console.log(this.tweet, 'subminting ')
        switch (this.$store.state.mods.tweetAndThread.action) {
            case 'C'://a comment
                this.$store.dispatch('commentTweet',{tweet:this.tweet,action:true})
                break;
            case 'R'://retweet with comment
                this.$store.dispatch('retweetWithCommnet',{tweet:this.tweet,action:true})//{tweet:,action(true(add)/false(remove))}
                break
            default:
                this.$store.dispatch('addTweet',this.tweet)
                break;
        }

        this.tweet=tweetTemplate(this.$store.state.user,'txt',null,{has:false,val:null},[]);
    }
  },
  mounted(){
    //   console.log(this.$store.state.mods.tweetAndThread.postType)
    // console.log(this.$store.state.mods.tweetAndThread.params)
      if(this.$store.state.mods.tweetAndThread.params){
           if(!['C','R'].includes(this.$store.state.mods.tweetAndThread.action)){
              this.tweet.cnt=[...this.$store.state.mods.tweetAndThread.params.cnt]
              this.tweet.thread=[...this.$store.state.mods.tweetAndThread.params.thread]
              this.tweet.track=[...this.$store.state.mods.tweetAndThread.params.track]
              this.tweet.type=`${this.$store.state.mods.tweetAndThread.params.type}`
           }else{
               this.setToTweetReply()
               let id=this.$store.state.mods.tweetAndThread.params.id.split('-')
               id.pop()
               switch (this.$store.state.mods.tweetAndThread.action) {
                   case 'C':
                       id=[...id,`c${this.$store.state.mods.tweetAndThread.params.cmnts.length}`]
                       break;
                    case 'R':
                       id=[...id,`r${this.$store.state.mods.tweetAndThread.params.retweets.length}`]
                       break;
                   default:
                       break;
               }
               if(this.$store.state.mods.tweetAndThread.postType=='poll'){
                   if(this.$store.state.mods.tweetAndThread.params?.type=='poll'){
                       this.tweet.cnt=[...this.$store.state.mods.tweetAndThread.params.cnt];
                       this.tweet.type='poll'
                    //    console.log('setting tweetAndThread tweet to poll ',this.tweet.cnt)
                   }else{
                       this.tweet=tweetTemplate(this.$store.state.user,'poll',id,{has:false,val:null},[])
                   }
               }else{
                   this.tweet=tweetTemplate(this.$store.state.user,'txt',id,{has:false,val:null},[])    
               }
            //    console.log('leaving id',id)
            //   console.log(this.$store.state.mods.tweetAndThread.action,' was in the array')
            //   console.log(this.tweet.cnt,' from upper')
           }
        //   console.log(this.tweet,' is the main tweet')
      }else{
          this.tweet=tweetTemplate(this.$store.state.user,'txt',null,{has:false,val:null},[])
      }
    //   console.log('tweetAndThread: pushing down to compose ',this.tweet)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cnt{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    background: rgba(110,118,125,.4);
    display: grid;
    place-items: start center;
    padding-top: 45px;
    z-index:4;
}
.bdy{
    background:var(--background);
    width:600px;
    max-height:550px;
    height:fit-content;
    border-radius:16px;
    overflow: hidden;
}
.top-bar{
    border-bottom:1px solid var(--bdc);
    padding:8px 5px;
}
.top-bar button{
    width:37px;
    height:37px;
    border-radius:30px;
    font-size:19px;
    padding:5px;
    color:var(--theme);
    background:none;
    margin:0px 12px;
    /* background:red; */
}
.top-bar button:hover{
    cursor: pointer;
    background:#1da1f245;
}
.thread{
    max-height:489px;
    width:100%;
    overflow-y:auto;
    transition:all 0.2s linear;
}
.ext-thread{
    position: relative;
    /* background:yellow; */
    margin:5px 0px;
    padding-top:15px;
}
.ext-thread>button{
     width:28px;
    height:28px;
    border-radius:30px;
    font-size:13px;
    padding:3px;
    color:var(--theme);
    position:absolute;
    right:4px;
    top:0px;
    background:none;
    /* background:red; */
}
.ext-thread>button:hover{
    cursor: pointer;
    background:#1da1f245;
}
.fl-down{
    width: 2px;
    background: #2f3336;
    display: block;
    position: absolute;
    left: 38px;
    top: 90px;
}
button:disabled{
    opacity:0.6;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width:760px){
    .cnt{
        padding-top:0px;
    }
    .bdy{
        width:100%;
        height:100%;
        border-radius:0px;
        max-height:unset;
    }
    .thread{
        max-height: 100%;
        height: 92%;
        /* margin-top: 55px; */
        position: absolute;
    }
    .top-bar{
        font-family:var(--bold-font);
        width:100%;
        display:flex;
        font-size:17px;
        position:sticky;
        top:0px;
        z-index:3;
        background:var(--background);
        color:var(--color);
        max-height:unset;
        /* position:relative; */
    }
    .Topaddtweet{
        font-family:var(--bold-font);
        background:var(--theme) !important;
        color:var(--color) !important;
        border-radius:30px !important;
        width: fit-content !important;
        padding:9px 17px 11px 17px !important;
        height:fit-content !important;
        margin:0px !important;
        font-weight:600;
        font-size:15px !important;
        position:absolute;
        top:6px !important;
        right:5%;
    }
}
@media only screen and (max-width: 480px){

}
</style>
