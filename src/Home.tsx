import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full h-[70%]">
      <p className="text-3xl mb-6">Projects:</p>
      <NavLink to={"/syntaxChecker"}>
        <button className="border-2 rounded-md px-8 py-4 font-bold bg-blue-950 text-slate-50 hover:border-blue-950 hover:bg-slate-50 hover:text-blue-950">
          Syntax Checker
        </button>
      </NavLink>
    </div>
  );
}
