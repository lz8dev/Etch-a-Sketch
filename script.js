function createGrid(){
    for (let i=0; i<16*16; i++){
        let container = document.getElementById('grid'),
            pixel= document.createElement('div');
        pixel.classList.add('pixel');
        grid.appendChild(pixel  )
    }
}