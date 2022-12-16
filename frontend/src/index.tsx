import { render } from "solid-js/web";
import "./style/index.scss";
import { Buffer } from "buffer";

import Markdown from "./components/Markdown";
import Editor from "./components/Editor";
import { createSignal } from "solid-js";

function App() {
  const [code, setCode] = createSignal("");
  const [output, setOutput] = createSignal("");

  return (
    <div class="app-container">
      <div class="story-panel">
        <Markdown text="# Welcome to clore \n Besides being an awesome exercise platform, _clore_ is also french for _close_" />
        <button
          onclick={async () => {
            const req = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                source_b64: Buffer.from(code()).toString("base64"),
              }),
            };
            console.log(req);
            const res = await fetch("http://localhost:3000/run_python/", req);
            console.log(res);

            const json = await res.json();
            console.log(json);
            setOutput(json.stdout);
          }}
        >
          run
        </button>
        <pre>{output()}</pre>
      </div>
      <Editor setText={setCode} />
    </div>
  );
}

render(() => <App />, document.body.appendChild(document.createElement("div")));
