# Hang Man
A hangman word game website, built with multiple ways to play: Single Words or Phrases, Timed or Untimed, and a selection of themed word sets to choose from, all packaged together with a simple and easy on the eyes UI.  

![](/documentation/amiresponsive.png)

## User Stories
- As a user I want to be able to choose to play with a timer or without one
- As a user I want to be able to pick from a selection of word sets
- As a user I want to be able to use my keyboard to play
- As a user I want to be able to play from a mobile device
- As a user if I fail to guess within 11 guesses or 120 seconds I want to be shown the answer

## UX
For the design I chose to have a very simple site using a dark, single colour background so that other elements can use brighter colors and stand out, making visibility easier. On the page for playing the game, each section will be grouped by a violet border, e.g. keyboard for your guesses and the hint will be in two different boxes. The timer will be in a larger font with a larger inner box to make it stand out more to the user. For the colouring of the keyboard, an unused letter will be in blue, as this is the starting colour for all of them the user will instantly understand that means it's an unused letter, once selected the letter will change to either red or green depending on if the guess was correct or not, and in the box that holds the word to be guessed, if the selected letter is correct, the corresponding box will be changed to green and hold that letter.
 
### Colour Scheme
I used [colorminds](http://colormind.io/) to create a colour palette for my site.

I plan to only use two colours from this, one for the background and another for button hover overs, as on the game page borders will be used heavily and they will be coloured using mainly primary colours, so a simple coloured background will help them stand out and with visibility.

![](documentation/colours.png)

*Scheme Used*

### Typography
To select my fonts I used [Font Joy](https://fontjoy.com/)

I decided to use a simple, thin, functional font. I chose Fira Sans and used the site above to find a second font to pair with it. I used Fira Sans as the Header font as it stands out, because of that I also used it in the game page for all of the letters used. I thought it would be distracting to have multiple fonts on the screen due to the many different buttons and sections, and having a font that stands out would help with this.


![](documentation/fonts.png)

*Fonts Used*
### Wireframes
![](documentation/wireframes/index-wireframe.png)

*Index Wireframe*


![](documentation/wireframes/play-wireframe.png)

*Play Wireframe*
## Features
### Existing Features
- How To Play
    - Link in nav bar that brings up a modal to teach you how to play the game

![How To Play](documentation/features/how-to-play.png)

- Game Options
    - Dropdown that auto fills word sets for the user to pick from
    - Checkbox to select if you want have a timer or not
    - Allows the user to change how they want to play

![Index](documentation/features/index.png)

- Play 
    - Depending on options selected will either have a timer box and guesses left box, or just a guesses left box
    - A box containing the word to be guessed with the correct amount of squares
    - A box containing a hint
    - A keyboard for guessing letters
    - A hidden "Play Again" button that replaces the guesses left/timer box once the game is over

![Timed phrase incomplete](documentation/features/timed-phrase-incomplete.png)
*Timed phrase incomplete*

![Timed phrase complete](documentation/features/timed-phrase-complete.png)
*Timed phrase complete*

![Phrase fail](documentation/features/phrase-fail.png)
*Phrase Fail*

![Untimed word incomplete](documentation/features/untimed-word-incomplete.png)
*Untimed word incomplete*

![Word complete](documentation/features/word-complete.png)
*Word complete*

![Play Again](documentation/features/play-again.png)
*Play Again*

### Features Left to Implement
Read from the non-sentence and sentence folders and fill the selects on index with them.

Have a random mode which uses an api like https://dictionaryapi.dev/ to get random words

## Technologies Used
- I used [git](https://git-scm.com/) for version control and storage.
- To help with using git, I used [github](https://github.com/).

- I used [html](https://en.wikipedia.org/wiki/HTML) to design the site.
- And [CSS](https://en.wikipedia.org/wiki/CSS) to style the site.
- For the games functionality, I used [Javascript](https://en.wikipedia.org/wiki/JavaScript)
- To help with styling I used a css debugger to help me with things like positioning and size: [link](https://github.com/benscabbia/x-ray).
- For my IDE I used Gitpod, [link](https://www.gitpod.io/).
- I used githubs [projects](https://github.com/edenobrega/multimode-hangman-5p/projects/1) tab to track what i needed to do and what problems i came across 
![github projects image](documentation/github-projects.png)
## Testing

To see all testing see [TESTING.md](documentation/TESTING.md)

## Deployment
The site was deployed to GitHub pages. The steps to deploy are as follows:

1. In the GitHub repository, navigate to the Settings tab.
2. From the Settings tab, scroll down until you see the 'Pages' button on the left.
3. From the Source section drop-down menu, select the Main branch.
4. Once the Main branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

The live link can be found here - https://edenobrega.github.io/multimode-hangman-5p/

## Local Deployment
To make a local copy of this project, you can clone it by typing the following in your IDE terminal:

- `git clone https://github.com/edenobrega/multimode-hangman-5p.git`

Alternatively, if using Gitpod, you can click below to create your own workspace using this repository.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/edenobrega/multimode-hangman-5p)

## Credits

### Content
https://www.ef.com/wwen/blog/language/20-english-idioms-that-everyone-should-know/
https://datahub.io/core/country-list#data-cli
### Media
