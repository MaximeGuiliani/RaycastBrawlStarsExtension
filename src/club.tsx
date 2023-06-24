import { Detail, List } from "@raycast/api";

export default function clubGet(props: { arguments: { id: string } }) {
  if (props.arguments.id) {
    return (<List>
      <List.Item title="Club" accessoryTitle={props.arguments.id} />
    </List>);
  } else {
    return <Detail markdown="Id needed!" />;
  }
}
