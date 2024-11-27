import React, { FC, PropsWithChildren } from "react";
import MaxWidthContainer from "~/components/max-width-container";

const OnboardingLayout: FC<PropsWithChildren> = ({ children }) => {
  return <MaxWidthContainer showPattern className="bg-gradient-custom">{children}</MaxWidthContainer>;
};

export default OnboardingLayout;