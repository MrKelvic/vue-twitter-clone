<template>
  <div>
      <div v-if="fleet" class="create-fleet-div">
        <div :style="`background:${this.properties.gradients.opts[this.properties.gradients.choice]}`" class="fleet-cont">
            <div v-if="modals.toast.text" :style="`background:${modals.toast.background};color:${modals.toast.color};`" class="toast fadein">{{modals.toast.text}}</div>
            <div @touchend="mouseDownDragAttempt($event,'CALC')" @mouseup="mouseDownDragAttempt($event,'CALC')" @touchstart="mouseDownDragAttempt($event,'SET')" @mousedown="mouseDownDragAttempt($event,'SET')" @click="createTextContent($event),modals.draging.is=false" id="fleetBody" class="fleet-body">
                <div v-if="modals.fleetTweet.has" :id="modals.fleetTweet.id" :style="fleet.content[modals.fleetTweet.index].styles||{background:'transparent'}" class="ignore tweet-child-ii">
                    <div style="position:relative;">
                        <tweets class="border-color testtweet" :properties="{down:false,preview:true,interactions:true,isFleet:true}" :tweet="modals.fleetTweet.tweet" :nest="false"/>
                        <div class="fill ignore"></div>
                    </div>
                </div>
            </div>
            <div v-if="!modals.deletBar&&!modals.deletBarShow" class="buttom-nav fadein">
                <div v-if="properties.toggles.colorPanelShow" class="higlight-opt fadein">
                    <button @click="properties.highlights.choice=i;createStyles('txt',[],modals.selectedTextCaption.id)" :style="`background:${x}; ${(()=>{if(i==properties.highlights.choice) return 'border:2px solid #fff;'})()}`" v-for="(x,i) in properties.highlights.opts" :key="x"></button>
                </div>
                <div class="control-action fadein shadow">
                    <div style="place-content:space-around;">
                        <button @click="$router.go(-1)" style="width:35px;font-size:1em;height:35px;border-radius:30px;color:var(--theme);"><i class="fa fa-close"></i></button>
                        <button class="gradient-toggle" @click="nextGradientBackground()" :style="`background:${this.properties.gradients.opts[this.properties.gradients.choice]}`"></button>
                        <button @click="properties.toggles.isBold=!properties.toggles.isBold;createStyles('txt',[],modals.selectedTextCaption.id)" class="bold-btn" :style="`${(()=>{if(properties.toggles.isBold) return `background:#fff;`; return 'background:none;';})()}`">B</button>
                        <button @click="properties.toggles.invert=!properties.toggles.invert;createStyles('txt',[],modals.selectedTextCaption.id)" :style="`${(()=>{if(properties.toggles.invert) return 'background:'+this.properties.highlights.opts[this.properties.highlights.choice]+';color:#fff;'; return 'background:none;color:'+this.properties.highlights.opts[this.properties.highlights.choice]+';';})()}`" class="invert-bnt clbtn">test</button>
                        <button @click="properties.toggles.colorPanelShow=!properties.toggles.colorPanelShow" class="rainbow-bnt clbtn"></button>
                    </div>
                    <div class="control-buttons">
                        <button @click="loadImage(false,null)" :disabled="this.fleet.content.length>=4||modals.imageLoadControls.alreadyHasImage"> <i class="fa fa-image"></i> </button>
                        <input @input="loadImage(true,$event)" id="loadImageInput" accept="image/*" type="file">
                    </div>
                    <div class="conbtns">
                        <div>

                        </div>
                        <button @click="done()" v-if="modals.selectedTextCaption.id||properties.toggles.colorPanelShow">Done</button>
                        <button @click="sendFleet()" :disabled="this.fleet.content.length==0" v-if="!modals.selectedTextCaption.id&&!properties.toggles.colorPanelShow">Fleet</button>
                    </div>
                </div>
            </div>
            <div class="fadein shadow" v-if="modals.deletBarShow||modals.deletBar" id="deletBar">
                <p><i class="fa fa-close"></i> </p>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import {fleet} from '@/localedata/dataCreaters.js'
import {getTweet} from '@/dataParser/deepSearch.js';
import tweets from '@/components/tweets.vue';

