export interface UserStateInterface {
	user: UserContentInterface[] | null;
}

export interface UserContentInterface {
	User: {
		username: string;
		profile: {
			firstName: string;
			lastName: string;
		};
	};
}
