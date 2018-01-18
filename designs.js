// Select size input
const createGridBtn = $('#create-grid');
// Select Reset button
const resetBtn = $('#reset');
// Select Clear Grid button
const clearBtn = $('#clear-grid')
// Select height and width input
const inputRows = $('#input-rows');
const inputColumns = $('#input-columns');
// Select color input
const colorInput = $('#color-picker');
// Select table
const pixelCanvas = $('#pixel-canvas');
// Rows and columns
const row = '<tr></tr>';
const column = '<td></td>';

// RESET page
function reset(){
    removeGrid();
    colorInput.val('#4286f4');
    selectedColor = colorInput.val();
    inputRows.val(10);
    inputColumns.val(10);
    currentGridRows = 0;
    inputRows.css('color', '');
    inputColumns.css('color', '');
}

resetBtn.click(reset);

// Disable context menu on grid
pixelCanvas.contextmenu(function() {
    return false;
});

// GRID
////////////////////////////////////////////////

// Clear grid
function removeGrid(){
    pixelCanvas.children().remove();
}

function clearGrid(){
    countRows();
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

addRowBtn.on('touchstart mousedown', function(){
    // detect touch screen event
    if (event.type === 'touchstart'){
        gridBuilder(increment, inputRows, addRowBtnValue);
    } else {
        // Allow single click or click and hold to add multiple
        clickAndHold = setInterval(function(){
            gridBuilder(increment, inputRows, addRowBtnValue);
        }, 80);
    }
}).on('mouseup mouseleave', function(){
    clearInterval(clickAndHold);
});

removeRowBtn.on('touchstart mousedown', function(){
    if (event.type === 'touchstart'){
        buildGrid(increment, inputRows);
        gridBuilder(decrement, inputRows, removeRowBtnValue);
    } else {
        // builds missing rows before removing
        buildGrid(increment, inputRows);
        clickAndHold = setInterval(function(){
            gridBuilder(decrement, inputRows, removeRowBtnValue);
        }, 80);
    }
}).on('mouseup mouseleave', function(){
    clearInterval(clickAndHold);
});

addColumnBtn.on('touchstart mousedown', function(){
    if (event.type === 'touchstart'){
        buildGrid(increment, inputRows);
        gridBuilder(increment, inputColumns, addColumnBtnValue);
    } else {
        // builds grid if it's not there yet
        buildGrid(increment, inputRows);
        clickAndHold = setInterval(function(){
            gridBuilder(increment, inputColumns, addColumnBtnValue);
        }, 80);
    }
}).on('mouseup mouseleave', function(){
    clearInterval(clickAndHold);
});

removeColumnBtn.on('touchstart mousedown', function(){
    if (event.type === 'touchstart'){
        buildGrid(increment, inputRows);
        gridBuilder(decrement, inputColumns, removeColumnBtnValue);
    } else {
        // builds grid before removing column
        buildGrid(increment, inputRows);
        clickAndHold = setInterval(function(){
            gridBuilder(decrement, inputColumns, removeColumnBtnValue);
        }, 80);
    }
}).on('mouseup mouseleave', function(){
    clearInterval(clickAndHold);
});

// Add/remove rows/columns buttons value
let addRowBtnValue = addRowBtn.val();
let removeRowBtnValue = removeRowBtn.val();
let addColumnBtnValue = addColumnBtn.val();
let removeColumnBtnValue = removeColumnBtn.val();

// listen to change in input: invalid input alert, and update btn value,
inputRows.on('keyup mouseup', function(){
    invalidRowInputAlert();
    addRowBtnValue = inputRows.val();
    removeRowBtnValue = inputRows.val();
});

inputColumns.on('keyup mouseup', function(){
    invalidColumnInputAlert();
    addColumnBtnValue = inputColumns.val();
    removeColumnBtnValue = inputColumns.val();
});

// Listen to focus out or enter key on input and build grid
inputRows
.focusout(function(){
    validateRowInput();
    buildGrid(increment, inputRows);
})
.keypress(function(event){
    const key = (event.keyCode ? event.keyCode : event.which);
    if (key == '13'){
        validateRowInput();
        buildGrid(increment, inputRows);
    }
});

inputColumns
.focusout(function(){
    validateColumnInput();
    countColumns();
    if (currentGridColumns < 1){
        buildGrid(increment, inputRows);
    } else {
        buildGrid(increment, inputColumns);
    }
})
.keypress(function(event){
    const key = (event.keyCode ? event.keyCode : event.which);
    validateColumnInput();
    countColumns();
    if (key == '13'){
        if (currentGridColumns < 1){
            buildGrid(increment, inputRows);
        } else {
            buildGrid(increment, inputColumns);
        }
    }
});

// Create grid button
createGridBtn.click(makeGrid);

function makeGrid(){
    countRows();
    countColumns();
    buildGrid(increment, inputRows);
}

// Build grid, update input, & update btn value.
// Param: scale = increment or decrement. axis = row or column. btn = add/remove rows/columns buttons
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
    validateRowInput();
    validateColumnInput();
    countRows();
    countColumns();
    // Find out which button triggered the function
    if (scale === increment && axis === inputRows){
        // Compare input to current grid to add or remove accordingly
        currentGridRows < inputRows.val() ? constructRows() : eliminateRows();
    } else if (scale === decrement && axis === inputRows){
        currentGridRows > inputRows.val() ? eliminateRows() : constructRows();
    } else if (scale === increment && axis === inputColumns){
        currentGridColumns < inputColumns.val() ? constructColumns() : eliminateColumns();
    } else {
        currentGridColumns > inputColumns.val() ? eliminateColumns() : constructColumns();
    }
}

