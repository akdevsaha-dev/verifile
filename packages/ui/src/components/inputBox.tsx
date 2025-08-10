interface inputBoxProps {
  label: string;
  value: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  ref?: React.Ref<HTMLInputElement>;
}

export const InputBox = ({
  label,
  value,
  placeholder,
  type,
  onChange,
  onKeyDown,
  ref,
}: inputBoxProps) => {
  return (
    <div className="flex flex-col w-[350px]">
      <label className="text-neutral-600 mt-6">{label}</label>
      <input
        ref={ref}
        className="mt-5 focus:outline-none focus:border-[1px] border-[1px] rounded-full px-4 py-3"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
