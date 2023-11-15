class TelaCurso{
    id: number;
    texto: string;
    midia: string | undefined;
    resposta: string | undefined;
    pergunta: string | undefined;

    constructor(id: number, texto:string, midia:string|undefined, pergunta:string|undefined, resposta:string|undefined){
        this.id = id;
        this.texto = texto;
        this.midia = midia;
        this.resposta = resposta;
        this.pergunta = pergunta;
    }

    static kId = "id";
    static kTexto = "texto";
    static kMidia = "midia";
    static kResposta = "resposta";
    static kPergunta = "pergunta";

    static fromMap(reqBody: any){
        return new TelaCurso(
            reqBody[TelaCurso.kId],
            reqBody[TelaCurso.kTexto],
            reqBody[TelaCurso.kMidia],
            reqBody[TelaCurso.kPergunta],
            reqBody[TelaCurso.kResposta]
        );
    }

}

export default TelaCurso;