import PublicRouter from "./Router/PublicRouter";
import PrivateRouter from "./Router/PrivateRouter";
import { ToastContainer } from "react-toastify";

function App() {
  const access = localStorage.getItem("access_token");

  return (
    <div>
      {access ? <PrivateRouter /> : <PublicRouter />}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
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
