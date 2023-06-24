import React, { useEffect, useState } from "react";
import { searchClub } from "../clubUtils";
import { Action, ActionPanel, Detail, Icon, LaunchType, List, launchCommand } from "@raycast/api";

interface IClubIdProps {
  id: string;
}

const clubComponent = ({ id }: IClubIdProps) => {
  const [clubData, setclubData] = useState<IClubData>();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchclubData = async () => {
      try {
        const data = await searchClub(id);
        setclubData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchclubData();
  }, []);

  if (!clubData) {
    return <Detail markdown="Loading club data ." />;
  }

  if (clubData.name == "") {
    return (
      <List onSearchTextChange={setSearchText}>
        <List.EmptyView
          description="Try with another club id."
          icon={Icon.Person}
          title="No club found"
          actions={
            <ActionPanel>
              <Action
                icon={Icon.Person}
                title="Search another club"
                onAction={() =>
                  searchClub(searchText).then((data) => {
                    setclubData(data);
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

  # ${clubData.name} ${clubData.tag}

  <img src="https://cdn-old.brawlify.com/profile/${clubData.icon.id}.png"  width="100" height="100" /> 

  ## Experience Level   ${clubData.expLevel}  

  |Club   | Trophies  |
  |---|---|
  |  ${clubData.club.name} ${clubData.club.tag}  |   ${clubData.trophies} / ${clubData.highestTrophies} max|

 
  
  `;
  return (
    <>
      <Detail
        markdown={markdown}
        navigationTitle={"club Info | " + clubData.name}
        metadata={
          <Detail.Metadata>
            <Detail.Metadata.TagList title="Wins">
              <Detail.Metadata.TagList.Item icon={Icon.Crown} text={"solo "  +clubData["soloVictories"]}  color={"#aae900"} />
              <Detail.Metadata.TagList.Item icon={Icon.Crown} text={"duo "  +clubData["duoVictories"] }  color={"#00FFFF"} />
              <Detail.Metadata.TagList.Item icon={Icon.Crown} text={"3vs3 "  +clubData["3vs3Victories"] }  color={"#eed535"} />
            </Detail.Metadata.TagList>
            <Detail.Metadata.Separator />
            <Detail.Metadata.Label title="bestRoboRumbleTime" text={clubData["bestRoboRumbleTime"] + " s"} />
            <Detail.Metadata.Label title="bestTimeAsBigBrawler" text={clubData["bestTimeAsBigBrawler"] + " s"} />
            <Detail.Metadata.Separator />
            <Detail.Metadata.Link title="More info" target={"https://brawlify.com/stats/profile/" + clubData.tag.replace('#',"%23")} text={clubData.name} />
          </Detail.Metadata>
        }
        actions={
          <ActionPanel>
            <Action
              icon={Icon.Person}
              title="Search another club"
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

export default clubComponent;
