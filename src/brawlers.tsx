import { Action, ActionPanel, Grid, Icon } from "@raycast/api";
import { useMemo, useState } from "react";

import brawlers from "../statics/brawlers.json";
import BrawlerComponent from "./Components/BrawlerDetail";
export default function SearchPokemon() {
  const brawlerList = brawlers.items;

  return (
    <Grid throttle searchBarPlaceholder="Search brawler by name">
      
        return (
          <Grid.Section title="brawlers">
            {brawlerList.map((brawler) => {
              return (
                <Grid.Item
                  key={brawler.id}
                  //
                  content={"https://cdn-old.brawlify.com/brawler-bs/"+ (brawler.name =="EL PRIMO" ?"El-Primo":  (brawler.name =="MR. P"?"Mr.P":(brawler.name =="8-BIT"?"8-Bit":(brawler.name =="R-T"?"R-T":brawler.name.charAt(0) + brawler.name.slice(1).toLowerCase()))))+".png"}
                  title={brawler.name}
                  subtitle={`#${brawler.id.toString().padStart(3, "0")}`}
                  keywords={[brawler.id.toString(), brawler.name]}
                  actions={
                    <ActionPanel>
                      <Action.Push title="Show Details" icon={Icon.Sidebar} target={<BrawlerComponent id={""+brawler.id} />} />
                    </ActionPanel>
                  }
                />
              );
            })}
          </Grid.Section>
        );
      
    </Grid>
  );
}
