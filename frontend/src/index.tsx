import { render } from "solid-js/web";
import "./style/index.scss";

import Markdown from "./components/Markdown";
import Editor from "./components/Editor";

function App() {
  return (
    <div class="app-container">
      <div class="story-panel">
        <Markdown text="# Welcome to clore \n Besides being an awesome exercise platform, _clore_ is also french for _close_" />
      </div>
      <Editor />
    </div>
  );
}

render(() => <App />, document.body.appendChild(document.createElement("div")));
