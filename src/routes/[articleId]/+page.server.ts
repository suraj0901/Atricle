import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';

const getArticle = async (id: string) => {
	const article = await prisma.atricle.findUnique({
		where: {
			id: Number(id)
		}
	});
	if (!article) {
		throw error(404, 'Article not found');
	}
	return article;
};

export const load: PageServerLoad = async ({ params }) => {
	return {
		article: getArticle(params.articleId)
	};
};

export const actions: Actions = {
	updateArticle: async ({ request, params }) => {
		const { title, content } = Object.fromEntries(await request.formData()) as {
			title: string;
			content: string;
		};

		try {
			await prisma.atricle.update({
				where: {
					id: Number(params.articleId)
				},
				data: {
					title,
					content
				}
			});
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'Could not update the article' });
		}
		throw redirect(301, '/');
	}
};
