// ProtectedRoute.jsx
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
// import { useNavigate } from "react-router-dom";

export default function PrivateLayout({ children }:any) {

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
