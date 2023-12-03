class TelaCurso {
  texto: string;
  midia: string | undefined;
  resposta: string | undefined;
  alternativas: string | undefined;
  posicao: number;
  feedbacks: string;
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
    this.resposta = resposta;
    this.alternativas = pergunta;
    this.posicao = posicao;
    this.feedbacks = feedbacks;
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
    const respostas = reqBody[TelaCurso.kResposta];
    const alternativas = reqBody[TelaCurso.kAlternativas];
    const feedbacks = reqBody[TelaCurso.kFeedbacks];
    console.log(reqBody[TelaCurso.kPosicao]);

    return new TelaCurso(
      reqBody[TelaCurso.kTexto],
      reqBody[TelaCurso.kMidia],
      alternativas.join(" "),
      respostas.join(" "),
      reqBody[TelaCurso.kPosicao],
      feedbacks.join(" "),
      reqBody[TelaCurso.kTipo]
    );
  }
}

export default TelaCurso;
