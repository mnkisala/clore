import { onMount } from "solid-js";

import { CodeJar } from "codejar";
import Prism from "prismjs";

export default function Editor() {
  let editor;
  onMount(() => {
    const jar = new CodeJar(editor, Prism.highlightElement, { tab: "\t" });
    jar.updateCode("you can edit me...");
  });

  return <div ref={editor}></div>;
}
