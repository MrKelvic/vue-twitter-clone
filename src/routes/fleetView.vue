<template>
  <div class="fleet-div">
    <div v-if="fleetData&&owner" :style="`background:${fleetData.cont[modalProp.index].backgroundGradient||'grey'};`" class="fleet-container fadein">
      <div class="fleet-padding">
        <span v-if="modalProp.isPaused" class="paused-sh">PAUSED</span>
        <div class="fixed-bar-who-and-len">
          <div v-if="modalProp.viewBar" class="fleet-len">
            <span v-for="(x,i) in fleetData.cont.length" :key="i" :data="i" :style="`width:${modalProp.spanLenght}%;`" :class="(()=>{if(i==modalProp.index){return 'viewing'}else if(i<modalProp.index){return 'viewed'};})()" >
              <span></span>
            </span>
          </div>
          <div v-else class="fleet-len"></div> 
          <div class="owner-tab">
            <div class="owner">
              <img :src="imagefix(owner.img[0])" alt="">
              <div>
                <h3>{{owner.name}}</h3>
                <p>@{{owner.at}} <span style="display:inline-block;margin:0px 5px;width:2px;height:2px;border-radius:20px;background:#fff;"></span> {{time(fleetData.cont[modalProp.index].time,'ago')}} </p>
              </div>
            </div>
          </div>
        </div>
        <div @touchstart="controlThisFleetFlow(`PAUSE`,$event)" @touchend="controlThisFleetFlow(`PLAY`,$event)" @mouseup="controlThisFleetFlow(`PLAY`)" @mousedown="controlThisFleetFlow(`PAUSE`)" style="z-index:2;" class="fleet-content">
          <component v-for="(content,i) in fleetData.cont[modalProp.index].content" :key="i" :is="content.type" :payload="content"></component>
        </div>
      </div>
      <div v-if="modalProp.viewBar" class="skipthiscontent">
        <button @click="nextInLine(-1,true)" class="left-skip-cont-btn"><i class="fa fa-chevron-left"></i></button>
        <button @click="nextInLine(1,true)" class="right-skip-cont-btn"><i class="fa fa-chevron-right"></i></button>
      </div>
       <div class="buttom-nav fadein">
          <div class="control-action fadein shadow" style="place-content:space-around;">
            <router-link class="sm-hide" v-if="$store.state.fleets[(fleet_index-1)]" :to="{name:'fleetView',params:{fleet:$store.state.fleets[fleet_index-1],FLEET_INDEX:(fleet_index-1),owner:$store.state.fleets[fleet_index-1].owner}}"><i style="margin-right:4px;" class="fa fa-chevron-left"></i> {{trimString($store.state.fleets[(fleet_index-1)].owner)}}'s fleet</router-link>
            <router-link class="sm-hide" v-else :to="{name:'createFleet'}">Create Fleet ;)</router-link>
            <div class="sm-show"></div>
            <button class="exit-btn"><i class="fa fa-close" @click="$router.push({name:'root'})"></i></button>
            <div class="sm-show"></div>
            <router-link class="sm-hide" v-if="$store.state.fleets[(fleet_index+1)]" :to="{name:'fleetView',params:{fleet:$store.state.fleets[fleet_index+1],FLEET_INDEX:(fleet_index+1),owner:$store.state.fleets[fleet_index+1].owner}}">{{trimString($store.state.fleets[(fleet_index+1)].owner)}}'s fleet<i style="margin-left:4px;" class="fa fa-chevron-right"></i> </router-link>
            <div class="no-next-rt sm-hide" v-else></div>
          </div>
      </div>
    </div>
    <div class="nxt-fleet-wait-div fadein" v-else></div>
  </div>
</template>


