import Image, { StaticImageData } from "next/image";

const PSBox = ({
  desc,
  file,
  image,
  smallLogo,
  width,
}: {
  desc: string;
  file: string;
  image: StaticImageData;
  smallLogo?: boolean;
  width?: number;
}) => {
  return (
    <div className="block w-[90%] overflow-hidden m-6 p-4 bg-slate-800 text-white border rounded-lg shadow hover:border-none hover:text-slate-800 border-gray-700 bg-slate-800 hover:bg-mild-red cursor-pointer">
      <a href={file} target="_blank">
        <div className="h-[200px] items-center text-center">
          <div
            className={`flex justify-center item-center h-[70%] p-4 pb-2 md:p-8 ${
              smallLogo ? "md:pb-0" : ""
            }`}
          >
            <Image src={image} alt="logo" width={width} />
          </div>
          <p className="font-bold">{desc}</p>
        </div>
      </a>
    </div>
  );
};

export default PSBox;
