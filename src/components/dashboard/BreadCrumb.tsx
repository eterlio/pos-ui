import { useMeta } from "@/hooks/useMeta";
import { ChevronRight } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BreadCrumb = () => {
  const { meta } = useMeta();
  const [breadcrumb, setBreadcrumb] = useState(meta?.breadcrumbs);

  useEffect(() => {
    setBreadcrumb((prev) => {
      if (breadcrumb) {
        if (prev && !prev.find((route) => route.url === "/")) {
          return [{ title: "Home", url: "/" }, ...prev];
        }
      }
    });
  }, []);

  return (
    <div className="-mt-2 pb-5 mb-5">
      <div className="flex items-center">
        {breadcrumb &&
          breadcrumb.length > 0 &&
          breadcrumb.map((crumb) => {
            const linkStyle = "text-[#10172a]";

            return (
              <div key={Math.random() * 3456786543546}>
                {crumb && crumb.url ? (
                  <div className="flex items-center justify-center gap-2 text-[13px]">
                    <Link to={crumb.url} className={linkStyle}>
                      {crumb.title}
                    </Link>
                    <ChevronRight size={16} />
                  </div>
                ) : (
                  <span className="text-gray-500 text-[13px]">
                    {crumb.title}
                  </span>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default memo(BreadCrumb);
