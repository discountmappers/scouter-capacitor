import React, { useContext, useMemo, useEffect, useState } from "react";
import "./App.css";
import { ContextVal, AppContext } from "contexts/appContext";
const Child = () => {
  const { user } = useContext<ContextVal>(AppContext);
  // only re-renders if data changes -- prevents uncessary renders when context changes and we don't care about the changed data
  return useMemo(() => {
    return (
      <>
        <div className="Child">
          {user && user.length ? "Displaying some data" : null}
        </div>
      </>
    );
  }, [user]);
};

export default Child;
