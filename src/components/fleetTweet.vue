<template>
    <!-- <div class="par"> -->
        <router-link :to="{name:'tweet',params:{id:tweet.id,tweet:tweet}}" :style="payload.styles" v-if="tweet" class="container-fix shadow">
            <div style="position:relative;">
                <tweets class="border-color testtweet" :properties="{down:false,preview:true,interactions:true,isFleet:true}" :tweet="tweet" :nest="false"/>
                <div class="fill"></div>
                <!-- `left:${payload.cordinates[0]}px;top:${payload.cordinates[1]}px;max-width: 480px;` -->
            </div>
        </router-link>
        <!-- <div v-if="err" class="err">
            <p>Tweet unavailabe</p>
        </div> -->
    <!-- </div> -->
</template>

<script>
import {getTweet} from '@/dataParser/deepSearch.js';
import tweets from '@/components/tweets.vue';
export default {
name: 'tweetImg',
props: {
    payload:Object
},
components:{
    tweets
},
data(){
return{
    tweet:null,
    err:false
}
},
methods:{
    // payload.data
  getTweet(){
    //   console.log(this.payload.data)
      let tweet=getTweet(this.payload.data,this.$store.state.tweets,null)?.def;
    //   console.log('id:',this.payload.data,' value:',tweet);
      if(!tweet){
          this.err=true;
          return false;
      }
      return tweet;
  }
},
mounted(){
    this.tweet=this.getTweet()
},
watch:{
    'payload.data':function(){ 
        this.tweet=this.getTweet() 
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.par{
    /* max-width: 480px; */
}
.container-fix{
    background:var(--background);
    color:var(--color);
    position:relative;
    border-radius:4px;
    padding:9px;
    max-width: 480px;
}
.container-fix:hover{
    background:var(--altback);
}
a{
    /* width:100%;
    height:100%; */
    display:block;
}
.err{
    padding:10px;
    color:var(--color);
    background:var(--background);
    border-radius:4px;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width: 580px){
a,.par{
    left:unset !important;
    max-width:100% !important;
}

}
</style>
