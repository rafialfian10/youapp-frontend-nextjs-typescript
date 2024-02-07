"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";

import BackButton from "@/app/components/backButton/backButton";
import Loading from "@/app/loading";
import AuthUser from "@/app/components/authUser/authUser";
import { getProfile, updateProfile } from "@/redux/features/profileSlice";
import { ProfileValues } from "@/types/profile";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ------------------------------------------------------------------

function AddInterest() {
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

  // handle submit
  const { register, handleSubmit, reset } = useForm<ProfileValues>();

  const onSubmit: SubmitHandler<ProfileValues> = async (data, e) => {
    e?.preventDefault();
    try {
      const newInterest = data?.interests;
      const updatedInterests = profile?.interests
        ? [...profile.interests, newInterest]
        : [newInterest];

      const formData = {
        interests: updatedInterests,
      };

      const body = JSON.stringify(formData);

      const response = await dispatch(
        updateProfile({ formData: body, session })
      );
      if (response.payload && response.payload.data) {
        toast.success("Interest has been successfully updated", {
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
        dispatch(getProfile({ session, status }));
        reset();
      }
    } catch (e) {
      console.log("API Error:", e);
      toast.error("Interest failed to updated", {
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
    }
  };

  const onError = () => {
    console.log("Update profile failed");
  };

  // handle delete interest
  const handleDeleteInterest = async (data: string) => {
    try {
      const updatedInterests = profile.interests.filter(
        (item) => item !== data
      );

      const formData = {
        interests: updatedInterests,
      };

      const response = await dispatch(
        updateProfile({ formData: JSON.stringify(formData), session })
      );
      if (response.payload && response.payload.data) {
        toast.success(`Interest has been deleted`, {
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
        dispatch(getProfile({ session, status }));
        reset();
      }
    } catch (err) {
      console.log(err, "Delete interest failed");
    }
  };

  return (
    <section className="w-full md:w-60 min-h-screen md:max-h-dvh m-auto py-10 flex flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
        <div className="w-full mb-24 px-3 md:px-0 flex justify-between items-center">
          <BackButton />
          <button
            type="submit"
            className="w-1/2 px-3 text-end text-base font-light outline-none md:pr-10"
            style={{
              background:
                "linear-gradient(134.86deg, #ABFFFD 2.64%, #4599DB 102.4%, #AADAFF 102.4%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Save
          </button>
        </div>
        <div className="w-full mb-8 px-10">
          <p
            className="w-full mb-3 text-start text-lg md:text-2xl font-light outline-none"
            style={{
              background:
                "linear-gradient(74.08deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Tell everyone about yourself
          </p>
          <input
            type="text"
            placeholder="What interest you?"
            className="w-full text-start text-2xl md:text-3xl text-[#FFFFFF] font-normal font-inter rounded-lg outline-none bg-transparent focus:font-normal focus:no-underline"
            {...register("interests")}
          />
        </div>
      </form>
      <div className="w-90 h-auto mb-5 flex flex-wrap py-3 px-4 rounded-xl bg-[#243C3C]">
        {loading ? (
          <Loading />
        ) : (
          profile?.interests &&
          profile.interests.length > 0 &&
          profile?.interests.map((interest: string, index: number) => (
            <div
              key={index}
              className="m-1 flex py-1 px-3 rounded-xl bg-[#325252]"
            >
              <p className="me-2 text-base text-[#FFFFFF] font-normal font-inter">
                {interest}
              </p>
              <button
                type="button"
                className="text-base text-[#FFFFFF] font-normal font-inter"
                onClick={() => handleDeleteInterest(interest)}
              >
                X
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default AuthUser(AddInterest);
