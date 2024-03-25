export class AponExecucaoModel {
    public id_empresa      : number = 0;
    public id       	   : number = 0;
	public id_projeto  	   : number = 0;
	public id_tarefa  	   : string = "";
	public id_trabalho	   : string = "";
	public seq			   : number = 0;
	public id_resp  	   : number = 0;
	public id_exec		   : number = 0;
	public Inicial		   : Date = new Date();
	public Final		   : Date = new Date();
	public obs			   : string = "";
	public horasapon	   : number = 0 ;
	public encerramento    : string = "";
	public user_insert	   :number = 0  ;
	public user_update 	   :number = 0  ;
}
