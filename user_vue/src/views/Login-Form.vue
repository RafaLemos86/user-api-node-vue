<template>
    <div>
        <div class="columns is-centered">
            <div class="column is-half">
                <h1 class="title is-1">Login</h1>
                <hr>
                <label for="email">Email <address></address></label>
                <input class="input is-link" type="email" placeholder="email@email.com" id="email" v-model="email" required>
                <br><br>
                <label for="password">Password</label>
                <input class="input is-link" type="password" placeholder="******" id="password" v-model="password" required>
                <br><br>
                <button class="button is-success" @click="login">Login</button>
                <br> <br>
                <article class="message is-link">
                    <div class="message-body">
                        <p>You don't have an account? <a href="/register">Register</a> </p> 
                    </div>
                </article>

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
    data() {
        return {
            email: "",
            password: "",
            error: undefined
        };
    },
    methods: {
        login() {
            axios.post("http://localhost:1088/login", {
                email: this.email,
                password: this.password
                // resposta "correta"
            }).then(res => {
                // verificar se teve erro
                if(!res.data.status){
                    var msgErr = res.data.err
                    this.error = msgErr
                    // nao teve erro, dar o token
                } else {
                     this.$router.push({
                        name: "home"
                    })
                    localStorage.setItem("token", res.data.token)

                }
            }).catch(err => {
                var msgErr = err.response.data.err
                this.error = msgErr
            })
        }
    }
}


</script>

<style scoped></style>