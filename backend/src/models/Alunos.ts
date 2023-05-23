class Aluno {
    id?: number;
    email: string;
    senha: string;
    celular: string;
    estado: string;
    cep: string;
    bairro: string;
    rua: string;
    empregado: string;
    area_profissao: string;

    constructor(email:string, senha:string, celular:string, estado:string, cep:string, bairro:string, rua:string, empregado:string, area_profissao:string){
      this.email = email;
      this.senha = senha;
      this.celular = celular;
      this.estado = estado;
      this.cep = cep;
      this.bairro = bairro;
      this.rua = rua;
      this.empregado = empregado;
      this.area_profissao = area_profissao;
    }

    static fromMap(reqBody: any): Aluno{
      return new Aluno(
        reqBody['email'],                                                                                                                        
        reqBody['senha'],
        reqBody['celular'],
        reqBody['estado'],
        reqBody['cep'],
        reqBody['bairro'],
        reqBody['rua'],
        reqBody['empregado'],
        reqBody['area_profissao']
      );
    }

    toString(): string{
      return `id: ${this.id}, email: ${this.email}, senha: ${this.senha}, celular: ${this.celular}, estado: ${this.estado}, cep: ${this.cep}, bairro: ${this.bairro}, rua: ${this.rua}, empregado: ${this.empregado}, area_profissao: ${this.area_profissao}`
    }
  }
  
  
  export default Aluno;