<script>
import {searchUser,time,imagefix,getFleet} from '@/dataParser/deepSearch.js';
const txt=()=>import('@/components/fleetTxt.vue')
const imge=()=>import('@/components/fleetImg.vue')
const twt=()=>import('@/components/fleetTweet.vue')
export default {
  name: 'fleetView',
  components:{
    txt,
    imge,
    twt
  },
  props: {
    FLEET_INDEX:Number
  },
  data(){
    return{ 
      fleetData:null,
      FLEET_PALY_TIME:5110,
      fleet_index:null,
      owner:null,
      modalProp:{
        touchStamps:[0,0],
        index:0,
        spanLenght:100,
        interval:null,
        lastPlayedTimeStamp:null,
        pausedTime:null,
        isPaused:false,
        viewBar:true,
      }
    }
  },
  methods: {
    trimString(e){
      if(window?.innerWidth>450) return e;
        let l=e.length;
        if(l<=8) return e;
        e=e.split("");
        e.length=6;
        return e.join('')+'..';
    },
    time(date,string){
      return time(date,string);
    },
    imagefix(img){
      return imagefix(img)
    },
    setUser(id){
        this.owner= searchUser(id,this.$store.state.users).user;
    },
    switchFleet(time,reset){
      // console.log('time: ',time)
      if(!reset) this.modalProp.lastPlayedTimeStamp=new Date();
      this.modalProp.interval=setInterval(() => {
        if(this.modalProp.index<this.fleetData.cont.length){
          this.nextInLine(1);
          this.modalProp.lastPlayedTimeStamp=new Date();
        }
        if(reset){
          clearInterval(this.modalProp.interval);
          this.switchFleet(this.FLEET_PALY_TIME)
        }
      },time);
    },
    nextInLine(mv,skip){
      let test=(((this.modalProp.index+mv)<(this.fleetData.cont.length))&&((this.modalProp.index+mv)>-1))?(this.modalProp.index+mv):{act:"ROUTE_TO_NEXT_FLEET",direction:((this.modalProp.index+mv)<0)?"BACK":"FORWARD"};
      // console.log(test)
      if(test?.act==="ROUTE_TO_NEXT_FLEET"){
        if(this.$store.state.fleets[this.fleet_index-1]&&test.direction=="BACK"){
          this.$router.push({name:'fleetView',params:{fleet:this.$store.state.fleets[this.fleet_index-1],FLEET_INDEX:(this.fleet_index-1),owner:this.$store.state.fleets[this.fleet_index-1].owner}});
        }else if(this.$store.state.fleets[this.fleet_index+1]&&test.direction=="FORWARD"){
          this.$router.push({name:'fleetView',params:{fleet:this.$store.state.fleets[this.fleet_index+1],FLEET_INDEX:(this.fleet_index+1),owner:this.$store.state.fleets[this.fleet_index+1].owner}});
        }else{
          this.$router.push({name:'root'})
        }
      }
      this.modalProp.index=test;
      if(skip){
        this.modalProp.viewBar=true;
        clearInterval(this.modalProp.interval);
        this.switchFleet(this.FLEET_PALY_TIME)
         setTimeout(()=>{
            this.modalProp.viewBar=true
        },100)
      }
    },
    controlThisFleetFlow(action,event){
      // console.log(action)
      let el=document.querySelector('.viewing>span');
      if(action==="PLAY"){
        this.checkIfDragedForNextFleet('END',event)
        //playfleet
        if(!this.modalProp.isPaused) return 0;
        this.modalProp.isPaused=false
        //time to play - how long it played beforePause
        let timeLeftToplay=this.FLEET_PALY_TIME-Math.abs(Math.ceil(this.modalProp.lastPlayedTimeStamp-this.modalProp.pausedTime));
        this.switchFleet(timeLeftToplay,true)
        el.style.animationPlayState="running";
      }else if(action==="PAUSE"){
        this.checkIfDragedForNextFleet('START',event)
        //pausefleet
        if(this.modalProp.isPaused) return 0;
        this.modalProp.isPaused=true;
        clearInterval(this.modalProp.interval);
        this.modalProp.pausedTime=new Date();
        el.style.animationPlayState="paused";
      }
    },
    checkIfDragedForNextFleet(action,event){
      if(action=="START"){
        this.modalProp.touchStamps[0]=event?.touches[0]?.pageX||0;
        return 0;
      }else if(action=="END"){
        this.modalProp.touchStamps[1]=event?.changedTouches[0]?.pageX||0;
        //end-start if
        let d=Math.floor(this.modalProp.touchStamps[1]-this.modalProp.touchStamps[0]);
        this.modalProp.touchStamps=[0,0];
        if(Math.abs(d)<60) return 0;
        if(d<0){
          //go Left
          if(!this.$store.state.fleets[this.fleet_index+1]) return 0;
          this.$router.push({name:'fleetView',params:{fleet:this.$store.state.fleets[this.fleet_index+1],FLEET_INDEX:(this.fleet_index+1),owner:this.$store.state.fleets[this.fleet_index+1].owner}})
        }else{
          //go Right
          if(!this.$store.state.fleets[this.fleet_index-1]){
            this.$router.push({name:'createFleet'});
          }else{
            this.$router.push({name:'fleetView',params:{fleet:this.$store.state.fleets[this.fleet_index-1],FLEET_INDEX:(this.fleet_index-1),owner:this.$store.state.fleets[this.fleet_index-1].owner}})
          }
        }
      }
    },
    remount(isChangedRoute){
      // console.log('isChanged ',isChangedRoute)
      if(isChangedRoute){
        this.reset();
        this.modalProp.viewBar=false;
      }
      let t=isChangedRoute?100:0
      setTimeout(()=>{
          this.modalProp.viewBar=true
        this.fleetData=this.$route.params;
        this.modalProp.index=0;
        if(!this.fleetData.cont){
          let t =getFleet(this.fleetData.owner,this.$store.state.fleets);
          if(!t){
            this.$router.push({name:'root'});
            return 0;
          }else{
            this.fleetData=t.data;
            this.fleet_index=t.index;
          }
        }
        this.setUser(this.fleetData.owner);
        this.fleet_index=this.fleet_index??this.FLEET_INDEX;
        this.modalProp.spanLenght=((1/this.fleetData.cont.length)*100)
        this.switchFleet(this.FLEET_PALY_TIME,isChangedRoute)
      },t)
    },
    reset(){
        this.fleetData=null;
        this.fleet_index=null;
        this.modalProp.index=0;
        this.modalProp.spanLenght=100;
        clearInterval(this.modalProp.interval);
        this.modalProp.interval=null;
        this.modalProp.lastPlayedTimeStamp=null;
        this.modalProp.pausedTime=null;
        this.modalProp.isPaused=false;
    }
  },
  destroyed(){
    clearInterval(this.modalProp.interval)
  },
  mounted() {
    // console.log(this.$route.params)
    // return 0;
    this.remount();
    // console.log(this.fleetData)
  },
  watch:{
    '$route.params.owner':function(){
      this.remount(true);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.viewed>span{
  background:#fff !important;
  width:100% !important;
}
.viewing{

}
.viewing>span{
  background:#fff !important;
  animation:viewingFleet 5s linear backwards;
}
.fleet-div{
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100vh;
    z-index: 10;
    background:#fff;
}
.nxt-fleet-wait-div{
  background:var(--background);
}
.fleet-container{
  width:100%;
  height:100%;
  transition:0.2s ease-in-out;
}
.fleet-padding{
  padding:15px;
  height:95%;
  /* width:100%; */
  /* height:100%; */
  position:relative;
  /* background:red; */
}
.fixed-bar-who-and-len{
    /* position: absolute; */
    width: 100%;
    z-index:7;
}
.fleet-len{
  width: 100%;
  height:2px;
  display: flex;
  margin-bottom:13px;
}
.fleet-len>span{
  height:100%;
  margin: 0px 3px;
  border-radius:5px;
  background:#ffffff5e;
}
.fleet-len>span>span{
  width:100%;
  height:100%;
  background:none;
  display:block;
}
.owner-tab{

}
.owner{
  display: flex;
  color:#fff;
  place-items: center;
}
.owner img{
  width:40px;
  height:40px;
  border-radius:30px;
  margin-left:7px;
}
.owner>div{
    margin-left:7px;
}
.owner>div h3{
    font-size: 0.93em;
    margin-bottom:4px;
}
.owner>div p{
  display: flex;
  place-items: center;
  font-size: 0.84em;
}
.fleet-content{
    position: relative;
    width: 100%;
    height: 100%;
    /* background:#0000006b; */
    display: flex;
    place-content: center;
    place-items: center;
    top: -45px;
}
.paused-sh{
  font-size: 0.72em;
  padding: 1px 2px;
  background:#00000094;
  color:#fff;
  border-radius: 1px;
  position: fixed;
  top: 20%;
}
.cap{
  position:absolute;
  z-index:1;
}
.buttom-nav{
    position:fixed;
    bottom:5%;
    width:100%;
    height:35px;
    z-index:5;
    display:flex;
    place-items:center;
    place-content:center;
}
.control-action{
    width:385px;
    height:100%;
    border-radius:20px;
    padding:5px 10px;
    padding-bottom: 7px;
    /* background:#00000061; */
    display:grid;
    grid-template-columns:37% 15% 37%;
    z-index:7;
    place-items: center;
    background:none !important;
}
.control-action>div{
    display:flex;
    margin:1px;
    place-items:center;
    place-content:center;
}

.control-action>div,.control-action button,.control-action a{
    width:100%;
    height:34px;
    border-radius:40px;
    padding:2px;
    color:var(--theme);
    font-size:0.9em;
    display:flex;
    margin:1px;
    place-items:center;
    place-content:center;
}
.control-action button{
  height:36px;
}
.control-action a{
  margin:0px;
  background:#fff;
  font-size: 0.75em;
}
.no-next-rt{
  background:#ffffff3d;
}
.exit-btn{
  border:2px solid #fff;
  width:40px !important;
  height:40px !important;
}
.skipthiscontent{
  position:absolute;
  width:100%;
  display: flex;
  place-content: space-between;
  /* background:red; */
  top:50%;
}
.skipthiscontent button{
  border-radius: 50px;
  background:#fff;
  color:var(--theme);
  z-index:3;
}
.left-skip-cont-btn{
  margin-left:25px;
  padding:5px 8px 5px 7px;
}
.right-skip-cont-btn{
  margin-right:25px;
  padding:5px 7px 5px 8px;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width:560px){
.skipthiscontent{
    top:7%
  }
  .skipthiscontent button{
    margin:0px;
    height:85vh;
    border-radius:2px;
    color:#00000061;
    background:#00000000;
    outline:none !important;
  }
  .right-skip-cont-btn{
    padding: 5px 15px 5px 14px;
  }
  .left-skip-cont-btn{
    padding: 5px 14px 5px 15px;
  }
}
@media only screen and (max-width:480px){
  .buttom-nav{
    bottom:1%;
    height:41px;
  }
  .control-action>div,.control-action button,.control-action a{
    height:39px;
  }
  .control-action{
      width:100%;
      border-radius:0px;
      padding:5px 0px;
      grid-template-columns:38% 13% 38%;
      box-shadow:none;
  }
  .control-action a,.control-action .no-next-rt{
    border-radius: 7px;
  }
}
@keyframes viewingFleet{
  from{
    width:0%;
  }
  to{
    width:100%;
  }
}
</style>
