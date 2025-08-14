import { Provider } from "react-redux";
import store from "./store/store";
import { AppRoutes } from "./routes/AppRoutes";
import { ToastProvider } from "./components/costum/Toast/ToastContext";
import { OverlayProvider } from "@react-aria/overlays";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { apiService } from "./api/apiService";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";

const GlobalLoader = () => (
  <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
    <Trefoil
      size="140"
      stroke="7"
      strokeLength="0.15"
      bgOpacity="0.1"
      speed="2.2"
      color="#4604AE"
    />
    <div className="flex items-center gap-1 font-bold">
      <span className="text-vol-300">Github</span>
      <span className="text-vol-950">Center</span>
    </div>
  </div>
);

const AppInitializer = ({ onInitDone }: any) => {
  const { isSignedIn, user, isLoaded } = useUser(); // isLoaded ensures Clerk has finished loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (!isLoaded) return; // Wait until Clerk finishes
      if (isSignedIn === false) {
        localStorage.clear();
        setLoading(false);
        onInitDone();
        return;
      }

      if (isSignedIn && user) {
        try {
          const userInfo = await apiService.getUserInfo(
            user.id,
            user.emailAddresses[0]?.emailAddress
          );
          if (userInfo?.data?._id) {
            localStorage.setItem("userId", userInfo.data._id);
            localStorage.setItem("email", userInfo.data.email);
          }
        } catch (err) {
          console.error("Error fetching initial data:", err);
        }
      }
      setLoading(false);
      onInitDone();
    };

    init();
  }, [isSignedIn, user, isLoaded, onInitDone]);

  return loading ? <GlobalLoader /> : null;
};

const App = () => {
  const [initDone, setInitDone] = useState(false);

  return (
    <Provider store={store}>
      <div className="App">
        {!initDone && <GlobalLoader />}
        <AppInitializer onInitDone={() => setInitDone(true)} />
        {initDone && (
          <OverlayProvider>
            <ToastProvider>
              <AppRoutes />
            </ToastProvider>
          </OverlayProvider>
        )}
      </div>
    </Provider>
  );
};

export default App;
