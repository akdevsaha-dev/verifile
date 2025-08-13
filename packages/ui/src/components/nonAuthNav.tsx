export const NonAuthNavbar = () => {
  return (
    <div className="h-14 bg-slate-100 flex justify-between items-center">
      <a href="/upload" className="text-xl font-semibold pl-12">
        verifile
      </a>
      <div className="pr-3 gap-4 flex">
        <a href="/signin">Sign in</a>
        <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};
