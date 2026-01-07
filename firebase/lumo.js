window.addEventListener("DOMContentLoaded", () => {
const lumoEl = document.querySelector('.lumo');
const textEl = document.getElementById('lumoText');

const now = new Date();
const taiwanHour = now.toLocaleString('en-US', {
    timeZone: 'Asia/Taipei',
    hour: '2-digit',
    hour12: false
});
const hour = parseInt(taiwanHour);


let lumoData;

// 根據時間分配屬性
if (hour >= 5 && hour <= 10) {
    lumoData = {
    image: 'img/Lumo/emo-Lumo-index/emo-wake.png',
    texts: [
        '天又亮了，<br>完全不顧及我困不困，說亮就亮🥹',
        '清晨不是用來清醒的，<br>是用來後悔沒早睡的。🫠',
        '人和動物是會共情的，<br>開始理解公雞為什麼會早上起來然後尖叫😍',
        '設這麼多鬧鐘，是為了提醒自己還有幾分鐘可以睡',
        '我最遠的通勤距離，就是從床到書桌',
        '早上最困難的任務，就是思考中午該吃甚麼'
    ]
    };
} else if (hour >= 11 && hour <= 15) {
    lumoData = {
    image: 'img/Lumo/emo-Lumo-index/emo-middle.png',
    texts: [
        '我知道我該督促你學習，<br>但我也想放鬆一下啊🫥',
        '要不學點吧，說不定腦子學進去了呢',
        '中午不睡，<br>下午崩潰😵‍💫',
        '上了年紀後發現，比暈船還暈的是暈碳水化合物🍝',
        '努力學習，<br>才能有更多時間放空😌'
    ]
    };
} else if (hour >= 16 && hour <= 20) {
    lumoData = {
    image: 'img/Lumo/emo-Lumo-index/emo-bath.png',
    texts: [
        '我每次都覺得下午小睡...<br>睡得比晚上還爽',
        '晚餐到底要吃什麼啊?',
        '努力不一定有結果，<br>但不努力一定會很舒服🥰',
        '放鬆一下吧，<br>人生苦短嘛😌',
        '能不能吃苦不知道，倒是挺能吃的',
        '一天也沒幹甚麼，但覺得自己挺辛苦的'
    ]
    };
// 晚上9點到12點
} else if (hour >=21  && hour <= 23) {
    lumoData = {
    image: 'img/Lumo/emo-Lumo-index/emo-night-1.png',
    texts: [
        '太喜歡熬夜了，<br>有種和閻王單挑的感覺🔥',
        '認真的你和床一樣有吸引力<br>...騙你的，還是床更有吸引力💤',
        '夜晚是靈感的溫床，<br>也是拖延的溫床',
        '這個點沒睡的，明天也別想有精神了',
        '大家都說熬夜不好，<br>還好但我本身也沒好到哪去😉'
    ]
    };
// 凌晨0點到5點
} else {
    lumoData = {
    image: 'img/Lumo/emo-Lumo-index/emo-night-2.png',
    texts: [
        '不是，人類🦐<br>你甚麼時候才要休息?',
        '我發誓再也不熬夜了，<br>如果再熬夜我就再發誓🥲',
        '勸你還是好好睡覺，<br>不要再等他的訊息了',
        '勸你累了就休息一會，<br>人生很長，我們不需要時刻趕路',
        '這個點還沒睡的，建議把床換成棺材板'
    ]
    };
}

// 設定圖片
lumoEl.style.backgroundImage = `url('${lumoData.image}')`;

// 設定圖片
lumoEl.style.backgroundImage = `url('${lumoData.image}')`;

let textIndex = 0;
let isTyping = false;
let typingTimeoutId = null;
let typingToken = 0;

function showText(text) {
typingToken++;
const myToken = typingToken;

if (typingTimeoutId) clearTimeout(typingTimeoutId);

textEl.innerHTML = '';
let i = 0;
const speed = 60;

return new Promise((resolve) => {
    function typeChar() {
    if (myToken !== typingToken) return;

    if (i < text.length) {
        textEl.innerHTML = text.slice(0, i + 1);
        i++;
        typingTimeoutId = setTimeout(typeChar, speed);
    } else {
        typingTimeoutId = null;
        resolve();
    }
    }
    typeChar();
});
}

// ✅ 第一次顯示：隨機挑一句，進頁就播放
async function initLumoText() {
textIndex = Math.floor(Math.random() * lumoData.texts.length);
isTyping = true;
await showText(lumoData.texts[textIndex]);
isTyping = false;
}

initLumoText();

lumoEl.addEventListener("click", async (e) => {
// （可選）避免冒泡造成重複觸發
e.stopPropagation();

if (isTyping) return;
isTyping = true;

// 跳一下
lumoEl.classList.remove("lumo-jump");
void lumoEl.offsetWidth;
lumoEl.classList.add("lumo-jump");

// 換句：下一句
textIndex = (textIndex + 1) % lumoData.texts.length;
await showText(lumoData.texts[textIndex]);

isTyping = false;
});

// // 第一次顯示
// showText(lumoData.texts[textIndex]);

// // 每 10 秒換一次
// setInterval(() => {
//     textIndex = (textIndex + 1) % lumoData.texts.length;
//     showText(lumoData.texts[textIndex]);
// }, 10000); // 1分鐘

// lumoEl.addEventListener("click", () => {
//     console.count("lumo click");

//     // 跳一下
//     lumoEl.classList.remove("lumo-jump");
//     void lumoEl.offsetWidth;
//     lumoEl.classList.add("lumo-jump");

//     // 0.2 秒後換文字
//     setTimeout(() => {
//         textIndex = (textIndex + 1) % lumoData.texts.length;
//         showText(lumoData.texts[textIndex]);
//     }, 200);
// });


});
