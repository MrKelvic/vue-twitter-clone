<template>
  <div>
      <div class="cont">
        <div class="ignore img-hold">
          <div v-if="imageURL.length==1" class="ignore one">
            <span class="imageTab">
              <button @click="emmit(0)" class="clbtn"><i class="fa fa-close"></i> </button>
              <div @click="$store.dispatch('setViewImage',{event:'image',content:[imageURL[0].data],show:true,index:0})" class="ignore rad shadow" :style="`background:url(${imageURL[0].data});background-size:cover;background-position: center;`"></div>
              <p class="imgType">{{imageURL[0].type}}</p>
            </span>
          </div>
          <div v-if="imageURL.length==2" class="ignore two">
            <span class="imageTab" v-for="i in [0,1]" :key="i">
              <button @click="emmit(i)" class="clbtn"><i class="fa fa-close"></i> </button>
              <div @click="$store.dispatch('setViewImage',{event:'image',content:[imageURL[i].data],show:true,index:0})" class="ignore rad shadow" :style="`background:url(${imageURL[i].data});background-size:cover;background-position: center;`"></div>
              <p class="imgType">{{imageURL[i].type}}</p>
            </span>
          </div>
          <div v-if="imageURL.length==3" class="ignore three">
            <div class="ignore ">
              <span class="imageTab" v-for="i in [0]" :key="i">
                <button @click="emmit(i)" class="clbtn"><i class="fa fa-close"></i> </button>
                <div @click="$store.dispatch('setViewImage',{event:'image',content:[imageURL[i].data],show:true,index:0})" class="ignore rad shadow" :style="`background:url(${imageURL[i].data});background-size:cover;background-position: center;`"></div>
                <p class="imgType">{{imageURL[i].type}}</p>
              </span>
            </div>
            <div class="ignore ">
              <span class="imageTab" v-for="i in [1,2]" :key="i">
                <button @click="emmit(i)" class="clbtn"><i class="fa fa-close"></i> </button>
                <div @click="$store.dispatch('setViewImage',{event:'image',content:[imageURL[i].data],show:true,index:0})" class="ignore rad shadow" :style="`background:url(${imageURL[i].data});background-size:cover;`"></div>
                <p class="imgType">{{imageURL[i].type}}</p>
              </span>
            </div>
          </div>
          <div v-if="imageURL.length==4" class="ignore four">
            <div class="ignore ">
              <span class="imageTab" v-for="i in [0,1]" :key="i">
                <button @click="emmit(i)" class="clbtn"><i class="fa fa-close"></i> </button>
                <div @click="$store.dispatch('setViewImage',{event:'image',content:[imageURL[i].data],show:true,index:0})" class="ignore rad shadow" :style="`background:url(${imageURL[i].data});background-size:cover;background-position:center;`"></div>
                <p class="imgType">{{imageURL[i].type}}</p>
              </span>
            </div>
            <div class="ignore ">
              <span class="imageTab" v-for="i in [2,3]" :key="i">
                <button @click="emmit(i)" class="clbtn"><i class="fa fa-close"></i> </button>
                <div @click="$store.dispatch('setViewImage',{event:'image',content:[imageURL[i].data],show:true,index:0})" class="ignore rad shadow" :style="`background:url(${imageURL[i].data});background-size:cover;background-position:center;`"></div>
                <p class="imgType">{{imageURL[i].type}}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
name: 'tweetImg',
props: {
imageURL:Array
},
components:{
    
},
data(){
return{
}
},
methods:{
  emmit(index){
    this.$emit('remove',index)
  }
},
mounted(){
  // console.log('got ',this.imageURL)
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .cont{

} */
.imageTab{
  display:block;
  position:relative;
  width: 100%;
  height: 100%;
}
.imageTab button{
    position: absolute;
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    /* font-size: 0.9em; */
    border-radius: 30px;
    background:#000000ba;
    color: #fff;
}
.imageTab button:hover{
  cursor:pointer;
  background:#90909052;
}
.imgType{
  position:absolute;
  bottom:2%;
  left:2%;
  font-size:0.8em;
  background:#fbfbfbad;
  padding:4px 9px;
  border-radius:20px;
}
.clbtn{
  left: 2%;
  top: 2%;
}
.rad{
  border-radius:15px;
  width:100%;
  height:100%;
  transition:0.2s linear;
}
.rad:hover{
  cursor:pointer;
}
.cap{
  margin-bottom:10px;
}
.img-hold{
  /* border-radius:15px; */
  /* height:fit-content; */
  overflow: hidden;
}
.img-hold>div{
  /* height:100%; */
  height:290px;
  /* min-height:200px; */
}
.one{
  width:100%;
}
.one>div{
  width:100%;
  height:100%;
}
.two{
  display:grid;
  grid-template-columns:50% 48%;
  grid-gap:8px;
}
.two>div{
  width:100%;
  height:100%;
  /* background:red; */
}
.four, .three{
  grid-gap:8px;
  display:grid;
  grid-template-columns:50% 48%;
}
.four>div{
  grid-gap:8px;
  display:grid;
  grid-template-rows:50% 48%;
}
.three>div{
  display:grid;
}
.three>div:nth-child(2){
  grid-gap:8px;
  grid-template-rows:50% 47%;
}
.three>div:nth-child(1){
  grid-template-rows:100%;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width: 480px){

}
</style>
