import Image from "next/image";

const LoadingIndicator = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-transparent">
      <Image
        src="/images/icons/sb11-logo.png"
        alt="Science Bee Logo"
        height={3817}
        width={4838}
        className="w-28 animate-pulse md:w-36 lg:w-40 xl:w-48"
      />
    </div>
  );
};

export default LoadingIndicator;
