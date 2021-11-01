import React from 'react'

import AuthService from '../app/service/authService'
import ApiService from '../app/apiservice';
import jwt from 'jsonwebtoken';

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class ProvedorAutenticacao extends React.Component{

    state = {
        usuarioAutenticado: null,
        isAutenticado: false
    }

    iniciarSessao = (usuario) => {
        const token = usuario.token        
        const claims = jwt.decode(token)

        const usuarioLocal = {
            id: claims.userId,
            nome: claims.nome
        }
        AuthService.logar(usuarioLocal, token)
        this.setState({isAutenticado: true, usuarioAutenticado: usuarioLocal})
    }

    encerrarSessao = () => {
        AuthService.removerUsuarioAutenticado()
        this.setState({isAutenticado: false, usuarioAutenticado: null})
    }

    componentDidMount(){
        const isAutenticado = AuthService.isUsuarioAutenticado()
        if(isAutenticado){
            const usuario = AuthService.refreshSession()
            this.setState({
                isAutenticado: true,
                usuarioAutenticado: usuario
            })
        }
    }

    render(){

        const contexto = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        return(
            <AuthProvider value={contexto} >
                {this.props.children}
            </AuthProvider>
        )
    }

}

export default ProvedorAutenticacao;