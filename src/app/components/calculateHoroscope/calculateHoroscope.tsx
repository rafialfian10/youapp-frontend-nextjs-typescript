import moment from "moment";
// -----------------------------------------

interface CalculateHoroscopeProps {
  birthday: string | null;
}

function CalculateHoroscope({ birthday }: CalculateHoroscopeProps) {
  const calculateHoroscope = (birthday: string) => {
    const date = moment(birthday, "YYYY-MM-DD");
    const day = date.date();
    const month = date.month() + 1;

    if (
      (month === 3 && day >= 21 && day <= 31) ||
      (month === 4 && day >= 1 && day <= 19)
    ) {
      return "Aries";
    } else if (
      (month === 4 && day >= 20 && day <= 30) ||
      (month === 5 && day >= 1 && day <= 20)
    ) {
      return "Taurus";
    } else if (
      (month === 5 && day >= 21 && day <= 31) ||
      (month === 6 && day >= 1 && day <= 21)
    ) {
      return "Gemini";
    } else if (
      (month === 6 && day >= 22 && day <= 30) ||
      (month === 7 && day >= 1 && day <= 22)
    ) {
      return "Cancer";
    } else if (
      (month === 7 && day >= 23 && day <= 31) ||
      (month === 8 && day >= 1 && day <= 22)
    ) {
      return "Leo";
    } else if (
      (month === 8 && day >= 23 && day <= 31) ||
      (month === 9 && day >= 1 && day <= 22)
    ) {
      return "Virgo";
    } else if (
      (month === 9 && day >= 23 && day <= 30) ||
      (month === 10 && day >= 1 && day <= 23)
    ) {
      return "Libra";
    } else if (
      (month === 10 && day >= 24 && day <= 31) ||
      (month === 11 && day >= 1 && day <= 21)
    ) {
      return "Scorpius";
    } else if (
      (month === 11 && day >= 22 && day <= 30) ||
      (month === 12 && day >= 1 && day <= 21)
    ) {
      return "Sagittarius";
    } else if (
      (month === 12 && day >= 22 && day <= 31) ||
      (month === 1 && day >= 1 && day <= 19)
    ) {
      return "Capricornus";
    } else if (
      (month === 1 && day >= 20 && day <= 31) ||
      (month === 2 && day >= 1 && day <= 18)
    ) {
      return "Aquarius";
    } else if (
      (month === 2 && day >= 19 && day <= 29) ||
      (month === 3 && day >= 1 && day <= 20)
    ) {
      return "Pisces";
    }

    return "";
  };

  return calculateHoroscope(birthday || "");
};

export default CalculateHoroscope;
