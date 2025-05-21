type TextLoaderProps = {
  text: string;
};

export const TextLoader = ({ text }: TextLoaderProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999] backdrop-blur-[6px]">
      <div className="flex justify-center items-center gap-4">
        <div className="w-8 h-8 rounded-full animate-spin border-[3px] border-solid border-t-transparent border-white"></div>
        <h1 className="text-xl md:text-2xl font-normal text-white">{text}</h1>
      </div>
    </div>
  );
};
