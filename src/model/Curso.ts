class Curso {
  id?: Number;
  descricao: string;
  usuarioId: Number;
  data_criacao: Date;
  academiaId: Number;
  imagem: string;
  validado: boolean;
  titulo: string;
  constructor(
    id: number,
    descricao: string,
    usuarioId: number,
    data_criacao: Date,
    academiaId: Number,
    imagem: string,
    validado: boolean,
    titulo: string
  ) {
    this.id = id;
    this.descricao = descricao;
    this.usuarioId = usuarioId;
    this.data_criacao = data_criacao;
    this.academiaId = academiaId;
    this.imagem = imagem;
    this.validado = validado;
    this.titulo = titulo;
  }

  static kId = "id";
  static kusuarioId = "usuarioId";
  static kdescricao = "descricao";
  static kdata_criacao = "data_criacao";
  static kacademiaId = "academiaId";
  static kimagem = "imagem";
  static kvalidado = "validado";
  static ktitulo = "titulo";

  static fromMap(reqBody: any): Curso {
    return new Curso(
      reqBody[Curso.kId],
      reqBody[Curso.kdescricao],
      reqBody[Curso.kusuarioId],
      reqBody[Curso.kdata_criacao],
      reqBody[Curso.kacademiaId],
      reqBody[Curso.kimagem],
      reqBody[Curso.kvalidado],
      reqBody[Curso.ktitulo]
    );
  }

  toMap(): {} {
    return {
      [Curso.kId]: this.id,
      [Curso.kusuarioId]: this.usuarioId,
      [Curso.kdescricao]: this.descricao,
      [Curso.kdata_criacao]: this.data_criacao,
      [Curso.kacademiaId]: this.academiaId,
      [Curso.kimagem]: this.imagem,
      [Curso.kvalidado]: this.academiaId,
      [Curso.ktitulo]: this.titulo,
    };
  }

  /*toString(): string {
      return `id: ${this.id}, nome: ${this.nome}, email: ${this.email}, senha: ${this.senha}, celular: ${this.celular}, estado: ${this.estado}, cep: ${this.cep}, bairro: ${this.bairro}, rua: ${this.rua}, data_nasc: ${this.data_nascimento}, empregado: ${this.colaborador}, area_profissao: ${this.profissao}, cargo: ${this.cargo}`
    }*/
}

export default Curso;
