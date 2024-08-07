import React from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { ActionButtonProps } from "@/interfaces";
import ButtonWithIcon from "../ButtonWithIcon";
import Loader from "../Loader";

interface HeaderTitleProps {
  pageTitle?: string;
  pageDescription?: string;
  showPageExporter?: boolean;
  actionButton?: ActionButtonProps;
}
const HeaderTitle: React.FC<HeaderTitleProps> = ({ pageTitle, pageDescription, showPageExporter, actionButton }) => {
  return (
    <div className="mb-3 md:flex items-center justify-between sm:block">
      <div className="title sm:mb-3">
        <h6 className="font-semibold md:text-2xl text-xl text-center md:text-start mb-1 md:mb-0">{pageTitle && pageTitle}</h6>
        <p className="text-[12px]">{pageDescription || ""}</p>
      </div>
      {showPageExporter && (
        <div className="exporter flex items-center justify-between gap-3 sm:justify-normal">
          <ButtonWithIcon text="Export">
            <ArrowDown size={18} />
          </ButtonWithIcon>
        </div>
      )}
      <div className="flex items-center md:justify-end justify-center">
        {actionButton && (
          <Button
            className="px-6 py-2 uppercase min-w-[170px] rounded-sm bg-primary flex items-center justify-center text-[12px] w-full"
            onClick={actionButton.createButton?.onClick}
            disabled={actionButton.createButton?.disabled}
          >
            <div className="flex items-center justify-between gap-3">
              <span>{actionButton.createButton?.name}</span>
              <span>{actionButton.createButton?.loading && <Loader />}</span>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderTitle;
