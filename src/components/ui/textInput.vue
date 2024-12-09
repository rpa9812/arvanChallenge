<template>
  <div class="form-group" :class="{ invalid: errorMessage }">
    <label :for="name">{{ label }}</label>
    <input
      v-bind="fieldProps"
      :id="name"
      :type="type"
      :placeholder="placeholder"
      class="form-control"
      v-model="fieldValue"

      @input="updateValue($event.target.value)"
    />
    <p v-if="errorMessage" class="error text-danger">
      {{ errorMessage }}
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
    schema: { type: Object, required: true },
    modelValue: [String, Number],
  },
  emits: ["update:modelValue"],
    //  created() {
    //    const {
    //      value: fieldValue,
    //      errorMessage,
    //      ...fieldProps
    //    } = useField(this.name);
    //    this.errorMessage = errorMessage;
    //    this.fieldProps = fieldProps;
    //    this.fieldValue = fieldValue;
    //  },

  methods: {
    async validateField() {
      try {
        await this.schema.validate(this.fieldValue);
        this.errorMessage = "";
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    async updateValue(value) {
      this.validateField();

      this.$emit("update:modelValue", value);
    },
    async handleBlur() {
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

<style scoped>
.invalid input {
  border-color: red;
}
.error {
  color: red;
  font-size: 0.9rem;
}
</style>
