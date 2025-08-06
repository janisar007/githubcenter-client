import type { PullRequest, WorkflowRun } from "@/types/repotypes";
import { formatDate } from "@/utils/tools";
import {
  // alphabetBgColors,
  alphabetColorPalette,
  conclusionConstant,
  statusConstant,
} from "@/constants/cssConstants";
import { FaCodePullRequest } from "react-icons/fa6";
import { useState } from "react";
import { RiArrowRightSFill } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";

interface PrWorkflowPropsType {
  pr: PullRequest;
  workflows: WorkflowRun[] | null;
}

const PrWorkflow = ({ pr, workflows }: PrWorkflowPropsType) => {
  const [showWorkflow, setShowWorkflow] = useState<boolean>(false);
  return (
    <div className="border-[0.09rem] border-gray-100 hover:border-gray-300 rounded-lg overflow-hidden shadow-sm transition-shadow cursor-pointer bg-white flex flex-col px-3 py-4 gap-2 w-full">
      <div className="flex flex-col sm:flex-row sm:gap-2 sm:justify-between">
        <div className="flex gap-2 flex-wrap">
          <div className="font-semibold">{`#${pr.number}`}</div>
          <div className="font-semibold">{pr.title}</div>
        </div>
        <div className="mt-2 sm:mt-0">
          <div className="bg-[#238636] text-white rounded-xl px-3 py-[0.30rem] flex items-center justify-center gap-1 text-sm w-fit">
            <span className="text-white">
              <FaCodePullRequest />
            </span>
            <span className="capitalize">{pr.state}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col xs:flex-row xs:gap-2 items-start xs:items-center">
        <div className="flex gap-2 items-center">
          <div
            style={{
              height: "1.75rem",
              width: "1.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9999px",
              fontWeight: 600,
              fontSize: "14px",
              color: `${
                alphabetColorPalette[pr.user.login.charAt(0).toUpperCase()]
                  .border_col
              }`,
              background: `linear-gradient(to bottom, ${
                alphabetColorPalette[pr.user.login.charAt(0).toUpperCase()]
                  .bg_col_1
              }, ${
                alphabetColorPalette[pr.user.login.charAt(0).toUpperCase()]
                  .bg_col_2
              })`,
              border: `1px solid ${
                alphabetColorPalette[pr.user.login.charAt(0).toUpperCase()]
                  .border_col
              }`,
              boxShadow:
                "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {pr.user.login &&
              pr.user.login.length > 0 &&
              pr.user.login.charAt(0).toUpperCase()}
          </div>

          <div className="text-sm font-bold text-cgray-ntext">
            {pr.user.login}
          </div>
        </div>
        <div className="mt-2 text-xs font-medium text-cgray-ntext xs:ml-auto">
          {formatDate(pr.created_at)}
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-4">
        <div
          onClick={() => setShowWorkflow(!showWorkflow)}
          className={`cursor-pointer font-semibold text-gray-400 ${
            !showWorkflow ? "text-gray-400" : "text-gray-600"
          } flex items-center hover:text-gray-600`}
        >
          <div>
            {showWorkflow ? <RiArrowDownSFill /> : <RiArrowRightSFill />}
          </div>
          <div>{`workflows(${workflows ? workflows?.length : 0})`}</div>
        </div>
        <div
          className={`transition-all duration-600 ease-in-out overflow-hidden flex flex-col gap-7 ${
            showWorkflow ? "max-h-full opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {workflows?.map((wf: WorkflowRun) => {
            return (
              <div key={wf.id} className="">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <div className="text-xs text-cgray-ntext pt-[.18rem] px-1 bg-gray-100 w-fit">
                    {wf.id}
                  </div>
                  <div
                    className={`text-sm ${
                      statusConstant[wf.status].border_color
                    } ${statusConstant[wf.status].bg_color} px-2 ${
                      statusConstant[wf.status].text_color
                    } w-fit`}
                  >
                    {statusConstant[wf.status].name}
                  </div>
                </div>

                <div
                  className={`border-l-7 ${
                    conclusionConstant[wf.conclusion].border_color
                  } flex flex-col sm:flex-row sm:items-center px-[0.20rem] py-2 justify-between ${
                    conclusionConstant[wf.conclusion].bg_color
                  } gap-2 sm:gap-0`}
                >
                  <div
                    className={`text-[0.94rem] font-medium ${
                      conclusionConstant[wf.conclusion].text_color
                    }`}
                  >
                    {wf.name}
                  </div>

                  <div
                    className={`${
                      conclusionConstant[wf.conclusion].border_color
                    } border ${
                      conclusionConstant[wf.conclusion].text_color
                    } px-2 rounded-xl text-sm w-fit`}
                  >
                    {conclusionConstant[wf.conclusion].name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default PrWorkflow;