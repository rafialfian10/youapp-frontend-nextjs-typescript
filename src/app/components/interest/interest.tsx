import Link from "next/link";
import { Fragment } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
// ------------------------------------------------

export interface InterestProps {
  profile: any;
}

function Interest({ profile }: InterestProps) {
  return (
    <Fragment>
      <div className="mb-2 flex flex-row justify-between">
        <p className="w-1/2 mb-3 text-start text-base text-[#FFFFFF] font-normal font-inter">
          Interest
        </p>
        <Link href={`/pages/addInterest`} className="text-end">
          <FontAwesomeIcon
            icon={faEdit}
            className="w-4 md:w-5 h-4 md:h-5 text-[#FFFFFF] text-lg font-normal cursor-pointer"
          />
        </Link>
      </div>
      {profile?.interests && profile.interests.length > 0 ? (
        <div className="w-full h-auto mb-5 flex flex-wrap py-3">
          {profile.interests.map((interest: string, index: number) => (
            <div
              key={index}
              className="h-10 me-2 my-2 px-4 flex justify-center items-center rounded-3xl bg-[#243C3C]"
            >
              <p className="text-base text-[#FFFFFF] font-normal font-inter m-0">
                {interest}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mb-5 text-sm text-[#FFFFFF85] font-inter">
          Add in your interest to find a better match
        </p>
      )}
    </Fragment>
  );
}

export default Interest;
