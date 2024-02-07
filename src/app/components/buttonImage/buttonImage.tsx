import { Fragment, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "@/redux/store";
import Image from "next/image";

import { setSelectedImage } from "@/redux/features/selectImageSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ----------------------------------------

export interface ButtonImageProps {
  getProfile: () => void;
}

function ButtonImage({ getProfile }: ButtonImageProps) {
  // dispatch
  const dispatch = useDispatch<AppDispatch>();

  const image = useAppSelector(
    (state: RootState) => state.selectImageSlice.selectedImage
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Convert the selected file to a data URL
      const reader = new FileReader();

      reader.onload = async (event) => {
        if (event.target && typeof event.target.result === "string") {
          try {
            const response = await dispatch(
              setSelectedImage(event.target.result)
            );
            if (response.payload) {
              toast.success(`Photo has been successfully updated`, {
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
              getProfile();
            }
          } catch (err) {
            console.log(err, "Photo failed to updated");
          }
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Fragment>
      <div className="w-50px h-50 relative me-3 flex justify-center items-center rounded-xl overflow-hidden bg-[#243c41] hover:cursor-pointer">
        {image && (
          <Image
            src={image}
            alt="photo"
            className="w-full h-full absolute"
            width={50}
            height={50}
            priority={true}
          />
        )}
        <button
          type="button"
          className="w-full h-full absolute z-10 outline-none"
          onClick={handleOpenImage}
        >
          {!image ? (
            <span className="w-full h-full flex justify-center items-center text-3xl text-[#FFFFFF] font-light font-inter">
              +
            </span>
          ) : (
            <span className="w-full h-full flex justify-center items-center opacity-0">
              +
            </span>
          )}
        </button>
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <p className="text-sm text-[#FFFFFF] font-normal font-inter">Add image</p>
    </Fragment>
  );
}

export default ButtonImage;
