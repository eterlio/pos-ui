import { FC, ReactNode } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { FetchLoader } from "./FetchLoader";

interface DrawerProps {
  loading?: boolean;
  title: string | ReactNode;
  description: string;
  open?: boolean;
  children?: ReactNode;
  handleDrawerClose: () => void;
  position: "top" | "right" | "bottom" | "left";
}
const Drawer: FC<DrawerProps> = ({
  open,
  loading,
  description,
  title,
  children,
  handleDrawerClose,
  position = "right"
}) => {
  return (
    <Sheet
      open={open}
      defaultOpen={open}
      onOpenChange={() => {
        if (loading) return;
        handleDrawerClose();
      }}
    >
      <SheetContent className="sm:max-w-[450px] w-full overflow-y-auto" side={position}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <FetchLoader />
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <SheetHeader className="mt-10">
              <SheetTitle className="text-center text-xl">{title}</SheetTitle>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>
            <div className="flex-1"></div>
            {children}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
