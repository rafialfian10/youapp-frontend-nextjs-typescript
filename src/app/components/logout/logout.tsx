import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
// --------------------------------------------------

function Logout() {
  const router = useRouter();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    toast.success("Logout Successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: { marginTop: "65px" },
    });
    signOut();
    router.push("/pages/login");
  };

  return (
    <button
      type="button"
      className="w-full flex justify-center items-center py-2 px-4 text-center text-sm text-[#FFFFFF] font-normal outline-none"
      onClick={handleLogout}
    >
      <FontAwesomeIcon
        icon={faSignOutAlt}
        className="mr-2 text-[#FFFFFF] text-lg"
      />
      Logout
    </button>
  );
}

export default Logout;
