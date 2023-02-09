<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ title, content } = data.article);
</script>

<form action="?/updateArticle" method="POST" use:enhance>
	<h3>Editing: {title}</h3>
	<label for="title">Title</label>
	<input type="text" name="title" id="title" value={title} />
	<label for="content">Content</label>
	<textarea name="content" id="content" rows="5" value={content} />
	<button type="submit">Update Article</button>
</form>
