import React from "react";
import LoadingSpinner from "@component/components/Loading/LoadingSpinner";
import LoadingDotBounce from "@component/components/Loading/LoadingDotBounce";
import LoadingLines from "@component/components/Loading/LoadingLines";

export default function loading() {
  // return <LoadingSpinner iconSize="xl" />;
  // return <LoadingDotBounce dotColor="blue" />;
  return <LoadingLines />;
}
