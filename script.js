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
            pixel.style.backgroundColor = 'blue';
        });
        
        pixel.addEventListener('mouseenter', function(){
            if(!isDrawing && getComputedStyle(pixel).backgroundColor === 'rgb(255, 255, 255)'){
                pixel.style.backgroundColor = 'rgb(218, 218, 218)'; //Must be set in rgb to allow using getComputedStyle in the next listener
            }else if(isDrawing){
                pixel.style.backgroundColor = 'blue';
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
        pixel.style.backgroundColor = 'white';
    };
}