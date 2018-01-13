// Select size input
const submitGridSize = $('#submit-grid');
// Select Reset button
const resetBtn = $('#reset');
// Select Clear Grid button
clearBtn = $('#clear-grid')
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
    removeGrid();
    colorInput.val('#000000');
    selectedColor = colorInput.val();
    inputRows.val(10);
    inputColumns.val(10);
    currentGridRows = 0;
}

resetBtn.click(reset);

// GRID
////////////////////////////////////////////////

// Clear grid
function removeGrid(){
    pixelCanvas.children().remove();
}

function clearGrid(){
    if (currentGridRows > 0){
        removeGrid();
        makeGrid();
    }
}

clearBtn.click(clearGrid);

// GRID BUILDER
////////////////////

// Add/remove row/column buttons
const addRowBtn = $('#add-row');
const removeRowBtn = $('#remove-row');
const addColumnBtn = $('#add-column');
const removeColumnBtn = $('#remove-column');

// Event listeners for grid-building buttons
let clickAndHold;

addRowBtn.mousedown(function(){
    // Allow single click or click and hold to add multiple
    clickAndHold = setInterval(function(){
        gridBuilder(increment, inputRows, addRowBtnValue);
    }, 80);
}).mouseup(function(){
    clearInterval(clickAndHold);
});

removeRowBtn.mousedown(function(){
    // builds missing rows before removing
    buildGrid(increment, inputRows);
    clickAndHold = setInterval(function(){
        gridBuilder(decrement, inputRows, removeRowBtnValue);
    }, 80);
}).mouseup(function(){
    clearInterval(clickAndHold);
});

addColumnBtn.mousedown(function(){
    // builds grid if it's not there yet
    buildGrid(increment, inputRows);
    clickAndHold = setInterval(function(){
        gridBuilder(increment, inputColumns, addColumnBtnValue);
    }, 80);
}).mouseup(function(){
    clearInterval(clickAndHold);
});

removeColumnBtn.mousedown(function(){
    // builds grid before removing column
    buildGrid(increment, inputRows);
    clickAndHold = setInterval(function(){
        gridBuilder(decrement, inputColumns, removeColumnBtnValue);
    }, 80);
}).mouseup(function(){
    clearInterval(clickAndHold);
});

// Add/remove rows/columns buttons value
let addRowBtnValue = addRowBtn.val();
let removeRowBtnValue = removeRowBtn.val();
let addColumnBtnValue = addColumnBtn.val();
let removeColumnBtnValue = removeColumnBtn.val();

// listen to change in input and update btn value
inputRows.on('keyup mouseup', function(){
    addRowBtnValue = inputRows.val();
    removeRowBtnValue = inputRows.val();
});

inputColumns.on('keyup mouseup', function(){
    addColumnBtnValue = inputColumns.val();
    removeColumnBtnValue = inputColumns.val();
});

// Listen to enter key on input and construct grid
inputRows.keypress(function(event){
    const key = (event.keyCode ? event.keyCode : event.which);
    if (key == '13'){
        makeGrid();
    }
});

inputColumns.keypress(function(event){
    const key = (event.keyCode ? event.keyCode : event.which);
    if (key == '13'){
        makeGrid();
    }
});

// Create grid button
submitGridSize.click(makeGrid);

function makeGrid(){
    countRows();
    countColumns();
    buildGrid(increment, inputRows);
    buildGrid(increment, inputColumns);
}

// Build grid, update input, & update btn value. scale = increment or decrement. axis = row or column. btn = add/remove rows/columns buttons
function gridBuilder (scale, axis, btn){
    axis.val(scale);
    buildGrid(scale, axis);
    btn = axis.val();
}

// increment/decrement row and column input
function increment (i, val){
    return +val +1;
}

function decrement (i, val){
    return +val -1;
}

// Build grid, based on event, and difference between current grid and input value
function buildGrid(scale, axis){
    countRows();
    countColumns()
    // Find out which button triggered the function
    if (scale === increment && axis === inputRows){
        // Compare input to current grid to add or remove accordingly
        currentGridRows < inputRows.val() ? constructRows() : eliminateRows();
        /* if (currentGridRows < inputRows.val()){
            constructRows();
        } else {
            eliminateRows();
        } */
    } else if (scale === decrement && axis === inputRows){
        if (currentGridRows > inputRows.val()){
            eliminateRows();
        } else {
            constructRows();
        }
    } else if (scale === increment && axis === inputColumns){
        if (currentGridColumns < inputColumns.val()){
            constructColumns();
        } else {
            eliminateColumns();
        }
    } else {
        if (currentGridColumns > inputColumns.val()){
            eliminateColumns();
        } else {
            constructColumns();
        }
    }
}

// Store difference between current rows/columns on screen and the input value
let rowsDiff = 0;
let columnsDiff = 0;
let currentGridRows = 0;
let currentGridColumns = 0;

function countRows(){
    let gridRows = inputRows.val();
    currentGridRows = pixelCanvas.children('tr').length;
    rowsDiff = Math.abs(gridRows - currentGridRows);
}

function countColumns(){
    let gridColumns = inputColumns.val();
    currentGridColumns = pixelCanvas.children().first().children().length;
    columnsDiff = Math.abs(gridColumns - currentGridColumns);
}

// Functions to construct/eliminate rows/columns
function constructRows(){
    for (let r = 1; r <= rowsDiff; r++){
        const addRow = $("<tr></tr>");
        pixelCanvas.append(addRow);
        for(let c = 1; c <= inputColumns.val(); c++){
            const addColumn = $("<td></td>");
            addRow.append(addColumn);
        }
    }
}

function eliminateRows(){
    for (let r = 1; r <= rowsDiff; r++){
        pixelCanvas.children().last().remove();
    }
}

function constructColumns(){
    for (let c = 1; c <= columnsDiff; c++){
        pixelCanvas.children().append(column);
    }
}

function eliminateColumns(){
    for (let c = 1; c <= columnsDiff; c++){
        $('tr').each(function(){
            $(this).find("td:last").remove();
        });
    }
}

//////////////////////////////////////////////// ^ GRID BUILDER ^

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



// convert rgb to hex on click
/* let thisHex = pixelCanvas.on('click', 'td', function(){
    rgbToHex( $(this).css('background-color') );

});
function rgbToHex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
     ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
} */


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




