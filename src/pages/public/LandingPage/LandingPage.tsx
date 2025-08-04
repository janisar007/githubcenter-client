import Navbar from "./components/Navbar";
import { TbLivePhotoFilled } from "react-icons/tb";
import { GiConcentricCrescents } from "react-icons/gi";
import { FaCodeMerge } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";


const LandingPage = () => {
  const featureData = [
    {
      heading: "Live GitHub Actions Status",
      description:
        "Get instant visibility into which workflows passed, failed, or are pending — across all your repositories.",
      icon: <TbLivePhotoFilled />,
    },
    {
      heading: "Centralized Pull Request Tracker",
      description:
        "No more jumping repo to repo. Track all your PRs (merged, failed, pending) in a single, powerful view.",
      icon: <GiConcentricCrescents />,
    },
    {
      heading: "Auto-Merge Smart PRs",
      description:
        "Fix issues on failed PRs and let the system auto-merge once checks pass. Save time, reduce manual effort.",
      icon: <FaCodeMerge />,
    },
    {
      heading: "Multiple GitHub Accounts? No Problem",
      description:
        "Connect and switch between multiple GitHub accounts with ease. Manage personal, work, or organization repos all from one dashboard.",
      icon: <FaUsers />,
    },
    {
      heading: "Organize Repos with Custom Groups",
      description:
        "Group related repositories however you like — by project, team, or purpose. Keep things clean and contextual.",
      icon: <RiGitRepositoryCommitsLine />,
    },
  ];
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <main className="">
        <div className="relative flex flex-col ">
          <div className="border-b-2 border-gray-600">
            <img src="circle_bg.png" className="w-full h-[70%]" />
          </div>
          <div className="absolute text-white top-[11rem] left-[4rem] h-full flex  text-[5.5rem] font-bold z-10">
            <div className="flex flex-col gap-1">
              <span className="flex gap-3">
                <span className="text-vol-300">Github</span>
                <span className="text-vol-900">Center</span>
              </span>

              {/* <span className='text-lg text-vol-300'>Manage All Your GitHub Repositories & Workflows — In One Place.</span> */}
              <span className="text-lg font-medium wrap-break-word w-[30rem] text-gray-300">
                Stop switching tabs. Start monitoring your entire GitHub
                universe from a single, intelligent dashboard.
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center mt-12">
          <div className="font-bold text-4xl text-vol-950">Manage All Your GitHub Repositories & Workflows — In One Place.</div>

        </div>


        <div className="flex ">
          <div className="ml-[4rem] mt-[5rem] gap-[3rem] flex flex-col ">
            {featureData.map((data: any, index:any) => {
              return (
                <div className="flex  flex-col gap-2 border px-4 py-4 rounded-lg shadow-sm" key={index}>
                  <div className="flex items-start gap-2 ">
                    <span className="text-vol-950 bg-gray-100 p-[0.15rem] rounded-sm mt-[0.20rem]">
                      {data.icon}
                    </span>
                    <span className="text-vol-950 font-semibold text-xl">
                      {data.heading}
                    </span>
                  </div>
                  <div className="text-sm text-cgray-ntext">
                    {data.description}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="">
            <img src="mix_bg.png"  />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
