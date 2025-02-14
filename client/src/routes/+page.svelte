<script lang="ts">
  import { onMount } from "svelte";
  import { getAllUsers } from "$lib/scripts/controllers/userController";

  let users: User[] = [];

  onMount(async () => {
    users = await getAllUsers();
  });
</script>


<h1>Users</h1>
<ul>
  {#each users as user}
    <li>{ user.displayName }</li>
  {/each}
</ul>
