import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";       // GitHub flavored markdown
import rehypeHighlight from "rehype-highlight"; // Syntax highlighting

const Summary = ({summary}: any) => {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeHighlight]}
      >
        {summary}
      </ReactMarkdown>
    </div>
  )
}

export default Summary