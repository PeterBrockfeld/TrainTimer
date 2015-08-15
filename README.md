# TrainTimer

## Table of Contents

* [Purpose](#purpose)
* [How to use it](#how-to-use-it)
 * [Limitations](#limitations)
* [License](#license) 

## Purpose

The TrainTimer is a web application meant to be used offline: in the gym. In my gym is a training circle which has a central clock to schedule the single training units. This clock isn't viewable from every position in the circle. As a remedy I wrote this app (honestly, it was made to learn the use of the application cache).

Once started the timer counts down the training time, then the pause time, then again the training time. Both are adjustable on the "settings" ("Einstellungen") page.

## How to use it

Put the whole stuff on a web server and navigate your browser to `index.html`.

Once loaded from a web server it works offline. The user interface is in german only, some hints:

 * "Start" is "start"
 * "Stop" is "stop" and
 * "Einstellungen" is "settings"
 
### Limitations

The app uses the [http://jquerymobile.com/](jQuery mobile) framework. Thus it is supposed to work on every browser supported by *jQuery mobile*. It was tested on Firefox and Chrome on Linux and Android devices.

## License

Copyright (c) 2015 Peter Brockfeld. See the LICENSE.md file for license rights and limitations (MIT).