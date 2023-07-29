import React, { useEffect } from "react";
import "./App.scss";
import Sidebar from "./conponents/sidbar/Sidebar";
import Chat from "./conponents/chat/Chat";
import Login from "./conponents/login/Login";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";
import { ErrorFallBack } from "./utisl/ErrorFallBack";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  //dispatchが更新されるたびに実行される
  useEffect(() => {
    //「onAuthStateChanged」firebaseの関数、ユーザー情報を取得する
    auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {user ? (
        <>
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <Sidebar />
          </ErrorBoundary>
          <Chat />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
