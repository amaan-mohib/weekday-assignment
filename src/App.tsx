import "./App.css";
import Layout from "./Layout";
import Listing from "./Listing";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Listing />
      </Layout>
    </Provider>
  );
}

export default App;
