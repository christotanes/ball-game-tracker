import cheerio from 'cheerio';
import axios from 'axios';

let gameId = [], 
    awayTeam = [],
    homeTeam = [];

export async function getAllMatches (req, res){
    try {
        const axiosResponse = await axios.get("https://www.nba.com/games", { responseType: 'text' });
        console.log('Axios request successful');

        const $ = cheerio.load(axiosResponse.data);
        const scriptContent = JSON.parse($('script#__NEXT_DATA__').html());
        if (!scriptContent) {
            throw new Error('Unable to find __NEXT_DATA__');
        };

        let headlines = [];
        let games = [];
        for (let game of scriptContent.props.pageProps.gameCardFeed.modules[0].cards){
            games.push(game)
            gameId.push(game.cardData.gameId)
            awayTeam.push(game.cardData.awayTeam.teamTricode.toLowerCase())
            homeTeam.push(game.cardData.homeTeam.teamTricode.toLowerCase())
        };
        for (let headline of scriptContent.props.pageProps.headlines.headlines.items){
            headlines.push(headline)
        };
        console.log(gameId);
        console.log(awayTeam);
        console.log(homeTeam);
        console.log(`Axios and Cheerio request successful. Rendering with values: ${scriptContent}`);
        return res.render("index.ejs", {
            games: games,
            headlines: headlines
        })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

// export async function getMatchByGameId (req, res){
//     try {
//         const axiosResponse = await axios.get("https://www.nba.com/games", { responseType: 'text' });
//         console.log('Axios request successful');
//     }
// }
export default getAllMatches;