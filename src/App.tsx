import { Provider } from "react-redux";
import store from "./store/store";
import { AppRoutes } from "./routes/AppRoutes";
import { ToastProvider } from "./components/costum/Toast/ToastContext";
import { OverlayProvider } from "@react-aria/overlays";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { apiService } from "./api/apiService";
// const AppContent: React.FC = () => {
//   const { initializing } = useSelector((state: RootState) => state.auth);

//   console.log(initializing)

//   return (
//     <>
//       <GlobalLoader loading={initializing} />
//       {!initializing && <AppRoutes />}
//     </>
//   );
// };

const AppInitializer = () => {
  const { isSignedIn, user } = useUser();
  console.log(isSignedIn)

  useEffect(() => {

    if(isSignedIn != undefined && isSignedIn === false) {
      localStorage.clear();
    }

  }, [isSignedIn])

  useEffect(() => {
    const init = async () => {
      if (isSignedIn && user) {
        try {
          const userInfo = await apiService.getUserInfo(
            user.id,
            user.emailAddresses[0]?.emailAddress
          );
          if (userInfo?.data?._id) {
            localStorage.setItem("userId", userInfo.data._id);
            localStorage.setItem("email", userInfo.data.email);
            // sessionStorage.setItem("userId", userInfo.data._id);
            // sessionStorage.setItem("email", userInfo.data.email);
          }
        } catch (err) {
          console.error("Error fetching initial data:", err);
        }
      }
    };

    init();
  }, [isSignedIn, user]);

  return null;
};

const App = () => {
  return (
    <Provider store={store}>
      <div className="App ">
        <AppInitializer/>
        <OverlayProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </OverlayProvider>
      </div>
    </Provider>
  );
};

export default App;
