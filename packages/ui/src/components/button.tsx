interface buttonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ text, onClick }: buttonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-[350px] mt-8 rounded-full bg-orange-500 hover:bg-orange-400 cursor-pointer text-white font-semibold h-12 flex items-center justify-center"
    >
      {text}
    </button>
  );
};
