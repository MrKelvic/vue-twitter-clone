<template>
    <div :style="payload.styles" class="container-fix">
        <img class="ignore " :src="imagefix(payload.data)" alt="">
    </div>
</template>

<script>
import {imagefix} from '@/dataParser/deepSearch.js'
export default {
name: 'tweetImg',
props: {
    payload:Object
},
components:{
    
},
data(){
return{
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
.container-fix{
    position:relative;
}
.container-fix img{
    width:100%;
    height:100%;
    border-radius:4px;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width: 480px){
div{
    left:unset !important;
}
}
</style>
