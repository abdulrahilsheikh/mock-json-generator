import React, { useState, useEffect } from "react";

const BezierCurveWithScrollingButtons = ({ refrence }: any) => {
  const [button1Y, setButton1Y] = useState(100); // Initialize with your initial positions
  const [button2Y, setButton2Y] = useState(50); // Initialize with your initial positions

  // Calculate the control points for the Bezier curve
  const controlPointY1 = button1Y + (button2Y - button1Y) / 2;
  const controlPointY2 = controlPointY1;

  // Update the path of the Bezier curve based on button positions
  const curvePath = `M100,${button1Y} C150,${controlPointY1} 250,${controlPointY2} 300,${button2Y}`;

  // Update button positions as the user scrolls
  useEffect(() => {
    console.log("yo", refrence);

    setButton1Y(refrence.screenY);
  }, [refrence.screenY, refrence.screenX]);

  useEffect(() => {
    console.log("yo", refrence);
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      //   setLeftAnchorY(100 + scrollY); // Adjust the base position as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-full">
      <svg width="400" height="100%">
        <path d={curvePath} fill="transparent" stroke="blue" strokeWidth="2" />
        <circle cx="100" cy={button1Y} r="5" fill="red" />
        <circle cx="300" cy={button2Y} r="5" fill="red" />
      </svg>
    </div>
  );
};

export default BezierCurveWithScrollingButtons;
