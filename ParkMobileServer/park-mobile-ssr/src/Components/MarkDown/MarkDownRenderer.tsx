import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Для поддержки разметки GitHub Flavored Markdown

type MarkDownRendererProps = {
  content: string;
};

const MarkdownRenderer: FC<MarkDownRendererProps> = ({ content }) => {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
};

export default MarkdownRenderer;
