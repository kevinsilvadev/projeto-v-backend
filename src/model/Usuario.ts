class Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  celular: string;
  estado: string;
  cep: string;
  bairro: string;
  rua: string;
  data_nascimento: Date;
  colaborador: boolean;
  profissao: string;
  cargo: Number;

  constructor(
    id: number,
    nome: string,
    email: string,
    senha: string,
    celular: string,
    estado: string,
    cep: string,
    bairro: string,
    rua: string,
    data_nascimento: Date,
    colaborador: boolean,
    profissao: string,
    cargo: Number
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.celular = celular;
    this.estado = estado;
    this.cep = cep;
    this.bairro = bairro;
    this.rua = rua;
    this.data_nascimento = data_nascimento;
    this.profissao = profissao;
    this.colaborador = colaborador;
    this.cargo = cargo;
  }

  static kId = "id";
  static knome = "nome";
  static kEmail = "email";
  static kSenha = "senha";
  static kCelular = "celular";
  static kEstado = "estado";
  static kCep = "cep";
  static kBairro = "bairro";
  static kRua = "rua";
  static kDataNascimento = "data_nascimento";
  static kColaborador = "colaborador";
  static kProfissao = "profissao";
  static kCargo = "cargoId";

  static fromMap(reqBody: any): Usuario {
    return new Usuario(
      reqBody[Usuario.kId],
      reqBody[Usuario.knome],
      reqBody[Usuario.kEmail],
      reqBody[Usuario.kSenha],
      reqBody[Usuario.kCelular],
      reqBody[Usuario.kEstado],
      reqBody[Usuario.kCep],
      reqBody[Usuario.kBairro],
      reqBody[Usuario.kRua],
      reqBody[Usuario.kDataNascimento],
      reqBody[Usuario.kColaborador],
      reqBody[Usuario.kProfissao],
      reqBody[Usuario.kCargo]
    );
  }

  toMap(): {} {
    return {
      [Usuario.kId]: this.id,
      [Usuario.knome]: this.nome,
      [Usuario.kEmail]: this.email,
      [Usuario.kSenha]: this.senha,
      [Usuario.kCelular]: this.celular,
      [Usuario.kEstado]: this.estado,
      [Usuario.kCep]: this.cep,
      [Usuario.kBairro]: this.bairro,
      [Usuario.kRua]: this.rua,
      [Usuario.kDataNascimento]: this.data_nascimento,
      [Usuario.kColaborador]: this.colaborador,
      [Usuario.kProfissao]: this.profissao,
      ["cargo"]: this.cargo,
    };
  }

  toString(): string {
    return `id: ${this.id}, nome: ${this.nome}, email: ${this.email}, senha: ${this.senha}, celular: ${this.celular}, estado: ${this.estado}, cep: ${this.cep}, bairro: ${this.bairro}, rua: ${this.rua}, data_nasc: ${this.data_nascimento}, empregado: ${this.colaborador}, area_profissao: ${this.profissao}, cargo: ${this.cargo}`;
  }
}

export default Usuario;
