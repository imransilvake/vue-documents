class UserService {
	/**
	 * fetch user info
	 * @returns
	 */
	userInfoFetch = async () => {
		const url = 'https://apply-frontend.crosslend.net/user/info.json';
		return await fetch(url).then((res) => res.json());
	};
}
const instance = new UserService();
export default instance;
