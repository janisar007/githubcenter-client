import { useEffect, useState } from "react";
import { apiService } from "../../../api/apiService";
import { Button } from "@/components/ui/button";
import { RecipeReviewCard } from "@/components/mui/RecipeReviewCard"; 

const YourPost = () => {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [postLoading, setPostLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setPostLoading(true);
      try {
        const res = await apiService.getAllUserPost();
        console.log(res);
        setAllPosts(res.data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setPostLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex justify-end mb-4">
        <Button asChild>
          <a href="/newpost">Add New Post</a>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allPosts.map((post: any) => (
          <div key={post._id} className="">
            <RecipeReviewCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourPost;
