import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
// import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { useQueryParam } from "@/hooks/useQueryParam";
import { apiService } from "@/api/apiService";
import { ImageLoader } from "@/components/common/ImageLoader";

interface Bid {
  _id: string;
  amount: number;
  bidder: {
    _id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

interface AuctionItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  currentBid: number;
  minPrice: number;
  bidCount: number;
  bids: any;
  post_images: string[];
  endTime: string;
  location: {
    address: string;
  };
  viewCount: number;
  post_status: string;
  state: string;
}



export const SingleFeedPost = () => {
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [bids, setBids] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<string>("");

  const post_id = useQueryParam("postId");

  const [item, setItem] = useState<AuctionItem>({
    _id: "",
    title: "",
    description: "",
    category: "",
    currentBid: 0,
    minPrice: 0,
    bidCount: 0,
    bids: [],
    post_images: [],
    endTime: "",
    location: { address: "" },
    viewCount: 0,
    post_status: "",
    state: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await apiService.getSinglePost(post_id);
        console.log(res);
        setItem(res.data);
        setBidAmount(Math.max(res.data.currentBid + 100, res.data.minPrice));
        setBids(res.data.bids);
      } catch (error: any) {
        console.log(error.message);
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [post_id]);

  // Simulate live bidding (in a real app, you'd use WebSockets or similar)
  useEffect(() => {
    const timer = setInterval(() => {
      // Update time left
      const end = new Date(item.endTime);
      const now = new Date();
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Auction ended");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(timer);
  }, [item.endTime]);

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bidAmount <= item.currentBid) {
      alert("Your bid must be higher than the current bid");
      return;
    }

    // In a real app, this would be an API call
    const newBid: Bid = {
      _id: `mock-${Date.now()}`,
      amount: bidAmount,
      bidder: {
        _id: "mock-user",
        name: "You",
        avatar: "https://github.com/shadcn.png",
      },
      createdAt: new Date().toISOString(),
    };

    setBids([newBid, ...bids]);
    // Update current bid
    item.currentBid = bidAmount;
    item.bidCount += 1;
    setBidAmount(bidAmount + 100);
  };

  return (
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 max-w-6xl mx-auto">
      {/* Left side - Item details */}
      {loading ? "Loading data.." : <Card className="h-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{item.title}</CardTitle>
              <CardDescription className="mt-2">
                {item.category} • {item.location.address}
              </CardDescription>
            </div>
            <Badge
              variant={item.post_status === "active" ? "default" : "secondary"}
            >
              {item.post_status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <div className=" bg-gray-100 rounded-lg overflow-hidden">
              {/* <img
                src={item.post_images[0]}
                alt={item.title}
                className="w-full h-full object-contain"
              /> */}
              <ImageLoader
                        src={item.post_images[0]}
                        alt={item.title}
                        width={345}
                        height={192}
                        className=" w-full"
                        lazy={true}
                      />
            </div>

            <div>
              <h3 className="font-semibold text-lg">Description</h3>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Starting Price</p>
                <p className="font-medium">₹{item.minPrice.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Bid</p>
                <p className="font-medium text-primary">
                  {item.currentBid > 0
                    ? `₹${item.currentBid.toLocaleString()}`
                    : "No bids yet"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bids</p>
                <p className="font-medium">{item.bidCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time Left</p>
                <p className="font-medium">{timeLeft}</p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">{item.viewCount} views</div>
          <Button variant="outline">Watch</Button>
        </CardFooter>
      </Card>}

      {/* Right side - Bidding feed */}
      {loading ? "Loading Bid feed.." : <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Place a Bid</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBidSubmit} className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Your Bid</p>
                <div className="flex items-center gap-2">
                  <span className="font-medium">₹</span>
                  <Input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    min={item.currentBid + 1}
                    step="100"
                    className="text-lg"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Next minimum bid: ₹
                  {Math.max(item.currentBid + 100, item.minPrice)}
                </p>
              </div>
              <Button type="submit" className="w-full">
                Place Bid
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bidding Activity</CardTitle>
            <CardDescription>{bids.length} bids placed</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              {bids.length > 0 ? (
                <div className="space-y-4">
                  {bids.map((bid:any) => (
                    <div key={bid._id} className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={bid.bidder.avatar} />
                        <AvatarFallback>
                          {bid.bidder.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">{bid.bidder.name}</p>
                          <p className="font-semibold text-primary">
                            ₹{bid.amount.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">
                          {format(
                            new Date(bid.createdAt),
                            "MMM d, yyyy h:mm a"
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No bids yet. Be the first to bid!
                </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>}
    </div>
  );
};
