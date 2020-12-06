let createFleet=(content)=>{
  //content  {bkg:getBkg(),own:"",c(each content of fleet):[{d:'data',t:'type',s:s('type')}]},
//   {bkg:getBkg(),own:"mrkelvic",c:[{d:'data',t:'type',s:s('type')}]},
    let cnt=[];
    for(let c of content){
        // console.log(c)
        cnt.push({
            backgroundGradient:c.bkg,
            owner:c.own,
            time:new Date(),
            content:c.c.map(e=>{
                return {
                    data:e.d,
                    type:e.t,
                    id:`child${Date.now()}`,
                    styles:e.s
                };
            })
        })
    }
    return cnt;
}
let getBkg=()=>{
    let o=[`linear-gradient(${g()}deg, #f9f9f9e3, #c7c3d8f2, #86a7ca)`,`linear-gradient(${g()}deg, #efe819, #d46d56f2, #bfd7f1)`,`linear-gradient(${g()}deg, #42f558, #5c83daf2, #021b35)`,`linear-gradient(${g()}deg, #4a4646fc, #272727f2, #031323)`,`linear-gradient(${g()}deg, #90da8f, #e63939f2, #40ccdeb5)`,`linear-gradient(${g()}deg, #060606e3, #2dbb5ff2, #deec2f)`,`linear-gradient(${g()}deg, #060606e3, #2dbb79f2, #f9f9f9)`,`linear-gradient(${g()}deg, #f9f9f9e3, #bb2daaf2, #ef0b0b)`,`linear-gradient(${g()}deg, #d0cfcfe0, #bb8f2df2, #ef0b0b)`,`linear-gradient(${g()}deg, #1f9bf3, #1da1f2, #51b6f445)`];
    return o[Math.floor(Math.random()*o.length)];
}
let bool=()=>{
    let o=[true,false];
    return o[Math.floor(Math.random()*o.length)];
}
let b=()=>{
    let o=['none',`#01e6e8eb`,`#293afdeb`,`#000`,`#ffd600`,`#e611b8eb`,`#d40000eb`,`#1cb500`,`#54351a`,`#838386`,`#d04a07eb`,`#afa737eb`,`#1a666feb`];
    return o[Math.floor(Math.random()*o.length)];
}
let g=()=>(Math.floor(Math.random()*358)+1);
let s=(TYPE,maxWidth)=>{
    if(TYPE=='txt'){
        let ret={}
        ret={fontWeight:"unset",zIndex:3,background:b(),color:"#fff",left:`${Math.floor(Math.random()*30)}%`,top:`${Math.floor(Math.random()*20)+5}%`};
        if(bool()) ret.fontWeight="600"
        //
        if(bool()) ret.background=b();
        else ret.color=b();
        return ret;
    }else if(TYPE=="imge"){
       return {zIndex:2,left:`${Math.floor(Math.random()*30)}%`,top:`${Math.floor(Math.random()*20)+5}%`,maxWidth:maxWidth};
    }
}
/*
[
    {
        backgroundGradient:``,
        owner:"",
        content:[
            {
                data:"",
                type:"",
                id:`child${Date.now()}`,
                styles:null,
            }
        ]
    }
]

*/

let fleets=[
    {
        owner:"mrkelvic",
        cont:createFleet([
            {bkg:getBkg(),own:"mrkelvic",c:[{d:'_beforedm.jpeg',t:'imge',s:s('imge',`300px`)},{d:'Before dming her be like...',t:'txt',s:s('txt')}]},
            {bkg:getBkg(),own:"mrkelvic",c:[{d:'_afterdm.jpeg',t:'imge',s:s('imge',`300px`)},{d:`...after she didn't reply after 3 months`,t:'txt',s:s('txt')}]},
            {bkg:getBkg(),own:"mrkelvic",c:[{d:'_buycoins.png',t:'imge',s:s('imge',`470px`)},{d:'going back to no frameworks can be a bit tough...',t:'txt',s:s('txt')}]},
        ])
    },
    {
        owner:"reuel___",
        cont:createFleet([
            {bkg:getBkg(),own:"reuel___",c:[{d:'7-7',t:'twt',s:null},{d:'still gets me',t:'txt',s:s('txt')}]},
            {bkg:getBkg(),own:"reuel___",c:[{d:'7-c1-c1-1',t:'twt',s:null},{d:'LOOOL',t:'txt',s:s('txt')}]},
        ])
    },
    {
        owner:"_i_am_cute_",
        cont:createFleet([
            {bkg:getBkg(),own:"_i_am_cute_",c:[{d:'10-10',t:'twt',s:null},{d:'last night',t:'txt',s:s('txt')}]},
        ])
    }
]



module.exports=fleets;