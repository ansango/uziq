<script lang="ts">
	import Auth from './auth.form.svelte';
	import Logout from '../icons/lucide/logout.svelte';
</script>

<Auth action="logout" provider="lastfm">
	<Logout />
</Auth>
