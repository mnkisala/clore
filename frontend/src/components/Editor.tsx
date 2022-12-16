import { onMount } from "solid-js";

import { CodeJar } from "codejar";
import Prism from "prismjs";

export interface EditorProps {
  setText?: (string) => void;
}

export default function Editor(props: EditorProps) {
  let editor;
  onMount(() => {
    const jar = CodeJar(
      editor,
      (el) => {
        props.setText && props.setText(el.textContent);

        el.innerHTML = Prism.highlight(
          el.textContent,
          Prism.languages.javascript,
          "javascript"
        );
      },
      { tab: "  " }
    );
    jar.updateCode(
      "def greet(name):\n\treturn f'hello {name}'\n\nprint(greet('world'))"
    );
  });

  return (
    <div class="editor">
      <pre>
        <code ref={editor} class="language-js"></code>
      </pre>
    </div>
  );
}
