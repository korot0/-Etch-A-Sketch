//TO DO -------------------->
// Fix canvas alignment with header
// Fix clear button and ask why is it slow with certain functions
// Fix eraser button
// Fix shade button

const gridContainer = document.getElementById('grid-container');
//BUTTON ELEMENTS
const showGridBtn = document.getElementById('showGrid-el');
const clearBtn = document.getElementById('clearBtn-el');
const eraserBtn = document.getElementById('eraserBtn-el');
const shadeBtn = document.getElementById('shadeBtn-el');
const randomColorBtn = document.getElementById('randomColorBtn-el');

//SLIDER OUTPUT E.G 'Grid Size: 5 x 5' 
const sliderEl = document.getElementById('sliderEl');
const sliderOutput = document.getElementById('sizeTextEl');

sliderOutput.textContent = sliderEl.value + ' x ' + sliderEl.value;
sliderEl.oninput = function() {
    sliderOutput.textContent = this.value + ' x ' + this.value;
}

//HEIGHT AND WIDTH OF DIVS INSIDE GRID
let widthAndHeight = 650 / sliderEl.value;
//This function changes the grid size. First it clears the previous grid. Then it changes de grid size depending on the current value (e.target.value) of the slider by multiplying e.g 16 x 16 = 256 number of squares. Then it dictates the width and height of each square by diving the .... KEEP EXPLAINING WHY DIVIDE 650px?
document.querySelector('input').addEventListener('change', e => {
    gridContainer.innerHTML = '';
    widthAndHeight = 650 / e.target.value;
    createGrid(e.target.value, e.target.value);
    draw();
    showGrid();
    eraser();
    clear();
    shading();
});

//GRID MAKER (GIVE AN EXPLANATION OF WHAT IS GOING ON HERE!)
function createGrid(columns, rows) {
    for (let i = 1; i <= (columns * rows); i++) {
        //CREATE SQUARES
        const divs = document.createElement('div');
        divs.style.width = `${widthAndHeight}px`;
        divs.style.height = `${widthAndHeight}px`;
        gridContainer.appendChild(divs).classList.add('divs'); // * //
    }
}
createGrid(sliderEl.value, sliderEl.value);

//SHOW GRID
function showGrid() {
    document.querySelectorAll('.divs').forEach((divEl) => {
        showGridBtn.checked
        ? divEl.style.border = '1px solid #71716F' 
        : divEl.style.border = ''; 
        showGridBtn.addEventListener('click', function() {
            showGridBtn.checked
            ? divEl.style.border = '1px solid #71716F' 
            : divEl.style.border = '';  
        });
    });
}
showGrid();

//CLEAR
function clear() {
    document.querySelectorAll('.divs').forEach((divEl) => {
        clearBtn.addEventListener('click', () => {
            divEl.style.removeProperty('background-color');
        });
    });
}
clear();

//DRAWING EXPLAIN!!!
//In order to draw only when clicking and holding, not when hovering, here is what happens: When in createGrid() mouseover activates when hovering through an element. KEEP EXPLAINING...
let mouseDown = false;
gridContainer.onmousedown = () => mouseDown = true;
gridContainer.onmouseup = () => mouseDown = false;
gridContainer.onmouseleave = () => mouseDown = false;

//DRAW
function draw() {
    document.querySelectorAll('.divs').forEach((divEl) => {
        divEl.addEventListener('mouseover', () => {
            if (mouseDown && randomColorBtn.checked) {
                divEl.style.backgroundColor = getRandomColor();
            } else if (mouseDown) {
                divEl.style.backgroundColor = color;
            }
        });
        divEl.addEventListener('click', () => {
            randomColorBtn.checked 
            ? divEl.style.backgroundColor = getRandomColor() 
            : divEl.style.backgroundColor = color;
        });
    });
}
draw();

//ERASER
function eraser() {
    document.querySelectorAll('.divs').forEach((divEl) => {
        divEl.addEventListener('mouseover', () => {
            if (mouseDown && eraserBtn.checked) divEl.style.removeProperty('background-color'); 
        });
        divEl.addEventListener('click', () => {
            if (eraserBtn.checked) divEl.style.removeProperty('background-color'); 
        });
    });
}
eraser();

//COLOR PICKER FUNCTION
const colorPickerBtn = document.getElementById('colorPickerBtn-el');
let color = '#000000';
colorPickerBtn.oninput = () => {
    color = colorPickerBtn.value;
    document.getElementById('color-code').textContent = colorPickerBtn.value;
} 
//HEX TO RGB FUNCTION
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}
//SHADING
function shading() {
    document.querySelectorAll('.divs').forEach((divEl) => {
        let opacity = 0.1;
        divEl.addEventListener('mouseover', () => {
            if (mouseDown && shadeBtn.checked) {
                let rgb = hexToRgb(color).r + ',' + hexToRgb(color).g + ',' +hexToRgb(color).b;
                let rgba = (`rgba(${rgb + ',' + opacity})`)
                opacity += 0.1;
                divEl.style.backgroundColor = rgba;
            }
        });
    });
}
shading();

//RANDOM COLOR FUNCTION
function getRandomColor() {
    let arrayRandomColor = [];
    for (let i = 0; i < 3; i++) {
        arrayRandomColor.push(Math.floor(Math.random() * 256));
    }
    return `rgb(${arrayRandomColor})`;
}

// NOTES --------------------------------------------------------->

//BIG LESSON LEARNED HERE!!! REMEMBER THE BIG ASS FUNCTION WE HAD? THAT WAS AVOIDED BY USING '.classList.add('divs'); ON 'gridContainer.appendChild(divs)' NOW WE CAN ACCESS THE DIVS INSIDE THE createGrid() FUNCTION IN THE GLOBAL SCOPE BY TARGETING THE '.divs'. REFER TO *