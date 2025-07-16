// ProtectedRoute.jsx
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

export default function ProtectedRoute({ children }:any) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
