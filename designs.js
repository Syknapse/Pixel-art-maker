// Select size input
const submitGridSize = $('#submit-grid');
// Select Reset button
const resetBtn = $('#reset');
// Select height and width input
const inputHeight = $('#input-height');
const inputWidth = $('#input-width');
// Select color input
const colorInput = $('#color-picker');
// Store selected color
let selectedColor = colorInput.val();
// Select table
const pixelCanvas = $('#pixel-canvas');
// Rows and columns
const rows = '<tr></tr>';
const columns = '<td></td>';

// Grid: Clear grid function
function clearGrid(){
    pixelCanvas.children().remove();
}

// Grid: Make grid
function makeGrid() {
    // Grid: Grab size value
    let gridWidth = Number($('#input-width').val());
    let gridHeight = Number($('#input-height').val());
    // Grid: Append to table
    // Create rows
    for(let i = 0; i <= gridHeight; i++){
        pixelCanvas.append(rows);
    }
    // Create columns
    for(let j = 0; j <= gridWidth; j++){
        pixelCanvas.children().append(columns);
    }
}

// Grid: Event listener Reset grid
resetBtn.click(clearGrid);
// Grid: Event listener clear previous grid on click
submitGridSize.mousedown(clearGrid);
// Grid: Event listener make new grid on click
submitGridSize.mouseup(makeGrid);
// Grid: Event listener click on number input
inputHeight.click(clearGrid);
inputHeight.click(makeGrid);
inputWidth.click(clearGrid);
inputWidth.click(makeGrid);



// Draw: Grab color input
colorInput.change(function(){
    selectedColor = $(this).val();
});
// Draw: Event listener click
pixelCanvas.on('click', 'td', function(){
    // Draw: Change background color of table cell
    $(this).css('background-color', selectedColor);
});


// Extra features: Click and drag
// Extra features: Eraser
// Extra features: Reset and/or clear grid
// Extra features: Screenshot
// Extra features: Tweet creation/ project
// Extra features: Transitions grid create
// Extra features: Responsive
// Extra features: Other




