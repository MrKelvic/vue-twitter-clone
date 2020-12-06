<template>
    <div :style="payload.styles" class="container-fix">
        <p>{{payload.data}}</p>
        <!-- `left:${payload.cordinates[0]}px;top:${payload.cordinates[1]}px;` -->
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
    position:absolute;
    padding: 2px 5px;
    z-index:2;
    border-radius: 2px;
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width: 480px){

}
</style>
