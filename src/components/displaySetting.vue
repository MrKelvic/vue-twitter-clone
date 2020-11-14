<template>
  <div class="main">
    <div class="bdy shadow">
         <div class="top-bar">
            <h2 style="text-align:center;">Customize your view</h2>
         </div>
         <div class="bb">
            <p>Display settings affect all of your Twitter accounts on this browser. These settings are only visible to you.</p>
            <div style="position:relative;">
                <tweets class="border-color testtweet" :properties="{down:false,preview:true,interactions:false}" :tweet="tweet" :nest="false"/>
                <div class="fill"></div>
            </div>
            <div class="opt">
                <label for="">Color</label>
                <div class="opts color">
                    <button @click="handleDisplay([['--theme','#1da1f2'],['--themehove','#1da1f252']])" style="background:#1da1f2;"></button>
                    <button @click="handleDisplay([['--theme','#fcad31'],['--themehove','#fcad3152']])" style="background:#fcad31;"></button>
                    <button @click="handleDisplay([['--theme','#e2475f'],['--themehove','#e2475f52']])" style="background:#e2475f;"></button>
                    <button @click="handleDisplay([['--theme','#7a55c4'],['--themehove','#7a55c452']])" style="background:#7a55c4;"></button>
                    <button @click="handleDisplay([['--theme','#f45d26'],['--themehove','#f45d2652']])" style="background:#f45d26;"></button>
                    <button @click="handleDisplay([['--theme','#59c063'],['--themehove','#59c06352']])" style="background:#59c063;"></button>
                </div>
            </div>
            <div class="opt">
                <label for="">Background</label>
                <div class="opts bkgrnd">
                    <!-- '#f5f8fa' -->
                    <button @click="handleDisplay([['--background','#fff'],['--color','#000'],['--hove','#1db2d612'],['--bdc','#9494944a'],['--shadow','0px 0px 6px 2px #00000038'],['--altback','#f1faff']])" style="background:#fff;border:1px solid;">Default</button>
                    <button @click="handleDisplay([['--background','#14202b'],['--color','#fff'],['--hove','#0000000f'],['--bdc','#2f3336'],['--shadow','0px 0px 6px 2px #00000054'],['--altback','#182734']])" style="background:#14202b;color:#fff;border:1px solid;">Dim</button>
                    <button @click="handleDisplay([['--background','#000'],['--color','#fff'],['--hove','#0000000f'],['--bdc','#2f3336'],['--shadow','0px 0px 6px 2px #2121217d'],['--altback','#15171c']])" style="background:#000;color:#fff;border:1px solid;">Dark</button>
                </div>
            </div>
            <div style="display:grid;place-items:center;">
                <button @click="$store.dispatch('setDisplay',false)" class="ddbtn">Done</button>
            </div>
         </div>
    </div>
  </div>
</template>

<script>
import tweets from '@/components/tweets.vue';
import {tweetTemplate} from '@/localedata/dataCreaters.js';
export default {
  name: 'displaySettings',
  props: {
    },
    components:{
       tweets
    },
  data(){
    return{
       tweet:tweetTemplate({at:'TwitterDev'},'txt',null,{has:false,val:null},[])
    }
  },
  computed:{
    
  },
  methods:{
   handleDisplay(arr){
       for(let i=0;i<arr.length;i++){
           document.documentElement.style.setProperty(arr[i][0],arr[i][1])
       }
   }
  },
  mounted(){
      this.tweet.cnt[0]=`This is a twitter clone created for fun by mrkelvic, say Hi on Twitter the actual one lol :)`
  },
  watch:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
    position:fixed;
    width:100%;
    height:100vh;
    left:0%;
    display:grid;
    place-items:center;
    z-index:3;
    background:#6E767D66;
    color:var(--color);
}
.bdy{
    background:var(--background);
    width:600px;
    height:550px;
    /* height:fit-content; */
    border-radius:16px;
    overflow: hidden;
    background:var(--background);
    top:0%;
    position: relative;
}
.top-bar{
    font-family:var(--bold-font);
    width:98%;
    padding:13px 7px;
    /* background:yellow; */
    /* font-size:17px; */
    place-content: center;
    width:100%;
    position:sticky;
    top:0px;
    max-height:unset;
}
.bb p{
    font-size:0.9em;
    text-align:center;
    margin:20px 5px;
}
.bb{
    padding:0px 20px;
}
.testtweet{
    border:1px solid;
    border-radius:15px;
    margin:0px 20px;
}
.opt{
    margin:30px 10px;
}
.opt label{
    font-size:0.91em;
    margin-bottom:5px;
    display:block;
}
.opts{
    background:var(--background);
    padding:15px 10px;
    display:flex;
    place-content:center;
    border-radius:5px;
}
.color button{
    width:41px;
    height:41px;
    background:grey;
    border-radius:20px;
    margin:0px 20px;
}
.bkgrnd button{
    width:33%;
    height:60px;
    margin:0px 5px;
    border-radius:5px;
    font-weight:600;
}
.ddbtn{
    padding:10px 15px;
    border-radius:5px;
    background:var(--theme);
    color:#fff;
    font-weight:600;
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
}
@media only screen and (max-width: 480px){
.color button{
    margin: 0px 5px;
}
.opts{
    padding: 15px 0px;
}
.opt{
    margin: 30px 2px;
}
.testtweet{
    margin:0px;
}
}
</style>
