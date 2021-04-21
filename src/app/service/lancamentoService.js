import ApiService from '../apiservice'

export default class LancamentoService extends ApiService{

    constructor(){
        super('/api/lancamentos')
    }

    obterListaMeses(){
        return(
            [
                {label: 'Selecione', value: ''},
                {label: 'Janeiro', value: '1'},
                {label: 'Fevereiro', value: '2'},
                {label: 'Março', value: '3'},
                {label: 'Abril', value: '4'},
                {label: 'Maio', value: '5'},
                {label: 'Junho', value: '6'},
                {label: 'Julho', value: '7'},
                {label: 'Agosto', value: '8'},
                {label: 'Setembro', value: '9'},
                {label: 'Outubro', value: '10'},
                {label: 'Novembro', value: '11'},
                {label: 'Dezembro', value: '12'}
            ]
        )
    }

    obterTipos(){
        return(
            [
                {label: 'Selecione...', value: ''},
                {label: 'Despesa', value: 'DESPESA'},
                {label: 'Receita', value: 'RECEITA'}
            ]
        )
    }

    consultar(lancamentosFiltro){

        let params = `?ano=${lancamentosFiltro.ano}`    

        if(lancamentosFiltro.mes){
            params = `${params}&mes=${lancamentosFiltro.mes}`
        }

        
        if(lancamentosFiltro.tipo){
            params = `${params}&tipo=${lancamentosFiltro.tipo}`
        }

        
        if(lancamentosFiltro.status){
            params = `${params}&status=${lancamentosFiltro.status}`
        }

        if(lancamentosFiltro.usuario){
            params = `${params}&usuario=${lancamentosFiltro.usuario}`
        }

        if(lancamentosFiltro.descricao){
            params = `${params}&descricao=${lancamentosFiltro.descricao}`
        }

        return this.get(params)
    }

}