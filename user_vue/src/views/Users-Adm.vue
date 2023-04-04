<template>
    <div>
        <h1>
            Acesso adm
        </h1>
        <br> <br>
        <div class="columns is-centered">
            <div class="column is-half">
                <table class="table is-bordered">
                     <thead>
                         <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Ações</th>
                         </tr>
                     </thead>
                     <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.id }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td> {{ roleUser(user.role) }}</td>
                            <td> <button class="button is-warning">Editar</button><p>-----</p> <button class="button is-danger">Deletar</button></td>
                        </tr>
                     </tbody>
                </table>
            </div>
        </div>

    </div> 

</template>

<script>
import axios from "axios"

export default {
    created(){
       // setando o token para enviar 
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };

        axios.get("http://localhost:1088/user", req).then(res =>{
           this.users = res.data
        }).catch(err => {
            console.log(err)
        })
    },

    data(){
        return{
            users: []
        }
    },

    methods: {
        roleUser: function(value){
            if(value == 0){
                return "Usuário"
            }else if(value == 1){
                return "Administrador"
            }
        }
    }
}
</script>

<style scoped>

</style>