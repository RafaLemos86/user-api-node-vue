<template>
    <div>
        <div class="columns is-centered">
            <div class="column is-half">
                <h1 class="title is-1">Edit</h1>
                <hr>
                <label for="name">Name</label>
                <input class="input is-link" type="text" placeholder="Name" id="name" v-model="name" required> 
                <br><br>
                <label for="email">Email</label>
                <input class="input is-link" type="email" placeholder="email@email.com" id="email" v-model="email" required> 
                <br><br>
                <label for="Role">Role</label>
                <input class="input is-link" type="text" placeholder="Role" id="role" v-model="role" required> 
                <br><br>
                <button class="button is-success" @click="edit">Edit</button>
                <br> <br>
                <div v-if="error" class="columns is-desktop">
                    <div class="is-one-quarter-fullhd">
                        <div class="notification is-danger is-light">
                            <p><strong>{{ error }}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import axios from "axios"
const req = require("../token/token")

export default {
    created(){
        // verificando se o id passado existe
        axios.get("http://localhost:1088/user/" +this.$route.params.id, req).then(res =>{

            this.id = res.data.id 
            this.name =  res.data.name 
            this.email =  res.data.email 
            this.role = res.data.role

        }).catch(err =>{
            console.log(err)
            this.$router.push({
                name: "Users"
            })
        })
    },

    data(){
        return{
          name: "",
          email: "",
          id: "",
          role: -1,
          error: undefined  
        };
    },
    methods: {
        edit(){
            if(this.role == 1 || this.role == 0){
                axios.put("http://localhost:1088/user/", {
                    name: this.name,
                    email: this.email,
                    role: this.role,
                    id: this.id
                    
                }, req).then(res => {

                    console.log(res)
                    this.$router.push({
                        name: "Users"
                    })
                }).catch(err => {
                    console.log(err)
                    var msgErr = err.response.data.err
                    this.error = msgErr
                })
                
            }else{
               this.error = "O role só pode ser 0 para usuário ou 1 para administrador"
            }
        }
    }
}


</script>

<style scoped>

</style>