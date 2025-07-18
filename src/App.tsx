
import { Provider, useSelector } from "react-redux";
import store, { type RootState } from "./store/store";
import { GlobalLoader } from './components/common/GlobalLoader';
import { AppRoutes } from "./routes/AppRoutes";

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
      <div className="App">
        <AppRoutes />
      </div>
    </Provider>
  );
};

export default App;