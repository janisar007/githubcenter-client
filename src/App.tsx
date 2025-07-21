
import { Provider } from "react-redux";
import store from "./store/store";
import { AppRoutes } from "./routes/AppRoutes";
import { ToastProvider } from "./components/costum/Toast/ToastContext";

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

const App = () => {
  return (
    <Provider store={store}>
      <div className="App ">
        <ToastProvider>

          <AppRoutes />
        </ToastProvider>
      </div>
    </Provider>
  );
};

export default App;