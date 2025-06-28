
const video = document.getElementById('video');
const outputCanvas = document.getElementById('output');
const ctxOutput = outputCanvas.getContext('2d');

async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    return new Promise(resolve => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

function drawBoxes(detections) {
    ctxOutput.drawImage(video, 0, 0, outputCanvas.width, outputCanvas.height); // <- CORRECCIÓN
    ctxOutput.strokeStyle = "red";
    ctxOutput.lineWidth = 2;
    ctxOutput.font = "14px Arial";
    ctxOutput.fillStyle = "red";

    detections.forEach(det => {
        const [x, y, w, h] = det.bbox;
        ctxOutput.strokeRect(x, y, w, h);
        ctxOutput.fillText(`${det.class} ${Math.round(det.score * 100)}%`, x, y > 10 ? y - 5 : 10);
    });
}

// Simulación de detecciones
function fakeDetections() {
    return [
        { bbox: [50, 50, 100, 100], class: "person", score: 0.94 },
        { bbox: [120, 120, 80, 80], class: "cell phone", score: 0.91 },
        { bbox: [200, 150, 100, 60], class: "bottle", score: 0.89 },
    ];
}

async function main() {
    await setupCamera();
    video.play();

    setInterval(() => {
        const detections = fakeDetections(); // Sustituye con detecciones reales
        drawBoxes(detections);
    }, 200);
}

main();
