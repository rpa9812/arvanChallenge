<template>
    <div class="form-group mb-3"  >
        <Field
          :id="name"
          :name="name"
          :type="type"
          :rules="rules"   
          v-bind="$attrs"
          v-slot="{ field,meta  }"
       
           
  
        >
        <label :for="name" :class="{ 'text-danger': meta?.errors?.length > 0 }">{{ label }}</label>
        <input
            v-bind="field"
            :placeholder="placeholder"
            :class="['form-control', { 'input-invalid': meta.errors[0] }]"
            
          />
          <!-- <div class="text-danger" v-for="error in meta.errors" :key="error">
            {{ error }}
          </div> -->

       
        </Field>
  
        <ErrorMessage :name="name" v-slot="{ message }">
          <span class="text-danger">{{ message }}</span>
        </ErrorMessage>  
       
      
    </div>
  </template>
  
  <script>
  import { Field ,ErrorMessage} from "vee-validate";
  
  export default {
    components: {
      Field,
      ErrorMessage,
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

    },
    methods:{
        async handleChange() {
      try {
        await this.rules.validate(this.field);
        this.message = "";
      } catch (error) {
        this.message = error.message;
      }
    },
    }
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
