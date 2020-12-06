<template>
  <div>
   <div class="_pc pc_acc">
       <div v-if="isDet" class="det shadow">
           <div>
                <img :src="imagefix(this.$store.state.user.img[0])" alt="">
                <div>
                     <p>{{this.$store.state.user.name}}</p>
                    <span>@{{this.$store.state.user.at}}</span>
                </div>
                <i class="fa fa-check"></i>
           </div>
           <ul>
               <li @click="$store.dispatch('setEditUser',{action:'show',data:!$store.state.mods.userEdit,event:'add',text:'Add user'});isDet=!isDet">
                   <p>Add an account</p>
               </li>
               <li class="inactive">
                   <router-link to="/">Log out @mrkelvic</router-link>
               </li>
           </ul>
       </div>
       <div @click="isDet=!isDet" class="toggle_det">
           <img :src="imagefix(this.$store.state.user.img[0])" alt="">
           <div class="sm-pc">
               <p>{{this.$store.state.user.name}}</p>
               <span>@{{this.$store.state.user.at}}</span>
           </div>
           <i class="fa fa-chevron-down sm-pc"></i>
       </div>
   </div>
  </div>
</template>

<script>
import {imagefix} from '@/dataParser/deepSearch.js'
export default {
  name: 'accountSetting',
  props: {
      
      },
  data(){
      return{
         isDet:false 
    }
  },
  methods:{
      imagefix(par){
          return imagefix(par)
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
    border-radius:50px;
}
.pc_acc{
    position: relative;
    margin-top:20px;
    bottom:-95px;
    /* bottom:-35px; */
    width: 100%;
    /* background:green; */
}
.det{
    position: fixed;
    bottom: 15%;
    /* left: 2%; */
    background:var(--background);
    /* background:red; */
    min-width:260px;
    padding:14px 0px 8px 0px;
    border-radius:10px;
}
.det>div{
    display:flex;
    font-size:0.9em;
    padding:7px 0px;
}
.det>div i{
    position:absolute;
    right:5%;
    top:20%;
    color:var(--theme);
}
.det li{
    margin:5px 0px;
    padding:8px 25px;
    border-top:1px solid grey;
}
.det li:hover{
    cursor:pointer;
}
.det img{
    width:45px;
    height:45px;
    margin:0px 10px;
}
.toggle_det{
    display:grid;
    grid-template-columns:23% 57% 20%;
    font-size:0.9em;
    padding:5px 10px;
    border-radius:50px;
    /* margin-left:100px; */
    /* background:red; */
}
.toggle_det:hover{
    background:#1da1f245;
    cursor: pointer;
}
.toggle_det img{
    width:35px;
    height:35px;
}
.toggle_det i{
    display:block;
    position: relative;
    right:-20px;
    top:20%;
}
span{
    color:var(--grey);
}
@media only screen and (max-width:1250px){
   .pc_acc{
        padding: 7px;
        padding-bottom: 5px;
        width:fit-content;
        left:-31%;
        bottom:unset;
   } 
   .toggle_det {
        display: block;
        width: fit-content;
        left: 15px;
        position: relative;
        padding: 5px 5px 2px 5px;
    }
}
@media only screen and (max-width: 480px){

}
</style>
