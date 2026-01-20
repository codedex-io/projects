-- Analyze Twitch Data with SQLite

-- Getting a Feel for the Dataset

SELECT channel, followers
FROM streamers2021
LIMIT 25

-- Spoken Languages 

SELECT DISTINCT language
FROM streamers2021;

-- How many people on average watched these streamers in 2021?

SELECT AVG(average_viewers)
FROM streamers2021;

-- The Hottest Rising Streamers in 2021

SELECT channel, MAX(followers_gained)
FROM streamers2021
GROUP BY channel
ORDER BY MAX(followers_gained) DESC
LIMIT 5;

-- Top 10 Most Popular Games in 2024

SELECT most_streamed_game, COUNT(*) 
FROM streamers2024
GROUP BY 1 
ORDER BY 2 DESC
LIMIT 10;

SELECT most_streamed_game, COUNT(*)
FROM streamers2024
WHERE most_streamed_game = 'VALORANT' 
  OR most_streamed_game = 'Valorant';

-- League of Legends Viewers: Demographic

SELECT language, COUNT(*) 
FROM streamers2024
WHERE most_streamed_game = 'League of Legends' 
GROUP BY 1 
ORDER BY 2 DESC;

-- Best Day to Stream in 2024

SELECT day_with_most_followers_gained, COUNT(*) 
FROM streamers2024
GROUP BY 1 
ORDER BY 2 DESC;

-- Grouping Top Games Into Genres in 2024

SELECT
  CASE
    WHEN most_streamed_game = 'Just Chatting'
      THEN 'IRL'
    WHEN most_streamed_game = 'League of Legends' OR most_streamed_game = 'Dota 2'
      THEN 'MOBA'
    WHEN most_streamed_game = 'VALORANT' OR most_streamed_game = 'Valorant' OR most_streamed_game = 'Counter-Strike' OR most_streamed_game = 'Overwatch' OR most_streamed_game = 'Escape from Tarkov'
      THEN 'FPS'
    WHEN most_streamed_game = 'Minecraft' or most_streamed_game = 'Dead by Daylight'
      THEN 'Simulation'
    WHEN most_streamed_game = 'Fortnite' OR most_streamed_game = 'Apex Legends' OR most_streamed_game = 'Call of Duty: Warzone' OR most_streamed_game = 'PUBG: BATTLEGROUNDS'
      THEN 'Battle Royale'
    WHEN most_streamed_game = 'World of Warcraft'
      THEN 'MMO'
    WHEN most_streamed_game = 'Casino' OR most_streamed_game = 'Virtual Casino' OR most_streamed_game = 'Slots'
      THEN 'Gambling'
    WHEN most_streamed_game = 'Sports' OR most_streamed_game = 'FIFA 23' OR most_streamed_game = 'Rocket League'
      THEN 'Sports'
    WHEN most_streamed_game = 'Hearthstone' OR most_streamed_game = 'Teamfight Tactics' or most_streamed_game = 'Chess'
      THEN 'Strategy'
  ELSE 'Other'
  END AS 'genre',
  COUNT(*)
FROM streamers2024
GROUP BY 1
ORDER BY 2 DESC;
