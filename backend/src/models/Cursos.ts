class Curso {
    ID_CURSOS: number;
    urlPhoto: string;
    nome_cursos: string;
    descricao: string;
    ID_ALUNO: number;

    
    constructor(ID_CURSOS: number, urlPhoto: string, nome_cursos: string, descricao: string, ID_ALUNO: number){
      this.ID_CURSOS = ID_CURSOS;
      this.urlPhoto = urlPhoto;
      this.nome_cursos = nome_cursos;
      this.descricao = descricao;
      this.ID_ALUNO = ID_ALUNO;

    }


    static fromMap(reqBody: any): Curso{
      return new Curso(
        reqBody['ID_CURSOS'],                                                                                                                        
        reqBody['urlPhoto'],
        reqBody['nome_cursos'],
        reqBody['descricao'],
        reqBody['ID_ALUNO'],
  
      );
    }
  
    toString(): string{
      return `id_cursos: ${this.ID_CURSOS}, urlPhoto: ${this.urlPhoto}, nome_cursos: ${this.nome_cursos}, descricao: ${this.descricao}, id_aluno: ${this.ID_ALUNO}`
    }
  }
  


  export default Curso;
