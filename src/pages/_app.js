import { Provider } from "react-redux";
import "styles/globals.css";
import store from "redux/store";
import { AuthProvider, AuthConsumer } from "context/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>
      <AuthProvider>
        <AuthConsumer>
          {(auth) => {
            const theme = createTheme();

            return (
              <ThemeProvider theme={theme}>
                {getLayout(<Component {...pageProps} />)}
              </ThemeProvider>
            );
          }}
        </AuthConsumer>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
