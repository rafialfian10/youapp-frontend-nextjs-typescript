import { useRouter } from "next/navigation";
// ------------------------------------------------

interface BackButtonProps {
  route?: string;
}

function BackButton({ route }: BackButtonProps) {
  const router = useRouter();

  const handleRoute = () => {
    if (route) {
      router.push(route);
    } else {
      router.back();
    }
  };

  return (
    <button
      type="button"
      onClick={handleRoute}
      className="w-1/3 text-base text-start text-[#FFFFFF] font-normal font-inter md:hidden"
    >
      &#x3008; &nbsp; Back
    </button>
  );
}

export default BackButton;
