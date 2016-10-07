# ColorStyler

![alt tag](https://raw.githubusercontent.com/johsund/ColorStyler/master/img/Map_GradientTheme.png)

Qlik ColorStyler lets you set color themes and gradients for Qlik Sense master objects without having to know how to write color expressions.

It can be tricky to figure out how to write color expressions for complex gradients using ColorMix1() and ColorMix2() functions so ColorStyler does that for you.

Here's a youtube video that walks through the application and demonstrates how it can be used:
https://www.youtube.com/watch?v=p7z-ih3pOIU

[![IMAGE ALT TEXT](https://img.youtube.com/vi/p7z-ih3pOIU/0.jpg)](https://www.youtube.com/watch?v=p7z-ih3pOIU "ColorStyler")

# Installation & Setup

 * Download zipped extension
 * Unzip to __C:\Users\<USER>\Documents\Qlik\Sense\Extensions__ for Qlik Sense desktop use
 * Import the zip through the __Qlik Sense Management Console__ for Qlik Sense server use
 
 
 # How to use
 
  * Desktop: http://localhost:4848/extensions/colorstyler/colorstyler.html
  * Server: http(s)://servername/virtualproxy/extensions/colorstyler/colorstyler.html
 
  * Click on __HELP__ in top right corner for assistance
  
  ![alt tag](https://raw.githubusercontent.com/johsund/ColorStyler/master/img/HelpView.png)
  
  * Select an app from the dropdown
  
  ![alt tag](https://raw.githubusercontent.com/johsund/ColorStyler/master/img/AppDropdown.png)
  
  * Pick a master item from the list __(Note that only Master Items are shown)__
  
  ![alt tag](https://raw.githubusercontent.com/johsund/ColorStyler/master/img/MasterItemDescription.png)
  
  * There are 4 different color modes
  
    * Single color picker
    
    ![alt tag](https://raw.githubusercontent.com/johsund/ColorStyler/master/img/SingleColor.png)
    
    * Theme picker
    
    ![alt tag](https://raw.githubusercontent.com/johsund/ColorStyler/master/img/Themes.png)
    
    * Gradient designer
    
    ![alt tag](https://raw.githubusercontent.com/johsund/ColorStyler/master/img/Gradient.png)
    
    * Gradient Theme picker
    
    ![alt tag](https://raw.githubusercontent.com/johsund/ColorStyler/master/img/GradientThemes.png)

# Extras

You are able to define your own themes as well as gradient themes.
These can be added in the __themes.js__ and __gradientThemes.js__ files.

* Themes - add a new item to the array. Give it a new ID, Name and Palette
![alt tag](https://raw.githubusercontent.com/johsund/ColorStyler/master/img/ThemeEdit.png)

* Gradient Themes - add a new item to the array. Give it a new ID, Name and Palette (2 or 3 colors)
![alt tag](https://raw.githubusercontent.com/johsund/ColorStyler/master/img/GradientThemeEdit.png)

# Examples
![alt tag](https://raw.githubusercontent.com/johsund/ColorStyler/master/img/PieChart_Theme.png)
![alt tag](https://raw.githubusercontent.com/johsund/ColorStyler/master/img/Treemap_Theme.png)

  
