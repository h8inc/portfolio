import React from 'react';
type GradientBackgroundProps = {
  children?: React.ReactNode;
};

// @component: GradientBackground
export const GradientBackground = (props: GradientBackgroundProps) => {
  // @return
  return <>
      {/* Fixed background that fills the viewport */}
      <div className="fixed inset-0 w-full h-screen bg-cover bg-center bg-no-repeat -z-10" style={{
      backgroundImage: 'url(https://framerusercontent.com/images/gOHq8h45ifJphidGvrjMYiYc.png?scale-down-to=1024&width=3072&height=3072)'
    }} />
      
      {/* Scrollable content */}
      <div className="relative w-full min-h-screen" style={{
      paddingTop: "60px"
    }}>
        {props.children}
      </div>
    </>;
};