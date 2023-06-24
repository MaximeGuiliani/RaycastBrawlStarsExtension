import { Action, ActionPanel, Grid, Icon } from "@raycast/api";

import brawlers from "../statics/FullBrawlersInfo.json";
import BrawlerComponent from "./Components/BrawlerDetail";
export default function SearchPokemon() {
  const brawlerList = brawlers.list;

  return (
    <Grid throttle searchBarPlaceholder="Search Brawlers By Bame" navigationTitle="Brawlers List"  fit={Grid.Fit.Fill}  columns={7} >
      <Grid.Section title="Brawlers">
        {brawlerList.map((brawler) => {
          return (
            <Grid.Item
              key={brawler.id}
              content={
                brawler.imageUrl2
              }
              title={brawler.name}
              keywords={[brawler.id.toString(), brawler.name]}
              actions={
                <ActionPanel>
                  <Action.Push
                    title="Show Details"
                    icon={Icon.Sidebar}
                    target={<BrawlerComponent id={"" + brawler.id} />}
                  />
                </ActionPanel>
              }
            />
          );
        })}
      </Grid.Section>
    </Grid>
  );
}
