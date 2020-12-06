<template>
  <div>
    <div v-if="(this.$store.state.mods.tweetAndThread.action=='C')&&top" class="mainTwt-cnt" style="border:none;">
        <tweets v-for="tweet in [this.$store.state.mods.tweetAndThread.params]" :key="tweet.id" :properties="{down:false,preview:true,interactions:false,bruteDown:true}" :tweet="tweet" :nest="false"/>
        <div class="fill"></div>
    </div>
    <div v-if="tweet" class="mm">
        <img :src="imagefix(this.$store.state.user.img[0])" alt="">
        <div>
            <textarea @keypress="brutee()" v-if="!compo.is" v-model="tweet.cnt[0]" :rows="(tweet.cnt[0].length/38)+1" :placeholder="compo.catchPhrase"></textarea>
            <textarea @keypress="brutee()" v-if="compo.is" v-model="tweet.cnt[0]" :rows="(tweet.cnt[0].length/49)+compo.d" :placeholder="compo.catchPhrase"></textarea>
        <div v-if="(this.$store.state.mods.tweetAndThread.action=='R')&&top" class="retweetingOrCommenting mainTwt-cnt">
            <tweets v-for="tweet in [this.$store.state.mods.tweetAndThread.params]" :key="tweet.id" :properties="{down:false,preview:true,interactions:false}" :tweet="tweet" :nest="false"/>
            <div class="fill"></div>
        </div>
        <div v-if="this.$store.state.mods.tweetAndThread.postType=='poll'&&top">
            <Poll v-on:updatePoll="handleUpdatePoll"/>
        </div>
        <div v-if="tweet.type=='imge'">
            <loading v-if="load"/>
            <images v-if="!load" v-on:remove="remove" :imageURL="fileImage"/>
        </div>
            <div class="actions">
                <div>
                    <button title="upload image" @click="handleImage(true,null)"><i class="fa fa-image"></i></button>
                    <button class="inactive"><i class="fa fa-video-camera"></i></button>
                    <input @input="handleImage(false,$event)" :id="custId()" accept="image/*" type="file" multiple>
                    <button v-if="top" @click="$store.dispatch(`setPostType`,'poll')" title="Poll"><i class="fa fa-align-left"></i></button>
                </div>
                <div class="ex__">
                <button @click="addtweet" v-if="!compo.is" class="addtweet" :disabled="tweet.cnt[0].length==0">{{compo.btnPhrase}}</button>
                <button @click="addThread" v-if="compo.is" class="addtweet sm-hide" :disabled="compo.allow">{{compo.btnPhrase}}</button>
                <button @click="createThread" class="addth" v-if="tweet.cnt[0].length!=0&&this.$store.state.mods.tweetAndThread.action!='C'">+</button>
                    <div class="_liili">
                        <div v-if="tweet.cnt[0].length!=0" class="ll">
                        <p>{{tweet.cnt[0].length}}</p>
                        <div>
                            <span :style="getPer(tweet.cnt[0].length)" class="mesu"></span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="load" style="padding:15px;display:grid;place-items:center;">
       <div class="lll"></div>
    </div>
  </div>
</template>

