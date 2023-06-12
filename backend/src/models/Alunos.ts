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

  constructor(nome_completo: string, email:string, senha:string, celular:string, estado:string, cep:string, bairro:string, rua:string, data_nasc:string, empregado:string, area_profissao:string){
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

  static fromMap(reqBody: any): Aluno{
    return new Aluno(
      reqBody['nome_completo'],
      reqBody['email'],                                                                                                                        
      reqBody['senha'],
      reqBody['celular'],
      reqBody['estado'],
      reqBody['cep'],
      reqBody['bairro'],
      reqBody['rua'],
      reqBody['data_nasc'],
      reqBody['empregado'],
      reqBody['area_profissao']
    );
  }

  toString(): string{
    return `id: ${this.id}, nome_completo: ${this.nome_completo}, email: ${this.email}, senha: ${this.senha}, celular: ${this.celular}, estado: ${this.estado}, cep: ${this.cep}, bairro: ${this.bairro}, rua: ${this.rua}, data_nasc: ${this.data_nasc}, empregado: ${this.empregado}, area_profissao: ${this.area_profissao}`
  }
}


export default Aluno;