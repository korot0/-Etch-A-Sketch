// do white and dark mode
// no right click
// can you use toggle anywhere?
// make it work only when you're holding the mouse 

const gridContainer = document.getElementById('grid-container');
const reloadBtn = document.querySelector('button');

function createSquares() {
    //CREATE SQUARES
    const divs = document.createElement('div');
    divs.setAttribute('style', 'width: 35px; height: 35px; border: 1px solid gray;');
    gridContainer.appendChild(divs);

    //DRAW--------------------------------------------------------------------------
    let mouseDown = false;
    gridContainer.addEventListener('mousedown', () => mouseDown = true);
    gridContainer.addEventListener('mouseup', () => mouseDown = false);
    gridContainer.addEventListener('mouseleave', () => mouseDown = false);
    divs.addEventListener('mousemove', () => {
        if(mouseDown) divs.style.backgroundColor = 'black';
    });
    divs.addEventListener('mousedown', () => {
         divs.style.backgroundColor = 'black';
    });

    //ERASE-------------------------------------------------------------------------
    reloadBtn.addEventListener('click', () => {
        divs.style.backgroundColor = 'bisque';
    });
}

for (let i = 1; i < 257; i++) {
    createSquares();
}

// SLIDER GRID SIZE TEXT OUTPUT
const sliderEl = document.getElementById('sliderEl');
const sliderOutput = document.getElementById('sizeTextEl');
sliderOutput.innerHTML = sliderEl.value;

sliderEl.oninput = function (){
    sliderOutput.innerHTML = this.value;
}

