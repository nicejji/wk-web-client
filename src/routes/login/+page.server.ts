import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		console.log(await request.formData());
		throw redirect(303, '/me');
	}
} satisfies Actions;
