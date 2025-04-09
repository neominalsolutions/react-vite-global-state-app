import { useEffect, useState } from 'react';
import { Navigate, useLocation, useMatch } from 'react-router-dom';

type Props = {
	children: React.ReactNode;
};

const IsLoggedIn = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ isAuthenticated: true });
		}, 5000);
	});
};

// Not: Burada sayfalar arası geçiş yapmadan önce kullanıcı yetkilerini oturum bilgilerin login işleminde state atalım client state de hazır olsun. daha sonra bu guard içinde session state bağlanıp buradan gelen bilgilere göre senkron birşekilde arayüzün nasıl açılması gerektiğini yönetelim. Asenkron çalışınca aşağıdaki gibi bir sorun meydan gelebilir.
function AuthenticationGuard({ children }: Props) {
	const [auth, setAuth] = useState({ isAuthenticated: false });

	const location = useLocation(); // route lokasyon bilgilerini aldığımız hook.
	const match = useMatch('/react-query'); // ilgili path ile match olup olmadığımız yakalayan hook

	console.log('location', location);
	console.log('match', match);

	// const token = localStorage.getItem('token');

	useEffect(() => {
		IsLoggedIn()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((response: any) => {
				if (response.isAuthenticated) {
					// componente gelen isteği kaldığı yerden devam ettir. render sürecine devam
					setAuth(response);
				}
			})
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.catch((err: any) => {
				console.log('err', err);
			});
	}, []);

	return (
		<>
			{auth.isAuthenticated ? <>{children}</> : <Navigate to="unauthorize" />}
		</>
	);
}

export default AuthenticationGuard;
