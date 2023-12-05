class TelaCurso {
  texto: string;
  midia: string | undefined;
  resposta: string[] | undefined;
  alternativas: string[] | undefined;
  posicao: number;
  feedbacks: string[];
  tipo: string;

  constructor(
    texto: string,
    midia: string | undefined,
    pergunta: string | undefined,
    resposta: string | undefined,
    posicao: number,
    feedbacks: string,
    tipo: string
  ) {
    this.texto = texto;
    this.midia = midia;
    this.resposta = resposta?.split(',');
    this.alternativas = pergunta?.split(',');
    this.posicao = posicao;
    this.feedbacks = feedbacks.split(',');
    this.tipo = tipo;
  }

  static kTexto = "texto";
  static kMidia = "midia";
  static kResposta = "resposta";
  static kAlternativas = "alternativas";
  static kPosicao = "posicao";
  static kFeedbacks = "feedbacks";
  static kTipo = "tipo";

  static fromMap(reqBody: any) {
    return new TelaCurso(
      reqBody[TelaCurso.kTexto],
      reqBody[TelaCurso.kMidia],
      reqBody[TelaCurso.kResposta],
      reqBody[TelaCurso.kAlternativas],
      reqBody[TelaCurso.kPosicao],
      reqBody[TelaCurso.kFeedbacks],
      reqBody[TelaCurso.kTipo]
    );
  }
}

export default TelaCurso;
