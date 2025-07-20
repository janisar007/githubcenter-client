// ProtectedRoute.jsx
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

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
