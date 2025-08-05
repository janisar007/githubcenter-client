import Navbar from "./components/Navbar";
import { TbLivePhotoFilled } from "react-icons/tb";
import { GiConcentricCrescents } from "react-icons/gi";
import { FaCodeMerge } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

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

  const footerData = [
    {
      heading: "Product",
      options: ["Dashboard", "Pricing", "Feature requests"],
    },

    {
      heading: "Developers",
      options: ["Documentation", "Support", "Demo Videos"],
    },

    {
      heading: "Company",
      options: ["About", "Contact"],
    },

    {
      heading: "Legal",
      options: ["Terms and Conditions", "Privacy Policy"],
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
          <div className="absolute text-white top-[2rem] lg:top-[11rem] left-[1rem] lg:left-[4rem] h-full flex  text-[2rem] lg:text-[5.5rem] font-bold z-10">
            <div className="flex flex-col gap-1">
              <span className="flex gap-3">
                <span className="text-vol-300">Github</span>
                <span className="text-vol-900">Center</span>
              </span>

              {/* <span className='text-lg text-vol-300'>Manage All Your GitHub Repositories & Workflows — In One Place.</span> */}
              <span className="text-[0.4rem] lg:text-lg font-medium wrap-break-word w-[12rem] lg:w-[30rem] text-gray-300">
                Stop switching tabs. Start monitoring your entire GitHub
                universe from a single, intelligent dashboard.
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center mt-12">
          <div className="font-bold text-sm px-4 lg:text-4xl text-vol-950">
            Manage All Your GitHub Repositories & Workflows — In One Place.
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center justify-center">
          <div className=" px-4 lg:mt-[5rem] gap-[1rem] lg:gap-[3rem] flex flex-row lg:flex-col  flex-wrap lg:w-full mb-12 lg:mb-1 justify-center">
            {featureData.map((data: any, index: any) => {
              return (
                <div
                  className="flex flex-col gap-2 border px-2 lg:px-4 py-4 rounded-lg shadow-sm w-[45%] lg:w-full"
                  key={index}
                >
                  <div className="flex items-start gap-2 ">
                    <span className="text-vol-950 bg-gray-100 p-[0.15rem] rounded-sm mt-[0.20rem]">
                      {data.icon}
                    </span>
                    <span className="text-vol-950 font-semibold text-lg lg:text-xl">
                      {data.heading}
                    </span>
                  </div>
                  <div className="text-xs lg:text-sm text-cgray-ntext">
                    {data.description}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="">
            <img src="mix_bg.png" />
          </div>
        </div>

        <div className="w-full h-full relative lg:mt-8">
          <img src="footer_bg.png" />
          <div className="absolute top-[1.9rem] lg:top-[7rem] left-2 w-[97%] lg:w-[99%] z-40 text-white  flex flex-col gap-[0.01rem] lg:gap-4">
            <div className=" flex justify-between">
              <div className=" flex flex-col gap-2 lg:gap-8 ml-[1rem] lg:ml-[4rem]">
                <div>
                  <img
                    src="final_gc_logo_inverted_removebg.png"
                    className="h-3 w-6 lg:h-12 lg:w-24 bg-gray-900 rounded-xs lg:rounded-lg"
                  />
                </div>
                <div>
                  <p className="mb-1 lg:mb-4 wrap-break-word w-[8rem] lg:w-[30rem] text-[#78d1e6] text-[0.23rem] lg:text-sm">
                    This project is{" "}
                    <span className="font-medium">open source</span>. Dive into
                    the code, learn how it works, or contribute to make it even
                    better.
                  </p>
                  <button className="border hover:border-cgray-dtext hover:bg-cgray-first hover:text-cgray-dtext hover:font-medium transition-colors duration-300 rounded-xs lg:rounded-sm px-[0.1rem] lg:px-[0.6rem] text-[0.24rem] lg:text-sm py-[0.1rem] lg:py-2 flex items-center justify-center gap-[0.14rem] lg:gap-2 cursor-pointer">
                    <span>Github</span>
                    <FaRegArrowAltCircleRight />
                  </button>
                </div>
              </div>

              <div className=" flex gap-6 lg:gap-12 mr-[1rem] lg:mr-[12rem] ">
                {footerData.map((data: any, idx: any) => {
                  return (
                    <div
                      key={idx}
                      className="flex flex-col gap-1 lg:gap-5 text-[0.23rem] lg:text-sm font-semibold"
                    >
                      <span className="text-vol-300">{data.heading}</span>
                      <div className="flex flex-col gap-1 lg:gap-3 text-gray-100 font-medium ">
                        {data.options.map((option: any, index: any) => {
                          return (
                            <span
                              key={index}
                              className="cursor-pointer hover:text-gray-400"
                            >
                              {option}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:ml-[4rem] text-[0.3rem] lg:text-xs text-gray-500  flex justify-end mr-[12rem] w-[90%]">
              Copyright @ 2025 Github Center
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
