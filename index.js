const gridContainer = document.getElementById('grid-container');

const reloadBtn = document.querySelector('button');
reloadBtn.addEventListener('click', () => window.location.reload());

function createSquares() {
    const divs = document.createElement('div');
    divs.classList.add('square'); //toggle?
    divs.setAttribute('style', 'width: 35px; height: 35px; border: 1px solid gray;');
    gridContainer.appendChild(divs);

    divs.addEventListener('mouseover', () => {
        divs.style.backgroundColor = 'black';
    });
}

for (let i = 1; i < 257; i++) {
    createSquares();
}
