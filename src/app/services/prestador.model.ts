export interface Prestadores {
    id: number,
    imgUrl: string,
    nome: string,
    endereco: {
        logradouro: string,
        numero: number,
        complemento: string,
        bairro: string,
        cidade: string,
        estado: string,
        pais: string,
    },
    regiao: string,
    rg: string,
    cpf: string,
    telefone: string,
    email: string,
    servico: {
        descricao: string,
        valor: number,
    };
    disponibilidade: string,
    observacao: string,
    dataDoCadastro: string,
    dataDaAtualizacao: string,
}