<script>
import {tweetTemplate} from '@/localedata/dataCreaters.js'
const tweets=()=>import('@/components/tweets.vue')
const Poll=()=>import('@/components/creatPoll.vue')
const images=()=>import('@/components/createImage.vue')
import {imagefix} from '@/dataParser/deepSearch.js';
const loading=()=>import('@/components/loading.vue')
export default {
  name: 'composeTweet',
  props: {
      compo:Object,//{is:false,index,allow:false,catchPhrase:''}
      tweetValue:Object,
      top:Boolean,
      threadIndex:Number
    },
    components:{
        tweets,
        Poll,
        images,
        loading,
    },
  data(){
    return{
        tweet:tweetTemplate(this.$store.state.user,'txt',null,{has:false,val:null},[]),
         //   whoIsTweeting,type,track, main, thread
         fileImage:[],
         load:false,
    }
  },
  computed:{
      getPer(){
          return ((i)=>{
            let basic={width:`${(i/280)*100}%`,background:`#00ad00`}
            if(i>=140&&i<=196) basic.background=`#9aad00`;
            if(i>=197&&i<=223) basic.background=`#d0ae07`;
            if(i>=224&&i<=276) basic.background=`#ce7200`;
            if(i>=277) basic.background=`#ce0a00`;
            if(i>=280) basic.width=`100%`
            return basic;
          })
      }
  },
  methods:{
      custId(){
            if(this.threadIndex!=undefined) return `imgInput${this.threadIndex}`; 
            return 'imgInput';
      },
      imagefix(par){
          return imagefix(par)
      },
      remove(ind){
            this.load=true
            this.fileImage=this.fileImage.filter((e,index)=>index!=ind)
            delete this.tweet.cnt[1].imgs
            this.tweet.cnt[1].imgs=this.fileImage.map(e=>e.data);
            if(this.tweet.cnt[1].imgs.length===0) this.tweet=tweetTemplate(this.$store.state.user,'txt',null,{has:false,val:null},[]);
            this.load=false
      },
      handleImage(bool,$event,cbf){
        if(cbf!=undefined) {
            this.fileImage=cbf.map(e=>{
                let imgType=e.substring(e.indexOf('/')+1,e.indexOf(';'))
                return {data:e,type:imgType}
            })
            this.load=false
            return 0;
        }
        if(this.fileImage.length==4){
            this.load=false
            return 0
        }
        if(cbf?.length>4){
            cbf.length=4;
        }
        if(!bool){
            this.$store.dispatch(`setPostType`,'imge')
            this.load=true
            let file=$event.srcElement.files;
            let looper=$event.srcElement.files.length;
            if($event.srcElement.files.length>4) looper=4;
            let oldTweet=this.tweet;
            this.tweet=tweetTemplate(this.$store.state.user,'imge',null,{has:false,val:null},[]);
            this.tweet.cnt[0]=oldTweet.cnt[0];
            for(let i=0;i<looper;i++){
                if(!(file[i] instanceof Blob)) continue;
                let fileReader=new FileReader();
                fileReader.readAsDataURL(file[i]);
                fileReader.addEventListener('load',()=>{
                    let imgType=fileReader.result.substring(fileReader.result.indexOf('/')+1,fileReader.result.indexOf(';'))
                    if(['jpeg','jpg','png','gif'].includes(imgType)){
                        this.fileImage.push({data:fileReader.result,type:imgType});
                        this.tweet.cnt[1].imgs=this.fileImage.map(e=>e.data);
                    }
                });
            }
            this.bruteeThread()
            this.load=false
        }
        if(bool) document.getElementById(`${this.custId()}`).click();
      },
      addThread(){
          this.$emit('createThread')
      },
      handleUpdatePoll(data){
        this.tweet.type=data.type
        this.tweet.cnt[1]=data.cnt[1];
        //   if(this.tweet.type=='poll') this.tweet.cnt[1].choice=this.tweet.cnt[1].choice.filter(e=>e.value.replace(/\s/g,'')!='');
        if(this.compo.is) this.chk();
      },
      chk(){
        if((['C','R'].includes(this.$store.state.mods.tweetAndThread.action))&&this.top||(['poll','imge'].includes(this.$store.state.mods.tweetAndThread.postType))&&this.top){
            this.$emit('bruteUpdateTweet',this.tweet);
        }  
        if((this.tweet.cnt[0].replace(/\s/g,''))==''){
            this.$emit('disAllow',true)
        }else{
            this.$emit('disAllow',false)
        }
      },
      createThread(){
          if(!this.compo.is){
              this.$store.dispatch('toggletweetAndThread',{bool:true,params:this.tweet,action:'T'})//bool, params
          }else{
              this.$emit('addNextThread')
              //Emitt add next
          }
      },
      setAtweet(){
          if(this.compo.is){
              this.tweet=this.tweetValue
              if(this.$store.state.mods.tweetAndThread.params.type=='imge'){
                this.fileImage=[...this.$store.state.mods.tweetAndThread.params.cnt[1].imgs].map(e=>{
                    let imgType=e.substring(e.indexOf('/')+1,e.indexOf(';'))
                    return {data:e,type:imgType}
                })
              }
          } 
          if(!this.tweetValue?.id){
              switch (this.$store.state.mods.tweetAndThread.postType) {
                  case 'poll':
                    this.tweet=tweetTemplate(this.$store.state.user,'poll',null,{has:false,val:null},[]);
                      break;

                  default:
                      this.tweet=tweetTemplate(this.$store.state.user,'txt',null,{has:false,val:null},[]);
                      break;
              }
          }
      },
      addtweet(){
          this.$store.dispatch('addTweet',this.tweet)
          if(this.fileImage.length!=0) this.fileImage=[];
          this.tweet=tweetTemplate(this.$store.state.user,'txt',null,{has:false,val:null},[]);
      },
      bruteeThread(){
          if(!this.top&&this.threadIndex!=undefined){
              this.$emit('updateThread',{data:this.tweet,index:this.threadIndex})
          }
      },
      brutee(){
        //   console.log('brutting')
           if(!this.compo.is) return 0;
        //    console.log('did not ret brutting')
          this.chk()
      }
  },
  mounted(){
      this.setAtweet()
  },
  watch:{
      'tweet.cnt':function(){
          if(!this.compo.is) return 0;
          this.chk()
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lll{
    animation: fa-spin 0.4s infinite linear;
    /* background:red; */
    width:30px;
    height:30px;
    border-radius:10px;
    border-top:2px solid var(--theme);
    border-top-left-radius:10px;
    border-bottom:2px solid var(--theme);
    border-bottom-right-radius:10px;
    /* border-left:3px solid var(--theme); */
}
textarea{
    resize:none;
    width:100%;
    min-height:40px;
    font-size:18px;
    background:none;
    color:var(--color);
    border:none;
    padding-top:10px;
}
.mm{
    display:flex;
    padding:15px;
}
.mm>img{
    width:50px;
    height:50px;
    border-radius:50px;
    margin-right:15px;
}
.mm>div{
    /* background:red; */
    width:100%;
}
.actions{
    /* display:flex; */
    /* background:blue; */
    justify-content: flex-end;
    margin-top:13px;
    width:100%;
}
.actions>div{
    width:50%;
    display:inline-flex;
    /* background:yellow; */
    /* margin:0px 5px; */
}
.ex__{
    text-align:right;
    flex-direction:row-reverse;
    /* margin-right:15px; */
}
.actions i{
    font-size:1.3em;
}
.actions button{
    background:none;
    color:var(--theme);
    margin:0px 3px;
    border-radius:50px;
    width:29px;
    height:29px;
    cursor: pointer;
    /* background:red; */
}
.actions button:hover{
    background:var(--themehove) !important;
}
._liili{
    display: inline-flex;
    /* background:yellow; */
    height:80%;
    padding-right:10px;
    position: relative;
    width:40px;
    justify-content: center;
}
._liili>div{
    border-right:1px solid var(--bdc);
}
.ll{
    position: relative;
    bottom:-5px;
    width:100%;
    text-align:center;
    font-size:0.9em;
}
.mesu{
    background:#008e00;
    display:block;
    height:2px;
    bottom:4px;
    width:0%;
    border-radius:50px;
}
.addtweet{
    font-family:var(--bold-font);
    background:var(--theme) !important;
    color:#fff !important;
    border-radius:30px !important;
    width: fit-content !important;
    padding:9px 17px 11px 17px;
    height:fit-content !important;
    margin:0px !important;
    font-weight:600;
    font-size:15px;
    position:relative;
    top:-6px;
}
.addtweet:disabled{
    opacity:0.6;
}
.addth{
    border:1px solid var(--theme);
    font-size:1.2em !important;
    margin:0px 12px !important;
}
.mainTwt-cnt{
  border:1px solid var(--bdc);
  border-radius:10px;
  overflow: hidden;
  margin-top:5px;
  position: relative;
    z-index: 2;
    padding-bottom:10px;
}
.fill{
    background: transparent;
    display: block;
    width: 100%;
    height:100%;
    position: absolute;
    top: 0px;
}
input[type="file" i]{
    width:2px;
    opacity:0;
    visibility:hidden;
}
/* .mainTwt-cnt:hover{
  cursor: pointer;
  background:rgba(21,23,24);
} */
@media only screen and (max-width:1250px){

}
@media only screen and (max-width: 480px){
    .actions{
    display:flex;
    }
.actions>div{
    width:unset;
}
}
</style>
