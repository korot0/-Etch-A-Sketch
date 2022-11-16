// do white and dark mode
// cubeta

const gridContainer = document.getElementById('grid-container');
//BUTTON ELEMENTS
const showGridBtn = document.getElementById('showGrid-el');
const clearBtn = document.getElementById('clearBtn-el');
const eraserBtn = document.getElementById('eraserBtn-el');
const shadeBtn = document.getElementById('shadeBtn-el');
const randomColorBtn = document.getElementById('randomColorBtn-el');

//SLIDER 'GRID SIZE: ' OUTPUT
const sliderEl = document.getElementById('sliderEl');
const sliderOutput = document.getElementById('sizeTextEl');
sliderOutput.textContent = sliderEl.value + ' x ' + sliderEl.value;
sliderEl.oninput = function() {
    sliderOutput.textContent = this.value + ' x ' + this.value;
}

//HEIGHT AND WIDTH OF DIVS INSIDE GRID
let gridSize = sliderEl.value * sliderEl.value;
let widthAndHeight = 650 / sliderEl.value;

//GIVE EXPLANATION HERE AS WELL!
document.querySelector('input').addEventListener('change', e => {
    gridContainer.innerHTML = '';
    gridSize = e.target.value * e.target.value;
    widthAndHeight = 650 / e.target.value;
    grid();
});

//write an explanation here... cuz I already forgot wtf is going on
let mouseDown = false;
gridContainer.onmousedown = () => mouseDown = true;
gridContainer.onmouseup = () => mouseDown = false;
gridContainer.onmouseleave = () => mouseDown = false;

//RANDOM COLOR
function getRandomColor() {
    let arrayRandomColor = [];
    for (let i = 0; i < 3; i++) {
        arrayRandomColor.push(Math.floor(Math.random() * 256));
    }
    return 'rgb' + `(${arrayRandomColor.toString()})`;
}

//COLOR PICKER
const colorPickerBtn = document.getElementById('colorPickerBtn-el');
let color = '#000000';
colorPickerBtn.oninput = function () {
    color = colorPickerBtn.value;
    document.getElementById('color-code').textContent = colorPickerBtn.value;
} 


//GRID MAKER (GIVE AN EXPLANATION OF WHAT IS GOING ON HERE!)
function grid() {
    for (let i = 1; i <= gridSize; i++) {
        //CREATE SQUARES
        const divs = document.createElement('div');
        // divs.style.border = '1px solid #222';
        // if(showGridBtn.checked) divs.style.border = '1px solid #222'; 
        divs.style.width = `${widthAndHeight}px`;
        divs.style.height = `${widthAndHeight}px`;
        gridContainer.appendChild(divs);
    
        //DRAW------------------------------------------------------------------------
        divs.addEventListener('mouseover', () => {
            if(mouseDown) divs.style.backgroundColor = color;
            if(mouseDown && randomColorBtn.checked) divs.style.backgroundColor = getRandomColor();
            if(mouseDown && eraserBtn.checked) divs.style.backgroundColor = '#efefef';

        });
        divs.addEventListener('mousedown', () => {
            divs.style.backgroundColor = color;
            if(randomColorBtn.checked) divs.style.backgroundColor = getRandomColor();
            if(eraserBtn.checked) divs.style.backgroundColor = '#efefef';
        });
    
        // ERASE----------------------------------------------------------------------
        clearBtn.addEventListener('click', () => {
            divs.style.backgroundColor = '#efefef';
        });
    }
}
grid();
