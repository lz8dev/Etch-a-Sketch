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
    penColor = document.getElementById('penColor');

    penPick .addEventListener('input', function(event){
        let pickedColor = event.target.value;
        penColor.style.backgroundColor = pickedColor;
});

/*
    <label for="colorPicker">Choose a color:</label>
    <input type="color" id="colorPicker" name="colorPicker">
    <div id="colorPreview" style="width: 100px; height: 100px; margin-top: 20px;"></div>

    <script>
        const colorPicker = document.getElementById('colorPicker');
        const colorPreview = document.getElementById('colorPreview');

        colorPicker.addEventListener('input', (event) => {
            const selectedColor = event.target.value;
            colorPreview.style.backgroundColor = selectedColor;
        });
    </script>
    */