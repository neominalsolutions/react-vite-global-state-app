import { Navigate, useLocation, useMatch } from 'react-router-dom';

type Props = {
	children: React.ReactNode;
};

// server components de çalışır
// const IsLoggedIn = async () => {
// 	return new Promise((resolve) => {
// 		setTimeout(() => {
// 			resolve({ isAuthenticated: true });
// 			console.log('resolved');
// 		}, 500);
// 	});
// };

// Not: Burada sayfalar arası geçiş yapmadan önce kullanıcı yetkilerini oturum bilgilerin login işleminde state atalım client state de hazır olsun. daha sonra bu guard içinde session state bağlanıp buradan gelen bilgilere göre senkron birşekilde arayüzün nasıl açılması gerektiğini yönetelim. Asenkron çalışınca aşağıdaki gibi bir sorun meydan gelebilir.
function AuthenticationGuard({ children }: Props) {
	const location = useLocation(); // route lokasyon bilgilerini aldığımız hook.
	const match = useMatch('/react-query'); // ilgili path ile match olup olmadığımız yakalayan hook

	console.log('location', location);
	console.log('match', match);

	const token = localStorage.getItem('token');

	if (!token) return <Navigate to="unauthorize" />;

	return <>{children}</>;
}

export default AuthenticationGuard;
