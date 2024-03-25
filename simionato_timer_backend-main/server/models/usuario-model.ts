
export class UsuarioModel {
  public id:number = 0;
  public razao:string = "";
  public cnpj_cpf:string = "";
  public cadastr: Date = new Date();
  public rua:string = "";
  public nro:string = "";
  public complemento:string = "";
  public bairro:     string = "";
  public cidade:     string = "";
  public uf:         string = "";
  public cep:        string = "";
  public tel1:       string = "";
  public tel2:       string = "";
  public email:      string = "";
  public senha:      string = "";
  public pasta:      string = "";
  public grupo:      string = "";
  public user_insert	   :number = 0  ;
	public user_update 	   :number = 0  ;
}

