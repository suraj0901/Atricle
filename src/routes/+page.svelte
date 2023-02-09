<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ articles } = data);
</script>

<div class="grid">
	<form action="?/createArticle" method="POST" use:enhance>
		<h3>New Article</h3>
		<label for="title">Title</label>
		<input type="text" name="title" id="title" />
		<label for="content">Content</label>
		<textarea name="content" id="content" rows="5" />
		<button type="submit">Add Article</button>
	</form>
	<div>
		<h2>Articles</h2>
		{#each articles as article (article.id)}
			<article>
				<header>{article.title}</header>
				<p>
					{article.content}
				</p>
				<form action="?/deleteArticle&id={article.id}" method="POST" use:enhance>
					<button type="submit">Delete</button>
				</form>
				<a href="/{article.id}" role="button" class="outline constrast" style="width:100%;">Edit</a>
			</article>
		{/each}
	</div>
</div>
