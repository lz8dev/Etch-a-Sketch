/*Original createGrid function:

function createGrid(size){
    let grid = document.getElementById('grid');
    grid.innerHTML = '';
    document.documentElement.style.setProperty('--gridRes', size);
    for (let i=0; i<size*size; i++){
        let pixel= document.createElement('div');
        pixel.classList.add('pixel');
        grid.appendChild(pixel)
    };
    startDraw()
};
*/

let size = document.getElementById("sizeSlider"),
    sizeValue = document.getElementById("sizeValue"), 
    rendering = false;

size.addEventListener("input", function () {
    if(!rendering){
        let value = size.value;
        sizeValue.textContent = `${value} x ${value} px`;
        size.disabled = false;
        createGrid(value);
    }
});

//Modified createGrid function to obtain the batch rendering effect
function createGrid(size) {
    let grid = document.getElementById('grid');
    grid.innerHTML = '';
    document.documentElement.style.setProperty('--gridRes', size);
    const batchSize = 100; // Adjust the batch size as needed
    let count = 0;
    rendering = true;

    function renderBatch() {
        for (let i = 0; i < batchSize && count < size * size; i++) {
        let pixel = document.createElement('div');
        pixel.classList.add('pixel');
        grid.appendChild(pixel);
        count++;
        };
        if (count < size * size) {
            requestAnimationFrame(renderBatch);
        } else {
            startDraw();
            size.disabled = false;
            rendering = false;
        };
    };
    renderBatch();
};


  
function startDraw(){
    let pixels = document.getElementsByClassName('pixel'),
        isDrawing = false;

    for (let pixel of pixels){
        pixel.addEventListener('mousedown', function(event){
            event.preventDefault(); //Prevent default behavior of dragging 
            isDrawing = true;
            pixel.style.backgroundColor = 'rgb(100, 100, 100)';
        });
        
        pixel.addEventListener('mouseenter', function(){
            if(!isDrawing && getComputedStyle(pixel).backgroundColor === 'rgb(255, 255, 255)'){
                pixel.style.backgroundColor = 'rgb(218, 218, 218)'; //Must be set in rgb to allow using getComputedStyle in the next listener
            }else if(isDrawing){
                pixel.style.backgroundColor = 'rgb(100, 100, 100)';
            } else {
                return;
            }
        });
        pixel.addEventListener('mouseleave', function(){
            if(!isDrawing && getComputedStyle(pixel).backgroundColor === 'rgb(218, 218, 218)'){
                pixel.style.backgroundColor = 'rgb(255, 255, 255)';
            } 
        });
        document.addEventListener('mouseup', function() {
            isDrawing = false;
        });
    }
}

function clearGrid(){
    let pixels = document.getElementsByClassName('pixel');
    for (let pixel of pixels){
        pixel.style.backgroundColor = 'rgb(230, 230, 230)';
    };
}

let penPick = document.getElementById('penPick'),
    bkPick = document.getElementById('bkPick');

penPick .addEventListener('input', function(event){
    let pickedColor = event.target.value;
});

bkPick .addEventListener('input', function(event){
    let pickedColor = event.target.value;
});





