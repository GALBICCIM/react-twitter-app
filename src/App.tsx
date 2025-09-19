import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import { Profile } from "./routes/Profile";
import CreateAccount from "./routes/Create-account";
import { Login } from "./routes/Login";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import { GlobalStyle } from "./styles/GlobalStyle";
import styled from "styled-components";
import { ProtectedRoute } from "./components/protected-route";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<Layout />
			</ProtectedRoute>
		),
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/create-account",
		element: <CreateAccount />,
	},
]);

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
`;

const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const init = async () => {
		await auth.authStateReady();
		setIsLoading(false);
	};

	useEffect(() => {
		init();
	}, []);
	return (
		<Wrapper>
			<GlobalStyle />
			{isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
		</Wrapper>
	);
};

export default App;
