<script lang="ts">
  import { onMount } from "svelte";
  import { getAllUsers, loginUser } from "$lib/scripts/controllers/userController";

  let users: User[] = [];
  let username = '';
  let password = '';

  onMount(async () => {
    users = await getAllUsers();
  });

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    await loginUser({ username, password });
  };
</script>


<form on:submit={handleLogin}>
  <input placeholder="username" bind:value={username} />
  <input placeholder="password" bind:value={password} />
  <button type="submit">Login</button>
</form>

<h1>Users</h1>
<ul>
  {#each users as user}
    <li>{ user.displayName }</li>
  {/each}
</ul>
