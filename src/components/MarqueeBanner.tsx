import * as React from "react";
import Marquee from "react-fast-marquee";

type MarqueeBannerProps = {
  items: React.ReactNode[];
  speed?: number;
  gradient?: boolean;
  className?: string;
  itemClassName?: string;
  repeat?: number;
};

export function MarqueeBanner({
  items,
  speed = 50,
  gradient = false,
  className = "",
  itemClassName = "mx-3 sm:mx-4",
  repeat = 6,
}: MarqueeBannerProps) {
  const belt = React.useMemo(
    () =>
      Array.from({ length: repeat }).flatMap((_, i) =>
        items.map((node, idx) => (
          <span className={itemClassName} key={`${i}-${idx}`}>
            {node}
          </span>
        ))
      ),
    [items, itemClassName, repeat]
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <Marquee speed={speed} gradient={gradient} className="flex items-center">
        <div className="flex items-center">{belt}</div>
      </Marquee>
    </div>
  );
}


