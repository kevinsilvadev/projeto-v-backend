class Curso {
  id?: number;
  urlPhoto: string;
  nome: string;
  descricao: string;


  constructor(id: number, urlPhoto: string, nome: string, descricao: string) {
    this.id = id;
    this.urlPhoto = urlPhoto;
    this.nome = nome;
    this.descricao = descricao;

  }

  static kId = 'ID_CURSOS';
  static kUrlPhoto = 'urlPhoto';
  static kNome = 'nome';
  static kDescricao = 'descricao';


  static fromMap(reqBody: any): Curso {
    return new Curso(
      reqBody[Curso.kId],
      reqBody[Curso.kUrlPhoto],
      reqBody[Curso.kNome],
      reqBody[Curso.kDescricao],
    );
  }

  toMap(): {} {
    return {
      [Curso.kId]: this.id,
      [Curso.kUrlPhoto]: this.urlPhoto,
      [Curso.kNome]: this.nome,
      [Curso.kDescricao]: this.descricao,
    }
  }

  toString(): string {
    return `id_cursos: ${this.id}, urlPhoto: ${this.urlPhoto}, nome_cursos: ${this.nome}, descricao: ${this.descricao}`
  }
}



export default Curso;
