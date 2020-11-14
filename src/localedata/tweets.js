/*
   {
        owner: 'mrkelvic',
        type: 'txt',
        cnt: `This could end up as a thread maybe`,
        cmnts: [],
        retweets: [],
        thread: [{
                owner: 'mrkelvic',
                type: 'txt',
                cnt: `Ohh look a thread`,
                cmnts: [],
                retweets: [],
                time: new Date(),
                props: {
                    islike: true,
                    isrwt: true,
                    likes: parseInt((Math.random() * 300) + 200),
                    rtwts: parseInt((Math.random() * 300) + 200),
                }
            },
            {
                owner: 'mrkelvic',
                type: 'txt',
                cnt: `I don't know what to say :(`,
                cmnts: [],
                retweets: [],
                time: new Date(),
                props: {
                    islike: true,
                    isrwt: true,
                    likes: parseInt((Math.random() * 300) + 200),
                    rtwts: parseInt((Math.random() * 300) + 200),
                }
            },
            {
                owner: 'mrkelvic',
                type: 'txt',
                cnt: `I'll end it here`,
                cmnts: [],
                retweets: [],
                time: new Date(),
                props: {
                    islike: true,
                    isrwt: true,
                    likes: parseInt((Math.random() * 300) + 200),
                    rtwts: parseInt((Math.random() * 300) + 200),
                }
            },
        ],
        time: new Date(),
        props: {
            islike: true,
            isrwt: true,
            likes: parseInt((Math.random() * 300) + 200),
            rtwts: parseInt((Math.random() * 300) + 200),
        }
    },
    owner:at
    type:poll,imge,txt,vid,
    cnt:[],{imgs:[]}
    cmnts:__self,
    retweets:__self,
    time:,
    props:{
        islike:,
        isrwt:,
        likes:,
        rtwts:,
    }
*/
/*
{
    owner: '',
    type: 'txt',
    cnt: ``,
    cmnts: [],
    retweets: [],
    time: new Date(),
    props: {
        islike: true,
        isrwt: true,
        likes: parseInt((Math.random() * 300) + 200),
        rtwts: parseInt((Math.random() * 300) + 200),
    }
},

*/
let { ats } = require('./users.js');
let tweets = [{
        owner: 'traversymedia',
        type: 'txt',
        cnt: `You may think of a product/project, and start off hyped, wanting it done right this second, and then over time, end up procrastinating until you lose interest completely 

Try to balance in the middle of the two. This is from my own experience`,
        cmnts: [],
        retweets: [],
        time: new Date(),
        props: {
            islike: true,
            isrwt: true,
            likes: parseInt((Math.random() * 300) + 200),
            rtwts: parseInt((Math.random() * 300) + 200),
        }
    },
    {
        owner: 'anniebombanie_',
        type: 'txt',
        cnt: `Don't follow your passion or purpose.

I wasn't "passionate" abt programming when I first started & I still don't know what my propose is.  Anxiety arises when I think I have to be passion-driven to code.

Instead... follow your curiosity.

That, my friend, I have a lot of!`,
        cmnts: [],
        retweets: [],
        time: new Date(),
        props: {
            islike: true,
            isrwt: true,
            likes: parseInt((Math.random() * 300) + 200),
            rtwts: parseInt((Math.random() * 300) + 200),
        }
    },
    {
        owner: 'mrkelvic',
        type: 'imge',
        cnt: [`I thought this was a cool project`, { imgs: [`_pp1.png`, `_pp2.png`, `_pp3.png`, `_pp4.png`] }],
        cmnts: [],
        retweets: [],
        time: new Date(),
        props: {
            islike: true,
            isrwt: true,
            likes: parseInt((Math.random() * 300) + 200),
            rtwts: parseInt((Math.random() * 300) + 200),
        }
    }, {
        owner: 'js_tut',
        type: 'txt',
        cnt: `
UI is amazing. It's what allows us to interact with computers without knowing computer languages.

Front end is much harder to do right, than the back end (which is mostly just CRUD API.)
        
Because it requires writing infallible computer code while thinking like a fallible human.`,
        cmnts: [],
        retweets: [],
        time: new Date(),
        props: {
            islike: true,
            isrwt: true,
            likes: parseInt((Math.random() * 300) + 200),
            rtwts: parseInt((Math.random() * 300) + 200),
        }
    },
    {
        owner: 'AdoraNwodo',
        type: 'txt',
        cnt: `Take me back to the days when:
- Azure was just a type of blue
- C# was just a piano chord
- Python was just a snake
- Rust was what happens to iron after a while
- CSS meant Corona Secondary School
- Ruby was just a gemstone
- Go was just the opposite of come`,
        cmnts: [],
        retweets: [{
            owner: 'mrkelvic',
            type: 'txt',
            cnt: `Me toooo`,
            cmnts: [],
            retweets: [],
            time: new Date(),
            props: {
                islike: true,
                isrwt: true,
                likes: parseInt((Math.random() * 300) + 200),
                rtwts: parseInt((Math.random() * 300) + 200),
            }
        }, ],
        time: new Date(),
        props: {
            islike: true,
            isrwt: true,
            likes: parseInt((Math.random() * 300) + 200),
            rtwts: parseInt((Math.random() * 300) + 200),
        }
    },
    {
        owner: 'js_tut',
        type: 'txt',
        cnt: `Phase 1 – HTML (DOM.)
Phase 2 – CSS (CSSOM, flex, grid.)
Phase 3 – JavaScript / front-end.
Phase 4 – git / linux cli
Phase 5 – React.
Phase 6 – Node.
Phase 7 – Express.
Phase 8 – Mongo (or MySQL.)
Phase 9 – back-end xp @ your 1st job.
Phase 10 Open lock Full Stack unlocked.`,
        cmnts: [],
        retweets: [],
        time: new Date(),
        props: {
            islike: true,
            isrwt: true,
            likes: parseInt((Math.random() * 300) + 200),
            rtwts: parseInt((Math.random() * 300) + 200),
        }
    },
    {
        owner: 'DThompsonDev',
        type: 'txt',
        cnt: `I know learning to code is hard.
Programming is hard!
No way around it.

But you absolutely have the ability to do this.
You are incredible!
Time to show yourself how amazing YOU are!

You absolutely got this!🙏🏽Red heart`,
        cmnts: [{
            owner: 'maker_avneesh',
            type: 'txt',
            cnt: `Many teachers start teaching with the phrase “Coding is easy” which is far from the truth.
This puts inferiority complex in the someone who is new. Makes them doubt on themselves thinking maybe they are dumb and everyone else is smart. 

Thanks for saying the truth loud!`,
            cmnts: [],
            retweets: [],
            time: new Date(),
            props: {
                islike: true,
                isrwt: true,
                likes: parseInt((Math.random() * 300) + 200),
                rtwts: parseInt((Math.random() * 300) + 200),
            }
        }, ],
        retweets: [],
        time: new Date(),
        props: {
            islike: true,
            isrwt: true,
            likes: parseInt((Math.random() * 300) + 200),
            rtwts: parseInt((Math.random() * 300) + 200),
        }
    },
    {
        owner: 'reuel___',
        type: 'imge',
        cnt: [
            `LMAO these memes`,
            { imgs: ['_tt1.jpg', '_tt2.jpg', ] }
            //'tt3.png'
        ],
        cmnts: [{
                owner: 'mrkelvic',
                type: 'txt',
                cnt: `Lol, imagine if that's actually happening out there on Mars. If they come down here I'm on their side.`,
                cmnts: [{
                    owner: 'reuel___',
                    type: 'txt',
                    cnt: `That's crazy man.`,
                    cmnts: [],
                    retweets: [],
                    time: new Date(),
                    props: {
                        islike: true,
                        isrwt: true,
                        likes: parseInt((Math.random() * 300) + 200),
                        rtwts: parseInt((Math.random() * 300) + 200),
                    }
                }],
                retweets: [],
                time: new Date(),
                props: {
                    islike: true,
                    isrwt: true,
                    likes: parseInt((Math.random() * 300) + 200),
                    rtwts: parseInt((Math.random() * 300) + 200),
                }
            },
            {
                owner: '_decus',
                type: 'txt',
                cnt: `The second one is why I stick to one barber`,
                cmnts: [{
                    owner: 'reuel___',
                    type: 'txt',
                    cnt: `You know!!!. It's too risky`,
                    cmnts: [],
                    retweets: [],
                    time: new Date(),
                    props: {
                        islike: true,
                        isrwt: true,
                        likes: parseInt((Math.random() * 300) + 200),
                        rtwts: parseInt((Math.random() * 300) + 200),
                    }
                }, {
                    owner: 'mrkelvic',
                    type: 'txt',
                    cnt: `Imagine staying with a bad haircut for weeks.`,
                    cmnts: [],
                    retweets: [],
                    time: new Date(),
                    props: {
                        islike: true,
                        isrwt: true,
                        likes: parseInt((Math.random() * 300) + 200),
                        rtwts: parseInt((Math.random() * 300) + 200),
                    }
                }],
                retweets: [

                ],
                time: new Date(),
                props: {
                    islike: true,
                    isrwt: true,
                    likes: parseInt((Math.random() * 300) + 200),
                    rtwts: parseInt((Math.random() * 300) + 200),
                }
            },
        ],
        retweets: [],
        time: new Date(),
        props: {
            islike: false,
            isrwt: true,
            likes: parseInt((Math.random() * 300) + 200),
            rtwts: parseInt((Math.random() * 300) + 200),
        }
    },
    {
        owner: 'dannypostmaa',
        type: 'imge',
        cnt: [
            //caption at index 0
            `Launched my first startup in April 2020.

            Four months later Exploding headDown pointing backhand index`,
            { imgs: ['_Ee9PVl5UYAAsN3p.jpeg'] }
        ],
        cmnts: [],
        retweets: [],
        time: new Date(),
        props: {
            islike: false,
            isrwt: true,
            likes: parseInt((Math.random() * 300) + 200),
            rtwts: parseInt((Math.random() * 300) + 200),
        }
    },
    {
        owner: 'yoruba_dev',
        type: 'txt',
        cnt: `I like how you and your friends can’t code in real life but Twitter NG tech champions. Hook it inna my veins. — Not even going to respond sha.`,
        cmnts: [],
        retweets: [{
            owner: 'edemkumodzi',
            type: 'txt',
            cnt: `I thought it was just me who used to get targeted like this. Is this some kind of trend? Face with tears of joy cc: @silentworks`,
            cmnts: [{
                    owner: 'edemkumodzi',
                    type: 'txt',
                    cnt: `They must be speakers at different conferences. Bonus points if those conferences are in the abroad. The list goes on and on. And if you don’t fit this profile because all you do is code professionally while using social media for other things, your competence is questioned.`,
                    cmnts: [],
                    retweets: [],
                    time: new Date(),
                    props: {
                        islike: true,
                        isrwt: true,
                        likes: parseInt((Math.random() * 300) + 200),
                        rtwts: parseInt((Math.random() * 300) + 200),
                    }
                },
                {
                    owner: 'edemkumodzi',
                    type: 'txt',
                    cnt: `It’s even more hilarious when you look at the career progression of folks that get targeted and it’s nothing but stellar. So you think they cannot code but they keep progressing in their careers? I beg can anyone teach me how to fake it like this? I could use some help. Face with tears of joy`,
                    cmnts: [],
                    retweets: [{
                        owner: 'mrkelvic',
                        type: 'txt',
                        cnt: `Facts`,
                        cmnts: [],
                        retweets: [],
                        time: new Date(),
                        props: {
                            islike: true,
                            isrwt: true,
                            likes: parseInt((Math.random() * 300) + 200),
                            rtwts: parseInt((Math.random() * 300) + 200),
                        }
                    }, ],
                    time: new Date(),
                    props: {
                        islike: true,
                        isrwt: true,
                        likes: parseInt((Math.random() * 300) + 200),
                        rtwts: parseInt((Math.random() * 300) + 200),
                    }
                },
            ],
            retweets: [],
            time: new Date(),
            props: {
                islike: true,
                isrwt: true,
                likes: parseInt((Math.random() * 300) + 200),
                rtwts: parseInt((Math.random() * 300) + 200),
            }
        }, ],
        time: new Date(),
        props: {
            islike: true,
            isrwt: true,
            likes: parseInt((Math.random() * 300) + 200),
            rtwts: parseInt((Math.random() * 300) + 200),
        }
    },
    {
        owner: '_i_am_cute_',
        type: 'imge',
        cnt: ['My buddy and I chilling', { imgs: ['_i_am_cute_.jpg', '_i_am_cute_1.jpg', '_i_am_cute_2.jpg'] }],
        cmnts: [],
        retweets: [],
        time: new Date(),
        props: {
            islike: true,
            isrwt: true,
            likes: parseInt((Math.random() * 300) + 200),
            rtwts: parseInt((Math.random() * 300) + 200),
        }
    },
    // {
    //     owner: '',
    //     type: 'vid',
    //     cnt: [

    //     ],
    //     cmnts: [],
    //     retweets: [],
    //     time: new Date(),
    //     props: {
    //         islike: false,
    //         isrwt: true,
    //         likes: 90,
    //         rtwts: 23,
    //     }
    // },
    {
        owner: '_decus',
        type: 'poll',
        cnt: [
            `Which do you use often as a developer`,
            {
                voted: {
                    has: false,
                    opt: 0
                },
                choice: [{
                        value: '==',
                        v: parseInt(Math.random() * 200) + 200
                    },
                    {
                        value: '===',
                        v: parseInt(Math.random() * 200) + 200,
                    }
                ],
                time: [1, 3, 9]
            }
        ],
        cmnts: [],
        retweets: [],
        time: new Date(),
        props: {
            islike: true,
            isrwt: false,
            likes: parseInt((Math.random() * 300) + 200),
            rtwts: parseInt((Math.random() * 300) + 200),
        }
    }
]

