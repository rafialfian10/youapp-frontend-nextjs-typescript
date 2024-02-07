"use client";

import { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";

import AboutForm from "@/app/components/aboutForm/aboutForm";
import Interest from "@/app/components/interest/interest";
import Loading from "@/app/loading";
import Jumbotron from "@/app/components/jumbotron/jumbotron";
import BackButton from "@/app/components/backButton/backButton";
import Logout from "@/app/components/logout/logout";
import AuthUser from "@/app/components/authUser/authUser";
import { getProfile } from "@/redux/features/profileSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
// ------------------------------------------------------------------

function InitialState() {
  // session
  const { data: session, status } = useSession();

  // dispatch
  const dispatch = useDispatch<AppDispatch>();
  const profile = useAppSelector(
    (state: RootState) => state.profileSlice.profile
  );
  const loading = useAppSelector(
    (state: RootState) => state.profileSlice.loading
  );

  useEffect(() => {
    dispatch(getProfile({ session, status }));
  }, []);

  // state show dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <section className="w-full md:w-60 min-h-screen m-auto py-10 flex flex-col items-center">
          <div className="w-full relative mb-14 px-3 flex justify-between">
            <BackButton />
            <p className="w-1/3 md:w-1/2 flex items-center justify-center md:justify-start text-base md:text-xl text-center text-[#FFFFFF] font-normal font-inter">
              {profile?.username}
            </p>
            <button
              type="button"
              className=" w-1/3 md:w-1/2 p-0 m-0 text-end text-[#FFFFFF] font-normal outline-none"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="w-5 md:w-7 h-full text-[#FFFFFF] font-bold"
              />
            </button>
            {showDropdown && (
              <div className="origin-top-right absolute right-3 py-1 mt-8 rounded-lg outline-none bg-[#162329]">
                <Logout />
              </div>
            )}
          </div>
          <div className="w-95 h-200 md:h-400 relative mb-10 rounded-3xl overflow-hidden bg-[#162329]">
            <Jumbotron profile={profile} />
          </div>
          <div className="w-95 h-auto relative mb-5 flex flex-col justify-between px-6 p-3 rounded-3xl bg-[#162329]">
            <AboutForm
              getProfile={() => dispatch(getProfile({ session, status }))}
              profile={profile}
            />
          </div>
          <div className="w-95 h-auto mb-5 flex flex-col justify-between py-3 px-6 rounded-3xl bg-[#162329]">
            <Interest profile={profile} />
          </div>
        </section>
      )}
    </Fragment>
  );
}

export default AuthUser(InitialState);
