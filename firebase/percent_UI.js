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

export async function updateLessonProgressUI() {
    const username = getUsername();
    if (!username) return;

    const userRef = doc(db, "emo_users", username);
    const docSnap = await getDoc(userRef, { source: 'server' }); // 避免讀到舊資料

    if (!docSnap.exists()) return;

    const data = docSnap.data();
    const videos = data.videos || {};

    const lessonItems = document.querySelectorAll(".lesson-item");

    lessonItems.forEach(item => {
        let videoId = null;

        if (item.dataset.src) {
            try {
                const url = new URL(item.dataset.src);
                videoId = url.pathname.split("/")[2];
            } catch (e) {
                console.error("Invalid data-src URL:", item.dataset.src);
            }
        } else if (item.href) {
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
        const percent = (info && info.percentWatched !== undefined) ? info.percentWatched : 0;

        // 先移除再建立
        const oldPercent = item.querySelector(".bar-progress, .circle-progress");
        if (oldPercent) oldPercent.remove();

        // 建立百分比UI（長條）
        const progressWrapper = document.createElement("div");
        progressWrapper.className = "bar-progress";
        progressWrapper.dataset.good = percent >= 80 ? "1" : "0";
        progressWrapper.innerHTML = `
        <div class="bar-track" aria-label="progress">
            <div class="bar-fill" style="width:${Math.max(0, Math.min(100, percent))}%"></div>
        </div>
        <div class="bar-text">${Math.round(percent)}%</div>
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
