<template>
  <div class="cnt">
     <div class="bdy shadow">
         <div class="top-bar">
             <button @click="$store.dispatch('setEditUser',{action:'show',data:false})"><i class="fa fa-close"></i></button>
             <p>{{$store.state.mods.userEditEvent.text}}</p>
             <button @click="dosave" class="Topaddtweet">save</button>
         </div>
         <div class="bdyj">
             <div class="imgBio">
                 <div class="bioPrev">
                     <div :style="`background:url(${imagefix(user.img[1])});background-size:cover !important;`">
                         <!-- <img style="width:200px;" :src="imagefix(user.img[1])" alt=""> -->
                         <div>
                            <input id="imgBack" @input="handleImageBack(false,$event,1)" type="file">
                            <button @click="handleImageBack(true,null,1)"><i class="fa fa-camera"></i></button>
                            <button @click="user.img[1]='';bruteUpdateImgBug(user.name)" ><i class="fa fa-close"></i></button>
                         </div>
                     </div>
                 </div>
                 <div class="userPrev">
                     <div :style="`background:url(${imagefix(user.img[0])});background-size:cover !important;`">
                         <div>
                            <input id="imgMain" @input="handleImageBack(false,$event,0)" type="file">
                            <button @click="handleImageBack(true,null,0)"><i class="fa fa-camera"></i></button>
                         </div>
                     </div>
                 </div>
             </div>
             <div class="inp">
                 <div class="zz">
                    <div class="ggback">
                        <label class="lab_">Name</label>
                        <input maxlength="25" v-model="user.name" class="in labh" type="text">
                    </div>
                    <p style="font-size:0.9em;text-align:right;margin-bottom:10px;">{{user.name.length}}/25</p>
                 </div>
                <div class="zz">
                    <div class="ggback">
                        <label class="lab_">at</label>
                        <input maxlength="20" v-model="user.at" class="in labh" type="text">
                    </div>
                    <p style="font-size:0.9em;text-align:right;margin-bottom:10px;">{{user.at.length}}/20</p>
                </div>
                <div class="zz">
                    <div class="ggback">
                        <label class="lab_">Bio</label>
                        <input maxlength="100" v-model="user.bio" class="in labh" type="text">
                    </div>
                    <p style="font-size:0.9em;text-align:right;margin-bottom:10px;">{{user.bio.length}}/100</p>
                </div>
             </div>
         </div>
     </div>
  </div>
</template>

