<template>
  <h1>Settings Page</h1>
  <br/>
  <input
    type="text"
    placeholder="Type here"
    class="input input-bordered"
  />

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
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>