export default {
    name:'createFleet',
    components:{
        tweets
    },
    data(){
        return{
            fleet:null,
            properties:{
                gradients:{
                    opts:[`linear-gradient(${this.getRandGradientDeg()}deg, #f9f9f9e3, #c7c3d8f2, #86a7ca)`,`linear-gradient(${this.getRandGradientDeg()}deg, #efe819, #d46d56f2, #bfd7f1)`,`linear-gradient(${this.getRandGradientDeg()}deg, #42f558, #5c83daf2, #021b35)`,`linear-gradient(${this.getRandGradientDeg()}deg, #4a4646fc, #272727f2, #031323)`,`linear-gradient(${this.getRandGradientDeg()}deg, #90da8f, #e63939f2, #40ccdeb5)`,`linear-gradient(${this.getRandGradientDeg()}deg, #060606e3, #2dbb5ff2, #deec2f)`,`linear-gradient(${this.getRandGradientDeg()}deg, #060606e3, #2dbb79f2, #f9f9f9)`,`linear-gradient(45deg, #f9f9f9e3, #bb2daaf2, #ef0b0b)`,`linear-gradient(${this.getRandGradientDeg()}deg, #d0cfcfe0, #bb8f2df2, #ef0b0b)`,`linear-gradient(${this.getRandGradientDeg()}, #1f9bf3, #1da1f2, #51b6f445)`],
                    choice:Math.floor(Math.random()*3)
                },
                highlights:{
                    opts:[`#01e6e8eb`,`#293afdeb`,`#000`,`#ffd600`,`#e611b8eb`,`#d40000eb`,`#1cb500`,`#54351a`,`#838386`,`#d04a07eb`,`#afa737eb`,`#1a666feb`],
                    choice:0,
                },
                toggles:{
                    invert:false,
                    colorPanelShow:false,
                    isBold:false,
                }
            },
            modals:{
                draging:{
                    ele:null,
                    is:false,
                },
                mouseDownDragAttemptCordinatesStamp:null,
                selectedTextCaption:{
                    id:null,
                    index:null,
                },
                deletBar:false,
                deletBarShow:false,
                imageLoadControls:{
                    loading:false,
                    alreadyHasImage:false
                },
                fleetTweet:{
                    has:false,
                    index:null,
                    id:null,
                },
                toast:{
                    color:"#fff",
                    background:"#00000061",
                    text:null
                }
            }
        };
    },
    mounted(){
        //$store.dispatch('setFleetTweet',tweet.id)
        this.fleet={
            owner:this.$store.state.user.at,
            content:[],
            backgroundGradient:this.properties.gradients.opts[this.properties.gradients.choice]
        }
        // console.log(this.fleet)
        // console.log(this.$route?.params?.tweetId)

        // this.createTweetContent(this.$store.state.tweets[4].id)
        if(this.$store.state.mods.fleetTweetId){
            // create tweet fleet
            this.createTweetContent(this.$store.state.mods.fleetTweetId)
        }
        // console.log(this.$router.params)
    },
    destroyed(){
        this.$store.dispatch('setFleetTweet',null)
    },
    methods:{
        sendFleet(){
            // action,userat,payload,ALL
            // this.fleet.content.backgroundGradient=this.fleet.backgroundGradient;
            this.$store.dispatch('fleetCRUD',{action:"ADD",userat:this.fleet.owner,payload:this.fleet});
            // console.log(this.$store.state.fleets)
            this.$router.push({name:'root'});
        },
        getRandGradientDeg(){
            return Math.floor(Math.random()*358)+1
        },
        nextGradientBackground(){
            this.properties.gradients.choice=((this.properties.gradients.choice+1)>=(this.properties.gradients.opts.length))?0:(this.properties.gradients.choice+1)
        },
        toast(message,background,color){
            if(background==="SUC") this.modals.toast.background="#2ab51361";
            if(background==="ERR") this.modals.toast.background="#e608088a";
            if(background==="INF") this.modals.toast.background="#089ce68a";
            if(!background) this.toast.background="#00000061"
            if(color)this.modals.toast.color=color;
            else this.modals.toast.color="#fff"
            this.modals.toast.text=message;
            setTimeout(()=>this.modals.toast.text=null,3500)
        },
        done(){
            //done Editing
            this.modals.selectedTextCaption.id=null
            this.properties.toggles.colorPanelShow=false;
            this.properties.toggles.isBold=false;
        },
        deletFleetContent(id){
            if(!this.modals.deletBar) return 0;
            // this.fleet.content=this.fleet.content.filter(e=>e.id==id)
            this.fleet.content=this.fleet.content.filter((e=>{
                if(e.id==id){ 
                    if(e.type=="imge"){this.modals.imageLoadControls.alreadyHasImage=false;} 
                    return false; 
                }
                return true;
            }));
            document.getElementById(id).remove();
            this.modals.deletBar=false;
            this.done();
            // this.modals.toast.background="#e608088a";
            // this.modals.toast.text="content was removed..."
            // setTimeout(()=>this.modals.toast.text=null,3500)
            // this.toast('content removed',"SUC");
            // console.log(this.fleet.content.length)
        },
        createStyles(TYPE,cordinates,id){
            let ele,ret={}
            if(id){
             ele=document.getElementById(id);
             cordinates=[];
             cordinates[0]=ele.style.left; 
             cordinates[1]=ele.style.top;   
            }
            if(TYPE=='txt'){
                ret={fontWeight:"unset",zIndex:3,background:"none",color:"#fff",left:cordinates[0],top:cordinates[1]};
                if(this.properties.toggles.isBold) ret.fontWeight="600"
                //
                if(this.properties.toggles.invert) ret.background=this.properties.highlights.opts[this.properties.highlights.choice];
                else ret.color=this.properties.highlights.opts[this.properties.highlights.choice];
               if(!id) return ret;
            }else if(TYPE=="imge"){
               if(!id) return {zIndex:2,left:cordinates[0],top:cordinates[1],width:cordinates[2],height:cordinates[3]};
            }
            this.fleet.content[this.modals.selectedTextCaption.index].styles=ret;
            Object.keys(ret).forEach(e=>{ele.style[e]=ret[e]});

        },
        getPositionPercentage(event,unit,showDelete){
            // console.log(event)
            let x=document.getElementById('fleetBody').scrollWidth;
            let y=document.getElementById('fleetBody').scrollHeight;
            // console.log('clX:',event.clientX,' touchchange:',event.changedTouches,' event:',event)
            let deletbar=document.getElementById('deletBar');
            let posX=event.clientX===0?1:event.clientX
            let posY=event.clientY===0?1:event.clientY
            // console.log('clX:',event.clientX,' x:',x,' %:',((((posX||event.changedTouches[0].clientX)/x))*100))
            x=(((posX||event.changedTouches[0].clientX)/x))*100;
            y=(((posY||event.changedTouches[0].clientY)/y))*100;
            x=x<0?0:x,x=x>75?75:x;
            y=y<5?5:y;
            if(y>85){
                this.modals.deletBar=true;
                if(deletbar) deletbar.style.background="#c51a1a61";
            }else{
                this.modals.deletBar=false;
               if(deletbar) deletbar.style.background="#79797921";
            }
           if(showDelete) this.modals.deletBarShow=true;
            // console.log({x:x+unit,y:y+unit});
           if(unit) return {x:x+unit,y:y+unit};
           return {x:x,y:y};
        },
        loadImage(isFromInput,event){
        // console.log(event)
            if(this.modals.imageLoadControls.alreadyHasImage){
                this.toast('Fleet already has an image...',"ERR");
                return 0;
            }

            if(isFromInput){
                let file=event.srcElement.files[0];
                // console.log(file)
                // if(!(file instanceof Blob)){
                    let fileReader=new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.addEventListener('load',()=>{
                        let imgType=fileReader.result.substring(fileReader.result.indexOf('/')+1,fileReader.result.indexOf(';'))
                        if(['jpeg','jpg','png','gif'].includes(imgType)){
                            this.createImageContent(fileReader.result)
                            this.modals.imageLoadControls.loading=false;
                        }
                    });
                // }else{
                //     this.toast('Fleet already has an image...',"ERR");
                //     // console.log('file was not a blob instance')
                // }
            }
            if(!isFromInput&&!this.modals.imageLoadControls.loading){
                // console.log('cliked')
                document.getElementById('loadImageInput').click();
                this.modals.imageLoadControls.loading=true;
                this.toast('Select an image...',"INF");
            }
        },
        createTweetContent(twtId){
            // console.log(twtId)
            this.modals.fleetTweet.tweet=getTweet(twtId,this.$store.state.tweets,null).def;
            this.modals.fleetTweet.dragButtonShow=false
            if(!this.modals.fleetTweet.tweet){
                this.toast(':( the tweet was not found',"ERR");
                return 0;
            }
            // let x,y;y='unset';x=y;
            let id=`child${Date.now()}`;
            this.modals.fleetTweet.has=true;
            let index=this.fleet.content.length;
            this.modals.fleetTweet.id=id;
            this.modals.fleetTweet.index=index;
            this.fleet.content.push(
                (fleet(id,'twt',twtId,{}))
                );
        },
        createImageContent(image){
            if(this.fleet.content.length>=4){
                this.toast(':( content limit reached',"SUC");
                return 0;

            }
            
            let parent=document.getElementById("fleetBody");
            let x,y;y='unset';x=y;
            let id=`child${Date.now()}`;
            let div=this.creatDivelement([
                ['contenteditable',true],
                ['draggable',true],
                ['class','ignore image-child-ii draggable'],
            ],{left:x,top:y,...this.createStyles('imge',[x,y,'55%'])},id,false,'IMG');
            parent.appendChild(div);
            let img=document.createElement('img');
            img.setAttribute('class','ignore');
            img.setAttribute('draggable',true);
            img.setAttribute('src',image);
            this.addEventListiners(img,id)
            this.fleet.content.push(
                (fleet(id,'imge',image,this.createStyles('imge',[x,y,'55%'])))
                );
            div.appendChild(img);
            this.modals.imageLoadControls.alreadyHasImage=true
        },
        createTextContent($event){
            //create a caption or text content;
            if(this.modals.draging.is) return 0;
            if(this.fleet.content.length>=4){
                this.toast(':( content limit reached',"INF");
                return 0;

            }
            if($event.target.classList.contains('ignore')) return 0;
            let {x,y}=this.getPositionPercentage($event,'%',false);
            let parent=document.getElementById("fleetBody");
            let id=`child${Date.now()}`;
            parent.appendChild(this.creatDivelement([
                ['contenteditable',true],
                ['role','input'],
                ['draggable',true],
                ['class','ignore text-child-ii draggable'],
            ],{left:x,top:y,...this.createStyles('txt',[x,y])},id,false,'TXT'));
            let misc={higlight:this.properties.highlights.choice,invert:this.properties.toggles.invert,isBold:this.properties.toggles.isBold};
            this.fleet.content.push(
                ({misc,...fleet(id,'txt','My fleeting thought...',this.createStyles('txt',[x,y]))})
                );
            // console.log(this.fleet.content)
        },
        creatDivelement(attributes,styles,id,edit,type){
            if(!edit){
                let div=document.createElement('div');
                if(type=="TXT"){
                    div.innerHTML="My fleeting thought...";
                    //div CLICK||TOUCH event
                    div.onclick=(e)=>{this.handleClickText(e,id);}
                    //div TYPING event
                    div.onkeyup=(e)=>{this.handleTyping(e,id)}
                }
                div.setAttribute('id',id)
                if(attributes){
                    for(let attrib of attributes){
                        div.setAttribute(attrib[0],attrib[1])
                    }
                }
                if(styles){
                    Object.keys(styles).forEach(e=>div.style[e]=styles[e])
                }
                this.addEventListiners(div,id)

                return div;
            }
        },
        addEventListiners(element,id,skipButtonAppend){
            // Add eventlistiners for draging
            //DRAGS
                element.ondragstart=()=>{this.modals.draging.is=true;}
                // this.handleDrag(e,'START',id);
                element.ondrag=(e)=>{this.modals.draging.is=true;this.handleDrag(e,'END',id);}
                element.ondragend=(e)=>{this.modals.draging.is=true;this.handleDrag(e,'END',id);this.deletFleetContent(id);this.modals.deletBarShow=false;}

                //TOUCHES
                element.ontouchmove=(e)=>{this.modals.draging.is=true;this.handleDrag(e,'END',id);}
                element.ontouchend=()=>{this.deletFleetContent(id);this.modals.deletBarShow=false;}
               if(!skipButtonAppend) element.appendChild(this.createControlButton(id));
        },
        createControlButton(id){
            let dragButton=document.createElement('button');
            dragButton.setAttribute('contenteditable',false)
            dragButton.setAttribute('class','ignore')
            dragButton.setAttribute('id',id+"-dr");dragButton.innerHTML="<i class='fa fa-arrows-alt ignore'></i>";

            //drags
            dragButton.ondrag=(e)=>{this.modals.draging.is=true;this.handleDrag(e,'END',id);}
            dragButton.ondragend=(e)=>{this.modals.draging.is=true;this.handleDrag(e,'END',id);}
            //touches
            dragButton.ontouchstart=()=>{this.modals.draging.is=true;}
            // this.handleDrag(e,'START',id);
            dragButton.ontouchmove=(e)=>{this.modals.draging.is=true;this.handleDrag(e,'END',id);}
            dragButton.ontouchend=()=>{this.deletFleetContent(id);}
            return dragButton;

        },
        handleClickText(event,id){
            if(event.target.nodeName==="BUTTON"||event.target.nodeName==="I") return 0;
            this.modals.selectedTextCaption.index=this.fleet.content.findIndex(e=>e.id===id);
            if(this.modals.selectedTextCaption.index==-1) return 0;
            this.modals.selectedTextCaption.id=id;
            this.properties.toggles.invert=this.fleet.content[this.modals.selectedTextCaption.index].misc.invert;
            this.properties.highlights.choice=this.fleet.content[this.modals.selectedTextCaption.index].misc.higlight;
            this.properties.highlights.isBold=this.fleet.content[this.modals.selectedTextCaption.index].misc.isBold;
            // document.getElementById(id).focus();
            // console.dir(event.target.innerText)
        },
        handleTyping(e,id){
            let text=document.getElementById(id);
            if(!text) return 0;
            if(e.keyCode==13){
                //for wrote this part late might just use innerHTML to remove children and append the button
                text.innerHTML=`${text.textContent}.`;
                text.appendChild(this.createControlButton(id));
            } //disable newline;
            if(text.innerText.replace(/\s/g,'')==''){
                text.innerText=' .';
                text.appendChild(this.createControlButton(id));
            } 
            this.fleet.content[this.modals.selectedTextCaption.index].data=text.innerText;        },
        handleDrag(e,event,id){
            let {x,y}=this.getPositionPercentage(e,'%',true);
            if(id){
                let element=document.getElementById(id);
                element.style.top=y;
                element.style.left=x;
                return 0;
            }
            if(!e.target.classList) return 0;
            let element=e.target.classList.contains('draggable')?e.target:null
            if(event==="END"&&element){
                element.style.top=y
                element.style.left=x
            }
        },
        mouseDownDragAttempt(e,action){
            //see if user tried to drag and drag
            if(action==="SET"){
                this.modals.mouseDownDragAttemptCordinatesStamp={val:0}
                this.modals.mouseDownDragAttemptCordinatesStamp.val=((e.clientY||e.changedTouches[0].clientY)+(e.clientX||e.changedTouches[0].clientX))
                return 0
            }
            if(action==="CALC"){
                if(Math.abs(this.modals.mouseDownDragAttemptCordinatesStamp.val-((e.clientY||e.changedTouches[0].clientY)+(e.clientX||e.changedTouches[0].clientX)))>40){
                    //tried to drag
                    this.modals.draging.is=true
                }
            }
        }
    }
}
</script>

