import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useSetQueryParam = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const initialQueryObject: Record<string, string> = {};
  queryParams.forEach((value, key) => {
    initialQueryObject[key] = value;
  });

  const [queryObject, setQueryObject] = useState<Record<string, string>>(initialQueryObject);

  useEffect(() => {
    const newQueryObject: Record<string, string> = {};
    queryParams.forEach((value, key) => {
      newQueryObject[key] = value;
    });
    setQueryObject(newQueryObject);
  }, [location.search]);

  const setQueryParam = (param: string, value: string) => {
    queryParams.set(param, value);
    updateUrl();
  };

  const removeQueryParam = (param: string) => {
    queryParams.delete(param);
    updateUrl();
  };

  const getQueryParam = (param: string) => {
    return queryParams.get(param) || "";
  };

  const updateUrl = () => {
    navigate({
      search: `?${queryParams.toString()}`
    });
  };

  return { setQueryParam, removeQueryParam, getQueryParam, queryObject, queryParams };
};
