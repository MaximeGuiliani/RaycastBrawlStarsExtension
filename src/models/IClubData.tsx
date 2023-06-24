interface IClubData {
  "club": {
    tag: string;
    name: string;
  };
  "3vs3Victories": number;
  "isQualifiedFromChampionshipChallenge": boolean;
  "icon": {
    id:	number;
    },

    "name": string;
    "tag": string;
    "trophies": number;
    "expLevel": number;
    "expPoints": number;
    "highestTrophies": number;
    "powerPlayPoints": number;
    "highestPowerPlayPoints": number;
    "soloVictories": number;
    "duoVictories": number;
    "bestRoboRumbleTime": number;
    "bestTimeAsBigBrawler": number;
    "brawlers": [
        {
            "id": number;
            "rank": number;
            "trophies": number;
            "highestTrophies": number;
            "power": number;
            "name": string;

            // TODO : add starPowers and gadgets
            // "starPowers": [
            //     {
            //         "id": number;
            //         "name": string;
            //         "power": number;
            //         "rank": number;
            //         "trophies": number;
            //         "highestTrophies": number;
            //     }
            // ];
            

        }
    ];
    nameColor: string;
}
