import moment from "moment";
// -----------------------------------------

interface CalculateAgeProps {
  birthDate: any;
  currentDate: any;
}

function CalculateAge({ birthDate, currentDate }: CalculateAgeProps) {
  if (!birthDate || !moment(birthDate, "YYYY-MM-DD", true).isValid()) {
    return <></>;
  }

  const startDate = moment(birthDate, "YYYY-MM-DD");
  const endDate = moment(currentDate);
  const age = endDate.diff(startDate, "years");

  return <>{age.toString()}</>;
}

export default CalculateAge;
