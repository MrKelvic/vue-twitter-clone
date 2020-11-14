<template>
  <div>
      <div class="ppl border-color">
          <div class="border-color" style="border-bottom:1px solid;padding:10px 15px;">
            <div v-for="(ch,i) in tweetCont.cnt[1].choice" :key="i" style="color:grey;">
                <div class="pollOpCnt">
                    <div class="cent" v-if="i==2&&i==(tweetCont.cnt[1].choice.length-1)">
                        <button @click="addOption(false,i)"><i class="fa fa-close"></i> </button>
                    </div>
                    <div class="inp ggback">
                        <label class="lab_">Choice {{i+1}} <span v-if="i>1">(optional)</span> </label>
                        <input @keypress="emitData()" maxlength="25" v-model="ch.value" class="in labh" type="text">
                    </div>
                    <div class="cent">
                        <button @click="addOption(true,i)" v-if="i==(tweetCont.cnt[1].choice.length-1)&&tweetCont.cnt[1].choice.length!=4"><i class="fa fa-plus"></i> </button>
                        <button @click="addOption(false,i)" v-if="i>1&&(i!=(tweetCont.cnt[1].choice.length==4||tweetCont.cnt[1].choice.length-1))"><i class="fa fa-close"></i> </button>
                    </div>
                </div>
                <p style="font-size:0.9em;text-align:right;margin-bottom:10px;">{{ch.value.length}}/25</p>
            </div>
          </div>
         <div class="pollen" style="padding:10px 15px;">
             <p>Poll length</p>
             <div class="timing">
                <div class="lenopt ggback" style="margin-right: 20px;">
                    <label for="">Days</label>
                    <select v-on:change="emitData()" v-model="tweetCont.cnt[1].time[0]" name="" id="">
                        <option v-for="i in 8" :key="i" :value="i-1">{{i-1}}</option>
                    </select>
                </div>
                <div class="lenopt ggback" style="margin-right: 20px;">
                    <label for="">Hours</label>
                    <select v-on:change="emitData()" v-model="tweetCont.cnt[1].time[1]" name="" id="">
                        <option v-for="i in 25" :key="i" :value="i-1">{{i-1}}</option>
                    </select>
                </div>
                <div class="lenopt ggback">
                    <label for="">Minutes</label>
                    <select v-on:change="emitData()" v-model="tweetCont.cnt[1].time[2]" name="" id="">
                        <option v-for="i in 61" :key="i" :value="i-1">{{i-1}}</option>
                    </select>
                </div>
             </div>
         </div>
         <button @click="$store.dispatch('setPostType','txt')" class="emrmp border-color">Remove poll</button>
      </div>
  </div>
</template>

<script>
import {tweetTemplate} from '@/localedata/dataCreaters.js';
export default {
  name: 'createpoll',
  props: {
    },
    components:{
       
    },
  data(){
    return{
        tweetCont:tweetTemplate(this.$store.state.user,'poll',null,{has:false,val:null},[]),//{ voted: { has: false, opt: 0 }, choice: [{ value: ``, v: 0 },{ value: ``, v: 0 }], time: [1, 0, 0] },//Store this in the second index of the emit handler
    }
  },
  computed:{
    
  },
  methods:{
      addOption(add,i){
          if(!add){
             this.tweetCont.cnt[1].choice=this.tweetCont.cnt[1].choice.filter((e,index)=>index!=i)
             this.emitData()
             return 0;
          }
          if(this.tweetCont.cnt[1].choice.length==4) return 0;
          this.tweetCont.cnt[1].choice.push({ value: ``, v: 0 })
          this.emitData()
      },
      emitData(){
        this.$emit('updatePoll',this.tweetCont)
      }
  },
  mounted(){
    //   console.log('createPoll:  ',this.$store.state.mods.tweetAndThread.params.cnt)
      if(this.$store.state.mods.tweetAndThread.params?.cnt){//[1]?.choice[0]?.value!=undefined
        if(this.$store.state.mods.tweetAndThread.params?.cnt[1]?.choice[0]?.value!=undefined)
          this.tweetCont.cnt=this.$store.state.mods.tweetAndThread.params.cnt
      }
  },
  watch:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ppl{
    border:1px solid;
    border-radius:10px;
    overflow: hidden;
    margin-top:5px;
    position: relative;
    /* padding-bottom:10px; */
    font-size:0.95em;
}
.ggback{
    margin-bottom:5px;
    background:var(--altback);
    border-radius:4px;
}
.pollOpCnt{
    display:flex;
    font-size:0.99em;
    position: relative;
}
.inp{
    padding:5px;
    width:88%;
    /* background:red; */
    margin-right:5px;
}
.inp label{
    display:block;
    margin-bottom:2px;
}
.inp input{
    height:28px;
    background:none;
    border:none;
    border-bottom:2px solid grey;
    width:100%;
    color:var(--color);
    font-size:1em;
}
.in:focus .lab_{
    color:var(--theme) !important;
}
.labh:focus{
    border-color:var(--theme);
    outline:none;
}
.pollOpCnt button{
    width:37px;
    height:37px;
    border-radius:30px;
    font-size:15px;
    color:var(--theme);
    background:none;
    margin:0px 12px;
    /* background:#1da1f245; */
    /* background:red; */
}
.pollOpCnt button:hover{
    cursor: pointer;
    background:#1da1f245;
}
.cent{
    display:grid;
    place-items:center;
    width:12%;
}
.pollen{

}
.timing{
    display:flex;
    margin-top:6px;
}
.lenopt{
    width:33.33%;
}
.lenopt label{
    display:block;
    padding:5px;
}
.lenopt select{
    width:100%;
    background:none;
    border:none;
    border-bottom:2px solid grey;
    height:28px;
    font-size:1.1em;
    color:var(--color);
}
.lenopt select:focus{
    border-color:var(--theme);
    outline:none;
}
.lenopt option{
    background: var(--background);
    color:var(--color);
}
.emrmp{
    border-top:1px solid;
    background:none;
    width:100%;
    color:#e24962;
    padding:20px 0px;
    font-size:1em;
}
.emrmp:hover{
    background:#e2496230;
    cursor: pointer;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width: 480px){

}
</style>
