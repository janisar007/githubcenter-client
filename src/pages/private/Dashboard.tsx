import { useEffect, useState, useRef, useCallback } from "react";
import { apiService } from "@/api/apiService"; 
import { RecipeReviewCard } from "@/components/mui/RecipeReviewCard";
import { recommendationService } from "@/api/recommendationService";
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const Dashboard = () => {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [postLoading, setPostLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [limit] = useState(20); // You can make this configurable
  const observer = useRef<IntersectionObserver | null>(null);





  const fetchPosts = useCallback(async (pageNumber: number) => {
    setPostLoading(true);
    try {
      const res = await apiService.getAllPost({ 
        page: pageNumber,
        limit: limit
      });
      const resp:any = await recommendationService.getRecommendedPost();

      console.log(resp)
      
      const { posts, pagination } = res.data;
      
      setAllPosts(prevPosts => 
        pageNumber === 1 ? posts : [...prevPosts, ...posts]
      );
      setHasMore(pagination.hasNextPage);
      
      if (pagination.hasNextPage) {
        setPage(pageNumber + 1);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setPostLoading(false);
    }
  }, [limit]);

  // Reset pagination when limit changes
  useEffect(() => {
    setPage(1);
    setAllPosts([]);
    setHasMore(true);
    fetchPosts(1);
  }, [fetchPosts]);

  // Infinite scroll observer
  const lastPostRef = useCallback((node: HTMLDivElement | null) => {
    if (postLoading || !hasMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchPosts(page);
      }
    }, {
      threshold: 0.1,
      rootMargin: '100px'
    });
    
    if (node) observer.current.observe(node);
  }, [postLoading, hasMore, fetchPosts, page]);


   const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * 3 + columnIndex;
    if (index >= allPosts.length) return null;
    
    return (
      <div style={style}>
        <RecipeReviewCard post={allPosts[index]} />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1">
        <AutoSizer>
          {({ height, width }) => (
            <Grid
              columnCount={3}
              columnWidth={width / 3}
              height={height}
              rowCount={Math.ceil(allPosts.length / 3)}
              rowHeight={500} // Adjust based on your card height
              width={width}
            >
              {Cell}
            </Grid>
          )}
        </AutoSizer>
      </div>
      
      {/* Keep your loading spinner and end message */}
      {postLoading && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      
      {!hasMore && allPosts.length > 0 && (
        <div className="flex justify-center my-4 text-sm text-gray-500">
          You've reached the end
        </div>
      )}
    </div>
  );
};

export default Dashboard;