import { NavLink } from "react-router-dom";

export default function Button({
  name,
  path,
  learning,
}: {
  name: string;
  path: string;
  learning: string;
}) {
  return (
    <NavLink to={path}>
      <div className="flex flex-col gap-2 hover:scale-[102%] ease-in-out duration-500">
        <button className="w-fit border-2 rounded-md px-8 py-4 font-bold bg-blue-950 text-slate-50 hover:border-blue-950 hover:bg-slate-50 hover:text-blue-950">
          {name}
        </button>
        <p className="font-semibold font-mono ml-1"> {learning}</p>
      </div>
    </NavLink>
  );
}
