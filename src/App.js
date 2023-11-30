import React from "react";
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import LoginScreen from './screens/LoginScreen'; // Importe o componente principal da sua aplicação
import CategoryScreen from './screens/CategoryScreen';
import TodoListScreen from './screens/TodoListScreen';
import SignUpScreen from './screens/SignUpScreen';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						exact
						path="/"
						element={<LoginScreen />}
					/>
					<Route
						exact
						path="/SignUpScreen"
						element={<SignUpScreen />}
					/>
					<Route
						exact
						path="/CategoryScreen"
						element={<CategoryScreen />}
					/>
					<Route
						exact
						path="TodoListScreen/:category"
						element={<TodoListScreen />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;