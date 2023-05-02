# 7 JavaScript Games
A monorepo containing all the games I built following along with freeCodeCamp's [Learn JavaScript by Building 7 Games video on YouTube](https://www.youtube.com/watch?v=ec8vSKJuZTk).

Dev Notes:
* 04/26/2023:
  * Add nav bar to game pages
* 05/01/2023:
  * Add buttons to Breakout & Frogger to improve mobile a11y
* 05/02/2023:
  * Figure out how to adjust text-size for better mobile visibility
    * "em" or "rem"?
  * Learn TailwindCSS?
  * Make a plan for more difficult levels
    * All games
      * Use `export-module` & `require` to create "abstract class" to pull from for each level
      * game.html --> game2.html & app.js > level1.js etc
    * Frogger
      * Increase game board size
      * Increase speed of cars & boats
      * Add logs?
      * Add obstacles
        * Walls in the grass
        * Whirlpools in the radioactive runoff
        * Median dividers in the road
    * Breakout
      * Increase ball speed
      * Add extra layers of blocks
      * Different layers = different classes & colors
    * Whack-A-Mole
      * Bigger grid
      * Faster mole
      * Minimum score threshold to continue
    * Memory
      * Add more cards
      * Add timer
      * Add score
        * Add 5 points for each correct match
        * Subtract 1 point for each incorrect match