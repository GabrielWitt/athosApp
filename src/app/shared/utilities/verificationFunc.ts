import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { ShortSpace, Space } from 'src/app/core/models/spaces';
import { ShortUser, UserFormData } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class VerificationFuncService {

  constructor( ) { }

  aleatorio(a,b) {
    const newNumber = Math.round(Math.random()*(b-a)+parseInt(a));
    return newNumber < 10 ? '0'+newNumber :''+newNumber
  }

  sortByType( a, b ) {
    if ( a.type < b.type ){
      return -1;
    }
    if ( a.type > b.type ){
      return 1;
    }
    return 0;
  }

  async EnterSubmit(evt, form, block){
    if (evt.keyCode === 13 && form.status === 'VALID' && !block){
      if (Capacitor.getPlatform() !== 'web') { Keyboard.hide(); }
      return true;
    }
    return false
  }

  async createShortUser(user: UserFormData): Promise<ShortUser>{
    const short: ShortUser = {
      uid: user.uid,
      photo: user.photo?user.photo:'',
      email: user.email,
      name: user.name + ' ' + user.lastName
    }
    return short;
  }

  async createShortSpace(space: Space): Promise<ShortSpace>{
    const short: ShortSpace = {
      uid: space.uid,
      unitNumber: space.unitNumber,
      communityUID: space.communityUID,
      description: space.description,
      floor: space.floor,
      type: space.type,
      photo: space.photo,
    }
    return short;
  }
  
  Unidades(num){

    switch(num)
    {
        case 1: return 'UN';
        case 2: return 'DOS';
        case 3: return 'TRES';
        case 4: return 'CUATRO';
        case 5: return 'CINCO';
        case 6: return 'SEIS';
        case 7: return 'SIETE';
        case 8: return 'OCHO';
        case 9: return 'NUEVE';
    }

    return '';
}//Unidades()

Decenas(num){

    let decena = Math.floor(num/10);
    let unidad = num - (decena * 10);

    switch(decena)
    {
        case 1:
            switch(unidad)
            {
                case 0: return 'DIEZ';
                case 1: return 'ONCE';
                case 2: return 'DOCE';
                case 3: return 'TRECE';
                case 4: return 'CATORCE';
                case 5: return 'QUINCE';
                default: return 'DIECI' + this.Unidades(unidad);
            }
        case 2:
            switch(unidad)
            {
                case 0: return 'VEINTE';
                default: return 'VEINTI' + this.Unidades(unidad);
            }
        case 3: return this.DecenasY('TREINTA', unidad);
        case 4: return this.DecenasY('CUARENTA', unidad);
        case 5: return this.DecenasY('CINCUENTA', unidad);
        case 6: return this.DecenasY('SESENTA', unidad);
        case 7: return this.DecenasY('SETENTA', unidad);
        case 8: return this.DecenasY('OCHENTA', unidad);
        case 9: return this.DecenasY('NOVENTA', unidad);
        case 0: return this.Unidades(unidad);
    }
}//Unidades()

DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
        return strSin + ' Y ' + this.Unidades(numUnidades)

    return strSin;
}//DecenasY()

Centenas(num) {
    let centenas = Math.floor(num / 100);
    let decenas = num - (centenas * 100);

    switch(centenas)
    {
        case 1:
            if (decenas > 0)
                return 'CIENTO ' + this.Decenas(decenas);
            return 'CIEN';
        case 2: return 'DOSCIENTOS ' + this.Decenas(decenas);
        case 3: return 'TRESCIENTOS ' + this.Decenas(decenas);
        case 4: return 'CUATROCIENTOS ' + this.Decenas(decenas);
        case 5: return 'QUINIENTOS ' + this.Decenas(decenas);
        case 6: return 'SEISCIENTOS ' + this.Decenas(decenas);
        case 7: return 'SETECIENTOS ' + this.Decenas(decenas);
        case 8: return 'OCHOCIENTOS ' + this.Decenas(decenas);
        case 9: return 'NOVECIENTOS ' + this.Decenas(decenas);
    }

    return this.Decenas(decenas);
}//Centenas()

Seccion(num, divisor, strSingular, strPlural) {
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let letras = '';

    if (cientos > 0)
        if (cientos > 1)
            letras = this.Centenas(cientos) + ' ' + strPlural;
        else
            letras = strSingular;

    if (resto > 0)
        letras += '';

    return letras;
}//Seccion()

Miles(num) {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMiles = this.Seccion(num, divisor, 'UN MIL', 'MIL');
    let strCentenas = this.Centenas(resto);

    if(strMiles == '')
        return strCentenas;

    return strMiles + ' ' + strCentenas;
}//Miles()

Millones(num) {
    let divisor = 1000000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMillones = this.Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
    let strMiles = this.Miles(resto);

    if(strMillones == '')
        return strMiles;

    return strMillones + ' ' + strMiles;
}//Millones()

numeroALetras(num, currency?) {
    currency = currency || {};
    let data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: '',
        letrasMonedaPlural: currency.plural || 'DÓLARES',//'PESOS CHILENOS','PESOS',  'Bolívares', 'etcs'
        letrasMonedaSingular: currency.singular || 'DÓLAR',// 'PESO CHILENO', //'PESO',  'Bolivar', 'etc'
        letrasMonedaCentavoPlural: currency.centPlural || 'CENTAVOS',
        letrasMonedaCentavoSingular: currency.centSingular || 'CENTAVO'
    };

    if (data.centavos > 0) {
        let centavos = ''
        if (data.centavos == 1)
            centavos = this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
        else
            centavos =  this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
        data.letrasCentavos = 'CON ' + centavos
    };

    if(data.enteros == 0)
        return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    if (data.enteros == 1)
        return this.Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
    else
        return this.Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
};
  
}
