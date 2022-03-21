import { Injectable } from '@angular/core'
import { BaseApi } from 'src/app/core/classes/base.api'
import { NetworkService } from 'src/app/core/services/network.service'
import { ReceiptModel } from '../models/receipt.model'
@Injectable({
    providedIn: 'root',
})
export class ReceiptDetailtApi extends BaseApi<ReceiptModel> {
    constructor(networkService: NetworkService) {
        super(networkService)
        this.apiEndpoint = 'receiptsdetail'
    }
}