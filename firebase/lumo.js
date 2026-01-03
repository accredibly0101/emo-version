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
        '我最遠的通勤距離，<br>就是從床到書桌',
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

// 動畫字句輪播
let textIndex = 0;
function showText(text) {
    textEl.innerHTML = '';  // 用 innerHTML 才能解析 <br>
    let i = 0;
    const speed = 50;

    function typeChar() {
        // 逐字打出時，不能直接用 text.charAt(i)，要處理 HTML tag
        // 我們這裡直接一字一字打 innerHTML，簡單但夠用
        if (i < text.length) {
        const currentChar = text.slice(0, i + 1);
        textEl.innerHTML = currentChar;
        i++;
        setTimeout(typeChar, speed);
        }
    }

    typeChar();
}


// 第一次顯示
showText(lumoData.texts[textIndex]);

// 每 10 秒換一次
setInterval(() => {
    textIndex = (textIndex + 1) % lumoData.texts.length;
    showText(lumoData.texts[textIndex]);
}, 10000); // 1分鐘

// 使用者點擊 Lumo 時，切換到下一句話
lumoEl.addEventListener("click", () => {
    textIndex = (textIndex + 1) % lumoData.texts.length;
    showText(lumoData.texts[textIndex]);
});


});
