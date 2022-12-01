import { render } from "solid-js/web";
import "./style/index.scss";

import Markdown from "./components/Markdown";

function App() {
  return (
    <div>
      <Markdown text="_clore_ is also french for _close_" />
    </div>
  );
}

render(() => <App />, document.body.appendChild(document.createElement("div")));
