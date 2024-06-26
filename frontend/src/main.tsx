import ScrollToTop from "@/components/Base/ScrollToTop";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import Router from "./router";
import "./assets/css/app.css";
import { AlertContext, AlertType } from "./utils/Contexts/AlertContext";
import { LoadingContext } from "./utils/Contexts/LoadingContext";
import { useEffect, useMemo, useState } from "react";
import { setSideMenu } from "./stores/menuSlice";
import { getUserData } from "./stores/authSlice";
import Toastify from "./custom-components/Toastify/Toastify";
import Loading from "./custom-components/Loading/Loading";
import "./translations/i18n"

const Main = () => {

  const [alert, setAlert] = useState<AlertType>({
    type: "success",
    show: false,
    text: '',
    desc: null
  })

  const [loading, setLoading] = useState<boolean>(false)

  const [splash, setSplash] = useState(true)

  const alertValue = useMemo(() => [alert, setAlert], [alert, setAlert]);
  const loadingValue = useMemo(() => [loading, setLoading], [loading, setLoading]);

  useEffect(() => {
    const getAuthUser = async () => {
      await store.dispatch(getUserData())
      await store.dispatch(setSideMenu())
      setSplash(false)
    }

    if (window.location.pathname !== '/login') {
      getAuthUser()
    } else {
      setSplash(false)
    }
  }, [])


  return (
    <BrowserRouter>
      <Provider store={store}>
        <AlertContext.Provider value={alertValue}>
          <LoadingContext.Provider value={loadingValue}>
            {
              !splash && (
                <Router />
              )
            }
            <Toastify />
            <Loading />
          </LoadingContext.Provider>
        </AlertContext.Provider>
      </Provider>
      <ScrollToTop />
    </BrowserRouter>
  )
}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Main />
);
