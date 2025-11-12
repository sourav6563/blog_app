import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.service.js";
import { logout } from "../../features/auth.slice.js";
import { useNavigate } from "react-router-dom";

export function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => console.log(` logout not happend:${error}`));
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logOutHandler}
    >
      LogOut
    </button>
  );
}
