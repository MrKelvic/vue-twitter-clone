//find index
//recurse looking for what to mutate
//mutate and update index
//return new mutated object

let { iter } = require('./deepSearch.js');
let { tweetTemplate } = require('../localedata/dataCreaters.js')
let editUserTweet = (newname, name, tweets) => {
    return tweets.map((e) => { return recurse(e, name, newname) })
}
let recurse = (tweet, name, newname) => {
        if (tweet.cmnts.length != 0) {
            tweet.cmnts = tweet.cmnts.map((e) => { return recurse(e, name, newname) })
        }
        if (tweet.retweets.length != 0) {
            tweet.retweets = tweet.retweets.map((e) => { return recurse(e, name, newname) })
        }
        if (tweet.owner == name) tweet.owner = newname;
        return tweet
    }
    //REPLY(add,remove)/COMMENT(add,remove),LIKE(add,remove),RETWEET(add remove),RC(Retweet with comment)//P(poll)
let middleWare = (add, tweet, BigTweet, action, pollIndex, userAt) => {
    // console.log('got id: ', tweet.id)
    let s = tweet.id.split('-'); //Array path
    let index = BigTweet.findIndex(e => e.id.split('-')[0] == s[0])
    let mutator = BigTweet[index]
        // console.log('mutator started as: ', mutator)
        // console.log('path is: ', s)
    if (s.length > 2) s.shift();
    // s.pop()
    let upper;
    for (let i = 0; i < (s.length - 1); i++) {
        // console.log('i:', i, 's.length-1:', s.length - 1, ' s:', s[i], ' iter value:', iter(s[i]))
        if (i == (s.length - 2)) { //upper
            upper = mutator;
            // console.log('upper is is: ', upper)
            // break
            // console.log('on the last element mutator:', mutator, ' s[i]:', s[i], ' iter(s[i]):', iter(s[i]))
        }
        // if (i == (s.length - 1)) {
        //     console.log('mutor is ended as: ', mutator)
        //     break
        // }
        if (s[i][0] == 'c') { //comment
            mutator = mutator.cmnts[iter(s[i])];
            // console.log('going into comments and mutor:', mutator)
        }
        if (s[i][0] == 'r') {
            mutator = mutator.retweets[iter(s[i])]
                // console.log('going into retweets:', mutator)
        }
        if (s[i][0] == 't') {
            mutator = mutator.thread[iter(s[i])]
                // console.log('going into thread:', mutator)
        }
        // console.log('mutor is: ', mutator)
        // console.log('/////////////////')
    }
    switch (action) {
        case 'C': //reply/comment
            reply(add, tweet, upper)
            if (add) {
                let twtCache = BigTweet[index];
                BigTweet = BigTweet.filter(e => e.id != twtCache.id);
                BigTweet = [twtCache, ...BigTweet]
            }
            break;
        case 'L': //Like
            like(mutator, userAt)
            break;
        case 'R': //retweet
            retweetOnly(mutator, userAt)
            if (mutator.props.isrwt) {
                let twtCache = BigTweet[index];
                BigTweet = BigTweet.filter(e => e.id != twtCache.id);
                BigTweet = [twtCache, ...BigTweet]
            }
            break;
        case 'RC': //retweet with comment
            retweetWithCommnet(add, tweet, upper, userAt);
            if (add) {
                delete tweet.main;
                // {},'txt',null,{has:false,val:null},[]
                let t = tweetTemplate(tweet.owner, tweet.type, null, { has: true, val: upper }, tweet.thread)
                t.cnt = tweet.cnt
                BigTweet = [t, ...BigTweet]
                    // console.log('setting main id as: ', upper.id)
            }
            break;
        case 'P':
            votePoll(add, mutator, pollIndex);
            break;
        default:
            break;
    }
    return BigTweet;
}
let reply = (add, tweet, upper) => {
    if (!add) {
        upper.cmnts = upper.cmnts.filter(e => e.id != tweet.id) //remove mute from parent
    } else {
        upper.cmnts.push(tweet) //add new tweet to mut
    }
}
let retweetWithCommnet = (add, tweet, upper, userAt) => {
    if (!add) {
        upper.retweets = upper.retweets.filter(e => e.id == tweet.id)
        upper.props.rtwts -= 1
        upper.props.isrwt = false
        upper.props.retweetedBy = upper.props.retweetedBy.filter(e => e != userAt);
    } else {
        upper.retweets.push(tweet)
        upper.props.rtwts += 1
        upper.props.isrwt = true
        if (!upper.props.retweetedBy.includes(userAt)) upper.props.retweetedBy.push(userAt);
    }
}
let retweetOnly = (mutator, userAt) => {
    mutator.props.isrwt = !mutator.props.isrwt
    if (mutator.props.isrwt) {
        mutator.props.rtwts += 1;
        if (!mutator.props.retweetedBy.includes(userAt)) mutator.props.retweetedBy.push(userAt);
    } else {
        mutator.props.rtwts -= 1
        mutator.props.retweetedBy = mutator.props.retweetedBy.filter(e => e != userAt);
    }
}
let like = (mutator, userAt) => {
    mutator.props.islike = !mutator.props.islike;
    if (mutator.props.islike) {
        if (!mutator.props.likedBy.includes(userAt)) mutator.props.likedBy.push(userAt);
        mutator.props.likes += 1
    } else {
        mutator.props.likes -= 1
        mutator.props.likedBy = mutator.props.likedBy.filter(e => e != userAt);
    }
}
let votePoll = (add, mutator, index) => {
    mutator.cnt[1].choice[index].v += 1;
    mutator.cnt[1].voted.has = true;
    mutator.cnt[1].voted.opt = index;
}
module.exports = { middleWare, editUserTweet }
    // middleWare(false, '7-r0-c1-1', twts)