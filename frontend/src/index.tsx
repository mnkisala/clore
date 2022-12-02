import { render } from "solid-js/web";
import "./style/index.scss";

import Markdown from "./components/Markdown";
import Editor from "./components/Editor";

function App() {
  return (
    <div>
      <Markdown text="_clore_ is also french for _close_" />
      <Editor />
    </div>
  );
}

render(() => <App />, document.body.appendChild(document.createElement("div")));
