import { getPreferenceValues, showHUD } from "@raycast/api";
import Axios from "./services/caller.service";
import { personalAccessToken } from "./preferences";

const searchClub = async (swName:string ) => {  
  let clubData: IClubData = {
    tag: "",
    name: "",
    description: "",
    trophies: 0,
    requiredTrophies: 0,
    members: [{
      icon: { id: 0 },
      tag: "",
      name: "",
      trophies: 0,
      role: "",
      nameColor: ""
    }],
    type: "",
    badgeId: 0
  };


  await Axios.request({
    method: "GET",
    url:"clubs/%23"+ swName,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + personalAccessToken,
    },
  })
    .then((res) => {
      clubData = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return clubData;
};

export { searchClub };
