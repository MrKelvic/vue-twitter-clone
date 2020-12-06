<template>
  <div class="menu">
      <div class="mmhold">
        <ul>
            <li>
                <router-link class="brnd" to="/">
                    <div class="a_div icoBar">
                        <i class="fa fa-twitter"></i>
                    </div>
                </router-link>
            </li>
            <li @click="scrll()">
                <router-link to="/">
                    <div class="a_div">
                        <span style="right: 73%;" v-if="$store.state.mods.moreTweet" class="dot sm-pc"></span>
                         <span v-if="$store.state.mods.moreTweet" class="dot lg-no"></span>
                        <i class="fa fa-home"></i>
                        <span class="sm-pc">Home</span>
                    </div>
                </router-link>
            </li>
            <li class="inactive">
                <router-link to="/">
                    <div class="a_div">
                        <i class="fa fa-search"></i>
                        <span class="sm-pc">Explore</span>
                    </div>
                </router-link>
            </li>
            <li class="inactive">
                <router-link to="/">
                    <div class="a_div">
                        <i class="fa fa-bell"></i>
                        <span class="sm-pc">Notifications</span>
                    </div>
                </router-link>
            </li>
            <li class="inactive">
                <router-link to="/">
                    <div class="a_div">
                        <i class="fa fa-envelope"></i>
                        <span class="sm-pc">Messages</span>
                    </div>
                </router-link>
            </li>
            <li class="inactive">
                <router-link to="/">
                    <div class="a_div">
                        <i class="fa fa-bookmark"></i>
                        <span class="sm-pc">Bookmarks</span>
                    </div>
                </router-link>
            </li>
            <li class="inactive">
                <router-link to="/">
                    <div class="a_div">
                        <i class="fa fa-list"></i>
                        <span class="sm-pc">List</span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'user',params:{name:$store.state.user.at,user:$store.state.user}}">
                    <div class="a_div">
                        <i class="fa fa-user"></i>
                        <span class="sm-pc">Profile</span>
                    </div>
                </router-link>
            </li>
            <div @click="handleClick($event)" v-if="more" class="more">
                <ul class="ignore shadow">
                    <li class="ignore"><i class="fa fa-commenting ignore"></i> Topics</li>
                    <li class="ignore"><i class="fa fa-bolt ignore"></i> Moments</li>
                    <div class="ignore line"></div>
                    <li class="ignore"><i class="fa fa-gear ignore"></i> Settings and privacy</li>
                    <li class="ignore"><i class="fa fa-question ignore"></i> Help Center</li>
                    <li class="ignore" @click="$store.dispatch('setDisplay',true)"><i class="fa fa-paint-brush ignore"></i> Display</li>
                </ul>
            </div>
            <li>
                <router-link to="">
                    <div @click="more=true" class="a_div">
                        <i class="fa fa-ellipsis-h" style="border:1px solid;border-radius:50px;padding:2px 4px 0px 3px;"></i>
                        <span class="sm-pc">More</span>
                    </div>
                </router-link>
            </li>
        </ul>
        <div class="bbt">
            <button @click="$store.dispatch('toggletweetAndThread',{bool:true,params:tweet,action:'T'})" class="sm-pc">Tweet</button>
            <button @click="$store.dispatch('toggletweetAndThread',{bool:true,params:tweet,action:'T'})" class="lg-no"><i class="fa fa-paper-plane-o"></i></button>
            <accntSetting class="lll"/>
        </div>
      </div>
  </div>
</template>

