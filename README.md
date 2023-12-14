# NBA Games Score Tracker

### Personal practice project

This is a personal practice project of mine while I was learning JavaScript. I decided to make a personal site that will track and show me the scores of the present NBA games happening and the ones that have ended on the same day. 

The app uses Axios and Cheerio. The Axios will will fetch the website of www.nba.com/games and Cheerio will parse and manipulate the html data to scrape the __NEXT__ script json data. Then, the data will be consumed by EJS to display the all the games' scores. Also, made another page that will show the stats of all the players of both teams of the game that was played.

For future development, I should change the front end of the site to react so it doesn't need to rerender when view player stats and I can set up and an interval to refresh the scores.
