import { Component, OnInit } from '@angular/core'
import { AppState } from '@capacitor/app'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { ReceiptApi } from 'src/app/shared/api/receipt.api'
import { UserRoleEnum } from 'src/app/shared/enums/user-role.enum'
import { ClientModel } from 'src/app/shared/models/client.model'
import { ReceiptModel } from 'src/app/shared/models/receipt.model'
import { ReceiptDetailsPage } from '../receipt-details/receipt-details.page'
import { MenuController, ModalController } from '@ionic/angular'
import { ReceiptDetailtApi } from 'src/app/shared/api/receiptDetail.api'
import { InitService } from 'src/app/core/services/init.service'

@Component({
    selector: 'app-receipt',
    templateUrl: './receipt.page.html',
    styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {
    private subscriptions = new Subscription()
    receipts: ReceiptModel[]
    client: ClientModel
    receiptDetail: ReceiptModel

    constructor(
        private receiptApi: ReceiptApi,
        private store: Store<AppState>,
        private modalController: ModalController,
        private menu: MenuController,
        private receiptDetailApi: ReceiptDetailtApi,
        private initService: InitService
    ) {
        this.client = {
            _id: 0,
            name: '',
            address: '',
            email: '',
            password: '',
            cell: '',
            role: UserRoleEnum.USER_ROLE,
            state: 1,
        }
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    ngOnInit() {
        this.initService.startInitModule()
        this.initService.isInitModuleFinished().subscribe((is) => {
            if (is) {
                this.getReceipts()
            }
        })
    }

    togglemenu = () => {
        this.menu.toggle()
    }

    getReceipts = () => {
        this.subscriptions.add(
            this.receiptApi.getReceiptsByClient().subscribe({
                error: (error: any) => {
                    console.error(error)
                },
                next: (receipts) => {
                    this.receipts = receipts.response
                },
            })
        )
    }

    getClient = () => {
        this.store.subscribe(
            (res: any) =>
                (this.client = JSON.parse(JSON.stringify(res.app.client)))
        )
    }

    getReceiptDetail = async (id: number) => {
        this.subscriptions.add(
            this.receiptDetailApi.get(id).subscribe({
                error: (error: any) => {
                    console.error(error)
                },
                next: (response: any) => {
                    this.receiptDetail = response.receiptDetail
                    this.showModalDetailReceipt()
                },
            })
        )
    }

    async showModalDetailReceipt() {
        const modal = await this.modalController.create({
            component: ReceiptDetailsPage,
            cssClass: 'my-custom-class',
            componentProps: {
                receiptDetail: this.receiptDetail,
            },
        })
        return await modal.present()
    }
}
