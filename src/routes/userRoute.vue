<template>
  <div>
    <div v-if="User">
        <div class="user-page">
            <!-- mini-nav -->
            <div class="mini-nav border-color">
                <button @click="$router.go(-1)"><i class="fa fa-arrow-left"></i></button>
                <div>
                    <h3 class="white usname">{{User.name}}</h3>
                    <span>{{tabs.tweets.length}} Tweets</span>
                </div>
            </div>
            <!-- user-info -->
            <div class="user-info">
                <div @click="$store.dispatch('setViewImage',{event:'image',content:[User.img[1]],show:true,index:0})" v-if="User.img[1]" class="wall-img" :style="`background:url(${imagefix(User.img[1])});background-size:cover;`"></div>
                <div v-if="!User.img[1]" class="wall-img"></div>
                <div class="main-info">
                    <div class="actions">
                        <button class="inactive" v-if="User.isff"><i class="fa fa-bell"></i> </button>
                        <button class="inactive" v-if="User.isff"><i class="fa fa-envelope"></i> </button>
                        <button @click="$store.dispatch('setEditUser',{action:'show',data:!$store.state.mods.userEdit,event:'edit',text:'Edit profile',payload:User})" v-if="$store.state.user.at===User.at" class="hhhv" style="padding:8px 15px;" >Edit profile</button>
                        <button v-if="$store.state.user.at!==User.at" @click="$store.dispatch('followOrUnfollowUser',userIndex)" style="width:95px;padding:8px 10px;" :class="`ignore ${(()=>{ if(User.isff) return `ffollowing`;return `ffollow`})()}`"></button>
                    </div>
                    <img @click="$store.dispatch('setViewImage',{event:'image',content:[User.img[0]],show:true,index:0})" :src="imagefix(User.img[0])" alt="">
                    <div>
                        <h3 class="white usname" style="margin-bottom:5px;">{{User.name}}</h3>
                        <p>@{{User.at}}</p>
                    </div>
                    <div>
                        <p class="raw white" style="font-weight:500;">{{User.bio}}</p>
                    </div>
                    <div class="disp-flex">
                        <span :title="User.ff" class="hvu"><span class="white">{{User.ff}} </span>Following</span>
                        <span :title="User.ffs" class="hvu" style="margin-left:10px;"><span class="white">{{User.ffs}} </span>Followers</span>
                    </div>
                </div>
                <div class="tabSect">
                    <div class="tabopt">
                        <button @click="tbs=`tweets`"  :class="(()=>{if(tbs==`tweets`) return `activeTab`;return null})()">Tweets</button>
                        <button @click="tbs=`replies`" :class="(()=>{if(tbs==`replies`) return `activeTab`;return null})()" >Tweets & replies</button>
                        <button @click="tbs=`media`" :class="(()=>{if(tbs==`media`) return `activeTab`;return null})()" >Media</button>
                        <button @click="tbs=`likes`" :class="(()=>{if(tbs==`likes`) return `activeTab`;return null})()" >Likes</button>
                    </div>
                    <div class="tab border-color">
                        <div v-if="tabs[`${tbs}`]">
                            <tweets v-for="tweet in tabs[`${tbs}`]" :key="tweet.id" :properties="{down:tweet.cmnts.length!=0||tweet.retweets.length!=0||tweet.thread.length!=0,preview:false,interactions:true}" :tweet="tweet" :nest="true"/>
                            <p v-if="tabs[`${tbs}`].length==0" class="notwts">Oops {{User.name}} has no {{tbs}}</p>
                        </div>
                        <p class="tweetsEnd">.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="!User">
        <div class="mini-nav border-color" style="place-items: baseline;">
            <button @click="$router.go(-1)"><i class="fa fa-arrow-left"></i></button>
            <div>
                <h3 class="white usname">Back</h3>
            </div>
        </div>
        <div class="unavailable-tweet">
            <p>oops user not found</p>
            <ul>
                <li>user @{{$route.params.name.split('+')[0]}} unavailable</li>
                <li>Users added are not available after referesh :(</li>
                <li>Or maybe user's details have been changed and no longer exists</li>
            </ul>
        </div>
    </div>
  </div>
</template>


<script>
// import feeds from '@/components/feeds.vue'
import tweets from '@/components/tweets.vue';
import {searchUser,imagefix} from '@/dataParser/deepSearch.js'
import {exec} from '@/dataParser/crawlUserRelated.js'
export default {
  name: 'User',
  components:{
      tweets
  },
  props: {
      user:Object,
  },
  data(){
    return{ 
        User:null,
        userIndex:null,
        tbs:`tweets`,
        tabs:{
            tweets:[],
            replies:[],
            media:[],
            likes:[]
        }
    }
  },
  methods: {
      imagefix(par){
          return imagefix(par)
      },
      cleanData(data){
        //   console.log(data)
        this.tabs.tweets=data;
        this.tabs.replies=data.filter(e=>e.owner===this.User.at);
        this.tabs.likes=data.filter(e=>e.props.likedBy.includes(this.User.at))//e.props.islike||
        this.tabs.media=data.filter(e=>e.owner===this.User.at&&(e.type==='imge'||e.type==='vid'));
        // console.log(this.tabs)
      },
      setUser(){
        //   console.log('setting user at ',this.$route.params.name.split('+')[0])
        this.tbs='wait'
        if(!this.user){
            let temp=searchUser(this.$route.params.name.split('+')[0],this.$store.state.users)
            if(temp){
                this.User=temp.user;
                this.userIndex=temp.index
            }
        }else{
            this.User=this.user
            this.userIndex=this.$store.state.users.findIndex(e=>e.at==this.User.at)
        }
        if(this.User) this.cleanData(exec(this.User.at,this.$store.state.tweets,this.User.at!=this.$store.state.user.at));//
        setTimeout(()=>{
            this.tbs='tweets'
        },100)
      }
  },
  mounted() {
      this.setUser()
    //   console.log(this.$store.state.user)
  },
  watch:{
    '$route.params.name':function(){
      this.setUser()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-page{
    font-size:14px;
    color:var(--grey);
}
.usname{
    font-family:var(--bold-font);
    font-size: 19px;
    font-weight: 700;
}
.mini-nav{
    font-family:var(--bold-font);
    width:100%;
    border-bottom:1px solid;
    display:flex;
    font-size:17px;
    padding:5px 0px;
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
    margin-right:20px;
    /* background:red; */
}
.mini-nav button:hover{
    cursor: pointer;
    background:#1da1f245;
}
.mini-nav span{
    font-size:13px;
}
.mini-nav span{
    color:#6E767D;
}
.user-info{
    font-size:14px;
}
.wall-img{
    width:100%;
    height:200px;
    background:grey;
    background-size: cover !important;
}
.wall-img:hover{
    cursor: pointer;
}
.main-info{
    position: relative;
    padding:0px 15px;
    padding-top:57px;
}
.main-info img{
    position:absolute;
    top:-77px;
    width:132px;
    height:132px;
    border-radius:50%;
    background:var(--background);
    border:4px solid var(--background);
    padding:1px;
}
.main-info img:hover{
    background:none;
    cursor:pointer;
}
.main-info div{
    margin:12px 0px;
}
.disp-flex{
    display:flex;
}
.hvu:hover{
    text-decoration:underline;
    cursor: pointer;
}
.actions{
    /* background:red; */
    position:absolute;
    right:5%;
    top:3%;
    display:flex;
}
.actions button{
    margin:0px 6px;
    display:flex;
    place-content:center;
    padding:10px;
    font-size:17px;
    background:none;
    color:var(--theme);
    border:1px solid var(--theme);
    border-radius:30px;
}
.actions button:hover{
    background:var(--theme);
    color:#fff;
    cursor: pointer;
}
.hhhv:hover{
    background:var(--themehove) !important;
}
.tabSect{
    margin-top:35px;
}
.tabopt{
    /* background:red; */
    display:grid;
    grid-template-columns:20% 40% 20% 20%;
    width:100%;
}
.tabopt button{
    width:100%;
    padding:15px;
    background:none;
    font-weight:600;
    color:var(--grey);
    font-size:1em;
    outline:none;
}
.tab{
    border-top:1px solid;
}
.tabopt button:hover{
    cursor:pointer;
    color:var(--theme);
    background:var(--themehove);
}
.activeTab{
    border-bottom:2px solid var(--theme);
    color:var(--theme) !important;
}
.notwts{
    color:var(--theme);
    text-align: center;
    font-size: 1.2em;
    margin-top: 40px;
    animation:fadein 0.5s linear;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width:480px){
  .main-info img{
    top: -65px;
    width: 100px;
    height: 100px;
}
.main-info{
    padding-top: 35px;
}
.wall-img{
    background-size: contain;
    background-repeat: no-repeat;
    height: 133px;
}
.actions{
    right: 0%;
    top: 0%;
}
.actions button {
    font-size:14px;
}
}
</style>
