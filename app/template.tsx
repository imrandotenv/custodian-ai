"use client";

import React from "react";
import CurveTransition from "@/components/CurveTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <CurveTransition>{children}</CurveTransition>;
}