<style scoped>
.fadein{
    animation:fadein 0.2s cubic-bezier(0.42, 0, 0.85, 0.31) backwards;
}
.toast{
    position: fixed;
    top: 9%;
    padding: 5px 10px;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 14px;
    font-size: 0.9em;
}
.create-fleet-div{
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100vh;
    z-index: 10;
    background:#fff;
}
.fleet-cont,.fleet-body{
    width:100%;
    height:100%;
}
.fleet-body,.buttom-nav{
    display:flex;
    place-items:center;
    place-content:center;
}
.fleet-body:hover{
    cursor:text;
}
.fleet-cont{
    position:relative;
}
.buttom-nav{
    position:fixed;
    bottom:5%;
    width:100%;
    height:35px;
    z-index:5;
    background:none !important;
}
#deletBar{
    position:fixed;
    width:100%;
    bottom:1%;
    height:70px;
    background:#00000061;
    color:#fff;
    display:flex;
    place-content:center;
    place-items:center;
    border-radius:30px;
}
#deletBar>p{
        padding: 10px 12px;
    background: #79797921;
    color: #e4e4e48a;
    border-radius:11px;
}
.control-action{
    width:385px;
    height:100%;
    border-radius:20px;
    padding:5px 10px;
    padding-bottom: 7px;
    background:#00000061;
    display:grid;
    grid-template-columns: 60% 18% 22%;
}
.control-action>div{
    display:flex;
    margin:1px;
    place-items:center;
    place-content:center;
}
.conbtns button{
    width:100%;
    height:100%;
    border-radius:40px;
    padding:2px;
    color:var(--theme);
    font-size:0.9em;
}
.control-buttons>button{
    width: 35px;
    height: 35px;
    border-radius: 55px;
    border-radius:50px;
}
.gradient-toggle{
    border:2px solid #fff;
    width:35px;
    height:35px;
    border-radius:50px;
}
.clbtn{
    width:25px;
    height:25px;
    border:2px solid #fff;
    border-radius:50px;
}
.bold-btn{
    width: 29px;
    height: 29px;
    border-radius: 20px;
    background: none;
    border:2px solid #fff;
    color:var(--theme);
    font-weight:600;
}
.invert-bnt{
    background:linear-gradient(45deg, #000,#fff);
    font-size: 0.7em;
}
.rainbow-bnt{
    background:linear-gradient(#01e6e8eb,#293afdeb,#ffffff,#ffd600,#e611b8eb,#d40000eb,#1cb500,#54351a,#838386);
}
.higlight-opt{
    position: absolute;
    top: -43px;
    width: fit-content;
    display:flex;
    place-items:center;
    padding:4px;
    border-radius:15px;
    background:#00000036;
}
.higlight-opt>button{
    width:20px;
    height:20px;
    border-radius:50%;
    margin:0px 5px;
}
input[type="file" i]{
    width:1px;
    opacity: 0;
    visibility: hidden;
}
@media only screen and (max-width:480px){
    .buttom-nav{
        bottom: 3%;
    }
    .control-action{
        width:100%;
    }
    .higlight-opt{
        top: -40px;
        width: 100%;
        border-radius:0px;
        place-content: center;
    }
}
</style>
<style>
.text-child-ii,.image-child-ii,.tweet-child-ii{
    position: absolute;
    /* z-index: 2; */
    padding:5px;
    border: 1px dotted;
    display: flex;
    place-content: center;
    place-items: center;
    min-width:10px;
    border-radius:5px;
    transition:0s linear;
}
.text-child-ii{
    padding:2px;
}
.tweet-child-ii{
    background:var(--background);
    max-width: 480px;
    border-radius:4px;
    border:none;
}
.tweet-child-ii:hover{
    cursor:default;
}
.text-child-ii:hover{
    cursor:text;
}
.text-child-ii button,.image-child-ii button{
    display: block;
    width: 30px;
    height: 30px;
    position: absolute;
    top: -35px;
    border-radius:10px;
    background: #fff6;
    z-index:3;
    font-size:0.7em;
}
.image-child-ii{
    resize:both;
}
.image-child-ii button{
    left:2%;
}
.text-child-ii button:hover{
    cursor: grab;
}
.image-child-ii:hover{
    cursor:grab;
}
.image-child-ii>img{
    width:100%;
    height:100%;
}

/* STACKOVERFLOW */
[draggable=true] {
  cursor: move;
}
.disable-select {
  -webkit-user-select: none;  
  -moz-user-select: none;    
  -ms-user-select: none;      
  user-select: none;
}
</style>