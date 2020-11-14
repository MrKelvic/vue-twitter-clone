<template>
  <div>
      <p class="main raw">{{content[0]}}</p>
  </div>
</template>

<script>
export default {
  name: 'tweetText',
  props: {
      content:Array
    },
    components:{
       
    },
  data(){
    return{
    }
  },
  methods:{

  },
  mounted(){
    // this.$el.children[0].innerHTML='<b>ji</b>oijio'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
    padding-right:25px;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width: 480px){

}
</style>
