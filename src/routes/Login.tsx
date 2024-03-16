import * as Style from "../styles/AuthComponentStyle";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { GithubButton } from "../components/github-button";

export const Login = () => {
   const navigate = useNavigate();
   const [isLoading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
         target: { name, value },
      } = e;

      if (name === "email") setEmail(value);
      else if (name === "password") setPassword(value);
   };

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");

      // Submit했을 때 조건에 만족하면 함수 종료
      if (isLoading || email === "" || password === "") return;

      // 예외 처리
      try {
         setLoading(true);
         await signInWithEmailAndPassword(auth, email, password);

         navigate("/");
      } catch (e) {
         if (e instanceof FirebaseError) {
            setError(e.message);
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <Style.Wrapper>
         <Style.Title>Log to X</Style.Title>
         <Style.Form onSubmit={onSubmit}>
            <Style.Input name="email" onChange={onChange} value={email} placeholder="Email" type="email" required />
            <Style.Input name="password" onChange={onChange} value={password} placeholder="Password" type="password" required />
            <Style.Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
         </Style.Form>
         {error !== "" ? <Style.Error>{error}</Style.Error> : null}

         <Style.Switcher>
            Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
         </Style.Switcher>
         <GithubButton />
      </Style.Wrapper>
   );
};
