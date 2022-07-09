# hermes
Fast currency converter based on Binance API.

## Table of Contents
  - [Requirements](#requirements)
  - [Environment](#environment)
  - [Build](#build)

## Requirements

To work with extention you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `>=10`
* npm `>=6`

## Environment

install npm modules:

```npm ci```

## Build

to assemble firefox build, run the following:

```npm run build:firefox```

## External Dependencies:

* ```jquery 3.6.0```
* ```select2 4.0.13```
* ```underscore 1.13.4```
* ```underscore 1.13.4```
* ```backbone 1.4.1```

external dependencies are stored in [lib](./lib) already minified.

## Usage

1. Select text with currency symbol (i.e "1.5 BTC"). 
2. Then right-click on the context menu and select "Convert currency". 
1. A sidebar with conversation results will be shown.