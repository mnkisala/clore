import { marked } from "marked";
import insane from "insane";

const INSANE_OPTIONS = {};

export interface MarkdownProps {
  text: string;
}

export default function Markdown(props: MarkdownProps) {
  return (
    <div innerHTML={insane(marked.parse(props.text), INSANE_OPTIONS)}></div>
  );
}
