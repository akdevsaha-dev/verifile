export const Navbar = ({ email }: { email: string }) => {
  return (
    <nav className="h-16 flex justify-center items-center ">
      <div className="  px-6 py-3 mt-2 rounded-full text-orange-500 bg-slate-200">
        {email}
      </div>
    </nav>
  );
};
