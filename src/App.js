import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import AuthProvider from "./Components/Contexts/authContext";
import Footer from "./Components/Navigations/Footer";
import Navigation from "./Components/Navigations/Navigation";

const useTheme = createTheme({
  palette: {
    primary: {
      main: '#58ec53',
    },
    secondary: {
      main: '#fffffff2'
    }
  },
  typography: {
    fontFamily: 'Noto Sans JP, sans-serif;',
  }
})

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={useTheme}>
        <Navigation />
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
