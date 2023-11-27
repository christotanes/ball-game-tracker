let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("headlineTitle");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "flex";
  setTimeout(showSlides, 10000); // Change image every 10 seconds
}

import express from 'express';
import cheerio from 'cheerio';
import axios from 'axios';


export async function getAllMatches (req, res){
    try {
        // axios will load/get the url
        const axiosResponse = await axios.get("https://www.nba.com/games", { responseType: 'text' });
        console.log('Axios request successful');

        // cheerio will look at the contents of the file for #__NEXT_DATA__ and store it into scriptContent
        const $ = cheerio.load(axiosResponse.data);
        const scriptContent = JSON.parse($('script#__NEXT_DATA__').html());
        if (!scriptContent) {
            throw new Error('Unable to find __NEXT_DATA__');
        };

        let headlines = [], games = [];
        // Place necessary json object values into arrays headlines and games
        for (let game of scriptContent.props.pageProps.gameCardFeed.modules[0].cards){
            games.push(game)
        };
        for (let headline of scriptContent.props.pageProps.headlines.headlines.items){
            headlines.push(headline)
        };
        console.log(`Axios and Cheerio request successful. Rendering with values: ${scriptContent}`);

        // Render into index.ejs with games and headlines keys
        return res.render("index.ejs", {
            games: games,
            headlines: headlines
        })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

export async function getMatchByGameId (req, res){
    console.log(`This is req.params.id: ${req.params.id}`)
    console.log(`This is req.params.awayTeam: ${req.params.awayTeam}`)
    console.log(`This is req.params.homeTeam: ${req.params.homeTeam}`)

    try {
        const axiosResponse = await axios.get(`https://www.nba.com/game/${req.params.awayTeam}-vs-${req.params.homeTeam}-${req.params.id}`, { responseType: 'text' });
        console.log(`Axios request successful of : ${req.params.id}`);

        const $ = cheerio.load(axiosResponse.data);
        const scriptContent = JSON.parse($('script#__NEXT_DATA__').html());
        if (!scriptContent) {
            throw new Error('Unable to find __NEXT_DATA__');
        };
        
        // scriptContent.props.pageProps.game IS NOT AN ARRAY, IT IS AN OBJECT
        let boxscore = [], games = [];
        boxscore.push(scriptContent.props.pageProps.game.homeTeam);
        boxscore.push(scriptContent.props.pageProps.game.awayTeam);
        boxscore.push(scriptContent.props.pageProps.game.ogImage);

        for (let game of scriptContent.props.pageProps.rollingSchedule.modules[2].cards){
            games.push(game)
        };

        console.log(boxscore)
        console.log(`Axios and Cheerio request successful of ${req.params.id}. Rendering with values: ${scriptContent}`);
        return res.render("index.ejs", {
            boxscore: boxscore,
            games: games
        })
    } catch(error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

export default getAllMatches;