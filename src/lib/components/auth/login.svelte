<script lang="ts">
	import Login from '../icons/lucide/login.svelte';
	import Auth from './auth.form.svelte';
</script>

<Auth action="login" provider="lastfm">
	<Login />
</Auth>
