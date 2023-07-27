function createGrid(){
    for (let i=0; i<16*16; i++){
        let container = document.getElementById('grid'),
            pixel= document.createElement('div');
        pixel.classList.add('pixel');
        grid.appendChild(pixel  )
    }
};
createGrid();

let pixels = document.getElementsByClassName('pixel'),
    isDrawing = false;

for (let pixel of pixels){
    pixel.addEventListener('mousedown', function(){
        isDrawing = true;
        pixel.style.backgroundColor = 'blue';
    });
    /*pixel.addEventListener('mouseenter', function(){
        if(isDrawing){
            pixel.style.backgroundColor = 'blue';
        } else if(getComputedStyle(pixel).backgroundColor === 'rgb(255, 255, 255)'){
            pixel.style.backgroundColor = 'rgb(218, 218, 218)'; //Must be set in rgb to allow using getComputedStyle in the next listener
        }
    });*/
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


function clearGrid(){
    for (let pixel of pixels){
        pixel.style.backgroundColor = 'white';
    };
}