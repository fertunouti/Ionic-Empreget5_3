export interface Prestadores {
    nome: string,
    imgUrl: null,

    endereco: {
        logradouro: string,
        numero: number | null,
        complemento: string,
        cep: string,
        bairro: string,
        cidade: string,
        estado: string,
        pais: string
    },

    regiao: string,
    rg: string,
    cpf: string,
    telefone: string,

    usuario: {
        email: string,
        senha: string,
        role: string
    }

    servico: {
        descricao: string,
        valor: number | null
    },

    disponibilidade: string,
    observacao: string,
}