<script>
import accntSetting from '@/components/accountSetting.vue';
import {tweetTemplate} from '@/localedata/dataCreaters.js'
export default {
  name: 'pcNav',
  components:{
      accntSetting
  },
  props: {
    
  },
  data(){
    return{
        more:false,
        tweet:tweetTemplate(this.$store.state.user,'txt',null,{has:false,val:null},[]),
    }
  },
  methods:{
      scrll(){
        window.scrollTo(0,0);
        this.$store.dispatch('setMoreTweets',false)
      },
      handleClick($event){
        if([...$event.target.classList].includes('ignore')){
            return 0;
        }else{
            this.more=false
        } 
    },
  },
  mounted(){
    //   console.log(this.tweet)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dot{
    width:8px;
    height:8px;
    border-radius:40px;
    background:var(--theme);
    position: absolute;
    top:13%;
    right:12%;
}
.menu{
    margin-left:3.4em;
    font-family:var(--bold-font);
    color:var(--color);
    position: fixed;
    top:0px;
    height:100vh;
    background:var(--background);
    /* background:green; */
    z-index:2;
    /* overflow-y:auto; */
    /* overflow-x: hidden; */
    display: flex;
     max-width:253px;
    /* max-width:227px; */
    flex-wrap: wrap;
    /* overflow-y: auto;*/
}
.mmhold{
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    display: grid;
   grid-template-rows: minmax(430px,60%) minmax(auto,20%) auto;
   /* grid-template-rows: minmax(460px,60%) minmax(auto,20%) auto; */
   /* grid-template-rows: minmax(460px,60%) minmax(auto,20%) auto; */
    /* grid-template-rows:minmax(505px,75%) minmax(auto,15%); */
}
.menu ul{
    /* background:yellow; */
    display:flex;
    flex-wrap: wrap;
    /* height:40%; */
}
.menu li{
    margin:1px 0px;
    padding:1px 0px;
    /* background:blue; */
    width:100%;
    font-size:1.21em;
    /* font-family:var(--bold-font); */
}
.menu li div{
    /* padding:7px 18px 7px 15px; */
     padding:10px 18px 9px 15px;
    width:fit-content;
    /* background:yellow; */
    border-radius:50px;
}
.mmhold>ul>li>a:hover .a_div{
    color:var(--theme);
    background:#1da1f245;
}
.menu li i{
    display:inline-block;
    margin-right:22px;
    font-size:1.08em;
}
.a_div{
    position:relative;
}
.a_div>span{
    font-size:1em !important;
}
.menu a{
    display:block;
    width:100%;
    /* background:red; */
}
.menu button{
    background:var(--theme);
    padding:16px 95px;
    color:#fff;
    font-size:0.9em;
    border-radius: 50px;
    margin:5px 0px;
    font-family:var(--bold-font);
    font-weight:600;
}
.icoBar{
    /* padding: 9px 0px 9px 13px !important; */
    padding:0px !important;
    font-size: 1.4em;
}
.icoBar i{
    margin: 0px !important;
    padding:8px 9px;
}
.brnd{
    width:fit-content;
    margin:0px 4px;
    margin-bottom:5px;
}
.brnd:hover .icoBar{
    color:#b8bbb8 !important;
    background:#1da1f245 !important;
}
.bbt{
    /* background:orange; */
}
.lll{
    position:relative;
    top:2%;
    /* background:greenyellow; */
}
.more{
    width: 100%;
    height: 100vh;
    background:none;
    position: fixed;
    left: 0px;
    z-index: 2;
    background:#6e767d30;
}
.more>ul{
    background:var(--background);
    color:var(--color);
    bottom: 22%;
    position: absolute;
    max-width:190px;
    width:fit-content;
    left: 9%;
    padding:1px 0px !important;
    overflow:hidden;
    border-radius: 5px;
}
.more>ul>li{
    font-size:1em;
    padding:15px 10px !important;
    /* padding: 3px 0px; */
    margin:0px;
}
.more>ul>li>i{
    padding:0px !important;
    margin-right: 5px !important;
}
.more>ul>li:hover{
    cursor: pointer;
    background:#90909036;
}
@media only screen and (max-width:1250px){
.menu li div{
    padding:0px;
    width: 45px;
    height: 45px;
    display: flex;
    place-content: center;
}
.icoBar{
    height:unset !important;
    width:unset !important;
}
.menu a{
    width:fit-content;
}
.menu li i{
    margin: 0px !important;
    padding:11px 12px !important;
    font-size:1.16em;
    border:none !important;
}
.brnd{
    margin:0px
}
.menu button{
    padding:12px 14px;
    font-size:1em;
    margin:10px 0px;
}
.menu{
    margin-left:2.6em;
    max-width: 70px;
}
.lll{
    top:unset;
}
.mmhold[data-v-4babae50] {
    grid-template-rows: minmax(430px,70%) minmax(auto,20%) auto;
}
}
@media only screen and (max-width:760px){
.menu{
    margin-left:10px;
}
}
@media only screen and (max-width: 480px){

}
</style>
