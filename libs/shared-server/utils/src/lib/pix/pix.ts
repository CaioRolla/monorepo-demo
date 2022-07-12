

import * as qrcode from "qrcode";
import * as fs from "fs";

export class PIX  {

    private _is_unique_transaction: boolean = false
    private _key: string = ''
    private _receiver_name: string = ''
    private _receiver_city: string = ''
    private _amout: number = 0
    private _zip_code: string = ''
    private _identificator: string = ''
    private _description: string = ''
    private _location: string = ''

    private constructor() { }

    public static static() {
        return new PIX();
    }

    public static dinamic() {
        return new PIX();
    }

    setLocation(location: string) {
        this._location = location.replace('https://', '')
        return this;
    }

    setKey(key: string) {
        this._key = key
        return this;
    }

    setReceiverZipCode(zipCode: string) {

        if (zipCode.length != 8)
            throw 'A quantidade de caracteres para o código postal é 8'

        this._zip_code = zipCode
        return this;
    }

    setReceiverName(name: string) {
        if (name.length > 25)
            throw 'A quantidade máxima de caracteres para o nome do recebedor é 25'

        this._receiver_name = name
        return this;
    }

    setIdentificator(identificator: string) {
        if (identificator.length > 25)
            throw 'A quantidade máxima de caracteres para o identificador é 25'
        if (identificator.match(/[^0-9|a-z]/gi))
            throw 'Utilize apenas letras e números no identificador.'

        this._identificator = identificator
        return this;
    }

    setDescription(description: string) {

        if (description.length > 50)
            throw 'A quantidade máxima de caracteres para a descrição é 50'

        this._description = description
        return this;
    }


    setReceiverCity(city: string) {
        if (city.length > 15)
            throw 'A quantidade máxima de caracteres para a cidade do recebedor é 15'

        this._receiver_city = city
        return this;
    }

    setAmount(amout: number) {

        if (amout.toFixed(2).toString().length > 13)
            throw 'A quantidade máxima de caracteres para o valor é 13'

        this._amout = amout
        return this;
    }

    isUniqueTransaction(is_unique_transaction: boolean) {
        this._is_unique_transaction = is_unique_transaction
        return this;
    }

    getBRCode() {
        let lines = []

        // Payload Format Indicator
        lines.push(this._getEMV('00', '01'))

        // Is Unique Transaction?
        lines.push(this._getEMV('01', this._is_unique_transaction ? '12' : '11'))

        // Merchant Account Information - Pix	
        if (!this._key && !this._location) {
            throw 'É necessário informar uma URL ou então uma chave pix.'
        }
        lines.push(this._getEMV('26', this._generateAccountInformation()));

        // Merchant Category Code
        lines.push(this._getEMV('52', '0000'));

        // Transaction Currency
        lines.push(this._getEMV('53', '986'));

        //Transaction Amount
        if (this._amout) {
            lines.push(this._getEMV('54', this._amout.toFixed(2)))
        }

        // Country Code
        lines.push(this._getEMV('58', 'BR'))

        // Merchant Name
        let receiver_name = this._normalizeText(this._receiver_name)
        lines.push(this._getEMV('59', receiver_name))

        // Merchant City
        let receiver_city = this._normalizeText(this._receiver_city)
        lines.push(this._getEMV('60', receiver_city))

        // Postal Code
        if (this._zip_code) {
            let zip_code = this._normalizeText(this._zip_code)
            lines.push(this._getEMV('61', zip_code))
        }

        // Additional Data Field
        lines.push(this._additionalDataField())

        lines.push(`6304`)

        // fix: nome recebedor
        const payloadString = lines.join('');
        return payloadString + CRC.computeCRC(payloadString)
    }

    async getQRCode() {
        try {
            return await qrcode.toDataURL(this.getBRCode())
        } catch (e) {
            return null
        }
    }

    async saveQRCodeFile(out: string) {
        return await new Promise(async (res, rej) => {

            let base64 = await this.getQRCode()
            if (base64 == null)
                return rej(null);

            fs.writeFile(out, base64.replace(/^data:image\/png;base64,/, ""), 'base64', function (err) {
                if (err) rej(null)
                else res(true)
            })

        })
    }


    private _normalizeText(value: string) {
        return value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z\[\]0-9$@%*+-\./:_]/gi, ' ')
    }


    private _generateAccountInformation(): string {
        const payload = [];
        payload.push(this._getEMV('00', 'br.gov.bcb.pix'));

        if (this._key) {
            payload.push(this._getEMV('01', this._normalizeText(this._key)));
        }
        if (this._location) {
            payload.push(this._getEMV('25', this._normalizeText(this._location)));
        }
        if (this._description) {
            payload.push(this._getEMV('02', this._normalizeText(this._description)));
        }
        return payload.join('');
    }

    private _additionalDataField() {

        if (this._identificator) {
            let identificator = this._normalizeText(this._identificator)
            let reference_label = this._getEMV('05', identificator)

            // não funciona no inter/itau.
            // let gui = this._getEMV('00', 'br.gov.bcb.brcode')
            // let version = this._getEMV('01', '1.0.0')
            // let payment_system_specific_template = this._getEMV('50', gui + version)

            return this._getEMV('62', reference_label);

        } else {
            return this._getEMV('62', this._getEMV('05', '***'));
        }

    }

    private _getEMV(id: string, string: string) {
        const len = string.length.toString().padStart(2, '0');
        return `${id}${len}${string}`;
    }

}

