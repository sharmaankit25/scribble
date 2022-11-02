<template>
  <h1>Settings Page</h1>
  <br />

  <input type="text" placeholder="Type here" class="input input-bordered" />

  <select className="select select-bordered ">
    <option disabled selected>Who shot first?</option>
    <option>Han Solo</option>
    <option>Greedo</option>
  </select>
  <hr class="my-2" />

  <input type="radio" name="radio-2" className="radio radio-primary" checked />
  <input type="radio" name="radio-2" className="radio radio-primary" />

  <div className="form-control">
    <label className="label cursor-pointer">
      <span className="label-text">Remember me</span>
      <input type="checkbox" checked className="checkbox checkbox-primary" />
    </label>
  </div>

  Current Currency: {{ settings.currency.name }} ({{
    settings.currency.symbol
  }}) <br />
  <hr />
  <h3>Accounts Group</h3>
  <ul>
    <li v-for="acc in settings.accountGroups" :key="acc.code">
      {{ acc.name }} - {{ acc.description }}
      <ol>
        <li
          v-for="basicAcc in settings.basicAccounts.filter(
            (bac) => bac.group === acc.code
          )"
          :key="basicAcc.code"
        >
          {{ basicAcc.name }} - {{ basicAcc.description }}
          <ul>
            <li
              v-for="account in settings.accounts.filter(
                (ac) => ac.type === basicAcc.code
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
import { useSettingsStore } from "@/stores/settings";
const { settings } = useSettingsStore();
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
