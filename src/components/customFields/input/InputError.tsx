const InputError = ({ message }: { message: string }) => {
  return <span className="block my-1 mb-2 text-red-600 text-[12px] font-light">{message}</span>;
};

export default InputError;
