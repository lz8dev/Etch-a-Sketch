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

let sizeButtons = document.getElementById("sizeButtons"),
    sizeValue = document.getElementById("sizeValue"),
    renderingDiv = document.getElementById("rendering"),
    penPick = document.getElementById('penPick'),
    bkPick = document.getElementById('bkPick'),
    classic = document.getElementById('classic')
    pen = document.getElementById('pen'),
    eraser = document.getElementById('eraser'),
    shade = document.getElementById('shade'),
    rainbow = document.getElementById('rainbow'),
    gridLines = document.getElementById('gridLines'),
    random = document.getElementById('random'),
    clear = document.getElementById('clear'),
    eraseButton = false,
    shadeButton = false,
    rainButton = false;

renderingDiv.style.color = 'black';

sizeButtons.addEventListener("click", function (event) {
if (event.target.tagName === "BUTTON") {
    let value = parseInt(event.target.dataset.size);
    sizeValue.textContent = `Current size: ${value} x ${value} px`;
    sizeButtons.querySelectorAll("button").forEach(button => button.disabled = true);
    createGrid(value);
}
});

clear.addEventListener("click", function (event) {
    clearGrid();
});

pen.addEventListener("click", function (event) {
    clearButtons();
});

eraser.addEventListener("click", function (event) {
    clearButtons();
    eraseButton = true;
});

shade.addEventListener("click", function (event) {
    clearButtons();
    shadeButton = true;
});

rainbow.addEventListener("click", function (event) {
    clearButtons();
    rainButton = true;
});

function clearButtons(){
    eraseButton = false,
    shadeButton = false,
    rainButton = false;
}

function shadding(pixel){
    let currentColor = pixel.style.backgroundColor,
                    rgbValue = currentColor.substring(4, currentColor.length - 1).split(', ');

    if (rgbValue.length === 3) {
        let r = parseInt(rgbValue[0]);
        let g = parseInt(rgbValue[1]);
        let b = parseInt(rgbValue[2]);
        
        if (r > 0 || g > 0 || b > 0) {
            r = Math.max(0, r - 10);
            g = Math.max(0, g - 10);
            b = Math.max(0, b - 10);
            pixel.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
    };
}

function rainbowColor(pixel){
    let currentColor = pixel.style.backgroundColor,
                    rgbValue = currentColor.substring(4, currentColor.length - 1).split(', ');

    if (rgbValue.length === 3) {
        let r = parseInt(rgbValue[0]),
            g = parseInt(rgbValue[1]),
            b = parseInt(rgbValue[2]);
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
        pixel.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
}

classic.addEventListener("click", function (event) {
    penPick.value = '#8F8F8F';
    bkPick.value = '#F0F0F0';
    clearGrid();
    clearButtons();    
});

//Modified createGrid function to obtain the batch rendering effect
function createGrid(size) {
    let grid = document.getElementById('grid');
    renderingDiv.style.color = 'white';
    grid.innerHTML = '';
    document.documentElement.style.setProperty('--gridRes', size);
    const batchSize = 50; // Adjust the batch size as needed
    let count = 0;

    function renderBatch() {
        for (let i = 0; i < batchSize && count < size * size; i++) {
            let pixel = document.createElement('div');
            pixel.classList.add('pixel');
            grid.appendChild(pixel);
            pixel.backgroundColor = bkPick.value;
            count++;
        };
        if (count < size * size) {
            requestAnimationFrame(renderBatch);
        } else {
            startDraw();
            sizeButtons.querySelectorAll("button").forEach(button => button.disabled = false);
            renderingDiv.style.color = 'black';
            
        };
        clearGrid();
    };
    renderBatch();
}

function clearGrid(){
    let pixels = document.getElementsByClassName('pixel');
    for (let pixel of pixels){
        pixel.style.backgroundColor = bkPick.value;
    };
}

function startDraw(){
    let pixels = document.getElementsByClassName('pixel'),
        isDrawing = false,
        isErasing = false,
        isShading = false,
        isRainbow = false;

    pixels.backgroundColor = bkPick.value;

    for (let pixel of pixels){
        pixel.addEventListener('mousedown', function(event){
            event.preventDefault(); //Prevent default behavior of dragging 

            if (eraseButton){
                isErasing = true;
                pixel.style.backgroundColor = bkPick.value;    
            } else if (shadeButton) {
                isShading = true;
                shadding(pixel);
            } else if (rainButton) {
                isRainbow = true;
                rainbowColor(pixel);
            } else {
                isDrawing = true;
                pixel.style.backgroundColor = penPick.value;
            }
        });
        
        pixel.addEventListener('mouseenter', function(){
            if(isDrawing){
                pixel.style.backgroundColor = penPick.value;
            } else if(isErasing) {
                pixel.style.backgroundColor = bkPick.value;
            } else if(isShading) {
                shadding(pixel);
            } else if(isRainbow){
                rainbowColor(pixel);
            }
        });
        
        document.addEventListener('mouseup', function() {
            isDrawing = false;
            isErasing = false;
            isShading = false;
            isRainbow = false;
        });
    }
}





