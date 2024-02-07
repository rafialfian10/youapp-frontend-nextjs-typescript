import moment from "moment";

import CalculateAge from "../calculateAge/calculateAge";
// ------------------------------------------------------------

export interface DisplayAboutProps {
  profile: any;
}

function DisplayAbout({ profile }: DisplayAboutProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-5 flex justify-start">
        <p className="flex mr-3 text-sm text-[#FFFFFF4D] font-light font-inter">
          Birthday:
        </p>
        <p className="text-sm text-[#FFFFFF]">
          {profile?.birthday
            ? moment(profile?.birthday).format("DD / MM / YYYY")
            : ""}{" "}
          (Age{" "}
          <CalculateAge
            birthDate={profile?.birthday}
            currentDate={new Date()}
          />
          )
        </p>
      </div>
      <div className="mb-5 flex justify-start">
        <p className="mr-3 text-sm text-[#FFFFFF4D] font-light font-inter">
          Horoscope:{" "}
        </p>
        <p className="text-sm text-[#FFFFFF]">
          {profile?.horoscope ? profile?.horoscope : ""}
        </p>
      </div>
      <div className="mb-5 flex justify-start">
        <p className="mr-3 text-sm text-[#FFFFFF4D] font-light font-inter">
          Zodiac:{" "}
        </p>
        <p className="text-sm text-[#FFFFFF]">
          {profile?.zodiac ? profile?.zodiac : "Pig"}
        </p>
      </div>
      <div className="mb-5 flex justify-start">
        <p className="mr-3 text-sm text-[#FFFFFF4D] font-light font-inter">
          Height:{" "}
        </p>
        <p className="text-sm text-[#FFFFFF]">
          {profile?.height ? profile?.height : ""} cm
        </p>
      </div>
      <div className="mb-5 flex justify-start">
        <p className="mr-3 text-sm text-[#FFFFFF4D] font-light font-inter">
          Weight:{" "}
        </p>
        <p className="text-sm text-[#FFFFFF]">
          {profile?.weight ? profile?.weight : ""} kg
        </p>
      </div>
    </div>
  );
}

export default DisplayAbout;
