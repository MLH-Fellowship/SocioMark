import PublicRouter from "./Router/PublicRouter";
import PrivateRouter from "./Router/PrivateRouter";

function App() {
  const access = localStorage.getItem("access_token");
  return <div>{access ? <PrivateRouter /> : <PublicRouter />}</div>;
}

export default App;
