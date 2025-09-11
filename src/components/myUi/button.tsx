import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  nameOfTheButton: string;
  functionOnClick?: () => void;
  buttonClassName?: string;
}
const button: React.FC<Props> = ({
  nameOfTheButton,
  functionOnClick,
  buttonClassName,
}) => {
  return (
    <button
      className={cn(`text-xl `, buttonClassName)}
      onClick={() => functionOnClick}
    >
      {nameOfTheButton}
    </button>
  );
};

export default button;
