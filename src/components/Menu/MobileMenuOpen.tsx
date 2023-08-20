import React, { Dispatch, SetStateAction } from "react";

export default function MobileMenuOpen({
  viewMenu,
  setViewMenu,
}: {
  viewMenu: boolean;
  setViewMenu: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-hidden bg-cyan-50">
      MobileMenuOpen
    </div>
  );
}
