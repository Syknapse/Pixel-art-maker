# Pixel Art Maker
[![pixelartv2](https://user-images.githubusercontent.com/29199184/34966797-c388af26-fa5e-11e7-9262-38dea639aecd.gif)](https://syknapse.github.io/Pixel-art-maker/ "Go to project site, and draw something!")

## Introduction

This is the final project in Udacity's Google Developer Challenge Scholarship: Front-End Web Dev program; a Google sponsored scholarship that I have received.

<img src="https://user-images.githubusercontent.com/30567608/34641846-764d2d78-f30a-11e7-9c8c-f0a1b1a221dd.png" alt="Google Developer Challenge Scholarship badge" width="200px" title="Google Developer Challenge Scholarship">

The aim of this project is to use the front-end basics learnt throughout the course to build a pixel art maker.

**The project brief was as follows:**

+ Dynamically set the size of the table as an N by M grid.
+ Choose a color.
+ Click a cell in the grid to fill that cell with the chosen color.

## Advanced features

After meeting the initial brief I decided to add a few more advanced features. My aim was to expand and improve my use of JavaScript and jQuery, developing the required logic, problem solving, and increasing my ability to narrow down possible reasons for bugs and propose solutions.

I gave myself the objective of making sure the **User Experience** remained top of my agenda as I worked and thus forced myself to implement the most intuitive solution without ever needing written instructions for the user, even if that meant a much more complex code.

### Additional features I successfully implemented:

+ Color by clicking and by clicking and dragging.
+ Erase on second click, also works with drag.
+ Replace a color with a single click.
+ Add or remove columns or rows at any time without resetting your drawing.
+ Add/remove individual rows/columns with +/- buttons. Also add multiple on click and hold.
+ Add/remove rows/columns by typing values manually, or using arrow followed by enter or <kbd>Make Grid</kbd> button.
+ Only valid size allowed (between 1-150). Buttons will stop on invalid input, manual entry will revert to nearest valid.
+ Number in input will dynamically change color as you type; change to orange when min/max value reached, and red for any invalid value.
+ <kbd>Clear Grid</kbd> button maintains same grid size and clears the drawing.
+ <kbd>Reset</kbd> button takes the page back to default values.
+ Responsive on Mobile.
+ Vertical layout on very narrow screens.

### Possible Improvements

+ Pixels maintain a square shape at any size.
+ Draw by swiping on touch screens.

### Known Issues

+ Grid sometimes can be accidentally dragged.
+ Draw by dragging color only applies to pixel on `mouseleave` instead of `mouseenter`.
+ Draw by dragging with a new color starting from a previously colored square and moving to a blank one erases instead of coloring.

## Technologies Used

+ HTML
+ CSS
+ JavaScript
+ jQuery

## Acknowledgement

Thanks to the mentors and the student community of the course for the feedback, ideas, and help throughout the course and especially with this project.
