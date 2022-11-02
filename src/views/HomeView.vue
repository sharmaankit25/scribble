<template>
  <div class="about">
    <h1>Dashboard</h1>
    <br />
    <!-- <a :href="authUrl" target="_blank" rel="noopener noreferrer"
      >Sync Via Dropbox</a
    > -->
    <br />
    <div class="stats bg-base-200 stats-vertical md:stats-horizontal shadow">
      <div class="stat">
        <div class="stat-title">Net worth (Equity)</div>
        <div class="stat-value">31K</div>
        <div class="stat-desc">Jan 1st - Feb 1st</div>
      </div>

      <div class="stat">
        <div class="stat-title">Incomes</div>
        <div class="stat-value">4,200</div>
        <div class="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div class="stat">
        <div class="stat-title">Expenses</div>
        <div class="stat-value">1,200</div>
        <div class="stat-desc">↘︎ 90 (14%)</div>
      </div>

      <div class="stat">
        <div class="stat-title">Liabilities</div>
        <div class="stat-value">1,200</div>
        <div class="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
var CLIENT_ID = "qp6c0ab2yi8lvl0";
let authUrl = ref<string>("");
async function generatePKCEAuthUrl() {
  // var dbx = new DropboxAuth({ clientId: CLIENT_ID });
  const codeVerifier = "sdasd232323";
  const textAsBuffer = new TextEncoder().encode(codeVerifier);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const digest = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  authUrl.value = `https://www.dropbox.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&code_challenge=${digest}&code_challenge_method=S256`;
}
onMounted(async () => {
  console.log("mounted in the composition api!");
  generatePKCEAuthUrl();
  // Set the login anchors href using dbx.getAuthenticationUrl()
  // dbx.getAuthenticationUrl(`https://www.dropbox.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&code_challenge=${digest}&code_challenge_method=S256`).then((authUrl) => {
  //     console.log(authUrl);
  // })

  // var dbx = new Dropbox({ accessToken: process.env.VUE_APP_DROPBOX_API_KEY });
  // console.log(dbx)

  // dbx.filesListFolder({path: ''})
  //   .then(function(response) {
  //     console.log(response);
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });

  //   const store = new Storage();
  //   await store.create();
  //   const storeObj = await store.set('name', 'Mr. Ionitron')
  //   store.forEach((key, value, index) => {
  //     console.log(key, value, index)
  //   });

  //   console.log(store)
  //   // dbx.filesUpload({
  //   contents: 'Abc 1234',
  //   autorename: true,
  //   path: '/data.json'
  // })
});
</script>
