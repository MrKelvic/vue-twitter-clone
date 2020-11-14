let searchUser = (id, list) => {
    for (let i = 0; i < list.length; ++i) {
        if (id === list[i].at) {
            return { user: list[i], index: i }
        }
    }
}
let iter = (num) => {
    if (!isNaN(parseInt(num))) return num;
    num = [...num];
    num.shift()
    return num.join('')
}
let find = (list, c, track) => {
    let pos = iter(track[c])
    if (c == (track.length - 1)) {
        if (track[c][0] === 'r' || track[c][0] === 't') return list
        return list.cmnts[parseInt(pos)]
    }
    if (track[c][0] === 'r') {
        return find(list.retweets[parseInt(pos)], ++c, track)
    }
    if (track[c][0] === 'c') {
        return find(list.cmnts[parseInt(pos)], ++c, track)
    }
    if (track[c][0] === 't') {
        return find(list.thread[parseInt(pos)], ++c, track)
    }
    return list;
}

let getTweet = (track, list, cp) => {
    track = track.split('-').map((e) => { if (parseInt(e)) return parseInt(e); return e; })
    track.pop()
    let parent = list.find((e) => e.id.split('-')[0] == track[0]);
    if (!parent) return null;
    let idLen = track.length;
    let p
    if (idLen == 1) {
        p = iter(track[0])
    } else { p = iter(track[1]) }
    if (idLen === 1) return { top: null, def: parent, main: null };
    if (idLen === 2 && track[1].split('')[0] === 'c') return { top: parent, def: parent.cmnts[parseInt(p)], main: null }; //track[1].split('')[1]
    if (idLen === 2 && track[1].split('')[0] === 'r') return { top: null, def: parent.retweets[parseInt(p)], main: parent };
    if (idLen === 2 && track[1].split('')[0] === 't') return { top: parent, def: parent.thread[parseInt(p)], main: null };
    //deepSearch only if retweet
    //find main rtwt if retweet
    let tempTrack = track.map((e, index) => { if (index != 0) return e; }).filter(e => e != undefined)
    let res = find(parent, 0, tempTrack)
    if (track[idLen - 1][0] === 't') {
        let po = iter(track[idLen - 1][1])
        return { top: res, def: cp || res.thread[parseInt(po)], main: null }
    }
    if (track[idLen - 1][0] === 'r') {
        let po = iter(track[idLen - 1][1])
        return { top: null, def: cp || res.retweets[parseInt(po)], main: res }
    }
    if (track[idLen - 1][0] === 'c') {
        return { top: parent, def: res, main: null }
    }
    return null;

}
let createInview = (arr1, arr2) => {
    return [...arr1, ...arr2].sort((a, b) => a.time - b.time)
}
let imagefix = (par) => {
    // console.log(par);
    if ([undefined, null].includes(par)) return null;
    if (par[0] == '_') return require(`@/assets/${par}`);
    return par;
}
module.exports = { searchUser, getTweet, createInview, iter, imagefix }