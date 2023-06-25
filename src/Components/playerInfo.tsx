import { useEffect, useState } from "react";
import { searchPlayer } from "../Utils/playerUtils";
import { Action, ActionPanel, Detail, Icon, List } from "@raycast/api";
import ClubComponent from "./clubInfo";
import { IPlayerData } from "../models/IPlayerData";
import Error403 from "./BadAPIKey";

interface IPlayerIdProps {
  id: string;
}

const PlayerComponent = ({ id }: IPlayerIdProps) => {
  const [playerData, setPlayerData] = useState<IPlayerData>();

  const [error, setError] = useState<any>();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const data = await searchPlayer(id);
        setPlayerData(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchPlayerData();
  }, []);
  if (error) {
    if (typeof error === "string") {
      if (error.includes("403")) {
        return <Error403 error={error} />;
      } else if (error.includes("404")) {
        return (
          <List onSearchTextChange={setSearchText}>
            <List.EmptyView
              description="Try With Another Player Id."
              icon={Icon.Person}
              title="No Player Found"
              actions={
                <ActionPanel>
                  <Action.Push
                    title="Search Player"
                    icon={Icon.Sidebar}
                    target={<PlayerComponent id={"" + searchText} />}
                  />
                </ActionPanel>
              }
            />
          </List>
        );
      }
    }
  }
  if (!playerData) {
    return (
      <List onSearchTextChange={setSearchText}>
        <List.EmptyView icon={Icon.CircleProgress} title="Loading Player Data" description="Work in progress." />
      </List>
    );
  }

  const markdown = `

  # ${playerData.name} ${playerData.tag}

  <img src="https://cdn-old.brawlify.com/profile/${playerData.icon.id}.png"  width="100" height="100" /> 

  ## Experience Level   ${playerData.expLevel}  

  |Club   | Trophies  |
  |---|---|
  |  ${playerData.club.name} ${playerData.club.tag}  |   ${playerData.trophies} / ${playerData.highestTrophies} max|

 
  
  `;
  return (
    <>
      <Detail
        markdown={markdown}
        navigationTitle={"Player Info | " + playerData.name}
        metadata={
          <Detail.Metadata>
            <Detail.Metadata.TagList title="Wins">
              <Detail.Metadata.TagList.Item
                icon={Icon.Crown}
                text={"Solo " + playerData["soloVictories"]}
                color={"#aae900"}
              />
              <Detail.Metadata.TagList.Item
                icon={Icon.Crown}
                text={"Duo " + playerData["duoVictories"]}
                color={"#00FFFF"}
              />
              <Detail.Metadata.TagList.Item
                icon={Icon.Crown}
                text={"3vs3 " + playerData["3vs3Victories"]}
                color={"#eed535"}
              />
            </Detail.Metadata.TagList>
            <Detail.Metadata.Separator />
            <Detail.Metadata.Label title="Best Robo Rumble Time" text={playerData["bestRoboRumbleTime"] + " s"} />
            <Detail.Metadata.Label title="Best Time As Big Brawler" text={playerData["bestTimeAsBigBrawler"] + " s"} />
            <Detail.Metadata.Separator />
            <Detail.Metadata.Link
              title="More info"
              target={"https://brawlify.com/stats/profile/" + playerData.tag.replace("#", "%23")}
              text={playerData.name}
            />
          </Detail.Metadata>
        }
        actions={
          <ActionPanel>
            <Action.Push
              title="Show Club"
              icon={Icon.Sidebar}
              target={<ClubComponent id={"" + playerData.club.tag.replace("#", "")} />}
            />
            <Action.OpenInBrowser
              title="Open in Brawlify"
              icon={Icon.Globe}
              url={"https://brawlify.com/stats/profile/" + playerData.tag.replace("#", "%23")}
            />
          </ActionPanel>
        }
      />
    </>
  );
};

export default PlayerComponent;
