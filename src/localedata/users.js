let fback = [true, false]
    /*
    {
        name: '',
        at: '',
        bio: ``,
        isff: true,
        joined: null,
        img: [],
    },
    */
let users = [{
        name: 'Mr.Kelvic',
        at: 'mrkelvic',
        bio: `God | Family | Laptop
Nerd.
Web wizard(Javascript(Vue, Node),PHP) || C++ || Java.
Networking geek.
Your tech guy`,
        isff: false,
        joined: null,
        img: ['_kelvic.png', `_mrkelvic_.png`],
    },
    {
        name: 'Brad Traversy',
        at: 'traversymedia',
        bio: `Full stack web developer and online educator (YouTube & Udemy)`,
        isff: true,
        joined: null,
        img: ['_traversymedia.jpg', `_traversymedia.jpeg`],
    },
    // {
    //     name: 'Shahed Chowdhuri @ Microsoft',
    //     at: 'shahedC',
    //     bio: `Author, .NET enthusiast, work at @Microsoft, opinions mine, #AspNetCore #Blazor #webdev, blogger, GIF Commenter, #Marvel fan.`,
    //     isff: true,
    //     joined: null,
    //     img: ['_shahedC.jpg', `_shahedC_.jpeg`],
    // },
    {
        name: 'Patrick Agyeman-Budu',
        at: '_decus',
        bio: '',
        isff: true,
        joined: null,
        img: ['_decus.jpg', `_decus_.jpeg`],
    },
    {
        name: 'reuel',
        at: 'reuel___',
        bio: `Guitarist • student computer scientist • C|EH`,
        isff: true,
        joined: null,
        img: [`_reuel___.jpg`, `_reuel____.jpeg`],
    }, {
        name: 'JavaScript Teacher',
        at: 'js_tut',
        bio: '',
        isff: true,
        joined: null,
        img: ['_js_tut.jpg'],
    },
    {
        name: 'kofo ✨',
        at: 'yoruba_dev',
        bio: `sapiophobic gopher||software developer somewhere || writes at http://kofo.dev|| If you're my employer.... I'm a serious and dedicated employee.`,
        isff: true,
        joined: null,
        img: [`_yoruba_dev.jpg`, `_yoruba_dev_.jpeg`],
    },
    {
        name: 'Random Lee',
        at: 'omosumibare',
        bio: `CEO RANDOMLEE Inc.`,
        isff: true,
        joined: null,
        img: [`_omosumibare.jpg`, `_omosumibare_jpeg`],
    },
    {
        name: 'Danny Postman',
        at: 'dannypostmaa',
        bio: `Building products to make marketing easy. Founder of https://landingfolio.com | https://inspireframe.io | https://headlime.io`,
        isff: true,
        joined: null,
        img: [`_dannypostmaa.jpg`, `_dannypostmaa_.jpeg`],
    },
    {
        name: 'Avneesh',
        at: 'maker_avneesh',
        bio: `Your software interviews don't have to be scary. DM me, let us talk! Software Engineer 
        @Amazon
        . Coding for 10+ years. Follow me for more. (Opinions are my own)`,
        isff: true,
        joined: null,
        img: [`_maker_avneesh.jpg`],
    },
    {
        name: 'Annie',
        at: 'anniebombanie_',
        bio: `Designer // FE Dev @trewknowledge. @junocollege alum. ENFP-T sharing learns & general Sun with raysGreen heart.#100DaysOfCode Right pointing backhand index http://codepen.io/anniebombanie`,
        isff: true,
        joined: null,
        img: [`_anniebombanie_.jpg`, `_anniebombanie__.jpeg`],
    },
    {
        name: 'Adora Nwodo',
        at: 'AdoraNwodo',
        bio: `Doing the Lords work @Microsoft, @AdoraHack & @AdoraMusik Two hearts. http://youtube.com/c/adorahack`,
        isff: true,
        joined: null,
        img: [`_AdoraNwodo.jpg`, `_AdoraNwodo.jpeg`],
    },
    {
        name: 'Danny Thompson',
        at: 'DThompsonDev',
        bio: `Globe with meridiansMeetup Organizer/Founder|
Software Engineer|
EnvelopeMail list http://subscribepage.com/z7y4g1
Gumroad Course http://gumroad.com/l/KFkhUcs`,
        isff: true,
        joined: null,
        img: [`_DThompsonDev.jpg`, `_DThompsonDev_.jpeg`],
    },
    {
        name: 'Edem Kumodzi',
        at: 'edemkumodzi',
        bio: `Software Architect, Program Manager @Microsoft, Venture Scout @Microtraction, Admin @DevCongress, ex @ThoughtWorks @Andela | Views = Mine, RTs ≠ Endorsements`,
        isff: true,
        joined: null,
        img: [`_edemkumodzi.jpg`, `_edemkumodzi_.jpeg`],
    },
    {
        name: 'Twitter Dev',
        at: 'TwitterDev',
        bio: `The voice of the #TwitterDev team and your official source for updates, news, and events, related to the #TwitterAPI.`,
        isff: false,
        fb: false,
        joined: null,
        img: ['_TwitterDev.jpg', `_TwitterDev__.jpeg`],
    },
    {
        name: 'mrCute',
        at: '_i_am_cute_',
        bio: 'I just cute',
        isff: true,
        joined: null,
        img: ['_i_am_cute_.jpg'],
    }
]
let ats = []
users = users.map((user) => {
    user.ff = parseInt((Math.random() * 10) + 100)
    user.ffs = parseInt((Math.random() * 10) + 200)
    user.joined = new Date().toDateString();
    if (user.fb === undefined) {
        user.fb = fback[Math.random() * fback.length]
    }
    if (!user.bell) user.bell = fback[Math.random() * fback.length];
    ats.push(user.at)
        // user.img = user.img.map(e => `@/assets/${e}`)
        // @/assets/kelvic.jpg
    return user;
})
module.exports = { users, ats };
/* 
    name:,
    at:,
    bio:,
    ff:,
    ffs:,
    isff:,
    joined:,
    img:,
*/