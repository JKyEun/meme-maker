const textModeBtn = document.getElementById('text-mode');
const saveBtn = document.getElementById('save');
const textInput = document.getElementById('text');
const fileInput = document.getElementById('file');
const eraserBtn = document.getElementById('eraser-btn');
const destroy = document.getElementById('destroy-btn');
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
    document.getElementsByClassName('color-option')
);
const color = document.getElementById('color');
const lineWidth = document.getElementById('line-width');
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round';

let isPainting = false;
let isFilling = false;
let isTextFilling = false;

function onMove (event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting () {
    isPainting = true;
}

function cancelPainting () {
    isPainting = false;
}

function onLineWidthChange (event) {
    ctx.lineWidth = event.target.value;
}

function onColorChange (event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick() {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = 'Draw';
    } else {
        isFilling = true;
        modeBtn.innerText = 'Fill';
    }
}

function onCavasClick() {
    if (isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
    ctx.strokeStyle = 'white'
    isFilling = false;
    modeBtn.innerText = 'Fill';
}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    };
}

function onDoubleClick(event) {
    const text = textInput.value;
    if (text != '' && isTextFilling == false) {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = '68px serif';
        ctx.strokeText(text, event.offsetX, event.offsetY);
        ctx.restore();
    } else if (text != '' && isTextFilling == true) {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = '68px serif';
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = url;
    a.download = '내 그림.png';
    a.click();
}

function onTextModeClick() {
    if (isTextFilling) {
        isTextFilling = false;
        textModeBtn.innerText = 'Text Mode (Stroke)';
    } else {
        isTextFilling = true;
        textModeBtn.innerText = 'Text Mode (Fill)';
    }
}

canvas.addEventListener('dblclick', onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener('click', onCavasClick);
lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);
colorOptions.forEach((color) => color.addEventListener('click', onColorClick));
modeBtn.addEventListener('click', onModeClick);
destroy.addEventListener('click', onDestroyClick);
eraserBtn.addEventListener('click', onEraserClick);
fileInput.addEventListener('change', onFileChange);
saveBtn.addEventListener('click', onSaveClick);
textModeBtn.addEventListener('click', onTextModeClick);