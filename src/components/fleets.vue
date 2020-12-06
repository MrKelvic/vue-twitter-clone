<template>
  <div class="main-fleet-container">
      <router-link v-if="this.$store.state.user" :to="{name:'createFleet'}">
          <div style="position:relative;">
            <div style="position:absolute;right:5%;bottom:24%;font-size:0.6em;color:#fff;background:var(--theme);display:flex;border-radius:50px;padding:2px 3px 2px 3px;">
                <i class="fa fa-plus"></i>
            </div>
            <div class="img-container" style="border-color:var(--background) !important;">
                <img :src="imagefix(this.$store.state.user.img[0])" alt="">
            </div>
            <span>Add</span>
        </div>
      </router-link>
      <router-link v-for="(fleet,i) in this.$store.state.fleets" :key="i" :to="{name:'fleetView',params:{fleet:fleet,FLEET_INDEX:i,owner:fleet.owner}}" class="us-fleet">
        <div>
            <div class="img-container">
                <img :src="imagefix(setUser(fleet.owner).img[0])" alt="">
            </div>
            <span>{{trimString(setUser(fleet.owner).name)}}</span>
        </div>
      </router-link>
  </div>
</template>

<script>
import {searchUser,imagefix} from '@/dataParser/deepSearch.js'
export default {
    name: 'fleets',
    data(){
        return{
//            fl: {name:'fleetView',params:{fleet:{
//     owner:'mrkelvic',//at
//     cont:[
//         {
//             type:'txt',//['txt','img',link]
//             cap:{
//                 cnt:'caption',
//                 cordinates:[12,43]//[x%,y%]
//             },
//             content:{
//                 cordinates:[31,12],//
//                 data:'Hey my first fleet',
//             },
//             backgroundGradient:'linear-gradient(20deg, #060606e3, #bb2d2df2,#00BCD5)'
//         }
//     ],
//     time:new Date(),
//     viewed:true
// },owner:'mrkelvic'}}
        }
    },
    methods:{
        imagefix(par){
            // console.log(imagefix(par))
            return imagefix(par);
        },
        trimString(e){
            let l=e.length;
            if(l<=8) return e;
            e=e.split("");
            e.length=6;
            return e.join('')+'..';
        },
        setUser(id){
            //for some reason that I'm not in the mood to check is might be an Object
            if(id?.user) return id.user;
            return searchUser(id,this.$store.state.users).user;
        }
    }
}
</script>

<style scoped>
.main-fleet-container{
    display: inline-flex;
}
.main-fleet-container>a{
    display:inline-flex;
    margin:0px 5px;
}
.main-fleet-container>a>div{
}
.img-container{
     height:44px;
    width:44px;
    overflow:hidden;
    border-radius:50px;
    border:2px solid var(--theme);
    padding:2px;
    background:var(--background);
}
.main-fleet-container img{
    height:100%;
    width:100%;
}
.main-fleet-container>a span{
    font-size: 0.76em;
    width: 100%;
    text-align: center;
    display: block;
}
@media only screen and (max-width: 480px){
  .img-container{
        height:39px;
        width:39px;
    }  
}
</style>