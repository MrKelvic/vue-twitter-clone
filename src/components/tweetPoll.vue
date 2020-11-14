<template>
  <div>
      <div>
        <p class="cap">{{content[0]}}</p>
        <div class="pp">
          <div v-if="!content[1].voted.has" class="options">
            <button @click="vote(i)" v-for="(choice,i) in content[1].choice" :key="i" class="ignore optch">{{choice.value}}</button>
          </div>
          <div v-if="content[1].voted.has" class="voted">
            <!-- {{parseFloat(((choice.v/content[1].choice.reduce((a,e)=>a.v+e.v))*100).toFixed(2))}} -->
            <span v-for="(choice,i) in content[1].choice" :key="i">{{choice.value}} <i v-if="i==content[1].voted.opt" style="font-size: 1.1em;margin-left: 4px;" class="fa fa-check-circle-o"></i> <span class="vval">{{(parseFloat(choice.v/content[1].choice.reduce((a, b) => ({v: a.v + b.v})).v)*100).toFixed(2) }}%</span> <span :style="`width:${(parseFloat(choice.v/content[1].choice.reduce((a, b) => ({v: a.v + b.v})).v)*100).toFixed(2)}%;`" class="vt-fill"></span></span>
          </div>
          <div class="info">
            <span>{{content[1].choice.reduce((a, b) => ({v: a.v + b.v})).v}} votes</span>
            <span> . </span>
            <span>{{getTimeRem(content[1].time)}}</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'tweetPoll',
  props: {
      content:Array,
      tweetId:String,
    },
    components:{
       
    },
  data(){
    return{
    }
  },
  methods:{
    getTimeRem(arr){
      let str=``;
      for(let i=0;i<arr.length;++i){
        if(arr[i]===0) continue;
        if(i==0){
          if(arr[i]==1){
            str+=`1 day `;
            continue
          }
          str+=`${arr[i]} days `;
        }
        if(i==1){
          if(arr[i]==1){
            str+=`1 hour `;
            continue
          }
          str+=`${arr[i]} hours `;
        }
        if(i==2){
          if(arr[i]==1){
            str+=`1 min`;
            continue
          }
          str+=`${arr[i]} mins`;
        }
      }
      return str;
    },
    vote(index){
      this.$store.dispatch('votePoll',{action:true,tweet:{id:this.tweetId},index:index})//obj.action, obj.tweet, state.tweets, 'P',obj.index
      // console.log('index:',index,' has value of:',this.content[1].choice[index])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cap{
  margin-bottom:10px;
}
.pp{
  
}
.options{
  text-align: center;
  /* background:red; */
  font-size:14px;
  font-family:var(--bold-font);
  font-weight:600;
  /* display:grid;
  place-items:center; */
}
.options button{
  display: block;
  margin: 10px 0px;
  width: 97%;
  background:var(--background);
  color:var(--theme);
  border:1px solid var(--theme);
  padding:6px;
  border-radius: 25px;
}
.options button:hover{
  cursor: pointer;
}
.optch:hover{
  background:#1da1f220;
}
.voted{

}
.voted>span{
  display: block;
  margin: 8px 0px;
  border-radius:4px;
  color:var(--color) !important;
  /* background:red; */
  padding:7px;
  position: relative;
  overflow:hidden;
}
.vval{
  position:absolute;
  right:2%;
}
.vt-fill{
  display:block;
  opacity:0.5;
  background:#6d6d6d;
  position:absolute;
  width:30%;
  height:100%;
  top:0px;
  left:0px;
}
.info{
  color:rgb(110, 118, 125);
  font-size:12px;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width: 480px){

}
</style>