// Limit grid size 1-150. Prevent input of other values, change number color warning for min/max and invalid values,
function validateRowInput(){
    if (inputRows.val() < 1 ){
        inputRows.val(1);
    } else if (inputRows.val() > 150){
        inputRows.val(150);
    }
    invalidRowInputAlert();
}

function invalidRowInputAlert(){
    if (inputRows.val() < 1 || inputRows.val() > 150){
        inputRows.css('color', 'red');
    } else if (inputRows.val() == 1 || inputRows.val() == 150){
        inputRows.css('color', '#DBA70D');
    } else {
        inputRows.css('color', '');
    }
}

function validateColumnInput(){
    if (inputColumns.val() < 1){
        inputColumns.val(1);
    } else if (inputColumns.val() > 150){
        inputColumns.val(150);
    }
    invalidColumnInputAlert();
}

function invalidColumnInputAlert(){
    if (inputColumns.val() < 1 || inputColumns.val() > 150){
        inputColumns.css('color', 'red');
    } else if (inputColumns.val() == 1 || inputColumns.val() == 150){
        inputColumns.css('color', '#DBA70D');
    } else {
        inputColumns.css('color', '');
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

// Construct/eliminate rows/columns
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

//////////////////////////////////////////////// ^ GRID ^

// DRAW
////////////////////////////////////////////////

let defaultColor = colorInput.val('#4286f4');

// Convert hex to rgb
function hexToRgb(hex){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0, hex.length/3), 16);
    g = parseInt(hex.substring(hex.length/3, 2*hex.length/3), 16);
    b = parseInt(hex.substring(2*hex.length/3, 3*hex.length/3), 16);

    result = `rgb(${r}, ${g}, ${b})`;
    return result;
};

// Color on single click. If same color erase
function draw(){
    let selectedColor = colorInput.val();
    $(this).css("background-color") == hexToRgb(selectedColor) ?
    $(this).css('background-color', '') : $(this).css('background-color', selectedColor);
};

// click and drag draw/erase function
function drag(){
    let mouseIsDown = true;
    let clicks = $(this).data('clicks');
    pixelCanvas
    .on('mouseleave', 'td', function(){
        if (mouseIsDown){
            if (!clicks){
                // Change background color of cell
                $(this).css('background-color', colorInput.val());
            } else {
                // On second click return color to default (erase)
                $(this).css('background-color', '');
            }
            // Fire `if` event on odd clicks
            $(this).data('clicks', !clicks);
        }
    })
    .on('mousedown', 'td', function(){
        event.preventDefault();
        mouseIsDown = true;
    })
    .on('mouseup', 'td', function(){
        mouseIsDown = false;
    });
    pixelCanvas.on('mouseleave', function(){
        mouseIsDown = false;
    });
}

// Event listener click delegated
pixelCanvas
.on('mousedown', 'td', draw)
.on('mousedown', 'td', drag);

