import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub flavored markdown
import rehypeHighlight from "rehype-highlight"; // Syntax highlighting
import { useRef, useState } from "react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";

const PrDesciption = ({ prDescription }: any) => {
  const divRef = useRef<HTMLDivElement>(null);
  const divRefTitle = useRef<HTMLDivElement>(null);

  const [cc, setCc] = useState<boolean>(false);
  const [cc2, setCc2] = useState<boolean>(false);

  const handleCopy = (divRef:any, setCc:any) => {
    if (divRef.current) {
      setCc(true);
      const textToCopy = divRef.current.innerText; // or innerHTML if you want HTML
      navigator.clipboard.writeText(textToCopy).then(() => {
        console.log("Copied to clipboard!");
      });

      setTimeout(() => {
        setCc(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col border-[0.09rem] rounded-lg p-4 gap-4 bg-gray-50">
        <span className="font-semibold">Title:</span>
      <div className="bg-white border-[0.09rem] rounded-md flex justify-between items-center px-2">
        <div ref={divRefTitle} className=" py-2 px-4 ">{prDescription.title}</div>
        <span
          onClick={() => handleCopy(divRefTitle, setCc2)}
          className="hover:opacity-70 border px-2 py-1 bg-gray-50 rounded-sm text-sm cursor-pointer"
        >
          {!cc2 ? (
            <span className="gap-1 flex items-center text-blue-600">
              <MdContentCopy className="" /> <span>Copy</span>
            </span>
          ) : (
            <span className="gap-1 flex items-center text-green-600">
              <IoCheckmarkDoneCircleOutline className="" /> <span>Copied</span>
            </span>
          )}
        </span>
      </div>

<span className="font-semibold">Description:</span>
      <div className="bg-white border-[0.09rem] p-2 rounded-md">
        <div className="flex justify-end">
          <span
            onClick={() => handleCopy(divRef, setCc)}
            className="hover:opacity-70 border px-2 py-1 bg-gray-50 rounded-sm text-sm cursor-pointer"
          >
            {!cc ? (
              <span className="gap-1 flex items-center text-blue-600">
                <MdContentCopy className="" /> <span>Copy</span>
              </span>
            ) : (
              <span className="gap-1 flex items-center text-green-600">
                <IoCheckmarkDoneCircleOutline className="" />{" "}
                <span>Copied</span>
              </span>
            )}
          </span>
        </div>

        <div ref={divRef} className=" py-4 px-4 rounded-sm flex flex-col ">
          <div>{prDescription.summary}</div>

          <div className="mt-4">
            <div className="text-md font-semibold">Changes:</div>
            <div className="ml-4 mt-1">
              {
                <ul className="list-disc  flex flex-col gap-3">
                  {prDescription.changes.map((cr: any, idx: any) => (
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
              }
            </div>
          </div>

          <div className="mt-4">
            <div className="text-md font-semibold">Follow ups:</div>
            <div className="ml-4 mt-1">
              {
                <ul className="list-disc  flex flex-col gap-3">
                  {prDescription.followUp.map((cr: any, idx: any) => (
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
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrDesciption;
