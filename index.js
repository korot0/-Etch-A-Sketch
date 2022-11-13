// do white and dark mode
// no right click
// cubeta

const gridContainer = document.getElementById('grid-container');
const eraseBtn = document.getElementById('erase');

// SLIDER GRID SIZE TEXT OUTPUT
const sliderEl = document.getElementById('sliderEl');
const sliderOutput = document.getElementById('sizeTextEl');
sliderOutput.textContent = sliderEl.value + ' x ' + sliderEl.value;
sliderEl.oninput = function() {
    sliderOutput.textContent = this.value + ' x ' + this.value;
}

//HEIGHT AND WIDTH OF DIVS INSIDE GRID
let gridSize = sliderEl.value * sliderEl.value;
let widthAndHeight = 650 / sliderEl.value;

//write an explanation here... cuz I already forgot wtf is going on
let mouseDown = false;
gridContainer.onmousedown = () => mouseDown = true;
gridContainer.onmouseup = () => mouseDown = false;
gridContainer.onmouseleave = () => mouseDown = false;

//GRID MAKER (GIVE AN EXPLANATION OF WHAT IS GOING ON HERE!)
function grid() {
    for (let i = 1; i <= gridSize; i++) {
        //CREATE SQUARES
        const divs = document.createElement('div');
        divs.style.border = '1px solid gray';
        divs.style.width = `${widthAndHeight}px`;
        divs.style.height = `${widthAndHeight}px`;
        gridContainer.appendChild(divs);
    
        //DRAW------------------------------------------------------------------------
        divs.addEventListener('mousemove', () => {
            if(mouseDown) divs.style.backgroundColor = 'black';
        });
        divs.addEventListener('mousedown', () => {
             divs.style.backgroundColor = 'black';
        });
    
        // ERASE----------------------------------------------------------------------
        eraseBtn.addEventListener('click', () => {
            divs.style.backgroundColor = 'bisque';
        });
    }
}

grid();

document.querySelector('input').addEventListener('change', e => {
    gridContainer.innerHTML = '';
    gridSize = e.target.value * e.target.value;
    widthAndHeight = 650 / e.target.value;
    grid();
});

