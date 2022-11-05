<template>
  <h1>Settings Page</h1>
  <br />

  
  <template v-if="!accessCode">
    <div class="form-control" v-if="dropboxGeneratedAuthUrl">
      <div class="input-group">
        <input
          type="text"
          readonly
          :value="dropboxGeneratedAuthUrl"
          placeholder="Type here"
          class="input input-bordered input-sm w-full max-w-xs"
        />
        <a
          class="btn btn-primary btn-sm"
          :href="dropboxGeneratedAuthUrl"
          target="_blank"
          rel="noopener noreferrer"
          >Open in New Browser Tab</a
        >
        <template v-if="isSupported">
          <span v-if="copied">Copied</span>
          <button
            v-else
            @click="copy(dropboxGeneratedAuthUrl)"
            class="btn btn-square btn-sm"
          >
            <svg
              class="h-5 w-5 text-gray-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x="8" y="8" width="12" height="12" rx="2" />
              <path
                d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"
              />
            </svg>
          </button>
        </template>
      </div>
      <div class="input-group">
        <input
          type="text"
          placeholder="Paste Access Code Here"
          v-model="dropboxAccessCode"
          class="input input-bordered input-sm w-full max-w-xs"
        />
        <button class="btn btn-sm">Paste</button>
        <button class="btn btn-sm btn-success" @click="submitDropboxAccessCode">
          Submit
        </button>
      </div>
    </div>
    <button class="btn btn-info" @click="doAuth">Sync via Dropbox</button>
  </template>
  <div>Synced to your Dropbox</div>

  <hr class="my-2" />
  Current Currency: {{ settings.currency.name }} ({{
    settings.currency.symbol
  }}) <br />
  <hr />
  <h3>Accounts Group</h3>
  <ul>
    <li v-for="acc in settings.accounts.groups" :key="acc.code">
      {{ acc.name }} - {{ acc.description }}
      <ol>
        <li
          v-for="basicAcc in settings.accounts.categories.filter(
            (bac) => bac.groupId === acc.code
          )"
          :key="basicAcc.code"
        >
          {{ basicAcc.name }} - {{ basicAcc.description }}
          <ul>
            <li
              v-for="account in settings.accounts.groups.filter(
                (ac) => ac.code === basicAcc.code
              )"
              :key="account.code"
            >
              {{ account.name }} - {{ account.description }}
            </li>
          </ul>
        </li>
      </ol>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { Dropbox, DropboxAuth } from "dropbox";
import { useClipboard, useLocalStorage, useSessionStorage } from "@vueuse/core";
import { useSettingsStore } from "@/stores/settings";
import { onMounted, ref } from "vue";
const { settings } = useSettingsStore();

var CLIENT_ID = "qp6c0ab2yi8lvl0";
let authUrl = ref<string>("");
async function generatePKCEAuthUrl() {
  const codeVerifier = "sdasd232323";
  const textAsBuffer = new TextEncoder().encode(codeVerifier);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const digest = hashArray
    .map((b) => b.toString(16)?.padStart(2, "0"))
    .join("");
  authUrl.value = `https://www.dropbox.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&code_challenge=${digest}&code_challenge_method=S256`;
}

const dropboxGeneratedAuthUrl = ref<string>("");
const dropboxAccessCode = ref<string>("");
const codeVerifier = useSessionStorage("codeVerifier", "");
const accessCode = useLocalStorage("accessCode", "");
const { copy, copied, isSupported } = useClipboard({});

async function submitDropboxAccessCode() {
  if (codeVerifier.value) {
    dbxAuth.setCodeVerifier(codeVerifier.value);
  } else {
    console.log("Code Verifier not found");
  }

  const response = await dbxAuth.getAccessTokenFromCode(
    "",
    dropboxAccessCode.value
  );
  accessCode.value = response.result.access_token;
  dbxAuth.setAccessToken(response.result.access_token);
  var dbx = new Dropbox({
    auth: dbxAuth,
  });
  const filesAndFolders = await dbx.filesListFolder({
    path: "",
  });
  console.log(filesAndFolders);
}

const dbxAuth = new DropboxAuth({ clientId: CLIENT_ID });

async function doAuth() {
  try {
    const authUrl = await dbxAuth.getAuthenticationUrl(
      "",
      undefined,
      "code",
      "offline",
      undefined,
      undefined,
      true
    );
    codeVerifier.value = "";
    codeVerifier.value = dbxAuth.getCodeVerifier();
    dropboxGeneratedAuthUrl.value = authUrl.toString();
  } catch (err) {
    console.error(err);
  }
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
<style lang="scss">
li {
  ul {
    margin-left: 0.875rem;
    list-style-type: lower-roman;
  }
  ol {
    margin-left: 0.975rem;
    list-style-type: lower-alpha;
  }
}
</style>
