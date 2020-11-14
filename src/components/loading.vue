<template>
  <div class="bcnt">
      <div>
        <div class="ddot"></div>
        <!-- <p></p> -->
      </div>
  </div>
</template>

<script>
export default {
name: 'loading',
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

}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bcnt{
    width:100%;
    display:grid;
    place-items:start center;
}
.bcnt>div{
    position:relative;
}
p{
    position:absolute;
    top: -10%;
    left: 14%;
    transform: rotate(90deg);
    color:var(--color);
}
.ddot{
    width:5px;
    height:5px;
    border-radius:30px;
    background:var(--theme);
    box-shadow:0px 0px 4px 0px var(--theme),
                0px 0px 8px 3px var(--theme),
                0px 0px 12px 6px var(--theme),
                0px 0px 16px 9px var(--theme);
    transition:0.2s ease-in;
    animation:anim 0.7s ease-in-out backwards infinite;
}
@keyframes anim{
    
    0%{
         box-shadow:0px 0px 3px 1px var(--theme),
                0px 0px 6px 2px var(--theme),
                0px 0px 9px 3px var(--theme),
                0px 0px 18px 9px var(--theme);
    }
    100%{
        box-shadow:0px 0px 18px 9px var(--theme),
                0px 0px 9px 3px var(--theme),
                0px 0px 6px 2px var(--theme),
                0px 0px 3px 1px var(--theme);
    }
}
@media only screen and (max-width:1250px){

}
@media only screen and (max-width: 480px){

}
</style>
