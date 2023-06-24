import { Action, ActionPanel, Grid, Icon } from "@raycast/api";
import { useMemo, useState } from "react";

import brawlers from "../statics/brawlers.json";
import BrawlerComponent from "./Components/BrawlerDetail";
export default function SearchPokemon() {
  const brawlerList = brawlers.items;

  return (
    <Grid throttle searchBarPlaceholder="Search Brawlers By Bame" navigationTitle="Brawlers List"  fit={Grid.Fit.Fill}  columns={7} >
      <Grid.Section title="Brawlers">
        {brawlerList.map((brawler) => {
          return (
            <Grid.Item
              key={brawler.id}
              content={
                "https://cdn-old.brawlify.com/brawler-bs/" +
                (brawler.name == "EL PRIMO"
                  ? "El-Primo"
                  : brawler.name == "MR. P"
                  ? "Mr.P"
                  : brawler.name == "8-BIT"
                  ? "8-Bit"
                  : brawler.name == "R-T"
                  ? "R-T"
                  : brawler.name.charAt(0) + brawler.name.slice(1).toLowerCase()) +
                ".png"
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
