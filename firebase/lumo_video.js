const lumoImages = [
    "./img/Lumo/mid-Lumo-video/lean1.webp",
    "./img/Lumo/mid-Lumo-video/lean2.webp",
    "./img/Lumo/mid-Lumo-video/lean3.webp",
    "./img/Lumo/mid-Lumo-video/sit1.webp",
    "./img/Lumo/mid-Lumo-video/sit2.webp",
    "./img/Lumo/mid-Lumo-video/sit3.webp",
];

// ✅ 預載
lumoImages.forEach(src => {
    const img = new Image();
    img.src = src;
});


window.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".lumo-container");
    const lumoEl = document.querySelector(".video-lumo");
    const textEl = document.querySelector(".video-lumotext");

    if (!container || !lumoEl || !textEl) return;

    // 🎲 一組 = 圖 + 多句文字
    const lumoSets = [
        {
        image: "./img/Lumo/emo-Lumo-video/lean1.webp",
        texts: [
            "如果...你有空的話，要不要回首頁看看大隻的我，拜託啦",
            "如果能一句話說出重點，代表你真的理解了",
            "理解比速度重要，慢慢來沒關係",
            "我有時候也會跳著看啦",
        ]
        },
        {
        image: "./img/Lumo/emo-Lumo-video/lean2.webp",
        texts: [
            "如果覺得分心，先暫停影片，深呼吸三次再繼續吧",
            "專注不是逼自己，而是幫自己創造好環境",
            "休息一下不是偷懶，是為了走更遠",
            "你眼睛會酸嗎？記得眨眨眼睛喔"
        ]
        },
        {
        image: "./img/Lumo/emo-Lumo-video/lean3.webp",
        texts: [
            "就算只記住一個重點，那也還不錯了吧？",
            "你不需要完美，只需要持續出現。",
            "這裡可以不用急著記，先理解就好",
            "Lumo不懂這個，Lumo只知道陪著你很開心",
            "如果關掉瀏覽器的話，我還會存在嗎？你會記得我嗎？"
        ]
        },        
        {
        image: "./img/Lumo/emo-Lumo-video/sit1.webp",
        texts: [
            "像你這麼認真的人真的很少見！",
            "願意學習這件事本身就很了不起",
            "你總是這麼努力呢",
            "我也不是每一段都聽得懂啦"
        ]
        },
                {
        image: "./img/Lumo/emo-Lumo-video/sit2.webp",
        texts: [
            "不用急著全部懂，等等再回來也可以",
            "邊看邊點頭其實很有幫助（但不要被別人看到）",
            "你可以試著預測下一段老師會說什麼",
            "我其實很怕你把我關掉，但你沒有耶，好開心"
        ]
        },
        {
        image: "./img/Lumo/emo-Lumo-video/sit3.webp",
        texts: [
            "行動塑造了自我認同，你現在就是一個愛學習的人！",
            "你願意學習這件事本身就很了不起，陪你看的我也挺了不起",
            "我有時候都會看到想睡覺",
            "我會坐在這裡，不會跑走的"
        ]
        }
    ];

    let currentIndex = -1;
    let isAnimating = false;
    let autoTimer = null;
    const AUTO_DELAY = 20000; // 20 秒

    function getRandomText(texts) {
        return texts[Math.floor(Math.random() * texts.length)];
    }

    function scheduleNextAuto() {
        clearTimeout(autoTimer);
        autoTimer = setTimeout(() => {
        switchLumo();
        }, AUTO_DELAY);
    }

    function switchLumo() {
        if (isAnimating) return;
        isAnimating = true;

        // 每次切換，都重新計時（關鍵）
        scheduleNextAuto();

        // ① 淡出
        lumoEl.classList.add("lumo-fade-out");
        textEl.classList.add("lumo-fade-out");

        setTimeout(() => {
        // ② 換組（避免重複）
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * lumoSets.length);
        } while (nextIndex === currentIndex);

        currentIndex = nextIndex;
        const selected = lumoSets[currentIndex];

        lumoEl.style.backgroundImage = `url('${selected.image}')`;
        textEl.textContent = getRandomText(selected.texts);

        // ③ 淡入
        lumoEl.classList.remove("lumo-fade-out");
        textEl.classList.remove("lumo-fade-out");

        isAnimating = false;
        }, 200);
    }

    // 初次顯示
    switchLumo();

    // 點擊 → 手動切換（並重置自動計時）
    container.addEventListener("click", () => {
        switchLumo();
    });
});
