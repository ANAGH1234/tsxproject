import AES from 'crypto-js/aes';
import ENC_UTF8 from 'crypto-js/enc-utf8';
import { ENCKEY } from '../helpers/constant';

interface UtilService {
    encrypt(data: any): any;
    decrypt(encData: any): any;
    generateGUID(): string;
}

const UtilService: UtilService = {
    encrypt(data: any): any {
        const jsonData = JSON.stringify(data);
        return AES.encrypt(jsonData, ENCKEY);
    },
    decrypt(encData: any): any {
        const bytes = AES.decrypt(encData.toString(), ENCKEY);
        const data = bytes.toString(ENC_UTF8);
        return JSON.parse(data);
    },
    generateGUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};

export default UtilService;