let retVal = []
    /* islike: true, isrwt: false, */

// let { tweetTemplate } = require('../localedata/users.js')
function recurse(tweet, user, bruteLikes) {
    if (!user) return null;
    // if (tweet.props.likedBy) {
    //     let tempLike = [...tweet.props.likedBy]
    //     let tempRet = [...tweet.props.retweetedBy]
    //     if (!bruteLikes) {
    //         // console.log('filtering brute was false old value ', tempLike)
    //         // tempLike = tempLike.filter(e => e != user)
    //         // tempRet = tempRet.filter(e => e != user)
    //             // console.log('new value ', tempLike)
    //     }
    //     if (tweet.owner === user || tempLike.includes(user) || tempRet.includes(user) || tweet.props.islike || tweet.props.isrwt) retVal.push(tweet)
    // } else {
    if (tweet.owner === user || tweet.props.likedBy.includes(user) || tweet.props.retweetedBy.includes(user)) retVal.push(tweet);
    // }
    if (tweet.cmnts.length != 0) {
        tweet.cmnts.forEach((e) => { recurse(e, user, bruteLikes) })
    }
    if (tweet.retweets.length != 0) {
        tweet.retweets.forEach((e) => { recurse(e, user, bruteLikes) })
    }
}
let exec = (user, tweets, bruteLikes) => {
    retVal = [];
    tweets.forEach((e) => { recurse(e, user, bruteLikes) });
    return retVal;
}
module.exports = { exec }
    // console.log(twts)