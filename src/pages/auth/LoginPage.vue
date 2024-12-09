<template>
    <!-- <login-form log-or-reg="login"></login-form> -->
    <!-- <basic-form log-or-reg="login"></basic-form> -->
     <!-- <login-base-form log-or-reg="login"></login-base-form> -->
      <base-login-form log-or-reg="login"></base-login-form>


</template>



<script>
import BaseLoginForm from '../../components/auth/BaseLoginForm.vue'
//import LoginBaseForm from '../../components/auth/LoginBaseForm.vue'

//import LoginForm from '../../components/auth/LoginForm.vue';
// import BasicForm from '../../components/auth/BasicForm.vue';


export default {
    components:{
        //LoginBaseForm,
        BaseLoginForm
       // LoginForm,
       //BasicForm
    }
  
}
</script>