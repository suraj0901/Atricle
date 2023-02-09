import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	return {
		articles: await prisma.atricle.findMany()
	};
};

export const actions: Actions = {
	deleteArticle: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (!id) return fail(400, { message: 'Invalid request' });
		try {
			await prisma.atricle.delete({
				where: {
					id: Number(id)
				}
			});
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'Could not delete the article' });
		}

		return {
			status: 200
		};
	},
	createArticle: async ({ request }) => {
		const { title, content } = Object.fromEntries(await request.formData()) as {
			title: string;
			content: string;
		};

		try {
			await prisma.atricle.create({
				data: {
					title,
					content
				}
			});
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'Could not create the article' });
		}
		return { status: 201 };
	}
};
