import { Detail } from "@raycast/api";
import { searchPlayer } from "./playerUtils";
import PlayerComponent from "./Components/PlayerInfo";

export default function playerGet(props: { arguments: { id: string } }) {
  if (props.arguments.id) {
    return <PlayerComponent id={props.arguments.id} />;
  } else {
    return <Detail markdown="Id needed!" />;
  }
}
