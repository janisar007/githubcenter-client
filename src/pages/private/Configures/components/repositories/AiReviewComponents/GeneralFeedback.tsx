import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub flavored markdown
import rehypeHighlight from "rehype-highlight"; // Syntax highlighting

const GeneralFeedback = ({generalFeedback}:any) => {
  return (
    <div className="prose max-w-none ml-4">
          <ul className="list-disc  flex flex-col gap-3">
            {generalFeedback.map((cr:any, idx:any) => (
              <li key={idx}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {cr.body}
                </ReactMarkdown>
              </li>
            ))}
          </ul>
        </div>
  )
}

export default GeneralFeedback