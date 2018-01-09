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

//////////////////////////////////////
/*
// Option with disabled typing in number input
function reset(){
    clearGrid();
    colorInput.val('#000000');
    selectedColor = colorInput.val();
    inputRows.val(10);
    inputColumns.val(10);
    makeGrid();
}

// Start with a 10x10 grid
makeGrid();
// Disable inputting numbers
$("[type='number']").keypress(function (evt) {
    evt.preventDefault();
}); */


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

////////////// difference between input and actual table
// This function executed at the start of buildGrid finds the difference between the number of rows indicated in the input vs the actual current number of rows just before building. rowsDiff is then used as the number of loops to build. in effect it adds a single row when they match or as many as needed when they don't
let rowsDiff = 0;
let columnsDiff = 0;
function countRows(){
    let gridRows = inputRows.val();
    let currentGridRows = 0;
    currentGridRows = pixelCanvas.children('tr').length;
    rowsDiff = gridRows - currentGridRows;
    // console.log(currentGridRows);
    // console.log(gridRows);
    // console.log(rowsDiff);
}
//////////////
function countColumns(){
    let gridColumns = inputColumns.val();
    let currentGridColumns = 0;
    currentGridColumns = pixelCanvas.children().first().children().length;
    columnsDiff = gridColumns - currentGridColumns;
    // console.log(currentGridColumns);
    // console.log(gridColumns);
    // console.log(columnsDiff);
}


// This with test = axis.val(); executed in gridBuilder, means the value of button and input are now always the same. maybe add btn param to make it work for all four buttons
let test = addRowBtn.val();

// Build grid & update input. scale = increment or decrement. axis = row or column
function gridBuilder (scale, axis){
    axis.val(scale);
    buildGrid(scale, axis);
    test = axis.val();
    // console.log(test);
}

////////////////////////////////////////////////////
// This function adds a row without resetting the grid (painting persists), adds a column (but doesn't appear if row=0), the remove function is not yet implemented
// the main issue is that inputting numbers manually puts the Btns out of sync with the actual input
function buildGrid(scale, axis){
    countRows();
    countColumns()
    if (scale === increment && axis === inputRows){
        for (let r = 1; r <= rowsDiff; r++){
            const addRow = $("<tr></tr>");
            pixelCanvas.append(addRow);
            for(let c = 1; c <= inputColumns.val(); c++){
                const addColumn = $("<td></td>");
                addRow.append(addColumn);
            }
        }
    } else if (scale === decrement && axis === inputRows){
        pixelCanvas.children().last().remove();
    } else if (scale === increment && axis === inputColumns){
        pixelCanvas.children().append(column);
    } else {
        $('tr').each(function(){
            $('td').last().remove(); ///////////////////////
        });
    }
}

// Grid-building buttons event listeners
addRowBtn.click(function(){
    gridBuilder(increment, inputRows);
});

removeRowBtn.click(function(){
    gridBuilder(decrement, inputRows);
});

addColumnBtn.click(function(){
    //Checks if there are rows already created
    if ( pixelCanvas.children('tr').length ) {
        gridBuilder(increment, inputColumns);
    } else {
        // Creates rows
       buildGrid(increment, inputRows);
        gridBuilder(increment, inputColumns);
    }
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




