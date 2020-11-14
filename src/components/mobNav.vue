<template>
  <div class="menu border-color">
    <ul>
        <li @click="scrll()">
            <router-link to="/">
                <div class="a_div">
                    <span v-if="$store.state.mods.moreTweet" class="dot"></span>
                    <i class="fa fa-home"></i>
                </div>
            </router-link>
        </li>
        <li>
            <router-link to="/">
                <div class="a_div">
                    <i class="fa fa-search"></i>
                </div>
            </router-link>
        </li>
        <li>
            <router-link to="/">
                <div class="a_div">
                    <i class="fa fa-bell"></i>
                </div>
            </router-link>
        </li>
        <li>
            <router-link to="/">
                <div class="a_div">
                    <i class="fa fa-envelope"></i>
                </div>
            </router-link>
        </li>
    </ul>
    <button @click="$store.dispatch('toggletweetAndThread',{bool:true,params:tweet,action:'T'})" class="twt"><i class="fa fa-paper-plane-o"></i></button>
  </div>
</template>

<script>

import {tweetTemplate} from '@/localedata/dataCreaters.js'
export default {
  name: 'pcNav',
  components:{
      
  },
  props: {
    
  },
  data(){
    return{
        tweet:tweetTemplate(this.$store.state.user,'txt',null,{has:false,val:null},[]),
    }
  },
  methods:{
      scrll(){
        window.scrollTo(0,0);
        this.$store.dispatch('setMoreTweets',false)
      },
  },
  mounted(){
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dot{
    width:10px;
    height:10px;
    border-radius:40px;
    background:var(--theme);
    position: absolute;
    top: 5%;
    right: -15%;
}
.menu{
    font-family: var(--bold-font);
    width: 100%;
    font-size: 17px;
    /* padding:5px; */
    position: fixed;
    bottom: 0px;
    border-top:1px solid;
    background: var(--background);
    color: var(--color);
    z-index:1;
    left:0px;
}
.menu ul{
    display:flex;
    /* background:red; */
    padding:13px 0px;
    font-size:1.3em;
    justify-content:space-around;
}
.menu li{
    
}
.a_div{
    position: relative;
}
.menu a{
    display:block;
}
.twt{
    background:var(--theme);
    color:#fff;
    position:fixed;
    bottom:10%;
    right:2%;
    font-size:1.1em;
    border-radius:50px;
    width:50px;
    height:50px;
    padding:0px 3px 0px 0px;
}
@media only screen and (max-width:760px){

}
@media only screen and (max-width: 480px){

}
</style>
