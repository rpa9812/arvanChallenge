import axios from "axios";
import { useToast } from "vue-toast-notification";

export default{
    async login(context,payload){
      const email = payload.email;
      const password = payload.password;
      const user={
        email,
        password
      }
      try{
        const response = await axios
        .post("/users/login", {
             user
          },{
            headers: {
              "content-type": "application/json",
              "X-Requested-With":"XMLHttpRequest"
            },
          });

          localStorage.setItem('token', response.data.user.token)
          localStorage.setItem('username',response.data.user.username)

          await context.commit('setUser',{
            token:response.data.user.token,
            username:response.data.user.username

        })
             

      }catch(error){
        const $toast = useToast({ position: "top-right" });
        $toast.error("login failed , username and/or password in in valid");

      }
  

    },
    async signUp(context,payload){
        const username = payload.username;
        const email = payload.email;
        const password = payload.password;
        const user={
            email,
            password,
            username
        };
        try{
          const response = await axios
          .post("/users", {
               user
            },{
              headers: {
                "content-type": "application/json",
                "X-Requested-With":"XMLHttpRequest"
              },
            });
            
      
      context.commit('setUser',{
        token:response.data.user.token

    })

        }catch(error){
          const $toast = useToast({ position: "top-right" });
          $toast.error("sth went wrong");

        }

      




       

    },
    tryLogin(context){
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId')
      const username = localStorage.getItem('username')
      if(token){
        context.commit('setUser',{
          token:token,
          userId:userId,
          username:username

      })
    }

    },
    logout(context){
      context.commit('setUser',{
        token:null,
        userId:null
      })

    }
};