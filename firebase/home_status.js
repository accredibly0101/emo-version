import { db } from './config.js';
import { doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

window.addEventListener("DOMContentLoaded", async () => {
const username = localStorage.getItem("user");
const userRef = doc(db, "emo_users", username);
const today = new Date().toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
}).replaceAll('/', '-');  // 例如 "2025-06-29"

try {
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    /*** ✅ 功能一：跨日登入紀錄與提示 ***/
    const loginDates = userData.loginDates || {};
    if (!loginDates[today]) {
        loginDates[today] = true;
        await updateDoc(userRef, { loginDates });
        console.log(`✅ 登入記錄已新增 ${today}`);
    }

    const totalLoginDays = Object.keys(loginDates).length;
    const loginMsg = document.getElementById("loginRewardMsg");
    if (loginMsg && totalLoginDays >= 2) {
        loginMsg.innerText = `✅ 已連續登入 ${totalLoginDays} 天！`;
    }

    /*** ✅ 功能二：影片完成總數提示 ***/
    try {
        const videos = userData.videos || {};
        let watchedCount = 0;

        for (const videoId in videos) {
            const v = videos[videoId];
            if (v.percentWatched >= 80) watchedCount++;
        }

        const statusMsg = document.getElementById("todayStatusMsg");
        if (statusMsg) {
            statusMsg.innerText = `📌 總共完成觀看 ${watchedCount} 部影片！`;
        }
    } catch (e) {
        console.error("❌ 發生錯誤：", e);
    }

} catch (e) {
    console.error("❌ 發生錯誤：", e);
}
});  // 👈 補上這個括號來結束 window.addEventListener
