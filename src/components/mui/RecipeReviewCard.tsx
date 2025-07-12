import * as React from "react"
import { formatDate } from "../../utils/tools"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, Share2, ChevronDown, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { ImageLoader } from "../common/ImageLoader"  // Adjust the import path
import { useNavigate } from "react-router-dom"
import { trackClick } from "@/lib/trackingUtils"

export function RecipeReviewCard({ post }: { post: any }) {

  // console.log(post)

  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false)

  const handleClick = async (postId:any, category:any) => {

    trackClick(postId, 'post-card', category);
    navigate(`/singleFeedPost?postId=${post?._id}`)
  }

  return (
    <Card className="max-w-[345px] overflow-hidden">
      <CardHeader className="relative">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback className="bg-destructive text-destructive-foreground">
              {post?.username?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-sm capitalize">{post?.owner?.username ? post?.owner?.username : "username"}</CardTitle>
            <CardDescription>{formatDate(post?.createdAt)}</CardDescription>
            <CardDescription className="capitalize font-semibold">{post?.category}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0" onClick={() => handleClick(post._id, post.category)}>
        <ImageLoader
          src={post?.post_images?.[0]}
          alt="Post image"
          width={345}
          height={192}
          className="h-48 w-full"
          lazy={true}
        />
        <div className="p-4">
          <p className="text-sm text-muted-foreground">{post?.title}</p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8 transition-transform", expanded && "rotate-180")}
          onClick={() => setExpanded(!expanded)}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CardFooter>

      {expanded && (
        <CardContent className="pt-0">
          <p className="text-sm">{post?.description}</p>
        </CardContent>
      )}
    </Card>
  )
}