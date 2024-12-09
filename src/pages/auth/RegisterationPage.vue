<template>
    <!-- <login-form log-or-reg="register"></login-form> -->
     <!-- <basic-form log-or-reg="register"></basic-form> -->
      <!-- <login-base-form log-or-reg="register"></login-base-form> -->
       <base-login-form log-or-reg="register"></base-login-form>
</template>


<script>
//import LoginForm from '../../components/auth/LoginForm.vue';
// import BasicForm from '../../components/auth/BasicForm.vue';
//import LoginBaseForm from '../../components/auth/LoginBaseForm.vue';
import BaseLoginForm from '../../components/auth/BaseLoginForm.vue';



export default {
    components:{
        //LoginBaseForm
        //LoginForm,
        //BasicForm
        BaseLoginForm
    }
   
}
</script>