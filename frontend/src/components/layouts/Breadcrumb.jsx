import { useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();

  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div className="text-sm opacity-60">
      {paths.length ? paths.join(" / ") : "dashboard"}
    </div>
  );
}
