<template>
    <div>
        <div class="columns is-centered">
            <div class="column is-half">
                <h1 class="title is-1">Register</h1>
                <hr>
                <label for="name">Name</label>
                <input class="input is-link" type="text" placeholder="Name" id="name" v-model="name" required> 
                <br><br>
                <label for="email">Email</label>
                <input class="input is-link" type="email" placeholder="email@email.com" id="email" v-model="email" required> 
                <br><br>
                <label for="password">Password</label>
                <input class="input is-link" type="password" placeholder="******" id="password" v-model="password" required> 
                <br><br>
                <button class="button is-success" @click="register">Register</button>
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

export default {
    data(){
        return{
          name: "",
          email: "",
          password: "",
          error: undefined  
        };
    },
    methods: {
        register(){
            axios.post("http://localhost:1088/user", {
                name: this.name,
                email: this.email,
                password: this.password
            }).then(res =>{
                this.$router.push({
                    name: "home"
                })
                console.log(res)
            }).catch(err => {
                var msgErr = err.response.data.err
                this.error = msgErr
            })
        }
    }
}


</script>

<style scoped>

</style>