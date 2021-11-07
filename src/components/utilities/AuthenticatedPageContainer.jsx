import React from "react";
import AppHeader from "../common/AppHeader";

export default function AuthenticatedPageContainer({ children }) {
  return (
    <div className='page'>
      <AppHeader />
      <div className='page__container'>{children}</div>
    </div>
  );
}
