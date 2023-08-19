export interface Prestadores {
    conteudo: [
        {
            id?: number,
            imgUrl: null,
            nome: string,
            endereco: {
                logradouro: string,
                numero: string,
                complemento: string,
                bairro: string,
                cidade: string,
                estado: string,
                pais: string
            },
            regiao: string,
            rg: string,
            cpf: string,
            telefone: string,
            email: string,
            servico: {
                descricao: string,
                valor: number
            },
            disponibilidade: string,
            observacao: string,
            dataDoCadastro: string,
            dataDaAtualizacao: string
        },
        {
            id: number,
            imgUrl: null,
            nome: string,
            endereco: {
                logradouro: string,
                numero: string,
                complemento: string,
                bairro: string,
                cidade: string,
                estado: string,
                pais: string
            },
            regiao: string,
            rg: string,
            cpf: string,
            telefone: string,
            email: string,
            servico: {
                descricao: string,
                valor: number
            },
            disponibilidade: string,
            observacao: string,
            dataDoCadastro: string,
            dataDaAtualizacao: string
        }
    ],
    paginação: number,
    totalElementos: number,
    totalPages: number,
    pageAtual: number
}