import { cn } from "@clikz/ui/lib/utils";
import { GridPattern } from "@clikz/ui/components/ui/grid-pattern";
import React, { FC, PropsWithChildren } from "react";

type MaxWidthContainerProps = PropsWithChildren<{
  className?: string;
  containerClassName?: string;
  showPattern?: boolean;
}>;

const MaxWidthContainer: FC<MaxWidthContainerProps> = ({
  children,
  className,
  showPattern,
  containerClassName
}) => {
  return (
    <main className={cn("h-screen relative overflow-hidden", containerClassName)}>
      {showPattern && (
        <GridPattern
          width={20}
          height={20}
          className={cn(
            "[mask-image:linear-gradient(to_bottom,white,white,transparent)] opacity-10 stroke-gray-950/40",
          )}
        />
      )}
      <div className={cn("max-w-4xl mx-auto px-4 z-20", className)}>
        {children}
      </div>
    </main>
  );
};

export default MaxWidthContainer;
