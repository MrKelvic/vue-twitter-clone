<template>
  <div>
      <div>
          <div @click="scrll()" v-if="$store.state.mods.moreTweet" class="newBubble shadow">
              <div style="margin-right:2px;"> <i class="fa fa-arrow-up"></i> </div>
              <div style="postion:relative;">
                  <img class="shadow" :style="`right:${t*15}%;`" :src="imagefix(setUser($store.state.tweets[t].owner).user.img[0])" v-for="t in [0,1]" :key="t">
              </div>
              <div>Tweeted</div>
          </div>
          <div class="head border-color">
              <button @click="more=true" style="padding:7px;font-size:1em;background:none;color:var(--color);" class="sm-show">
                  <i style="top:unset;rigth:unset;" class="fa fa-navicon"></i>
              </button>
              <div class="fleet-container slideScroll">
                  <fleets/>
              </div>
              <!-- <img   :src="imagefix(this.$store.state.user.img[0])" alt=""> -->
              <!-- <i class="fa fa-magic inactive sm-pc"></i> -->
              </div>
          <div class="sm-hide">
              <composeTweet :compo="compo" :top="true" :tweetValue="tweetTemplate()(this.$store.state.user,'txt',null,{has:false,val:null},[])"/>
              <!-- tweetValue -->
          </div>
          <div class="tweet_feeds">
              <!-- <h4 v-for="(tweet,i) in $store.state.tweets" :key="i">
                  {{tweet.id}} : {{tweet.owner}}: index: {{i}}
              </h4> -->
              <tweets style="animation:fadein 0.3s ease-in backwards;" v-for="tweet in $store.state.tweets" :key="tweet.id" :properties="{down:tweet.cmnts.length!=0||tweet.retweets.length!=0||tweet.thread.length!=0,preview:false,interactions:true}" :tweet="tweet" :nest="true"/>
              <p class="tweetsEnd">.</p>
          </div>
      </div>
      <div v-if="more" @click="handleClick($event)" class="more sm-show">
          <div class="extra ignore">
            <div class=" ignore">
                <div class="head ignore acchead">Account info <button @click="more=false"><i style="position:unset;" class="fa fa-close"></i></button> </div>
                <div class="sum ignore">
                    <img class=" ignore" :src="imagefix(this.$store.state.user.img[0])" alt="">
                    <h3 class=" ignore">{{this.$store.state.user.name}}</h3>
                    <p class="c_grey ignore">@{{this.$store.state.user.at}}</p>
                    <div class=" ignore" style="display:flex;margin-top:20px;">
                        <span class="hvu ignore"><span class="white ignore">323 </span>Following</span>
                        <span class="hvu ignore" style="margin-left:10px;"><span class="white ignore">232 </span>Followers</span>
                    </div>
                </div>
            </div>
            <ul class=" ignore">
                <li class=" ignore">
                    <router-link class=" ignore" :to="{name:'user',params:{name:$store.state.user.at,user:$store.state.user}}">
                        <i class="fa fa-user ignore"></i>
                        <span class=" ignore">Profile</span>
                    </router-link>
                </li>
                <li class="inactive ignore">
                    <router-link class=" ignore" to="/">
                        <i class="fa fa-list ignore"></i>
                        <span class=" ignore">List</span>
                    </router-link>
                </li>
                <li class="inactive ignore">
                    <router-link class=" ignore" to="/">
                        <i class="fa fa-bookmark ignore"></i>
                        <span class=" ignore">Bookmarks</span>
                    </router-link>
                </li>
                <div class="line"></div>
                <li @click="$store.dispatch('setDisplay',true)" class=" ignore">
                    <router-link class=" ignore" to="">
                        <i class="fa fa-paint-brush ignore"></i>
                        <span class=" ignore">Display</span>
                    </router-link>
                </li>
                <li @click="$store.dispatch('setEditUser',{action:'show',data:!$store.state.mods.userEdit,event:'add',text:'Add user'})" class=" ignore">
                    <router-link class=" ignore" to="">
                        <i class="fa fa-user ignore"></i>
                        <span class=" ignore">Create your user</span>
                    </router-link>
                </li>
            </ul>
          </div>
      </div>
  </div>
</template>

