import { Detail, List } from "@raycast/api";
import ClubComponent from "./Components/clubInfo";

export default function clubGet(props: { arguments: { id: string } }) {
  if (props.arguments.id) {
    return <ClubComponent id={props.arguments.id.replace("#", "")} />;
  } else {
    return <Detail markdown="Id needed!" />;
  }
}
