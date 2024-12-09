// OrderPaymentWidget 클래스 정의
class OrderPaymentWidget {
    // 결제위젯 객체 초기화
    constructor(clientKey) {
        // sdk 초기화
        const tosspayments = TossPayments(clientKey);

        // customerKey를 위한 회원정보 획득
        /** https://developers.cafe24.com/app/front/common/frontsdk#title4
        CAFE24API.getCustomerInfo(function(err, res) {
            if (err) {
                // 오류 발생 시 Error 개체입니다.
                // name, message 속성을 확인할 수 있습니다.
                // res 개체를 통해 상세한 오류 메세지 확인이 가능합니다.
            } else {
                // res 개체를 통해 응답 메세지를 확인할 수 있습니다.
            }
        });
        */

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
                orderName: payForm.goods_name
            })
    }
}

// 전역에 OrderPaymentWidget 할당
window.OrderPaymentWidget = OrderPaymentWidget;
console.log('brandpay');
