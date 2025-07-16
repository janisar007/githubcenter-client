import React from "react";

const TopHeader = () => {
  return (
    <div className="sticky top-0 z-10 bg-white  px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold">Authentication</h1>
      <div className="text-sm text-muted-foreground">Project: My App</div>
    </div>
  );
};

export default TopHeader;
