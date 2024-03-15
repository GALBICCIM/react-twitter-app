import { useState } from "react";
import * as S from "../styles/CreateAccountStyle";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
	const navigate = useNavigate();
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { name, value }
		} = e;

		if (name === "name") setName(value);
		else if (name === "email") setEmail(value);
		else if (name === "password") setPassword(value);
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isLoading || name === "" || email === "" || password === "") return;
		// 예외 처리
		try {
			setLoading(true);
			const credentials = await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(credentials.user, {
				displayName: name
			});
			navigate("/");
		} catch (e) {
			// setError()
		} finally {
			setLoading(false);
		}

		console.log(name, email, password);
	};

	return (
		<S.Wrapper>
			<S.Title>Join to X</S.Title>
			<S.Form onSubmit={onSubmit}>
				<S.Input name="name" onChange={onChange} value={name} placeholder="Name" type="text" required />
				<S.Input name="email" onChange={onChange} value={email} placeholder="Email" type="email" required />
				<S.Input name="password" onChange={onChange} value={password} placeholder="Password" type="password" required />
				<S.Input type="submit" value={isLoading ? "Loading..." : "Create Your Account"} />
			</S.Form>
			{error !== "" ? <S.Error>{error}</S.Error> : null}
		</S.Wrapper>
	);
};

export default CreateAccount;
