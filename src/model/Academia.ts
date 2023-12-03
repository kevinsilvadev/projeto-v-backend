class Academia {
  id?: Number;
  nome: string;
  descricao: string;
  imagem: string;
  data_criacao: Date;
  fk_Usuario_id: number;

  constructor(
    id: number,
    nome: string,
    descricao: string,
    imagem: string,
    data_criacao: Date,
    fk_Usuario_id: number
  ) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.imagem = imagem;
    this.data_criacao = data_criacao;
    this.fk_Usuario_id = fk_Usuario_id;
  }

  static kId = "id";
  static knome = "nome";
  static kdescricao = "descricao";
  static kimagem = "imagem";
  static kdata_criacao = "data_criacao";
  static kfk_Usuario_id = "fk_Usuario_id";

  static fromMap(reqBody: any): Academia {
    return new Academia(
      reqBody[Academia.kId],
      reqBody[Academia.knome],
      reqBody[Academia.kdescricao],
      reqBody[Academia.kimagem],
      reqBody[Academia.kdata_criacao],
      reqBody["usuarioId"]
    );
  }

  toMap(): {} {
    return {
      [Academia.kId]: this.id,
      [Academia.knome]: this.nome,
      [Academia.kdescricao]: this.descricao,
      [Academia.kimagem]: this.imagem,
      [Academia.kdata_criacao]: this.data_criacao,
      [Academia.kfk_Usuario_id]: this.fk_Usuario_id,
    };
  }

  /*toString(): string {
      return `id: ${this.id}, nome: ${this.nome}, email: ${this.email}, senha: ${this.senha}, celular: ${this.celular}, estado: ${this.estado}, cep: ${this.cep}, bairro: ${this.bairro}, rua: ${this.rua}, data_nasc: ${this.data_nascimento}, empregado: ${this.colaborador}, area_profissao: ${this.profissao}, cargo: ${this.cargo}`
    }*/
}

export default Academia;
