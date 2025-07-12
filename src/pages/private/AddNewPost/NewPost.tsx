// import React from "react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
import { apiService } from "../../../api/apiService";
import ImageUpload from "../../../components/utills/ImageUpload";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  // useMapEvents,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { reverseGeocode } from "@/utils/geocoding";

// Fix default marker icons
const DefaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

const LocationPicker = ({
  onLocationSelect,
  initialPosition = [51.505, -0.09],
}: any) => {
  const [position, setPosition] = useState(initialPosition);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [address, setAddress] = useState("");
  const [loadingAddress, setLoadingAddress] = useState(false);
  // Update this function to include geocoding
  const updateLocation = async (lat: number, lng: number) => {
    setPosition([lat, lng]);
    onLocationSelect([lng, lat]); // GeoJSON format

    // Get address
    setLoadingAddress(true);
    const newAddress = await reverseGeocode(lat, lng);
    setAddress(newAddress);
    setLoadingAddress(false);
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPosition = [latitude, longitude];
        setPosition(newPosition);
        onLocationSelect([longitude, latitude]); // GeoJSON format
        setLoading(false);
        await updateLocation(latitude, longitude);
      },
      (err: any) => {
        setError(err.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const MapClickHandler = () => {
    const map = useMap();

    useEffect(() => {
      const handleClick = async (e: any) => {
        const { lat, lng } = e.latlng;
        await updateLocation(lat, lng);
      };

      map.on("click", handleClick);
      () => map.off("click", handleClick);
    }, [map]);

    return null;
  };

  // Load initial address
  useEffect(() => {
    updateLocation(initialPosition[0], initialPosition[1]);
  }, []);

  return (
    <div className="space-y-2">
      <Button type="button" onClick={getCurrentLocation} disabled={loading}>
        {loading ? "Detecting..." : "Use My Current Location"}
      </Button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="h-64 w-full rounded-md overflow-hidden border">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>Selected Location</Popup>
          </Marker>
          <MapClickHandler />
        </MapContainer>
      </div>
      {/* Display the address */}
      <div className="mt-2">
        <Label>Address</Label>
        {loadingAddress ? (
          <p className="text-sm text-muted-foreground">Loading address...</p>
        ) : (
          <p className="text-sm">{address || "No address found"}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <Label>Latitude</Label>
          <Input value={position[0].toFixed(6)} readOnly />
        </div>
        <div>
          <Label>Longitude</Label>
          <Input value={position[1].toFixed(6)} readOnly />
        </div>
      </div>
    </div>
  );
};

const categoryOptions = [
  "art",
  "electronics",
  "furniture",
  "clothing",
  "collectibles",
  "other",
];

const schema = z.object({
  org_id: z.string().min(1, "org_id is required"),
  user_id: z.string().min(1, "user_id is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  minPrice: z.number().min(0, "Minimum price must be positive"),
  currentBid: z.number().default(0),
  post_images: z.array(z.string()).min(1, "At least one image is required"),
  post_status: z.string().default("active"),
  state: z.string().default("available"),
  category: z.string().min(1, "Category is required"),
  owner: z.string().min(1, "Owner ID is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.object({
    type: z.literal("Point").default("Point"),
    coordinates: z
      .array(z.number())
      .length(2, "Must provide [longitude, latitude]"),
    address: z.string().optional(), // Add this
  }),
});

type PostFormData = z.infer<typeof schema>;

const NewPost = () => {
  const owner = localStorage.getItem("userId") || "";
  const org_id = localStorage.getItem("orgId") || "";

  const defaultValues: PostFormData = {
    org_id: org_id,
    user_id: owner,
    title: "",
    description: "",
    minPrice: 0,
    currentBid: 0,
    post_images: [],
    post_status: "active",
    state: "available",
    category: "",
    owner,
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16),
    location: {
      type: "Point",
      coordinates: [0, 0],
      address: "",
    },
  };

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: PostFormData) => {
    try {
      console.log(data);
      const res: any = await apiService.createPost(data);
      if (res.data.code === 200) {
        toast.success("Post created successfully!");
        reset();
      } else {
        toast.error(`${res.errorMessage}`);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(`${err.message}`);
    }
  };

  const handleImageUpload = (urls: string[]) => {
    setValue("post_images", urls);
  };

  // const handleCoordinatesChange = (index: number, value: string) => {
  //   const coords = watch("location.coordinates");
  //   const numValue = parseFloat(value) || 0;
  //   const newCoords = [...coords];
  //   newCoords[index] = numValue;
  //   setValue("location.coordinates", newCoords);
  // };

  // const handleLocationSelect = (coordinates: [number, number]) => {
  //   setValue("location.coordinates", coordinates);
  // };

  // Then update your location handler:
  const handleLocationSelect = async (coordinates: [number, number]) => {
    const address = await reverseGeocode(coordinates[1], coordinates[0]);
    setValue("location.coordinates", coordinates);
    setValue("location.type", "Point");
    setValue("location.address", address);
  };

  return (
    <Card className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Create New Listing</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" rows={4} {...register("description")} />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="minPrice">Minimum Price ($)</Label>
          <Input
            id="minPrice"
            type="number"
            {...register("minPrice", { valueAsNumber: true })}
          />
          {errors.minPrice && (
            <p className="text-red-500">{errors.minPrice.message}</p>
          )}
        </div>

        <div>
          <Label>Images</Label>
          <ImageUpload onUploadComplete={handleImageUpload} />
          {errors.post_images && (
            <p className="text-red-500">{errors.post_images.message}</p>
          )}
        </div>

        <div>
          <Label>Category</Label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="endTime">Auction End Time</Label>
          <Input id="endTime" type="datetime-local" {...register("endTime")} />
          {errors.endTime && (
            <p className="text-red-500">{errors.endTime.message}</p>
          )}
        </div>

        <div>
          <Label>Location</Label>
          <LocationPicker
            onLocationSelect={handleLocationSelect}
            initialPosition={
              watch("location.coordinates")?.length === 2
                ? watch("location.coordinates").reverse()
                : [51.505, -0.09]
            }
          />
          {errors.location?.coordinates && (
            <p className="text-red-500">
              {errors.location.coordinates.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Create Listing
        </Button>
      </form>
    </Card>
  );
};

export default NewPost;