<script>
import {user} from '@/localedata/dataCreaters.js';
import {imagefix} from '@/dataParser/deepSearch.js';
export default {
  name: 'userEdit',
  props: {
    },
  data(){
    return{
        user:{
            name:'',
            at:'',
            bio:'',
            img:['','']
        }
    }
  },
  computed:{
 
  },
  methods:{
      bruteUpdateImgBug(name){
        this.user.name='edit...'//this.user.name
        this.user.name=name;
      },
      handleImageBack(bool,$event,index){
          if(!bool){
            let file=$event.srcElement.files[0];
            if(!(file instanceof Blob)) return 0;
            let fileReader=new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.addEventListener('load',()=>{
                let imgType=fileReader.result.substring(fileReader.result.indexOf('/')+1,fileReader.result.indexOf(';'))
                if(['jpeg','jpg','png','gif'].includes(imgType)){
                    this.user.img[index]=fileReader.result;
                    this.bruteUpdateImgBug(this.user.name)
                }
            });
        }
        if(bool){
            if(index==0) document.getElementById('imgMain').click();
            if(index==1) document.getElementById('imgBack').click();
        } 
      },
      handleGlobAction(){
          if(this.$store.state.mods.userEditEvent.event=='edit'){
              this.user=user(this.$store.state.user.name,this.$store.state.user.at,this.$store.state.user.bio,this.$store.state.user.img)
          }else if(this.$store.state.mods.userEditEvent.event=='add'){
              this.user=user('','','',['','']);
          }
      },
      imagefix(par){
          return imagefix(par)
      },
      dosave(){
          //{action:[show,add,edit],data:[],event:edit,add,payload,text}
          if(this.$store.state.mods.userEditEvent.event=='edit'){
              this.$store.dispatch('setEditUser',{action:'edit',data:this.user})
              this.$router.push({name:'user',params:{name:`${this.user.at}+edit`,user:this.user}})
            //   this.$router.push({name:'user',params:{name:this.user.at,user:this.user}})
          }else if(this.$store.state.mods.userEditEvent.event=='add'){
              this.$store.dispatch('setEditUser',{action:'add',data:this.user})
              this.$router.push({name:'user',params:{name:`${this.user.at}`,user:this.user}})
          }
          this.$store.dispatch('setEditUser',{action:'show',data:false})
      }
  },
  mounted(){
      this.handleGlobAction()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="file" i]{
    width:1px;
    opacity:0;
    visibility:hidden;
}
button:hover{
    cursor:pointer;
    background:#90909052 !important;
}
.imgBio{
    /* width:100%; */
    position: relative;
    margin-bottom:60px;
    /* background:red; */
}
.bioPrev{
    height:100%;
    /* padding:15px 35px; */
    background:var(--altback);
    height:175px;
    background:var(--hove);
}
.bioPrev>div{
    display:grid;
    place-items:center;
    /* background:red; */
    background-size:cover !important;
    background-repeat: no-repeat !important;
    background-origin: border-box !important;
    background-position: center !important;
    width:100%;
    height:100%;
}
.bioPrev button{
    margin:0px 10px;
    font-size:1em;
    width:40px;
    height:40px;
    border-radius:30px;
    background:#82828291;
    color:#fff;
}
.userPrev{
    background:var(--altback);
    width:112px;
    height:112px;
    border-radius:50%;
    border:4px solid var(--background);
    position:absolute;
    bottom: -35%;
    left: 4%;
    overflow:hidden;
}
.userPrev>div{
    background-size:cover !important;
    display:grid;
    place-items:center;
    width:100%;
    height:100%;

}
.userPrev button{
    font-size:1em;
    color:#fff;
    width:40px;
    height:40px;
    border-radius:30px;
    background:#82828291;
}
.cnt{
    position:fixed;
    top:0px;
    left:0px;
    width:100%;
    height:100vh;
    background:#6E767D66;
    display:grid;
    place-items:start center;
    padding-top: 45px;
    /* place-items:center; */
    z-index:3;
    /* overflow: hidden; */
}
.bdy{
    background:var(--background);
    width:600px;
    max-height:550px;
    height:fit-content;
    border-radius:16px;
    overflow: hidden;
    color:grey;
}
.bdyj{
    overflow-y:auto;
    height:500px;
    /* width:600px; */
}
.top-bar{
    border-bottom:1px solid var(--bdc);
    padding:8px 5px;
    display:flex;
    position:relative;
    place-items: center;
    color:var(--color);
}
.top-bar button{
    width:37px;
    height:37px;
    border-radius:30px;
    font-size:19px;
    padding:5px;
    color:var(--theme);
    background:none;
    margin:0px 12px;
    /* background:red; */
}
.top-bar button:hover{
    cursor: pointer;
    background:#1da1f245;
}
.Topaddtweet{
        font-family:var(--bold-font);
        background:var(--theme) !important;
        color:var(--color) !important;
        border-radius:30px !important;
        width: fit-content !important;
        padding:5px 15px 9px 15px !important;
        height:fit-content !important;
        margin:0px !important;
        font-weight:600;
        font-size:15px !important;
        position:absolute;
        right:5%;
    }
.thread{
    max-height:489px;
    width:100%;
    overflow-y:auto;
    transition:all 0.2s linear;
}
.ext-thread{
    position: relative;
    /* background:yellow; */
    margin:5px 0px;
    padding-top:15px;
}
.ext-thread>button{
     width:28px;
    height:28px;
    border-radius:30px;
    font-size:13px;
    padding:3px;
    color:var(--theme);
    position:absolute;
    right:4px;
    top:0px;
    background:none;
    /* background:red; */
}
.ext-thread>button:hover{
    cursor: pointer;
    background:#1da1f245;
}
.fl-down{
    width: 2px;
    background: #2f3336;
    display: block;
    position: absolute;
    left: 38px;
    top: 90px;
}
button:disabled{
    opacity:0.6;
}
.inp{
    padding:15px 35px;
}
.inp label{
    display:block;
    margin-bottom:2px;
    font-size:0.99em;
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
.zz{
    margin-bottom:15px;
}
.ggback{
    background:var(--altback);
    border-radius:4px;
    padding:6px;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width:760px){
    .cnt{
        padding-top:0px;
    }
    .bdyj{
        height: 100%;
    }
    .bdy{
        width:100%;
        height:100%;
        border-radius:0px;
        max-height:unset;
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
.inp{
    padding: 15px 10px;
}
}
</style>
