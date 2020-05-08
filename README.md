# Memory Game

## Table of Contents

* [Instructions](#instructions)
* [How to run](#how_to_run)
* [About the project](#about_the_project)
* [Credits](#credits)

## Instructions

A classical memory game
* Aim: display all cards
* Basic rules:
  1. Choose two cards to be displayed
  2. If the two cards have the same symbol, they are kept displayed
  3. If the two cards do not match, they should be flipped down
* Other rules:
  * Every time two cards are flipped, one move is counted
  * After 16 moves, one of three starts gets empty, down to 1
  * A timer is running
  * When all cards are displayed you can see your performance
  * Pressing the curly arrow restarts the game

## How to run

* Standalone: Open index.html with your web browser
* Docker: 
1. `docker build -t memorygame .` 
2. `docker run -p 8000:80 memorygame`
3. Open the web browser and insert `localhost:8000`

## About the project
The program was a project to be done as part of the course "Become a front-end web developer" at Udacity.

A starter code of the HTML and CSS files was provided as well as a very short JavaScript document with some specifications. With the starter code, one could not play. I had to make it work properly.

## Credits
The JavaScript code was developed by Hugo Tiburtino.
The most of the CSS and the HTML codes was provided by Udacity.
I would like to thank you Eman Mohammed A. for valuable tips on the code
