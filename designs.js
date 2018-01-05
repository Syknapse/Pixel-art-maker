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
    selectedColor = colorInput.val();
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
        for(let r = 1; r <= gridRows; r++){
            pixelCanvas.append(row);
        }
        // Create columns
        for(let c = 1; c <= gridColumns; c++){
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
function increment (i, val){
    return +val +1;
}

function decrement (i, val){
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
    .on('mouseleave', function(){
        if (mouseIsDown){
            if (!clicks){
                // Change background color of cell
                $(this).css('backgroundColor', selectedColor);
            } else {
                // On second click return color to default (erase)
                $(this).css('background-color', '');
            }
            // Fire `if` event on odd clicks
            $(this).data('clicks', !clicks);
        }
    })
    .on('mousedown', function(){
            event.preventDefault();
            mouseIsDown = true;
        })
        .on('mouseup', function(){
            mouseIsDown = false;
        });
    pixelCanvas.on('mouseleave', function(){
        mouseIsDown = false;
    });
}

// Event listener click delegated
pixelCanvas
    .on('click', 'td', draw)
    .on('mousedown', 'td', drag);



// This can log the individual cell clicked, as well as the start and end cell on drag. It serves no purpose in this project any longer. But I made it, and it works, so it's staying here for now!!

/* pixelCanvas.on('mousedown', 'td', function(){
                let startCell = currentCell(this);
                event.preventDefault();
                console.log(startCell);
            })
            .on('mouseup', 'td', function(){
                let endCell = currentCell(this);
                console.log(endCell);
            });

function currentCell (current){
    let columnIndex  = current.cellIndex;
    let rowIndex = current.parentNode.rowIndex;
    let cellIndex = `${rowIndex}-${columnIndex}`;
    return cellIndex;
}
*/


// Extra features: Reset and/or clear grid
// Extra features: Screenshot
// Extra features: Tweet creation/ project
// Extra features: Transitions grid create
// Extra features: Responsive
// Extra features: Other




