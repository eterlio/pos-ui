import { Route } from "react-router-dom";
import CustomSwitch from "./components/CustomSwitch";
import { ROUTES } from "./route";
import { RoutesProps } from "./interfaces/route";
import PersistLogin from "./persistLogin/PersistLogin";
import RequireAuth from "./persistLogin/RequireAuth";
import NotFoundScreen from "./components/NotFound";

function App() {
  return (
    <CustomSwitch>
      {ROUTES.map((route: RoutesProps, index: number) => {
        return route.requireAuth ? (
          <Route element={<PersistLogin />} key={index}>
            <Route element={<RequireAuth permission={route.permission!} meta={route.meta} />}>
              <Route path={route.url} element={<route.component />} />
            </Route>
          </Route>
        ) : (
          <Route path={route.url} element={<route.component />} key={route.url} />
        );
      })}

      <Route path="*" element={<NotFoundScreen />} />
    </CustomSwitch>
  );
}

export default App;
