import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  requestList:any
  selected = false
  selectedCompany:any
  stateList:any
  cityName:any
  cpf:any
  cep: any
  addressInfo:any
  data = this.DataService.data

  constructor(
    private route: ActivatedRoute,
    private DataService: DataService,
    private ApiService: ApiService
  ) { }
  

  getAddressInfo(cep: string | number){
    this.addressInfo = this.ApiService.getAddressInfo(cep)
  }
  
  CPFFormater(cpf:string){
    cpf = cpf.replace(/[^\d]/g, "");
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  CEPFormater(cep:string){
    cep = cep.replace(/[^\d]/g, "");
      return cep.replace(/(\d{2})(\d{3})/, "$1.$2-");
  }

  select(selected: any){
    this.cpf = this.CPFFormater(selected.solicitante.nu_cpf)
    this.cep = this.CEPFormater(`${selected.empresa.endereco.co_cep}`)
    this.showCityName(selected.empresa.endereco.co_municipio)
    if (
      selected === this.selectedCompany ||
      !this.selectedCompany ||
      !this.selected) {
        this.DataService.selected = !this.selected
        this.selected = !this.selected
        this.DataService.data = selected
        if (!this.selected) {
          this.DataService.data = null
        }
      }
    this.selectedCompany = selected
  }

  showState(idState: string){
    let id = parseInt(idState)
    let stateInitials: string = ''
    this.stateList.map((state: any) => {
      if (state.id === id) {
        stateInitials = state.sigla
      }
    })
    return stateInitials
  }

  async showCityName(countyId: string): Promise<string> {
    this.cityName = await this.ApiService.getCountyInfo(countyId)
    return this.cityName
  }

  async ngOnInit() {
    // altera o header de acordo com as informações da página
    this.DataService.setPageTitle('Pedidos de Abertura da empersa')
    this.DataService.setButtonTitle('<i class="bi bi-plus-circle-fill" style="margin-right: 5px;"></i> Solicitar Abertura')
    this.DataService.setButtonLink('new')
    
    this.requestList = await this.ApiService.getAllRequests()
    this.stateList = await this.ApiService.getStateList()
    return
  }
}
