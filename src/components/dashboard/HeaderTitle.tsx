import React from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { ActionButtonProps } from "@/interfaces";
import ButtonWithIcon from "../ButtonWithIcon";
import Loader from "../Loader";

interface HeaderTitleProps {
  pageTitle: string;
  pageDescription?: string;
  showPageExporter?: boolean;
  actionButtons?: ActionButtonProps;
}
const HeaderTitle: React.FC<HeaderTitleProps> = ({
  pageTitle,
  pageDescription,
  showPageExporter,
  actionButtons,
}) => {
  return (
    <div className="mb-3 lg:flex items-center justify-between sm:block">
      <div className="title sm:mb-3">
        <h6 className="font-semibold text-2xl">{pageTitle}</h6>
        <p className="text-[12px]">{pageDescription || ""}</p>
      </div>
      {showPageExporter && (
        <div className="exporter flex items-center justify-between gap-3 sm:justify-normal">
          <ButtonWithIcon text="Export">
            <ArrowDown size={18} />
          </ButtonWithIcon>
        </div>
      )}
      <div className="flex items-center justify-end">
        {actionButtons && (
          <Button
            className="px-8 py-3 uppercase min-w-[200px] rounded-sm bg-primaryButton hover:bg-primaryButton flex"
            onClick={actionButtons.createButton?.onClick}
            disabled={actionButtons.createButton?.disabled}
          >
            <div className="flex items-center justify-between gap-5">
              <span>{actionButtons.createButton?.name}</span>
              <span>{actionButtons.createButton?.loading && <Loader />}</span>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderTitle;
