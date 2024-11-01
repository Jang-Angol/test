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
        try {
            return await this.widget.renderPaymentMethods({ selector: divId, variantKey: variantKey });
        } catch (error) {
            console.error('Failed to render payment widget:', error);
        }
    }

    // 결제요청
    requestPayment(orderId, orderName, successUrl, failUrl, customerEmail, customerName, customerMobilePhone, taxFreeAmount) {
        try {
            console.log(orderId, orderName, successUrl, failUrl, customerEmail, customerName, customerMobilePhone, taxFreeAmount);
            this.widget.requestPayment({
                orderId: orderId,
                orderName: orderName,
                successUrl: successUrl,
                failUrl: failUrl,
                customerEmail: customerEmail,
                customerName: customerName,
                customerMobilePhone: customerMobilePhone,
                taxFreeAmount: taxFreeAmount
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}

// 전역에 OrderPaymentWidget 할당
window.OrderPaymentWidget = OrderPaymentWidget;
console.log('brandpay');
