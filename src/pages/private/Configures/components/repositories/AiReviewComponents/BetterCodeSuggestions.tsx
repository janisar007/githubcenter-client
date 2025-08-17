import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub flavored markdown
import rehypeHighlight from "rehype-highlight"; // Syntax highlighting

const BetterCodeSuggestions = ({ fileSpecificComments }: any) => {
  return (
    <div>
      <ol className="list-disc  flex flex-col gap-5 ml-4">
        {fileSpecificComments.map((cmnt: any, idx: any) => (
          <li key={idx}>
            <div className="flex items-center justify-between w-full font-semibold mb-2 text-vol-900">
              <div className="w-[23rem] break-words">{cmnt.path}</div>
              <div>{`line #${cmnt.line}`}</div>
            </div>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {cmnt.body}
            </ReactMarkdown>
            <div className="border-b-2 mt-5"/>
          </li>

        ))}
      </ol>
    </div>
  );
};

export default BetterCodeSuggestions;
