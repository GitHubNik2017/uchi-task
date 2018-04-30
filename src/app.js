'use strict';

const CM = 41.2;
const ARC_HEIGHT_DIVIDER = 3;
const AXIS_LOCATION = 85;

const firstValue = getRandomValue(6, 9);
const secondValue = getRandomValue(11, 14) - firstValue;
const sumValue = firstValue + secondValue;

const arrSummands = [firstValue, secondValue];
let count = 0;

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const body = document.body;

const example = document.createElement('div');
example.className = 'example';
example.innerHTML =
    '<span class="first-value">' + firstValue +
    '</span> + <span class="second-value">' + secondValue +
    '</span> = <span class="sum-value">?</span>';

body.insertBefore(example, body.firstChild);

const exampleFirstValue = example.querySelector('.first-value');
const exampleSecondValue = example.querySelector('.second-value');
const exampleSumValue = example.querySelector('.sum-value');

const arrSpan = [exampleFirstValue, exampleSecondValue];

const containerCanvas = body.querySelector('.canvas-container');
const canvas = document.querySelector('.cnvs');
const ctx = canvas.getContext('2d');

createArc(0, firstValue * CM);
createArcInput(0, firstValue * CM);


function createArc(startArcX, endArcX) {
    const arcCenterX = startArcX + (endArcX - startArcX) / 2;
    const arcCenterY = AXIS_LOCATION - (endArcX - startArcX) / ARC_HEIGHT_DIVIDER;

    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "red";
    ctx.moveTo(startArcX, AXIS_LOCATION);
    ctx.quadraticCurveTo(arcCenterX, arcCenterY, endArcX, AXIS_LOCATION);

    ctx.moveTo(endArcX, AXIS_LOCATION);
    ctx.lineTo(endArcX - 2, 70);

    ctx.moveTo(endArcX, AXIS_LOCATION);
    ctx.lineTo(endArcX - 15, 80);
    ctx.stroke();
}


function createArcInput(startArcX, endArcX) {
    let input = document.createElement('input');
    input.setAttribute("type", "text");
    input.setAttribute("maxlength", "1");
    input.classList.add('arc-input');

    input.style.left = startArcX + (arrSummands[count] * CM) / 2 - 23 + 'px';
    input.style.top = AXIS_LOCATION / 2 - (endArcX - startArcX) / ARC_HEIGHT_DIVIDER + 'px';

    containerCanvas.appendChild(input);

    input.addEventListener("input", function (evt) {
        verificationInput(evt.target)
    });
}


function createSumInput() {
    let sumInput = document.createElement('input');
    sumInput.setAttribute("type", "text");
    sumInput.setAttribute("maxlength", "2");
    sumInput.classList.add('sum-input');

    example.appendChild(sumInput);
    exampleSumValue.remove();

    sumInput.addEventListener("input", function () {
        verificationInputSum(sumInput)
    });
}

function verificationInput(input) {
    if (+input.value !== arrSummands[count]) {
        input.classList.add('input-error');
        arrSpan[count].classList.add('span-error');
    } else {
        input.disabled = true;
        input.classList.remove('input-error');
        arrSpan[count].classList.remove('span-error');

        if (count === arrSummands.length-1){
            createSumInput();
        } else {
            count++;
            const newArcStartX = CM * arrSummands[count - 1];

            createArc(newArcStartX, newArcStartX + CM * arrSummands[count]);
            createArcInput(newArcStartX, newArcStartX + CM * arrSummands[count]);
        }
    }

}

function verificationInputSum(sumInput) {
    if (+sumInput.value !== sumValue) {
        sumInput.classList.add('input-error');
    } else {
        sumInput.disabled = true;
        sumInput.classList.remove('input-error');
        sumInput.classList.remove('span-error');
    }
}