import { Detail } from "@raycast/api";

import BrawlerComponent from "./Components/BrawlerDetail";

export default function getBrawler(props: { arguments: { id: string } }) {
  if (props.arguments.id) {
    return <BrawlerComponent id={props.arguments.id} />;
  } else {
    return <Detail markdown="Id needed!" />;
  }
}
