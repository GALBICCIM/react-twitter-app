import React from "react";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
   const user = auth.currentUser; // 사용자이면 유저 정보 반환 | 아니면 NULL 반환

   if (user === null) {
      return <Navigate to="/login" />;
   }

   return children;
};
