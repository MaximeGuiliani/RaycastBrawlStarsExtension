import React, { useEffect, useState } from "react";
import { searchPlayer } from "../playerUtils";
import { Action, ActionPanel, Detail, Icon, LaunchType, List, launchCommand } from "@raycast/api";

interface IPlayerIdProps {
  id: string;
}

const BrawlerComponent = ({ id }: IPlayerIdProps) => {
  const [playerData, setPlayerData] = useState<IPlayerData>();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const data = await searchPlayer(id);
        setPlayerData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlayerData();
  }, []);

  if (!playerData) {
    return <Detail markdown="Loading player data ." />;
  }

  if (playerData.name == "") {
    return (
      <List onSearchTextChange={setSearchText}>
        <List.EmptyView
          description="Try with another player id."
          icon={Icon.Person}
          title="No player found"
          actions={
            <ActionPanel>
              <Action
                icon={Icon.Person}
                title="Search another player"
                onAction={() =>
                  searchPlayer(searchText).then((data) => {
                    setPlayerData(data);
                  })
                }
              />

              <Action
                icon={Icon.Globe}
                title="Hello World"
                onAction={() =>
                  launchCommand({ name: "hello-world", arguments: { id: searchText }, type: LaunchType.UserInitiated })
                }
              />
            </ActionPanel>
          }
        />
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
              <Detail.Metadata.TagList.Item icon={Icon.Crown} text={"solo "  +playerData["soloVictories"]}  color={"#aae900"} />
              <Detail.Metadata.TagList.Item icon={Icon.Crown} text={"duo "  +playerData["duoVictories"] }  color={"#00FFFF"} />
              <Detail.Metadata.TagList.Item icon={Icon.Crown} text={"3vs3 "  +playerData["3vs3Victories"] }  color={"#eed535"} />
            </Detail.Metadata.TagList>
            <Detail.Metadata.Separator />
            <Detail.Metadata.Label title="bestRoboRumbleTime" text={playerData["bestRoboRumbleTime"] + " s"} />
            <Detail.Metadata.Label title="bestTimeAsBigBrawler" text={playerData["bestTimeAsBigBrawler"] + " s"} />
            <Detail.Metadata.Separator />
            <Detail.Metadata.Link title="More info" target={"https://brawlify.com/stats/profile/" + playerData.tag.replace('#',"%23")} text={playerData.name} />
          </Detail.Metadata>
        }
        actions={
          <ActionPanel>
            <Action
              icon={Icon.Person}
              title="Search another player"
              onAction={() => launchCommand({ name: "hello-world", type: LaunchType.UserInitiated })}
            />

            <Action
              icon={Icon.Globe}
              title="Hello World"
              onAction={() =>
                launchCommand({ name: "hello-world", arguments: { id: searchText }, type: LaunchType.UserInitiated })
              }
            />
          </ActionPanel>
        }
      />
    </>
  );
};

export default BrawlerComponent;
