// Select size input
const submitGridSize = $('#submit-grid');
// Select Reset button
const resetBtn = $('#reset');
// Select height and width input
const inputRows = $('#input-rows');
const inputColumns = $('#input-columns');
// Select color input
const colorInput = $('#color-picker');
// Store selected color
let selectedColor = colorInput.val();
// Select table
const pixelCanvas = $('#pixel-canvas');
// Rows and columns
const row = '<tr></tr>';
const column = '<td></td>';

// RESET page
function reset(){
    clearGrid();
    colorInput.val('#000000');
    inputRows.val(10);
    inputColumns.val(10);
}
// Event listener Reset page
resetBtn.click(reset);

// GRID
// Clear grid function
function clearGrid(){
    pixelCanvas.children().remove();
}

// Make grid
function makeGrid(){
    clearGrid();
    // Grab size value
    let gridRows = inputRows.val();
    let gridColumns = inputColumns.val();
    // Append to table if input is 150 or less
    if (gridRows <= 150 && gridColumns <= 150){
        // Create rows
        for(let i = 1; i <= gridRows; i++){
            pixelCanvas.append(row);
        }
        // Create columns
        for(let j = 1; j <= gridColumns; j++){
            pixelCanvas.children().append(column);
        }
    }
}

// Event listener make new grid on click
submitGridSize.click(makeGrid);

// GRID BUILDER
// Add/remove row/column
const addRowBtn = $('#add-row');
const removeRowBtn = $('#remove-row');
const addColumnBtn = $('#add-column');
const removeColumnBtn = $('#remove-column');

// increment/decrement row and column input
function increment (i, val) {
    return +val +1;
}

function decrement (i, val) {
    return +val -1;
}

// Build grid. scale = increment or decrement. axis = row or column
function gridBuilder (scale, axis){
    axis.val(scale);
    makeGrid();
}

// Grid-building buttons event listeners
addRowBtn.click(function(){
    gridBuilder(increment, inputRows);
});

removeRowBtn.click(function(){
    gridBuilder(decrement, inputRows);
});

addColumnBtn.click(function(){
    gridBuilder(increment, inputColumns);
});

removeColumnBtn.click(function(){
    gridBuilder(decrement, inputColumns);
});

// DRAW
// Grab color input on change
colorInput.change(function(){
    selectedColor = $(this).val();
});

// draw/erase function
function draw (){
    let clicks = $(this).data('clicks');
    if (!clicks){
        // Change background color of cell
        $(this).css('background-color', selectedColor);
    } else {
        // On second click return color to default (erase)
        $(this).css('background-color', '');
    }
    // Fire `if` event on odd clicks
    $(this).data('clicks', !clicks);
}

// click and drag draw/erase function
function drag () {
    let mouseIsDown = true;
    let clicks = $(this).data('clicks');
    $('td')
        .on('mousemove', function() {
            if (mouseIsDown) {
                if (!clicks){
                    $(this).css('backgroundColor', selectedColor);
                } else {
                    // On second click return color to default (erase)
                    $(this).css('background-color', '');
                }
                // Fire `if` event on odd clicks
                $(this).data('clicks', !clicks);
            }
        })
        .on('mousedown', function() {
            event.preventDefault();
            mouseIsDown = true;
        })
        .on('mouseup', function() {
            mouseIsDown = false;
        });
    pixelCanvas.on('mouseleave', function() {
        mouseIsDown = false;
    });
}

// Event listener click delegated
pixelCanvas
    .on('click', 'td', draw)
    .on('mousedown', 'td', drag);




// Extra features: Reset and/or clear grid
// Extra features: Screenshot
// Extra features: Tweet creation/ project
// Extra features: Transitions grid create
// Extra features: Responsive
// Extra features: Other




