import { Provider } from "react-redux";
import "styles/globals.css";
import store from "redux/store";
import { AuthProvider, AuthConsumer } from "context/AuthContext";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>
      <AuthProvider>
        <AuthConsumer>
          {(auth) => {
            return getLayout(<Component {...pageProps} />);
          }}
        </AuthConsumer>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
