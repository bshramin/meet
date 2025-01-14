import Image from "next/image";
import BlueArrow from "../../public/assets/blue-button.svg";
import Gradient from "../../public/assets/Gradient.svg";
import HeroImage from "../../public/assets/Image.svg";
import Google from "../../public/assets/Google.svg";
import Slack from "../../public/assets/Slack.svg";
import TrustPilot from "../../public/assets/Trustpilot.svg";
import Cnn from "../../public/assets/CNN.svg";
import Clutch from "../../public/assets/Clutch.svg";

export function Hero() {
  return (
    <div className="pt-4 lg:pt-10">
      <div className="px-[20px] lg:px-[280px]">
        <h1 className="text-center text-[32px] leading[40px] font-medium text-[#172026] lg:text-[64px] lg:leading-[72px]">
          Start monitoring your website like a pro
        </h1>
        <p className="text-center pt-6 text-[#36485C] lg:text-[18px] lg:leading-7">
          Get a bird`&apos;`s eye view with our cusomizable dashboard. Stay on
          top of things! Revamp your work process with out fame-chanfing
          feature. Boost productivity and efficiency!
        </p>

        <div className="flex w-full pt-8 justify-center gap-x-6">
          <button className="bg-[#4328EB] w-1/2 py-4 px-8 text-white rounded-[4px] lg:w-fit">
            Try for free
          </button>
          <button className="text-[#4328EB] w-1/2 flex items-center justify-center gap-x-2 lg:w-fit">
            View Pricing
            <span>
              <Image src={BlueArrow} alt="Learn More" />
            </span>
          </button>
        </div>
      </div>

      <div className="relative flex h-full w-full justify-center">
        <Image
          src={Gradient}
          alt="Gradient"
          className="min-h-[500px] w-full object-cover"
        />
        <div className="absolute bottom-5 flex w-full flex-col items-center">
          <Image
            src={HeroImage}
            alt="Hero Image"
            className="-ml-10 h-[310px]"
          />
          <div className="flex w-full flex-col items-center">
            <p className="text-white text-center">Trusted by these companies</p>
            <div className="grid grid-cols-3 items-center justify-center justify-items-center px-[20px] align-middle">
              <Image src={Google} alt="Google" />
              <Image src={Slack} alt="Slack" />
              <Image src={TrustPilot} alt="TrustPilot" />
              <Image src={Cnn} alt="Cnn" />
              <Image src={Clutch} alt="Clutch" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
