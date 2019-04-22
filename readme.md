# DOPL Data
This web app allows citizens to reference and search the Utah Division of Occupational and Professional Licensing database. One primary motive in creating this project was to allow searching based on a city, which is not supported on the [State's website](https://secure.utah.gov/llv/search/index.html). The data was last updated in April of 2019.

Give it a try by clicking [here](https://opensaltlake.github.io/dopl/)

biz.csv - contains entire license database
biz_small.csv - superceded, transferred, merged and expired license types have been removed.

## To run the web app
npm install http-server
http-server -p 5000 ./
go to "localhost:5000" in your browser

## Puppeteer script to get the data
npm install puppeteer
node puppeteer.js

The data is stored in google sheets, and utilizes their [API](https://developers.google.com/chart/interactive/docs/querylanguage) to perform queries.

## Screenshot of web app
![screenshot](https://raw.githubusercontent.com/OpenSaltLake/dopl/master/screenshot.png "Screenshot")

## Copyright
"The State has made the content of certain pages of its Web sites available to the public. Anyone may view, copy, or distribute information found within these web pages (not including the design or layout of the pages) for personal or informational use without owing an obligation to the State if the documents are not modified in any respect."
