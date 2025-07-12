import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <AlertCircle className="mx-auto h-20 w-20 text-destructive mb-4" />
          <h1 className="text-4xl font-bold tracking-tight mb-3">404</h1>
          <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
        </CardContent>
        <CardFooter className="justify-center pb-8">
          <Button onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};