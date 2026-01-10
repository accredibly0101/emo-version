import { db, getUsername } from './config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

window.addEventListener('DOMContentLoaded', () => {
// 收合功能
document.querySelectorAll('.lesson-header').forEach(header => {
    header.addEventListener('click', () => {
    const items = header.nextElementSibling;
    items.style.display = items.style.display === 'block' ? 'none' : 'block';
    });
});

updateLessonProgressUI();
});

// ✅ 更穩的 videoId 解析（跟 video.js 一樣）
function extractVideoIdFromEmbedUrl(url) {
if (!url) return null;
const match = url.match(/\/embed\/([^\?]+)/);
return match ? match[1] : null;
}

export async function updateLessonProgressUI() {
// ✅ 跟 video.js 一致：沒登入也用 anonymous
const username = getUsername() || "anonymous";

const userRef = doc(db, "emo_users", username);
const docSnap = await getDoc(userRef, { source: 'server' }); // 避免讀到舊資料

if (!docSnap.exists()) return;

const data = docSnap.data();
const videos = data.videos || {};

const lessonItems = document.querySelectorAll(".lesson-item");

lessonItems.forEach(item => {
    let videoId = null;

    if (item.dataset.src) {
    videoId = extractVideoIdFromEmbedUrl(item.dataset.src);
    } else if (item.href) {
    // 你目前 href 這條路徑其實不太會用到（你主要用 data-src）
    // 先保留：以防你之後改成 querystring
    try {
        const url = new URL(item.href, window.location.origin);
        const lessonParam = url.searchParams.get('lesson');
        if (lessonParam) {
        videoId = lessonParam.split(" ")[0];
        }
    } catch (e) {
        console.error("Invalid href URL:", item.href);
    }
    }

    if (!videoId) return;

    const info = videos[videoId];
    const percent = (info && typeof info.percentWatched === "number") ? info.percentWatched : 0;
    const safePercent = Math.max(0, Math.min(100, percent));

    // 先移除再建立
    const oldPercent = item.querySelector(".bar-progress, .circle-progress");
    if (oldPercent) oldPercent.remove();

    // 建立百分比UI（長條）
    const progressWrapper = document.createElement("div");
    progressWrapper.className = "bar-progress";
    progressWrapper.dataset.good = safePercent >= 80 ? "1" : "0";
    progressWrapper.innerHTML = `
    <div class="bar-track" aria-label="progress">
        <div class="bar-fill" style="width:${safePercent}%"></div>
    </div>
    <div class="bar-text">${Math.round(safePercent)}%</div>
    `;

    progressWrapper.style.position = "absolute";
    progressWrapper.style.right = "10px";
    progressWrapper.style.top = "50%";
    progressWrapper.style.transform = "translateY(-50%)";
    item.style.position = "relative";
    item.appendChild(progressWrapper);
});
}

// 讓它可以在 module 外呼叫
window.updateLessonProgressUI = updateLessonProgressUI;
