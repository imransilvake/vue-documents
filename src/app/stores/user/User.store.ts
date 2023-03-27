import { defineStore } from 'pinia';

import { UserStateInterface } from './User.interface';
import UserService from './User.service';

export const useUserStore = defineStore('user', {
	state: (): UserStateInterface => ({
		user: null
	}),
	actions: {
		/**
		 * fetch user info
		 */
		async userInfoFetch() {
			try {
				const res = await UserService.userInfoFetch();
				const list = res?.body;

				this.user = list;
			} catch {
				this.user = null;
			}
		}
	}
});
