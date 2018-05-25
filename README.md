# Boilerplate for easy Static Layout and Templating

[![Greenkeeper badge](https://badges.greenkeeper.io/Thram/easy-layout.svg)](https://greenkeeper.io/)

## Installation

```npm install```

## Run
After all is downloaded and ready run:

```gulp -o``` or ```gulp --open```

And the Kitchen Sink will be open

## Pages

To build specific views you just need to put your views into ```src/layouts/views``` and use the page parameter:

```gulp -p=view_name``` or  ```gulp --page=view_name```

To open it in a default browser use the ```-o/--open``` parameter run:
 
 ```gulp -p=view_name -o```
 
## Layouts

You can render different layouts using the ```-l/--layout``` parameter (by default is the 'desktop' layout):
 
 ```gulp -p=view_name -o -l=mobile``` or ```gulp -p=view_name -o -l=tablet```

And that's it!

All will be compiled into the ```dist``` folder

Happy Styling!

By Thram
