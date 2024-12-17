import { Link } from "react-router-dom";

const TitleComponents = ({ title }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-black">{title}</h1>
      <div className="flex items-center gap-2">
        <Link to={"/dashboard"} className="text-sm text-gray-400">
          Dashboard
        </Link>
        <span className="text-sm text-gray-400">/</span>
        <span className="text-sm text-blue-400">{title}</span>
      </div>
    </div>
  );
};

export default TitleComponents;
