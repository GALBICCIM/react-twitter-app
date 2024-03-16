import { useState } from "react";
import * as Style from "../styles/AuthComponentStyle";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { GithubButton } from "../components/github-button";

const CreateAccount = () => {
   const navigate = useNavigate();
   const [isLoading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
         target: { name, value },
      } = e;

      if (name === "name") setName(value);
      else if (name === "email") setEmail(value);
      else if (name === "password") setPassword(value);
   };

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");

      if (isLoading || name === "" || email === "" || password === "") return;

      // 예외 처리
      try {
         setLoading(true);
         const credentials = await createUserWithEmailAndPassword(auth, email, password);
         await updateProfile(credentials.user, {
            displayName: name,
         });
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
         <Style.Title>Join to X</Style.Title>
         <Style.Form onSubmit={onSubmit}>
            <Style.Input name="name" onChange={onChange} value={name} placeholder="Name" type="text" required />
            <Style.Input name="email" onChange={onChange} value={email} placeholder="Email" type="email" required />
            <Style.Input name="password" onChange={onChange} value={password} placeholder="Password" type="password" required />
            <Style.Input type="submit" value={isLoading ? "Loading..." : "Create Your Account"} />
         </Style.Form>
         {error !== "" ? <Style.Error>{error}</Style.Error> : null}

         <Style.Switcher>
            Already have an account? <Link to="/login">Log in &rarr;</Link>
         </Style.Switcher>
         <GithubButton />
      </Style.Wrapper>
   );
};

export default CreateAccount;
