import { Fragment } from "react";
import { RootState, useAppSelector } from "@/redux/store";
import Image, { StaticImageData } from "next/image";

import CalculateAge from "../calculateAge/calculateAge";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import aquarius from "@/assets/aquarius.png";
import aries from "@/assets/aries.png";
import cancer from "@/assets/cancer.png";
import capricorn from "@/assets/capricorn.png";
import gemini from "@/assets/gemini.png";
import leo from "@/assets/leo.png";
import libra from "@/assets/libra.png";
import pisces from "@/assets/pisces.png";
import sagittarius from "@/assets/sagittarius.png";
import scorpius from "@/assets/scorpius.png";
import taurus from "@/assets/taurus.png";
import virgo from "@/assets/virgo.png";

import rabbit from "@/assets/rabbit.png";
import tiger from "@/assets/tiger.png";
import ox from "@/assets/ox.png";
import rat from "@/assets/rat.png";
import pig from "@/assets/pig.png";
import dog from "@/assets/dog.png";
import rooster from "@/assets/rooster.png";
import monkey from "@/assets/monkey.png";
import goat from "@/assets/goat.png";
import horse from "@/assets/horse.png";
import snake from "@/assets/snake.png";
import dragon from "@/assets/dragon.png";
// ---------------------------------------------
export interface JumbotronProps {
  profile: any;
}

interface HoroscopeImageMap {
  Aquarius: StaticImageData;
  Pisces: StaticImageData;
  Aries: StaticImageData;
  Taurus: StaticImageData;
  Gemini: StaticImageData;
  Cancer: StaticImageData;
  Leo: StaticImageData;
  Virgo: StaticImageData;
  Libra: StaticImageData;
  Scorpius: StaticImageData;
  Sagittarius: StaticImageData;
  Capricorn: StaticImageData;
}

interface ZodiacImageMap {
  Rabbit: StaticImageData;
  Tiger: StaticImageData;
  Ox: StaticImageData;
  Rat: StaticImageData;
  Pig: StaticImageData;
  Dog: StaticImageData;
  Rooster: StaticImageData;
  Monkey: StaticImageData;
  Goat: StaticImageData;
  Horse: StaticImageData;
  Snake: StaticImageData;
  Dragon: StaticImageData;
}

function Jumbotron({ profile }: JumbotronProps) {
  const image = useAppSelector(
    (state: RootState) => state.selectImageSlice.selectedImage
  );

  // gender
  const gender = () => {
    const storedGender = JSON.parse(localStorage.getItem("gender") ?? "null");
    return storedGender;
  };

  // calculate horoscope icon
  const horoscopeIcon = () => {
    const horoscopeImageMap: HoroscopeImageMap = {
      Aquarius: aquarius,
      Pisces: pisces,
      Aries: aries,
      Taurus: taurus,
      Gemini: gemini,
      Cancer: cancer,
      Leo: leo,
      Virgo: virgo,
      Libra: libra,
      Scorpius: scorpius,
      Sagittarius: sagittarius,
      Capricorn: capricorn,
    };

    const horoscopeKey = profile?.horoscope as keyof HoroscopeImageMap;
    return horoscopeImageMap[horoscopeKey] || null;
  };

  // calculaete zodiac icon
  const ZodiacIcon = () => {
    const zodiacImageMap: ZodiacImageMap = {
      Rabbit: rabbit,
      Tiger: tiger,
      Ox: ox,
      Rat: rat,
      Pig: pig,
      Dog: dog,
      Rooster: rooster,
      Monkey: monkey,
      Goat: goat,
      Horse: horse,
      Snake: snake,
      Dragon: dragon,
    };

    const zodiacKey = profile?.zodiac as keyof ZodiacImageMap;
    return zodiacImageMap[zodiacKey] || null;
  };

  return (
    <Fragment>
      {image && (
        <Image
          src={image}
          alt="photo"
          layout="fill"
          className="w-full h-full absolute"
          priority={true}
        />
      )}
      <div className="w-full h-full p-3 flex flex-col justify-between absolute">
        <div className="mb-10 text-end">
          <FontAwesomeIcon
            icon={faEdit}
            className="w-4 md:w-5 h-4 md:h-5 text-[#FFFFFF] text-lg font-normal cursor-pointer"
          />
        </div>
        <div className="w-full md:mb-10">
          <p className="mb-1 text-[#FFFFFF] text-lg md:text-2xl font-light font-inter">
            @{profile?.name},{" "}
            <CalculateAge
              birthDate={profile?.birthday}
              currentDate={new Date()}
            />
          </p>
          <p className="mb-2 text-[#FFFFFF] text-sm md:text-xl font-normal font-inter">
            {gender()}
          </p>
          <div className="w-full flex items-center">
            <div className="mr-3 my-2 flex items-center py-1 md:py-2 px-4 rounded-3xl bg-[#1D2F2F]">
              {horoscopeIcon() && (
                <Image
                  src={horoscopeIcon()}
                  alt="horoscope"
                  className="w-5 h-5 md:w-6 md:h-6 me-2 flex items-center text-base"
                  priority={true}
                  style={{
                    filter: "invert(100%)",
                  }}
                />
              )}
              <p className="me-2 text-base text-[#FFFFFF] font-normal font-inter">
                {profile?.horoscope}
              </p>
            </div>
            <div className="mr-3 my-2 flex py-1 md:py-2 px-4 rounded-3xl bg-[#1D2F2F]">
              {ZodiacIcon() && (
                <Image
                  src={ZodiacIcon()}
                  alt="zodiac"
                  className="w-5 h-5 md:w-6 md:h-6 me-2 flex items-center text-base"
                  priority={true}
                  style={{
                    filter: "invert(100%)",
                  }}
                />
              )}
              <p className="me-2 text-base text-[#FFFFFF] font-normal font-inter">
                {profile?.zodiac}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Jumbotron;
