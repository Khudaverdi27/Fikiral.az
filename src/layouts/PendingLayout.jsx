import { useEffect } from "react";
import { useModalActions } from "../context/LoginModalProvider";
import { useFetchAuthLogin } from "../hooks/useFetch";
import { saveStorage } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

function PendingLayout({ children }) {
  const { resRegister, setLoginAuth, setUserById } = useModalActions();
  const [userLoginAuth, loginFetch, userLoginAuthLoading] = useFetchAuthLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (resRegister.gmail) {
      loginFetch({ gmail: resRegister.gmail, password: resRegister.password });
    }
  }, [resRegister]);

  useEffect(() => {
    if (userLoginAuth.tokenResponse) {
      saveStorage("token", userLoginAuth.tokenResponse.accessToken);
      saveStorage("userId", userLoginAuth.userResponse.id);
      setUserById(userLoginAuth.userResponse);
      setLoginAuth(userLoginAuth);
      navigate("/home");
    }
  }, [userLoginAuth]);
  return (
    <main className="bg-[#F9F9F9]">
      <section className="h-full w-full ">{children}</section>
    </main>
  );
}

export default PendingLayout;
