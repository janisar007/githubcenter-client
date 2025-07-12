import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { signInSuccess } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { authService } from "../../api/authService";

export const OtpVerification = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<any>({});
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email);
      setState(location.state);
    } else {
      navigate("/register", { replace: true });
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError("");

    try {
      const res: any = await authService.verifyOtp({
        email: email,
        otp: otp,
      });

      if (res.data.code === 200) {
        const response: any = await authService.register({
          email: email,
          username: state.username,
          password: state.password,
          organization: state.organization,
        });

        if (response.data.code === 200) {
          Cookies.set("auth", response.data.token);
          const payload: any = {
            token: response.data.token,
            userId: response.data.userId,
            role: response.data.role,
            orgId: response.data.org_id,
          };

          dispatch(signInSuccess(payload));
          localStorage.setItem("userId", response.data.id);
          localStorage.setItem("auth", response.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("orgId", response.data.orgId);
          window.location.href = "/dashboard";
        }
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">OTP Verification</h1>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-6">
            We've sent a 6-digit code to {email}
          </p>

          {error && (
            <p className="text-center text-destructive mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
                placeholder="6-digit code"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isVerifying || otp.length !== 6}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Didn't receive code?{" "}
            <Button
              variant="link"
              className="h-auto p-0 text-sm"
              disabled={isVerifying}
            >
              Resend OTP
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};