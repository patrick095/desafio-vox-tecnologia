import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LegalNature, Requirement, State } from 'src/@types/apiTypes';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css']
})


export class NewCompanyComponent implements OnInit {
  selected: boolean = this.DataService.selected
  data: Requirement = this.DataService.data
  legalNatures: LegalNature[]
  stateList: State[]
  countyId:string
  findCep: boolean = false
  finished: boolean = false

  form = this.fb.group({
    ds_responsavel: ['', Validators.required],
    nu_cpf: ['', Validators.pattern('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})')],
    date_nascimento: ['', Validators.pattern(/^(?:(?:31([\/]?)(?:0[13578]|1[02]))\1|(?:(?:29|30)([\/]?)(?:0[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29([\/]?)02\3(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26]))))$|^(?:0[1-9]|1\d|2[0-8])([\/]?)(?:(?:0[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})/)],
    ds_nome_fantasia: ['', Validators.required],
    co_entidade_registro: ['', Validators.required],
    co_natureza_juridica: ['', Validators.required],
    co_cep: ['', Validators.pattern('([0-9]{2}[\.]?[0-9]{3}[-]?[0-9]{3})|([0-9]{5}[-]?[0-9]{3})')],
    ds_logradouro: ['', Validators.required],
    ds_bairro: ['', Validators.required],
    ds_complemento: [''],
    co_municipio: ['', Validators.required],
    co_uf: ['', Validators.required],
    co_numero: ['', Validators.required]
  })

  constructor(
    private route: ActivatedRoute,
    private DataService: DataService,
    private fb: FormBuilder,
    private ApiService: ApiService
    ) { }

  setSelectedFalse(){
    this.DataService.selected = false
  }
  
  async onSubmit(){
    //tratativa dos dados para adequa????o ?? api
    //deixar apenas numeros
    this.form.value.nu_cpf = this.form.value.nu_cpf.replace(/[^\d]/g, "")
    this.form.value.co_cep = this.form.value.co_cep.replace(/[^\d]/g, "")
    // mudar os separadores '/' para '-' e mudar de DDMMAAAA para AAAAMMDD
    this.form.value.date_nascimento = this.form.value.date_nascimento.replace(/[\/]/g, "-").split(/-/).reverse().join('-')
    // salvar o id do municipio e estado e n??o o nome
    this.form.value.ds_municipio = this.countyId
    this.stateList.map((state:any) => {
      if (this.form.value.co_uf === state.sigla) {
        this.form.value.co_uf = state.id
      }
    })
    const {
      ds_responsavel, nu_cpf, date_nascimento, ds_nome_fantasia,
      co_entidade_registro, co_natureza_juridica, co_cep, ds_logradouro,
      ds_bairro, ds_complemento, co_municipio, co_uf, co_numero
    } = this.form.value
    //colocar no padr??o da api
    const data: Requirement = {
      empresa: {
        co_entidade_registro,
        co_natureza_juridica,
        ds_nome_fantasia,
        endereco:{
          co_cep,
          co_municipio: this.countyId,
          co_numero,
          co_uf,
          ds_bairro,
          ds_complemento,
          ds_logradouro
        }
      },
      solicitante: {
        date_nascimento,
        ds_responsavel,
        nu_cpf
      }
    }
    // aqui ele resolve se vai chamar o metodo de salvar ou atualizar
    // dependendo se o o usu??rio est?? criando um novo ou editando
    const save = this.DataService.selected? this.ApiService.updateCompany:  this.ApiService.saveNewCompany
    const id: number = this.DataService.selected? this.DataService.data.id : 0
    const savedData = await save(data, id)
    
    if (savedData.status === 200) {
      //mostrar o modal
      this.finished = true
      return true
    }
    else return false
  }

  maskCPF(Cpf?: string){
    let cpf: string = Cpf? Cpf : this.form.value.nu_cpf.replace(/[^\d]/g, "")
    cpf = cpf.replace( /(\d{3})(\d)/ , "$1.$2")
    cpf = cpf.replace( /(\d{3})(\d)/ , "$1.$2")
    cpf = cpf.replace( /(\d{3})(\d{1,2})$/ , "$1-$2");
    (document.getElementById("cpf") as HTMLInputElement).value = cpf
  }

  maskBirthDay(Birthday?: string){
    let birthday: string = Birthday? Birthday : this.form.value.date_nascimento.replace(/[^\d]/g, "")
    birthday = birthday.replace( /(\d{2})(\d)/ , "$1/$2")
    birthday = birthday.replace( /(\d{2})(\d)/ , "$1/$2");
    (document.getElementById("birthday") as HTMLInputElement).value = birthday
  }

  async maskCEP(Cep?: string){
    let cep:string = Cep? Cep : this.form.value.co_cep.replace(/[^\d]/g, "")
    if (cep.length < 8) {
      this.findCep = false
      this.form.patchValue({
        ds_logradouro: '',
        ds_bairro: '',
        ds_municipio: '',
        co_uf: ''
      })
    }
    let cepMask: string = cep.replace( /(\d{5})/ , "$1-");
    (document.getElementById("cep") as HTMLInputElement).value = cepMask
    // aqui evita que a verifica????o entre em loop
    if (cep.length === 8 && !this.findCep) {
      this.findCep = true
      this.getAllAddressInfo(cep)
    }
    
  }

  async setFormValues(data: Requirement){
    const { empresa, solicitante } = data
    let { co_entidade_registro,co_natureza_juridica,ds_nome_fantasia,endereco } = empresa
    let { date_nascimento, ds_responsavel, nu_cpf } = solicitante 
    let { co_cep, co_municipio, co_numero, co_uf, ds_bairro, ds_logradouro, ds_complemento } = endereco
    
    //pega o dado correto de acordo com o codigo que est?? salvo na api
    this.stateList.map((state:any) => {
      if (parseInt(data.empresa.endereco.co_uf) === parseInt(state.id)) {
        co_uf = state.sigla
      }
    })
    co_municipio = await this.ApiService.getCountyInfo(data.empresa.endereco.co_municipio)
    // transforma a data em DDMMAAAA e tira os simbolos por o form j?? faz isso
    date_nascimento = data.solicitante.date_nascimento.split(/-/).reverse().join('');

    this.form.patchValue({
      co_cep: `${co_cep}`,
      co_entidade_registro,
      co_municipio,
      co_natureza_juridica,
      co_numero,
      co_uf,
      ds_bairro,
      ds_complemento,
      ds_logradouro,
      ds_nome_fantasia,
      date_nascimento,
      ds_responsavel,
      nu_cpf
    })
    // aqui atualiza os inputs que tem um validator personalizado
    await this.maskCEP(`${co_cep}`)
    this.maskCPF(`${nu_cpf}`)
    this.maskBirthDay(date_nascimento)
  }

  async getAllAddressInfo(cep: string | number){
    let addressInfo = await this.ApiService.getAddressInfo(cep)
      this.form.patchValue({
        co_cep: addressInfo.cep,
        ds_logradouro: addressInfo.logradouro,
        ds_bairro: addressInfo.bairro,
        co_municipio: addressInfo.localidade,
        co_uf: addressInfo.uf
      })
      this.countyId = addressInfo.ibge
  }
  
  async ngOnInit() {
    // altera o header de acordo com as informa????es da p??gina
    this.DataService.setPageTitle('Solicitar Abertura de empresa')
    this.DataService.setButtonTitle('<i class="bi bi-arrow-left"></i> Voltar')
    this.DataService.setButtonLink('/')
    
    this.legalNatures = await this.ApiService.legalNature()
    this.stateList = await this.ApiService.getStateList()
    // verifica se tem alguma requisi????o selecionada para editar ou se ?? para fazer uma requisi????o nova
    if (this.DataService.selected) {
      const data = await this.ApiService.companyInfo(this.DataService.data.id)
      if (data) {
        this.setFormValues(data)
      }
    }
  }

}
