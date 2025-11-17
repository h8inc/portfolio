import React from 'react';
type GradientBackgroundProps = {
  children?: React.ReactNode;
};

// @component: GradientBackground
export const GradientBackground = (props: GradientBackgroundProps) => {
  // @return
  return <>
      {/* Fixed background that fills the viewport */}
      <div
        className="fixed inset-0 w-full h-screen z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 0%, rgba(227,233,255,1) 0%, rgba(243,239,234,1) 60%, rgba(247,226,216,1) 100%)'
        }}
      />
      <div
        className="fixed inset-0 w-full h-screen bg-cover bg-center bg-no-repeat z-0 pointer-events-none"
        style={{
          backgroundImage:
            'url(https://framerusercontent.com/images/gOHq8h45ifJphidGvrjMYiYc.png?scale-down-to=1024&width=3072&height=3072)'
        }}
      />
      
      {/* Scrollable content */}
      <div className="relative z-10 w-full min-h-screen" style={{
      paddingTop: "60px"
    }}>
        {props.children}
      </div>
    </>;
};