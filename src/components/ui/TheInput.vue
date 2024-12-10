<template>
  <div class="form-group"  >
    <Form>

      <Field
        :id="name"
        :name="name"
        :type="type"
        :rules="rules"
        v-bind="$attrs"
         v-slot="{ field,meta }"
         

      >
      <label :for="name" :class="{ 'text-danger': meta?.errors?.length > 0 }">{{ label }}</label>
      <input
          v-bind="field"
          :class="['form-control', { 'input-invalid': meta.errors[0] }]"
        />
     
      </Field>

      <ErrorMessage :name="name" v-slot="{ message }">
        <span class="text-danger">{{ message }}</span>
      </ErrorMessage>
    </Form>
  </div>
</template>

<script>
import { Field, ErrorMessage, Form } from "vee-validate";

export default {
  components: {
    Field,
    ErrorMessage,
    Form,
  },
  props: {
    name: { type: String, required: true },
    label: { type: String, default: "" },
    type: { type: String, default: "text" },
    placeholder: { type: String, default: "" },
    rules: {
      type: [String, Object],
      default: () => {},
    },
    computed: {
      hasError() {
        return this.$attrs.error;
      },
    },
  },
};
</script>

<style scoped>
.input-invalid {
  border-color: red;
}
.invalid input {
  border-color: red;
}
.error {
  color: red;
  font-size: 0.9rem;
}
.invalid label {
  color: red !important;
}
.invalid-label{
    color:red;

}
</style>
