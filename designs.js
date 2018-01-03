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

// Reset page
function reset(){
    clearGrid();
    colorInput.val('#000000');
    inputHeight.val(10);
    inputWidth.val(10);
}

// Grid: Clear grid function
function clearGrid(){
    pixelCanvas.children().remove();
}

// Grid: Make grid
function makeGrid(){
    clearGrid();
    // Grid: Grab size value
    let gridWidth = inputWidth.val();
    let gridHeight = inputHeight.val();
    // Grid: Append to table
    // Create rows
    for(let i = 1; i <= gridHeight; i++){
        pixelCanvas.append(rows);
    }
    // Create columns
    for(let j = 1; j <= gridWidth; j++){
        pixelCanvas.children().append(columns);
    }
}


// Event listener Reset page
resetBtn.click(reset);
// Grid: Event listener make new grid on click
submitGridSize.click(makeGrid);

// Grid: add/remove row/column
const addRowBtn = $('#add-row');
const removeRowBtn = $('#remove-row');
const addColumnBtn = $('#add-column');
const removeColumnBtn = $('#remove-column');

function increment (i, val) {
    return val*1+1
}

function decrement (i, val) {
    return val*1-1
}

// function test (param){
//     inputHeight.val(param);
//     makeGrid();
// }

addRowBtn.click(function(){
    inputHeight.val(increment);
    makeGrid();
});

removeRowBtn.click(function(){
    inputHeight.val(decrement);
    makeGrid();
});

addColumnBtn.click(function(){
    inputWidth.val(increment);
    makeGrid();
});

removeColumnBtn.click(function(){
    inputWidth.val(decrement);
    makeGrid();
});

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




