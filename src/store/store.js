import Vue from 'vue';
import Vuex from 'vuex';
import { users } from '@/localedata/users.js';
import twts from '@/localedata/tweets.js';
import FLEET from '@/localedata/fleets.js';
import { middleWare, editUserTweet,fleet } from '@/dataParser/mutateData.js';
// import { tweetTemplate } from '@/localedata/dataCreaters.js';
// console.log(FLEET)
// console.table(twts)
Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        tweets: twts,
        users: users,
        user: users.find(e => e.at === 'mrkelvic'),
        fleets:FLEET,
        mods: {
            showScroll: true,
            displayEdit: false,
            userEdit: false,
            moreTweet: false,
            fleetTweetId:null,
            imageView: {
                event: 'tweet', //tweet,image
                content: null,
                show: false,
                index: 0,
            },
            userEditEvent: {
                event: 'edit', //edit,add
                text: 'Edit profile',
                payload: null,
            },
            tweetAndThread: {
                postType: 'txt',
                show: false,
                params: null,
                action: null, //T(tweet/thread),R(retweet),C(comment)
            }
        }
    },
    mutations: {
        // CRUD
        addTweet(state, tweet) {
            state.tweets = [tweet, ...state.tweets]
        },
        likeTweet(state, tweet) {
            state.tweets = middleWare(false, tweet, state.tweets, 'L', null, state.user.at)
        },
        onlyRetweet(state, tweet) {
            state.tweets = middleWare(false, tweet, state.tweets, 'R', null, state.user.at)
        },
        commentTweet(state, obj) { //{tweet:,action(true(add)/false(remove))}
            state.tweets = middleWare(obj.action, obj.tweet, state.tweets, 'C', null, state.user.at)
        },
        retweetWithCommnet(state, obj) {
            state.tweets = middleWare(obj.action, obj.tweet, state.tweets, 'RC', null, state.user.at)
        },
        votePoll(state, obj) {
            state.tweets = middleWare(obj.action, obj.tweet, state.tweets, 'P', obj.index, state.user.at)
        },
        followOrUnfollowUser(state, index) {
            state.users[index].isff = !state.users[index].isff
            if (state.users[index].isff) {
                state.users[index].ffs += 1;
                //increase
            } else {
                state.users[index].ffs -= 1;
                //reduce
            }
        },
        fleetCRUD(state,payload){
            state.fleet=fleet(payload.action,payload.userat,payload.payload,state.fleets)
        },
        // Modifications
        toggletweetAndThread(state, obj) {
            state.mods.tweetAndThread.action = obj.action;
            // console.log('action ', state.mods.tweetAndThread.action)
            if (!obj.params) { state.mods.tweetAndThread.params = null; } else { state.mods.tweetAndThread.params = obj.params }
            state.mods.tweetAndThread.show = obj.bool;
            state.mods.showScroll = !obj.bool;
        },
        setPostType(state, type) {
            state.mods.tweetAndThread.postType = type
        },
        setDisplay(state, bool) {
            state.mods.displayEdit = bool;
            state.mods.showScroll = !bool;
        },
        setEditUser(state, obj) {
            state.mods.userEditEvent.event = obj.event;
            if (obj.text) state.mods.userEditEvent.text = obj.text;
            if (obj.payload) state.mods.userEditEvent.payload = obj.payload;
            if (obj.action === 'show') {
                state.mods.userEdit = obj.data;
                state.mods.showScroll = !obj.data;
            } else if (obj.action === 'add') {
                state.users.push(obj.data)
                state.user = obj.data;
            } else if (obj.action === 'edit') {
                state.tweets = editUserTweet(obj.data.at, state.user.at, state.tweets);
                state.users[state.users.findIndex(e => e.at == state.user.at)] = obj.data;
                state.user = obj.data
            }
        },
        setViewImage(state, obj) { //event:'tweet',content:null,show:false,index
            if (obj.event) state.mods.imageView.event = obj.event;
            if (obj.content) state.mods.imageView.content = obj.content;
            if (obj.show != undefined) {
                state.mods.imageView.show = obj.show;
                state.mods.showScroll = !obj.show;
            }
            if (obj.index != undefined) state.mods.imageView.index = obj.index;
        },
        setMoreTweets(state, bool) {
            state.mods.moreTweet = bool;
        },
        setFleetTweet(state,payload){
            state.mods.fleetTweetId=payload
        }
    },
    actions: {
        // CRUD
        addTweet({ commit }, tweet) {
            commit('addTweet', tweet);
            commit('toggletweetAndThread', { bool: false, params: null })
            commit('setPostType', 'txt')
        },
        likeTweet({ commit }, tweet) {
            commit('likeTweet', tweet)
            commit('toggletweetAndThread', { bool: false, params: null })
            commit('setPostType', 'txt')
        },
        onlyRetweet({ commit }, tweet) {
            commit('onlyRetweet', tweet)
            commit('toggletweetAndThread', { bool: false, params: null })
            commit('setPostType', 'txt')
        },
        commentTweet({ commit }, obj) {
            commit('commentTweet', obj)
            commit('toggletweetAndThread', { bool: false, params: null })
            commit('setPostType', 'txt')
        },
        retweetWithCommnet({ commit }, obj) {
            commit('retweetWithCommnet', obj)
            commit('toggletweetAndThread', { bool: false, params: null })
            commit('setPostType', 'txt')
        },
        votePoll({ commit }, obj) {
            commit('votePoll', obj)
        },
        followOrUnfollowUser({ commit }, index) {
            commit('followOrUnfollowUser', index)
        },
        fleetCRUD({commit},payload){
            commit("fleetCRUD",payload)
        },
        // Modifications
        toggletweetAndThread({ commit }, obj) {
            // {bool:true,params:this.tweet,action:T(tweet/thread),R(retweet),C(comment)}
            commit('toggletweetAndThread', obj)
                // commit('setPostType', 'txt')
        },
        setPostType({ commit }, type) {
            commit('setPostType', type)
        },
        setDisplay({ commit }, bool) {
            commit('setDisplay', bool)
        },
        setEditUser({ commit }, object) { //{action:[show,add],data:[],event:edit,add,payload,text}
            commit('setEditUser', object)
        },
        setViewImage({ commit }, obj) { //  event:'tweet',content:null,show:false,index
            commit('setViewImage', obj)
        },
        setMoreTweets({ commit }, bool) {
            commit('setMoreTweets', bool)
        },
        setFleetTweet({commit},payload){
            commit('setFleetTweet',payload)
        }
    },
    getters: {
        //get stuff
    }

})