import PublicRouter from "./Router/PublicRouter";
import PrivateRouter from "./Router/PrivateRouter";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

function App() {
  const access = localStorage.getItem("access_token");
  injectStyle();

  return (
    <div>
      {access ? <PrivateRouter /> : <PublicRouter />}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
