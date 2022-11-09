<template>
  <h1>Settings Page</h1>
  <br />

  <template v-if="!dropboxAuthDetails.access_token">
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
  <div v-else>
    <button class="btn btn-primary btn-sm" @click="syncAndBackupData">
      <svg
        class="h-5 w-5"
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
        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />
        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" />
      </svg>
    </button>
  </div>

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
import { ref } from "vue";
const { settings } = useSettingsStore();

interface DropboxAuthDetailsInterface {
  access_token: string;
  account_id: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  uid: string;
}

var CLIENT_ID = "qp6c0ab2yi8lvl0";

const dropboxGeneratedAuthUrl = ref<string>("");
const dropboxAccessCode = ref<string>("");
const dropboxInstance = ref();
const codeVerifier = useSessionStorage("codeVerifier", "");
const dropboxAuthDetails = useLocalStorage("dropboxAuth", {});

const storedTransactions = useLocalStorage("transactions", "");
const storedAccounts = useLocalStorage("accounts", "");
const { copy, copied, isSupported } = useClipboard({});

const dbxAuth = new DropboxAuth({
  clientId: CLIENT_ID,
  refreshToken: dropboxAuthDetails.value.refresh_token,
  accessToken: dropboxAuthDetails.value.access_token,
  customHeaders: {
    Authorization: `bearer ${dropboxAuthDetails.value.access_token}`
  }
});

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
  console.log(response);
  dropboxAuthDetails.value = response.result;
  dbxAuth.setAccessToken(response.result.access_token);
  dropboxInstance.value = new Dropbox({
    auth: dbxAuth,
  });

  const filesAndFolders = await dropboxInstance.value.filesListFolder({
    path: "",
  });
  console.log(filesAndFolders);
}

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

async function syncAndBackupData() {
  // dbxAuth.setAccessToken(dropboxAuthDetails.value.access_token);
  dbxAuth.checkAndRefreshAccessToken();
  dropboxInstance.value = new Dropbox({
    auth: dbxAuth,
    accessToken: dropboxAuthDetails.value.access_token,
    refreshToken: dropboxAuthDetails.value.refresh_token,
    clientId: CLIENT_ID,
    customHeaders: {
      Authorization: `Bearer ${dropboxAuthDetails.value.access_token}`
    }
  });

  // dropboxInstance.value.filesUpload({
  //   contents: JSON.stringify({
  //     transactions: JSON.parse(storedTransactions.value).data,
  //     accounts: JSON.parse(storedAccounts.value).data,
  //   }),
  //   path: "/data.json",
  // });

  const filesAndFolders = await dropboxInstance.value.filesListFolder({
    path: "",
  });

  console.log(filesAndFolders);

  const file = await dropboxInstance.value.filesDownload({path:filesAndFolders.result.entries[0].path_lower})
  console.log(file.result.fileBlob)
  const blob = new Blob([file.result.fileBlob]);
  const data = await blob.text();
  const savedData = JSON.parse(data)
  
  storedTransactions.value = JSON.stringify({data:savedData.transactions})
  storedAccounts.value = JSON.stringify({data:savedData.accounts})
}
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
