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
        '天又亮了，<br>完全不顧及我困不困，說亮就亮',
        '清晨不是用來清醒的，<br>是用來後悔沒早睡的。',
        '人和動物是會共情的，<br>我開始理解公雞為什麼會早上起來然後尖叫'
    ]
    };
} else if (hour >= 11 && hour <= 15) {
    lumoData = {
    image: 'img/Lumo/emo-Lumo-index/emo-middle.png',
    texts: [
        '你學習的樣子，<br>讓我想起我昨天沒做完的計畫',
        '今天看起來…<br>有要學點東西的樣子欸',
        '人有多大膽，複習拖多晚'
    ]
    };
} else if (hour >= 16 && hour <= 20) {
    lumoData = {
    image: 'img/Lumo/emo-Lumo-index/emo-bath.png',
    texts: [
        '我每次都覺得下午小睡...<br>睡得比晚上還好',
        '晚餐到底要吃什麼啊?',
        '努力不一定有結果，<br>但不努力一定會很舒服'
    ]
    };
// 晚上9點到12點
} else if (hour >=21  && hour <= 23) {
    lumoData = {
    image: 'img/Lumo/emo-Lumo-index/emo-night-1.png',
    texts: [
        '太喜歡熬夜了，<br>有種和閻王單挑的感覺',
        '認真的你和床一樣有吸引力<br>...騙你的，還是床更有吸引力zz',
        '夜晚就是要放鬆的吧<br>最近有追哪部劇嗎?'
    ]
    };
// 凌晨0點到5點
} else {
    lumoData = {
    image: 'img/Lumo/emo-Lumo-index/emo-night-2.png',
    texts: [
        '不是，人類<br>你甚麼時候才要休息?',
        '我發誓再也不熬夜了，<br>如果再熬夜我就再發誓',
        '大家都在為情所困，只有我比狗還困'
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

// 每 3 分鐘換一次
setInterval(() => {
    textIndex = (textIndex + 1) % lumoData.texts.length;
    showText(lumoData.texts[textIndex]);
}, 60000); // 3 分鐘 = 180,000 ms



});
