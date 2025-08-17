import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub flavored markdown
import rehypeHighlight from "rehype-highlight"; // Syntax highlighting

const CodeReview = ({ codeReview }: { codeReview: string[] }) => {
  return (
    <div className="prose max-w-none ml-4">
      <ul className="list-disc  flex flex-col gap-3">
        {codeReview.map((cr, idx) => (
          <li key={idx}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {cr}
            </ReactMarkdown>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodeReview;