function setLikesAndRetweets() {
    let ll = ats.length;
    let iter = parseInt((Math.random() * ll) - ((ll / 2) - 1))
    iter = iter <= 1 ? 1 : iter;
    let temp = [];
    for (let i = 0; i < iter; i++) {
        let r = parseInt(Math.random() * ll)
        if (!temp.includes(ats[r])) temp.push(ats[r]);
    }
    return temp;
}

// console.log(tweets)
function recurse(tweet, track, id) {
    if (tweet.cmnts.length != 0) {
        tweet.cmnts = tweet.cmnts.map((e, index) => { return recurse(e, [...track, `c${index}`], `${index}`) })
            // ${index}${Date.now()}${track.length}
    }
    if (tweet.retweets.length != 0) {
        tweet.retweets = tweet.retweets.map((e, index) => { return recurse(e, [...track, `r${index}`], `${index}`) })
    }
    // if (tweet.type == 'imge' && tweet.owner == 'reuel___') {
    //     tweet.cmnts = [...tweet.cmnts, ...tweet.cmnts, ...tweet.cmnts, ...tweet.cmnts, ...tweet.cmnts]
    // }
    // console.log('///////////////////////////////////////////////////////////////////////////')
    tweet.track = track
    tweet.time = new Date() //.toDateString()
    tweet.id = `${track.join('-')}-${id}` //Date.now()
    tweet.main = { has: false, val: null }
    if (!tweet.thread) tweet.thread = [];
    // tweet.props.islike = false
    // tweet.props.isrwt = false
    tweet.props.likedBy = setLikesAndRetweets();
    tweet.props.retweetedBy = setLikesAndRetweets();
    if (parseInt(id) < (tweets.length / 2)) {
        tweet.props.islike = false
        tweet.props.isrwt = false
    }
    if (tweet.type == 'txt') tweet.cnt = [tweet.cnt];
    if (tweet.props.islike && !tweet.props.likedBy.includes('mrkelvic')) tweet.props.likedBy = ['mrkelvic', ...tweet.props.likedBy];
    if (tweet.props.isrwt && !tweet.props.retweetedBy.includes('mrkelvic')) tweet.props.retweetedBy = ['mrkelvic', ...tweet.props.retweetedBy];
    // console.log(tweet.id);
    // console.log(tweet.id, ' content ', tweet.cnt) //tweet.owner, ' ',
    return tweet
}
// tweets.length = 4
tweets = tweets.map((e, index) => { return recurse(e, [index], index) })
    // let id = `${index}${Date.now()}`;
    // console.log(tweets)
module.exports = tweets;