import type { Actions } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

const getUser = async (name: string) => {
  const user = await prisma.user.findUnique({
    where: {name}
  })
  return user
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const password = data.get('password');
		console.log(name, password);
	}
} satisfies Actions;
