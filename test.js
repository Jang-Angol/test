// 토스페이먼츠 sdk
<script src="https://js.tosspayments.com/v2/standard"></script>

// PG 앱사에서 구현 
class OrderPaymentWidget {
    // 결제위젯 객체 초기화
    constructor(clientKey, customerKey) {
        // sdk 초기화
        tosspayments = TossPayments(clientKey);
        this.widget = tosspayments.widgets({ customerKey });
    }
    // 결제금액 설정
    setAmount(currency, amount){
        this.widget.setAmount({ value: amount, currency: currency });
    }
    // 결제위젯 UI 렌더링
    async renderPaymentWidget(divId, variantKey) {        
        try {
            return await this.widget.renderPaymentMethods({ selector: divId, variantKey: variantKey });
        } catch (error) {
            console.error('Failed to render payment widget:', error);    
        }
    }
    // 결제요청
    requestPayment(orderId, orderName, successUrl, failUrl, taxFreeAmount, extraReqData) {
        try {
            this.widget.requestPayment({
                orderId: orderId,
                orderName: orderName,
                successUrl: successUrl,
                failUrl: failUrl,
                customerEmail: extraReqData.customerEmail,
                customerName: extraReqData.customerName,
                taxFreeAmount: taxFreeAmount
            });
        } catch (error) {
            console.error('Payment request failed:', error);
        }
    }
}