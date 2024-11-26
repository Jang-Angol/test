// OrderPaymentWidget 클래스 정의
class OrderPaymentWidget {
    // 결제위젯 객체 초기화
    constructor(clientKey, customerKey) {
        // sdk 초기화
        const tosspayments = TossPayments(clientKey);

        customerKey = (customerKey === "") ? TossPayments.ANONYMOUS : customerKey ;
        this.widget = tosspayments.widgets({ customerKey,
            brandpay: {
              redirectUrl: window.location.origin + "/Pay/Recv/landingbrand/RequestAccessToken.php?partnerid=CF_cmulbi5cp5"
            }
        });
    }

    // 결제금액 설정
    async setAmount(currency, amount) {
        await this.widget.setAmount({ value: amount, currency: currency });
    }

    // 결제위젯 UI 렌더링
    async renderPaymentWidget(divId, variantKey) {
        return await this.widget.renderPaymentMethods({ selector: divId, variantKey: variantKey });
    }

    // 결제요청
    requestPayment(payForm) {
            
            return this.widget.requestPayment({
                orderId: payForm.order_id,
                orderName: payForm.goods_name,
                successUrl: payForm.returnSuccessUrl, // 앱 내부에서 성공처리할 엔드포인트
                failUrl: payForm.returnFailUrl, // 앱 내부에서 실패처리할 엔드포인트
                customerEmail: payForm.buyer_email,
                customerName: payForm.buyer_name,
                customerMobilePhone: payForm.buyer_phone.replace(/-/g, ''),
                taxFreeAmount: Number(payForm.amount_tax_free)
            })
    }
}

// 전역에 OrderPaymentWidget 할당
window.OrderPaymentWidget = OrderPaymentWidget;
console.log('brandpay');
