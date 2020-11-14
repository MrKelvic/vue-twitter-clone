function tweetTemplate(own, type, track, main, thread) {
    // ({},'txt',null,{has:false,val:null},[]) 
    //who,type
    // console.log(track)
    let id = Date.now()
    if (!track) { track = [id] }
    let t = {
        id: `${track.join('-')}-${id}`,
        track: track,
        main: main || { has: false, val: null },
        owner: own.at || 'mrkelvic',
        type: type,
        cmnts: [],
        retweets: [],
        thread: thread,
        time: new Date(),
        props: {
            islike: false,
            isrwt: false,
            likes: 0,
            rtwts: 0,
            retweetedBy: [],
            likedBy: [],
        }
    };
    if (!type) t.cnt = [`choose type set to text default`]
    if (type === 'imge' || type === 'vid') t.cnt = ['', { imgs: [] }];
    if (type === 'txt') t.cnt = [''];
    if (type === 'poll') t.cnt = [``, { voted: { has: false, opt: 0 }, choice: [{ value: ``, v: 0 }, { value: ``, v: 0 }], time: [1, 0, 0] }]
        // console.log(t, 'new tweet to addd'),
        // console.log('id of new tweet: ', t.id)
    return t
}

function user(name, at, bio, img) {
    return { name: `${name}`, at: `${at}`, bio: `${bio}`, img: [...img], isff: false, fb: false, joined: new Date().toDateString(), bell: false, ff: parseInt((Math.random() * 10) + 100), ffs: parseInt((Math.random() * 10) + 100) };
}
module.exports = { tweetTemplate, user }