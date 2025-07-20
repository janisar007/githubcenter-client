
import { useEffect, useState } from "react";
import CardGrid from "./components/SearchCard";
import { apiService } from "@/api/apiService";
import { getLocalStorageItem } from "@/utils/storage";


const Dashboard = () => {

  const [ghData, setGhData] = useState<any>();
  const [ghLoading, setGhLoading] = useState<boolean>(false);



  // const ghData = [
  //   {
  //     userId: '2',
  //     clerkId: '3',
  //     username: 'janisar007',
  //     avatarUrl: 'https://avatars.githubusercontent.com/u/134937141?v=4',
  //     accUrl: 'https://github.com/janisar007',
  //     createdAt: "june 12",
  //   },
  //   {
  //     userId: '6',
  //     clerkId: '3',
  //     username: 'janisar007',
  //     avatarUrl: 'https://avatars.githubusercontent.com/u/134937141?v=4',
  //     accUrl: 'https://github.com/janisar007',
  //     createdAt: "june 12",
  //   },
  //   {
  //     userId: '4',
  //     clerkId: '3',
  //     username: 'janisar007',
  //     avatarUrl: 'https://avatars.githubusercontent.com/u/134937141?v=4',
  //     accUrl: 'https://github.com/janisar007',
  //     createdAt: "june 12",
  //   },
  // ]

  const userId = getLocalStorageItem("userId");

  useEffect(() => {

    const fetchData = async () => {
      try {
        const gh_data = await apiService.getAllGhInfo(userId);
        console.log(gh_data);
        setGhData(gh_data?.data);

      } catch (error) {
        console.log(error); 
      } finally {
        setGhLoading(true);
      }
    }

    fetchData();

  },[])



  return (
    <div className="flex flex-col p-4 bg-white h-[calc(100vh-7rem)]">
      <div className="p-4border-2">
      {ghLoading ? <CardGrid
        cards={ghData}
        onBookmark={(cardId) => console.log('Bookmark', cardId)}
        onShare={(cardId) => console.log('Share', cardId)}
        onCardClick={(card) => console.log('Card clicked', card)}
        className="max-w-[84rem] mx-auto bg-white"
        cardClassName="cursor-pointer bg-white"
        searchPlaceholder="Search projects..."
        emptyMessage="No matching projects found"
      /> : <div>No data</div>}
    </div>
    </div>
  );
};

export default Dashboard;