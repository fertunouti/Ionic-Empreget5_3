import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080';
  private baseUrlByName = "http://localhost:8080/prestadores/nome-contem/"
  private baseUrlByRegion = "http://localhost:8080/prestadores/regiao/"


  private authToken: string = '';
  private tipoUserLogado!: string
  private email: string = '';
  private termoProcurado = '';
  private regionProcurado = '';
  private idProcurado! : number
  

  constructor(private http: HttpClient) { }
  //Método para definir o tipo do User
  setUserRole(user: string) {
    this.tipoUserLogado = user
  }

  //Método para obter tipo user logado
  getUserRole(){
    return this.tipoUserLogado
  }
  // Método para definir o token JWT após a autenticação
  setAuthToken(token: string): void {
    this.authToken = token;
  }

  // Método para obter o cabeçalho com o token JWT incluído
  private getAuthHeader(): HttpHeaders {
    const token = this.authToken;
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      return new HttpHeaders();
    }
  }

  // Método para obter o token JWT do cookie
  private getTokenCookie(): string {
    const name = 'jwt_token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  }
  addEmail(valorEmail: string) {
    this.email = valorEmail
  }
  addId(valorId:number){
    this.idProcurado = valorId
  }
 

  //ENDPOINTS

  // POST LOGIN
  postData(data: any): Observable<any> {
    const headers = this.getAuthHeader().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.baseUrl}/auth/login`, data, { headers });
  }
  // POST PEDIDO
  postPedido(data: any): Observable<any> {
    const headers = this.getAuthHeader().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.baseUrl}/os`, data, { headers });
  }
  // POST CADASTRO CLIENTES
  postCadastrarCliente(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/clientes`, data);
  }

  // GET PERFIS CLIENTES
  getDataPerfisClientes(): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.get<any>(`${this.baseUrl}/clientes`, { headers });
  }
  // GET PERFIS PRESTADORES
  getDataPerfisPrestadores(): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.get<any>(`${this.baseUrl}/prestadores/perfis`, { headers });
  }
  
  // GET PERFIS PRESTADORES by id
  getPerfisPrestadoresById(): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.get<any>(`${this.baseUrl}/prestadores/${this.idProcurado}`, { headers });
  }
  // GET PEDIDOS
  getPedidos(): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.get<any>(`${this.baseUrl}/os`, { headers });
  }
    // GET by Id PEDIDOS
    getByIdPedido(): Observable<any> {
      const headers = this.getAuthHeader();
      return this.http.get<any>(`${this.baseUrl}/os/${this.idProcurado}`, { headers });
    }



  // GET USUARIOS CADASTRADOS
  getDataUsuarios(): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.get<any>(`${this.baseUrl}/usuarios`, { headers });
  }
  //PUT CANCELAR OS
  putCancelarOS(): Observable<any> {
    //const headers = this.getAuthHeader().set('Content-Type', 'application/json');
    const headers = this.getAuthHeader()
    
    return this.http.put<any>(`${this.baseUrl}/os/${this.idProcurado}`, { headers });
    }

 
 

  addTermo(valorTermo: string) {
    if (valorTermo == ""){
      this.termoProcurado="a"
    }else{
    this.termoProcurado = valorTermo
    }
  }
  addRegion(valorTermo: string) {
    this.regionProcurado = valorTermo
  }
  readEmail() {
    return this.email
  }
  readId(){
  return this.idProcurado
}

  readTermo() {
    return this.termoProcurado
  }

  read(): Observable<any> {
    return this.http.get<any>(this.baseUrl)
  }

  readByName(): Observable<any> {
      const headers = this.getAuthHeader();
      return this.http.get<any>(this.baseUrlByName + this.termoProcurado, {headers})
    
  }
  readByRegion(): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.get<any>(this.baseUrlByRegion + this.regionProcurado, {headers})
  }

}

