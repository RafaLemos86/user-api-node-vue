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
                            <td> 
                                <router-link :to="{name: 'UserEdit', params: {id: user.id} }" > <button class="button is-warning" >Editar</button>  </router-link>     
                                <p>-----</p> 
                                <button class="button is-danger" @click="ShowModalBtn(user.id )">Deletar</button>
                            </td>
                        </tr>
                     </tbody>
                </table>
            </div>
        </div>


        <!-- MODAL -->
        <div :class="{modal: true, 'is-active': showmodal }">
            <!-- aspas simples no is-active pois o json nao aceita caracter especial como chave -->
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                        Você tem certeza que deseja deletar o usuário?
                        </p>
                        <button class="card-header-icon" aria-label="more options">
                        <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                        </button>
                    </header>
                    <div class="card-content">
                        <div class="content">
                        Confirmando a operação, o usuário será deletado de forma permanente no sistema!
                        <br>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item" @click="hideModal">Cancelar</a>
                        <a href="#" class="card-footer-item" @click="deleteUser" >Deletar</a>
                    </footer>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="hideModal"></button>
        </div>
    </div> 

</template>

<script>
import axios from "axios"
// pegando o token para passar por rota
var req = require("../token/token")


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
    // criando variaveis
    data(){
        return{
            users: [],
            showmodal: false,
            deletedUserId: ""
        }
    },

    methods: {
        // mudando o nome na tabela dos usuarios
        roleUser: function(value){
            if(value == 0){
                return "Usuário"
            }else if(value == 1){
                return "Administrador"
            }
        },

        ShowModalBtn: function(id){
            this.showmodal = true
            this.deletedUserId = id
        },

        hideModal: function(){
            this.showmodal = false
        },

        deleteUser: function(){
            axios.delete("http://localhost:1088/user/" +this.deletedUserId, req).then(async res => {
                console.log(res)
                this.hideModal()
                // regarrencando a pagina chamando a rota de usuarios
                axios.get("http://localhost:1088/user", req).then(res => {
                    this.users = res.data
                }).catch(err => {
                    console.log(err)
                    this.hideModal()
                })

            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>

</style>