<script>
import composeTweet from '@/components/composeTweet.vue';
import tweets from '@/components/tweets.vue';
import fleets from '@/components/fleets.vue';
import {tweetTemplate} from '@/localedata/dataCreaters.js'
import {imagefix,searchUser} from '@/dataParser/deepSearch.js'
// {is:false,index,allow:false,catchPhrase:''}
export default {
  name: 'feeds',
  props: {
      
    },
    components:{
        composeTweet,
        tweets,
        fleets
    },
  data(){
    return{
        bub:true,
        compo:{is:false,index:0,allow:true,catchPhrase:`What's happening?`,btnPhrase:`Tweet`},
        more:false
    }
  },
  methods:{
      scrll(){
        window.scrollTo(0,0);
        this.$store.dispatch('setMoreTweets',false)
      },
       imagefix(par){
            return imagefix(par)
        },
       setUser(id){
            return searchUser(id,this.$store.state.users)
        },
      setBub(){
        //   console.log(window.pageYOffset)
          if(window.pageYOffset<30) return 0;
          this.$store.dispatch('setMoreTweets',true)
      },
      tweetTemplate(){
          return tweetTemplate
      },
      handleClick($event){
        if([...$event.target.classList].includes('ignore')){
            return 0;
        }else{
            this.more=false
        } 
    }
  },
  watch:{
      '$store.state.tweets':function(){
          this.setBub()
        //   console.log('tweets updated')
      },
      '$store.state.mods.tweetAndThread.postType':function(){
          if(this.$store.state.mods.tweetAndThread.postType=="poll"){
              this.compo.catchPhrase=`Ask a question...`;
              return 0;
          }
          this.compo.catchPhrase=`What's happening?`
        //   console.log('tweets updated')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.newBubble{
    display:flex;
    background:var(--theme);
    position:fixed;
    top:15%;
    left:45%;
    transform:translate(-50%,-50%);
    z-index:2;
    max-width: 135px;
    padding:3px 10px;
    border-radius: 30px;
    font-size: 0.8em;
    place-items:center;
    background:var(--theme);
}
.newBubble i{
    font-size:0.9em;
    color:#fff;
}
.newBubble:hover{
    cursor:pointer;
}
.newBubble img{
    width:20px;
    height:20px;
    border-radius:40px;
    position:relative;
    border:1px solid #fff;
    background:var(--theme);
}
.head{
    font-family:var(--bold-font);
    width:100%;
    border-bottom:1px solid;
    display:flex;
    font-size:17px;
    padding:6px 0px;
    position:sticky;
    top:0px;
    z-index:1;
    background:var(--background);
    color:var(--color);
    display: flex;
    place-items: center;
}
.head h3{
    width:90%;
    padding-left:15px;
}
.head i{
    position: relative;
    top:5px;
}
.tweet_feeds{
    /* background:#202327; */
    border-top:3px solid var(--bdc);
    width:100%;
}
.head img{
    border-radius:50px;
    width:32px;
    height:32px;
    margin:0px 10px;
}
.more{
    position:fixed;
    top:0px;
    left:0px;
    background:#6d6d6d2e;
    height:100vh;
    width:100%;
    z-index:2;
}
.extra{
    width:70%;
    height:100%;
    /* background:blue; */
    padding:10px 0px;
    background:var(--background);
    color:var(--color);
}
.extra>div{
    margin-bottom:30px;
}
.sum{
    padding:0px 20px;
}
.sum img{
    border-radius:50px;
    width:55px;
    height:55px;
    margin:5px 0px;
}
.extra a{
    width:100%;
    display:block;
}
.extra li i{
    margin-right:10px;
}
.extra li{
    font-size:1.1em;
    margin:5px 0px;
    padding:10px 20px;
}
.extra li:hover{
    cursor: pointer;
    background:#90909036;
}
.acchead button{
    position:absolute;
    right:4%;
    display:flex;
    place-items:center;
    border-radius: 50px;
    padding:7px 8px;
    background:none;
    color:var(--theme);
    border:1px solid var(--theme);
}
.fleet-container{
    width:100%;
    padding:4px 2px;
    overflow: auto;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width: 480px){
    .newBubble{
    left:50%;
}
.tweet_feeds{
    border-top:1px solid var(--bdc);
}
    .head{
    padding:4px 0px;
}
.head i{
    right:3%;
}
}

</style>
