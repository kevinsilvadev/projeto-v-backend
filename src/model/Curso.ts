class Curso {
  id?: Number;
  descricao: string;
  fk_Usuario_id: Number;
  data_criacao: Date;
  fk_Academia_id: Number;
  imagem: string;
  validado: boolean;
  titulo: string;
  constructor(
    id: number,
    descricao: string,
    fk_Usuario_id: number,
    data_criacao: Date,
    fk_Academia_id: Number,
    imagem: string,
    validado: boolean,
    titulo: string
  ) {
    this.id = id;
    this.descricao = descricao;
    this.fk_Usuario_id = fk_Usuario_id;
    this.data_criacao = data_criacao;
    this.fk_Academia_id = fk_Academia_id;
    this.imagem = imagem;
    this.validado = validado;
    this.titulo = titulo;
  }

  static kId = "id";
  static kfk_Usuario_Id = "fk_Usuario_id";
  static kdescricao = "descricao";
  static kdata_criacao = "data_criacao";
  static kfk_Academia_id = "fk_Academia_id";
  static kimagem = "imagem";
  static kvalidado = "validado";
  static ktitulo = "titulo";

  static fromMap(reqBody: any): Curso {
    return new Curso(
      reqBody[Curso.kId],
      reqBody[Curso.kdescricao],
      reqBody[Curso.kfk_Usuario_Id],
      reqBody[Curso.kdata_criacao],
      reqBody[Curso.kfk_Academia_id],
      reqBody[Curso.kimagem],
      reqBody[Curso.kvalidado],
      reqBody[Curso.ktitulo]
    );
  }

  toMap(): {} {
    return {
      [Curso.kId]: this.id,
      [Curso.kfk_Usuario_Id]: this.fk_Usuario_id,
      [Curso.kdescricao]: this.descricao,
      [Curso.kdata_criacao]: this.data_criacao,
      [Curso.kfk_Academia_id]: this.fk_Academia_id,
      [Curso.kimagem]: this.imagem,
      [Curso.kvalidado]: this.fk_Academia_id,
      [Curso.ktitulo]: this.titulo,
    };
  }

  /*toString(): string {
      return `id: ${this.id}, nome: ${this.nome}, email: ${this.email}, senha: ${this.senha}, celular: ${this.celular}, estado: ${this.estado}, cep: ${this.cep}, bairro: ${this.bairro}, rua: ${this.rua}, data_nasc: ${this.data_nascimento}, empregado: ${this.colaborador}, area_profissao: ${this.profissao}, cargo: ${this.cargo}`
    }*/
}

export default Curso;
