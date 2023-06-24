import { getPreferenceValues, showHUD } from "@raycast/api";
import Axios from "./services/caller.service";
import { personalAccessToken } from "./preferences";

const searchClub = async (swName:string ) => {
  console.log("searching player with id : ", swName);
  
  let playerData: IPlayerData = {
    name: "",
    club: {
      tag: "",
      name: "",
    },
    "3vs3Victories": 0,
    isQualifiedFromChampionshipChallenge: false,
    icon: {
      id: 0,
    },
    tag: "",
    trophies: 0,
    expLevel: 0,
    expPoints: 0,
    highestTrophies: 0,
    powerPlayPoints: 0,
    highestPowerPlayPoints: 0,
    soloVictories: 0,
    duoVictories: 0,
    bestRoboRumbleTime: 0,
    bestTimeAsBigBrawler: 0,
    brawlers: [
      {
        id: 0,
        rank: 0,
        trophies: 0,
        highestTrophies: 0,
        power: 0,
        name: "",
      },
    ],
    nameColor: "",
  };


  await Axios.request({
    method: "GET",
    url:"%23"+ swName,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + personalAccessToken,
    },
  })
    .then((res) => {
      playerData = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  //await showHUD(`Searching player with id : "${swName}"! 🎉`);
  return playerData;
};

export { searchClub };
