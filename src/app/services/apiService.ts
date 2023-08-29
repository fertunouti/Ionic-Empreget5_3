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
  private idProcurado!: number
  private loginStatus!: boolean
  private totalPages!: number
  private currentPage!: number


  constructor(private http: HttpClient) { }
  //Método para definir o tipo do User
  setUserRole(user: string) {
    this.tipoUserLogado = user
  }

  //Método para obter tipo user logado
  getUserRole() {
    return this.tipoUserLogado
  }
  // Método para definir o token JWT após a autenticação
  setAuthToken(token: string): void {
    this.authToken = token;
  }
  //Método para verificar testar se token esta ativo( pode excluir)
  getToken(){
    return this.authToken;
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

  

  //ENDPOINTS

  // POST LOGIN
  postData(data: any): Observable<any> {
    const headers = this.getAuthHeader().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.baseUrl}/auth/login`, data, { headers });
  }
  // POST PEDIDO
  postPedido(data: any): Observable<any> {
    const headers = this.getAuthHeader().set('Content-Type', 'application/json');
    console.log(headers)
    return this.http.post<any>(`${this.baseUrl}/os`, data, { headers });
  }
  
  //POST CADASTRO CLIENTES
  postCadastrarCliente(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/clientes`, data);
  }
  //POST CADASTRO PRESTADORES
  postCadastrarPrestador(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/prestadores`, data);
  }

  // GET PERFIS CLIENTES
  getDataPerfisClientes(): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.get<any>(`${this.baseUrl}/clientes`, { headers });
  }
  // GET PERFIS PRESTADORES
  getDataPerfisPrestadores(): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.get<any>(`${this.baseUrl}/prestadores/filtro`, { headers });
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
  // GET PEDIDOS por PAGINA
  getPedidosPage(): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.get<any>(`${this.baseUrl}/os?page=${this.currentPage}`, { headers });
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
    const headers = this.getAuthHeader().set('Content-Type', 'application/json');
    console.log(headers)
    return this.http.put<any>(`${this.baseUrl}/os/${this.idProcurado}`, {}, { headers });
   }
   // PUT ACEITAR OS
  putAceiteOS(): Observable<any> {
    const headers = this.getAuthHeader().set('Content-Type', 'application/json');
    console.log(headers)
    return this.http.put<any>(`${this.baseUrl}/os/${this.idProcurado}/aceite`, {}, { headers });
  }
   // PUT ACEITAR OS
  putRecusarOS(): Observable<any> {
    const headers = this.getAuthHeader().set('Content-Type', 'application/json');
    console.log(headers)
    return this.http.put<any>(`${this.baseUrl}/os/${this.idProcurado}/recusa`, {}, { headers });
  }
   // PUT FINALIZAR OS
  putFinalizarOS(): Observable<any> {
    const headers = this.getAuthHeader().set('Content-Type', 'application/json');
    console.log(headers)
    return this.http.put<any>(`${this.baseUrl}/os/${this.idProcurado}/finalizacao`, {}, { headers });
  }


  //MÉTODOS SET AUXILIARES
  addEmail(valorEmail: string) {
    this.email = valorEmail
  }
  addId(valorId: number) {
    this.idProcurado = valorId
  }
  addLoginStatus(valorLoginStatus:boolean){
    this.loginStatus = valorLoginStatus
  }
  addTermo(valorTermo: string) {
    if (valorTermo == "") {
      this.termoProcurado = "a"
    } else {
      this.termoProcurado = valorTermo
    }
  }
  addRegion(valorTermo: string) {
    this.regionProcurado = valorTermo
  }
  addTotalPages(totalPages:number){
    this.totalPages = totalPages
  }
  addCurrentPage(currentPage:number){
    this.currentPage = currentPage
  }

  //MÉTODOS GET AUXILIARES
  readEmail() {
    return this.email
  }
  readId() {
    return this.idProcurado
  }
  readTermo() {
    return this.termoProcurado
  }
  read(): Observable<any> {
    return this.http.get<any>(this.baseUrl)
  }
  readLoginStatus(){
    return this.loginStatus
  }


  //METODO PARA O COMPONENTE BUSCA POR NOME
  readByName(): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.get<any>(this.baseUrlByName + this.termoProcurado, { headers })
  }

  //MÉTODO PARA O COMPONENTE BUSCA POR REGIÃO
  readByRegion(): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.get<any>(this.baseUrlByRegion + this.regionProcurado, { headers })
  }

}

