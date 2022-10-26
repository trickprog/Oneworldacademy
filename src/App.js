import Home from "./pages/Home";
import appStyles from "./styles/app.module.css";
import"@stripe/stripe-js"
function App() {
  return (
    <div className={appStyles.app}>
      <Home />
    </div>
  );
}

export default App;