export let crcTable = [
  0x0000,
  0x1021,
  0x2042,
  0x3063,
  0x4084,
  0x50a5,
  0x60c6,
  0x70e7,
  0x8108,
  0x9129,
  0xa14a,
  0xb16b,
  0xc18c,
  0xd1ad,
  0xe1ce,
  0xf1ef,
  0x1231,
  0x0210,
  0x3273,
  0x2252,
  0x52b5,
  0x4294,
  0x72f7,
  0x62d6,
  0x9339,
  0x8318,
  0xb37b,
  0xa35a,
  0xd3bd,
  0xc39c,
  0xf3ff,
  0xe3de,
  0x2462,
  0x3443,
  0x0420,
  0x1401,
  0x64e6,
  0x74c7,
  0x44a4,
  0x5485,
  0xa56a,
  0xb54b,
  0x8528,
  0x9509,
  0xe5ee,
  0xf5cf,
  0xc5ac,
  0xd58d,
  0x3653,
  0x2672,
  0x1611,
  0x0630,
  0x76d7,
  0x66f6,
  0x5695,
  0x46b4,
  0xb75b,
  0xa77a,
  0x9719,
  0x8738,
  0xf7df,
  0xe7fe,
  0xd79d,
  0xc7bc,
  0x48c4,
  0x58e5,
  0x6886,
  0x78a7,
  0x0840,
  0x1861,
  0x2802,
  0x3823,
  0xc9cc,
  0xd9ed,
  0xe98e,
  0xf9af,
  0x8948,
  0x9969,
  0xa90a,
  0xb92b,
  0x5af5,
  0x4ad4,
  0x7ab7,
  0x6a96,
  0x1a71,
  0x0a50,
  0x3a33,
  0x2a12,
  0xdbfd,
  0xcbdc,
  0xfbbf,
  0xeb9e,
  0x9b79,
  0x8b58,
  0xbb3b,
  0xab1a,
  0x6ca6,
  0x7c87,
  0x4ce4,
  0x5cc5,
  0x2c22,
  0x3c03,
  0x0c60,
  0x1c41,
  0xedae,
  0xfd8f,
  0xcdec,
  0xddcd,
  0xad2a,
  0xbd0b,
  0x8d68,
  0x9d49,
  0x7e97,
  0x6eb6,
  0x5ed5,
  0x4ef4,
  0x3e13,
  0x2e32,
  0x1e51,
  0x0e70,
  0xff9f,
  0xefbe,
  0xdfdd,
  0xcffc,
  0xbf1b,
  0xaf3a,
  0x9f59,
  0x8f78,
  0x9188,
  0x81a9,
  0xb1ca,
  0xa1eb,
  0xd10c,
  0xc12d,
  0xf14e,
  0xe16f,
  0x1080,
  0x00a1,
  0x30c2,
  0x20e3,
  0x5004,
  0x4025,
  0x7046,
  0x6067,
  0x83b9,
  0x9398,
  0xa3fb,
  0xb3da,
  0xc33d,
  0xd31c,
  0xe37f,
  0xf35e,
  0x02b1,
  0x1290,
  0x22f3,
  0x32d2,
  0x4235,
  0x5214,
  0x6277,
  0x7256,
  0xb5ea,
  0xa5cb,
  0x95a8,
  0x8589,
  0xf56e,
  0xe54f,
  0xd52c,
  0xc50d,
  0x34e2,
  0x24c3,
  0x14a0,
  0x0481,
  0x7466,
  0x6447,
  0x5424,
  0x4405,
  0xa7db,
  0xb7fa,
  0x8799,
  0x97b8,
  0xe75f,
  0xf77e,
  0xc71d,
  0xd73c,
  0x26d3,
  0x36f2,
  0x0691,
  0x16b0,
  0x6657,
  0x7676,
  0x4615,
  0x5634,
  0xd94c,
  0xc96d,
  0xf90e,
  0xe92f,
  0x99c8,
  0x89e9,
  0xb98a,
  0xa9ab,
  0x5844,
  0x4865,
  0x7806,
  0x6827,
  0x18c0,
  0x08e1,
  0x3882,
  0x28a3,
  0xcb7d,
  0xdb5c,
  0xeb3f,
  0xfb1e,
  0x8bf9,
  0x9bd8,
  0xabbb,
  0xbb9a,
  0x4a75,
  0x5a54,
  0x6a37,
  0x7a16,
  0x0af1,
  0x1ad0,
  0x2ab3,
  0x3a92,
  0xfd2e,
  0xed0f,
  0xdd6c,
  0xcd4d,
  0xbdaa,
  0xad8b,
  0x9de8,
  0x8dc9,
  0x7c26,
  0x6c07,
  0x5c64,
  0x4c45,
  0x3ca2,
  0x2c83,
  0x1ce0,
  0x0cc1,
  0xef1f,
  0xff3e,
  0xcf5d,
  0xdf7c,
  0xaf9b,
  0xbfba,
  0x8fd9,
  0x9ff8,
  0x6e17,
  0x7e36,
  0x4e55,
  0x5e74,
  0x2e93,
  0x3eb2,
  0x0ed1,
  0x1ef0
];

export class CRC {

  static computeCRC(str: string): string {
      let crc = 0xffff;
      let j, i;
      for (i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i);
        if (c > 255) throw new RangeError();
        j = (c ^ (crc >> 8)) & 0xff;
        crc = crcTable[j] ^ (crc << 8);
      }

      return (((crc ^ 0) & 0xffff).toString(16).toUpperCase()).padStart(4, "0");
  }
}