<template>
  <div style="position:relative;width:100%;height: 35px;margin-top:30px;">
    <div class="_default">
        <button @click="toggleUi=!toggleUi"><i class="fa fa-bars"></i></button>
        <button @click="$router.push('/')" v-if="this.$route.name!=='root'"><i class="fa fa-search"></i></button>
        <button @click="$router.push('foryou')" v-if="this.$route.name!=='foryou'"><i class="fa fa-user"></i></button>
        <button @click="$store.dispatch('toggleGenModsEdit',!$store.state.genMods.edit)" v-if="this.$route.name=='foryou'&&this.$store.state.user.isIn"><i class="fa fa-sliders"></i></button>
        <button @click="$router.push('explore')" v-if="this.$route.name!=='explore'&&(this.$route.name!=='foryou')"><i class="fa fa-globe"></i></button>
    </div>
    <div v-if="toggleUi" class="options">
      <button v-if="$store.state.ui" @click="$store.dispatch('toggleUi',false)">default nav</button>
      <button v-if="!$store.state.ui" @click="$store.dispatch('toggleUi',true)">mobile nav</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigator',
  props: {
    
  },
  data(){
    return{
      toggleUi:false
      // msg:new Date()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
._default{
  display: grid;
  grid-template-columns:33.33% 33.33% 33.33%;
}
button{
  padding: 4px 9px;
  border: none;
  border: none;
  background: none;
}
button i{
  font-weight:400;
}
.options{
  position: absolute;
    width: 100px;
    background: #fff;
    top: -36px;
    left:10px;
    box-shadow: 0px 0px 2px 0px #0000006b;
    border-radius: 2px;
}
.options button{
  width:100%;
  height:100%;
  padding: 10px;
     z-index:9;
}
@media only screen and (max-width: 480px){
  button i{
    font-size:1.6em;
  }
}
</style>
