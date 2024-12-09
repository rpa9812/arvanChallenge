<template>
  <div class="form-group" :class="{ invalid: errors }">
    <label :for="name">{{ label }}</label>
    <input
      v-bind="fieldProps"
      :id="name"
      class="form-control"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue($event.target.value)"
    />
    <p v-if="errors" class="error text-danger">
      {{ errors }}
    </p>
  </div>
</template>

<script>
import { useField } from "vee-validate";

export default {
  name: "BaseInput",

  props: {
    name: { type: String, required: true },
    label: { type: String, default: "" },
    type: { type: String, default: "text" },
    placeholder: { type: String, default: "" },
    modelValue: [String, Number],
    errors: { type: String, default: "" },
  },
  emits: ["update:modelValue"],

  methods: {
    async updateValue(value) {
      this.$emit("update:modelValue", value);
    },
    created() {
      const {
        value: fieldValue,
        errorMessage,
        ...fieldProps
      } = useField(this.name);
      this.errorMessage = errorMessage;
      this.fieldProps = fieldProps;
      this.fieldValue = fieldValue;
    },
  },
};
</script>

<style>
.form-control {
  margin: 0.5rem 0;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}
.error {
  color: red; /* Red color for error text */
}
.invalid label {
  color: red !important;
}
.invalid input,
.invalid textarea {
  border: 1px solid red;
}
.error-message {
  color: red;
  font-size: 0.9rem;
}
</style>
