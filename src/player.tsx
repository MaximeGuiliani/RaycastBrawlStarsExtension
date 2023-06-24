import { Detail } from "@raycast/api";
import PlayerComponent from "./Components/PlayerInfo";

export default function playerGet(props: { arguments: { id: string } }) {
  if (props.arguments.id) {
    return <PlayerComponent id={props.arguments.id.replace("#", "")} />;
  } else {
    return <Detail markdown="Id Needed!" />;
  }
}
