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
        const oldPercent = item.querySelector(".circle-progress");
        if (oldPercent) oldPercent.remove();
        
        // 建立百分比UI(圖形)
        const progressWrapper = document.createElement("div");
        progressWrapper.className = "circle-progress";
        progressWrapper.innerHTML = `
        <svg viewBox="0 0 36 36" class="circular-chart ${percent >= 80 ? 'green' : '#439cfb'}">
        <path class="circle-bg"
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"/>
        <path class="circle"
                stroke-dasharray="${percent}, 100"
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"/>
        </svg>
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
