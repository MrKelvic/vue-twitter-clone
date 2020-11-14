<template>
  <div>
    <div v-if="user" class="owner-info shadow ignnore">
        <div class="ignore owner-info-basic">
            <div class="ignore ">
                <router-link class="ignore " :to="{name:'user',params:{name:user.at,user:user}}">
                    <img class="ignore " :src="imagefix(user.img[0])" alt="">
                    <!-- style="color:#d4d4d4 !important;" -->
                    <p class="ignore hvu white">{{user.name}}</p>
                    <router-link class="ignore " :to="{name:'user',params:{name:user.at,user:user}}">@{{user.at}}</router-link>
                </router-link>
            </div>
            <button v-if="$store.state.user.at!==user.at" @click="$store.dispatch('followOrUnfollowUser',userIndex)" :class="`ignore ${(()=>{ if(user.isff) return `ffollowing`;return `ffollow`})()}`"></button>
        </div>
        <div class="ignore ussum">
            <p class="ignore ">{{user.bio}}</p>
            <div class="ignore ffsect">
                <div class="ignore hvu"><span class="ignore white">{{user.ff}} </span>Following</div>
                <div class="ignore hvu" style="margin-left:10px;"><span class="ignore white">{{user.ffs}} </span>Followers</div>
            </div>
        </div>
    </div>
    <div v-if="!user">
        <p>loading</p>
    </div>
  </div>
</template>


<script>
import {searchUser,imagefix} from '@/dataParser/deepSearch.js'
export default {
  name: 'userinfo',
  components:{

  },
  props: {
      userObj:Object,
      userId:String
  },
  data(){
    return{ 
        user:null,
        userIndex:null,
    }
  },
  methods: {
      imagefix(par){
          return imagefix(par)
      },
      setUser(id){
        return searchUser(id,this.$store.state.users)
    },
  },
  mounted() {
      if(!this.userObj&&this.userId){
        //serch for user
        let temp=this.setUser(this.userId)
        this.user=temp.user;
        this.userIndex=temp.index
        return 0;
      }
      this.user=this.userObj
      this.userIndex=this.$store.state.users.findIndex(e=>e.at==this.user.at)
  },
  watch:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.owner-info{
    color:#828282;
    font-size: 14px;
    z-index:1;
    position:absolute;
    max-width:260px;
    padding:10px 15px;
    background:var(--background);
    border-radius:10px;
    animation:fadein 0.2s linear backwards;
}
.owner-info img{
    min-width:40px;
    min-height:40px;
    width:40px;
    height:40px;
    border-radius:50px;
}
.owner-info>div{
}
.owner-info-basic{
   display: flex;
   position:relative;
}
.owner-info-basic>button{
    position:absolute;
    right:10px;
    /* background:var(--theme); */
    /* color:#fff; */
    font-weight:600;
    font-family:var(--bold-font);
    padding:6px 16px 9px 13px;
    border-radius:20px;
}
.owner-info-basic>button:hover{
    cursor:pointer;
}
.owner-info-basic>div>p{
    margin:3px 0px;
    color:var(--color);
}
.ussum p{
   margin:10px 0px;
   margin-bottom:15px;
   color:var(--color);
}
.ffsect{
    display:flex;
    margin-bottom:13px;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width:480px){
  
}
</style>
