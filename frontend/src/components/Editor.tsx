import { onMount } from "solid-js";

import { CodeJar } from "codejar";
import Prism from "prismjs";

export default function Editor() {
  let editor;
  onMount(() => {
    const jar = CodeJar(
      editor,
      (el) => {
        el.innerHTML = Prism.highlight(
          el.textContent,
          Prism.languages.javascript,
          "javascript"
        );
      },
      { tab: "  " }
    );
    jar.updateCode(
      "export function hello() {\n  let x = 5;\n  return `you can edit me ${x}`;\n}\n"
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
