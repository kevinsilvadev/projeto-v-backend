class Aluno {
  id?: number;
  nome_completo: string;
  email: string;
  senha: string;
  celular: string;
  estado: string;
  cep: string;
  bairro: string;
  rua: string;
  data_nasc: string;
  empregado: string;
  area_profissao: string;
  //TODO DECLARAR NOS MÈTODOS
  cursos: Array<string>;

  constructor(id: number, nome_completo: string, email: string, senha: string, celular: string, estado: string, cep: string, bairro: string, rua: string, data_nasc: string, empregado: string, area_profissao: string) {
    this.id = id
    this.nome_completo = nome_completo
    this.email = email;
    this.senha = senha;
    this.celular = celular;
    this.estado = estado;
    this.cep = cep;
    this.bairro = bairro;
    this.rua = rua;
    this.data_nasc = data_nasc;
    this.empregado = empregado;
    this.area_profissao = area_profissao;
  }

  static kId = 'ID_ALUNO';
  static kNomeCompleto = 'nome_completo';
  static kEmail = 'email';
  static kSenha = 'senha';
  static kCelular = 'celular';
  static kEstado = 'estado';
  static kCep = 'cep';
  static kBairro = 'bairro';
  static kRua = 'rua';
  static kDataNascimento = 'data_nasc';
  static kEmpregado = 'empregado';
  static kAreaProfissao = 'area_profissao';

  static fromMap(reqBody: any): Aluno {
    return new Aluno(
      reqBody[Aluno.kId],
      reqBody[Aluno.kNomeCompleto],
      reqBody[Aluno.kEmail],
      reqBody[Aluno.kSenha],
      reqBody[Aluno.kCelular],
      reqBody[Aluno.kEstado],
      reqBody[Aluno.kCep],
      reqBody[Aluno.kBairro],
      reqBody[Aluno.kRua],
      reqBody[Aluno.kDataNascimento],
      reqBody[Aluno.kEmpregado],
      reqBody[Aluno.kAreaProfissao]
    );
  }

  toMap(): {} {
    return {
      [Aluno.kId]: this.id,
      [Aluno.kNomeCompleto]: this.nome_completo,
      [Aluno.kEmail]: this.email,
      [Aluno.kSenha]: this.senha,
      [Aluno.kCelular]: this.celular,
      [Aluno.kEstado]: this.estado,
      [Aluno.kCep]: this.cep,
      [Aluno.kBairro]: this.bairro,
      [Aluno.kRua]: this.rua,
      [Aluno.kDataNascimento]: this.data_nasc,
      [Aluno.kEmpregado]: this.empregado,
      [Aluno.kAreaProfissao]: this.area_profissao,
    };
  }

  toString(): string {
    return `id: ${this.id}, nome_completo: ${this.nome_completo}, email: ${this.email}, senha: ${this.senha}, celular: ${this.celular}, estado: ${this.estado}, cep: ${this.cep}, bairro: ${this.bairro}, rua: ${this.rua}, data_nasc: ${this.data_nasc}, empregado: ${this.empregado}, area_profissao: ${this.area_profissao}`
  }
}


export default Aluno;