import json
import base64
import time
from collections import OrderedDict
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import load_pem_private_key

def generate_sign(params, timestamp, app_id, private_key_pem):
    # 1. Add required fields
    data = dict(params)
    data['t'] = timestamp
    data['appId'] = app_id

    # 2. Sort keys and build string
    sorted_items = sorted(data.items())
    sign_str = ""
    for idx, (k, v) in enumerate(sorted_items):
        if v is None or v == "":
            continue
        if isinstance(v, dict):
            v = json.dumps(v, separators=(',', ':'))
        sign_str += ("&" if idx > 0 else "") + f"{k}={v}"

    # 3. Load private key
    private_key = load_pem_private_key(private_key_pem.encode(), password=None)

    # 4. Sign the string
    signature = private_key.sign(
        sign_str.encode('utf-8'),
        padding.PKCS1v15(),
        hashes.SHA256()
    )

    # 5. Base64 encode and replace chars
    sign_b64 = base64.b64encode(signature).decode('utf-8')
    sign_b64 = sign_b64.replace('/', '_').replace('+', '-')

    return sign_b64

# Example usage:
if __name__ == "__main__":
    params = {
        "shopId": "1497769356262158337"
    }
    timestamp = int(time.time() * 1000)
    print("timestamp:", timestamp)
    app_id = "d82be6bbc1da11eb9dd000163e122ecb"
    # Replace with your actual private key PEM string
    private_key_pem = """
-----BEGIN RSA PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCtypUdHZJKlQ9LL6lIJSphnhqjke7HclgWuWDRWvzov30du235cCm13mqJ3zziqLCwstdQkuXo9sOPIh94t6nzBHTuqYA1whrUnQrKfv9X4/h3QVkzwT+xWflE+KubJZoe+daLKkDeZjVWnUku8ov0E5vwADACfntEhAwiSZUALX9UgNDTPbj5ESeII+VztZ/KOFsRHMTfDb1GIR/dAc1mL5uYbh0h2Fa/fxRPgf7eJOeWGiygesl3CWj0Ue13qwX9PcG7klJXfToI576MY+A7027a0aZ49QhKnysMGhTdtFCksYG0lwPz3bIR16NvlxNLKanc2h+ILTFQbMW/Y3DRAgMBAAECggEBAJGTfX6rE6zX2bzASsu9HhgxKN1VU6/L70/xrtEPp4SLSpHKO9/S/Y1zpsigr86pQYBx/nxm4KFZewx9p+El7/06AX0djOD7HCB2/+AJq3iC5NF4cvEwclrsJCqLJqxKPiSuYPGnzji9YvaPwArMb0Ff36KVdaHRMw58kfFys5Y2HvDqh4x+sgMUS7kSEQT4YDzCDPlAoEFgF9rlXnh0UVS6pZtvq3cR7pR4A9hvDgX9wU6zn1dGdy4MEXIpckuZkhwbqDLmfoHHeJc5RIjRP7WIRh2CodjetgPFE+SV7SdjECmvYJbet4YLg+Qil0OKR9s9S1BbObgcbC9WxUcrTgECgYEA/Yj8BDfxcsPK5ebE9N2teBFUJuDcHEuM1xp4/tFisoFH90JZJMkVbO19rddAMmdYLTGivWTyPVsM1+9stq/NwsFJWHRUiMK7dttGiXuZry+xvq/SAZoitgI8tXdDXMw7368vatr0g6m7ucBKjZWxSHjK9/KVquVr7BoXFm+YxaECgYEAr3sgVNbr5ovx17YriTqe1FLTLMD5gPrzugJj7nypDYY59hLlkrA/TtWbfzE+vfrN3oRIz5OMi9iFk3KXFVJMjGg+M5eO9Y8m14e791/q1jUuuUH4mc6HttNRNh7TdLg/OGKivE+56LEyFPir45zw/dqwQM3jiwIzyPz/+bzmfTECgYATxrOhwJtc0FjrReznDMOTMgbWYYPJ0TrTLIVzmvGP6vWqG8rIS8cYEA5VmQyw4c7G97AyBcW/c3K1BT/9oAj0wA7wj2JoqIfm5YPDBZkfSSEcNqqy5Ur/13zUytC+VE/3SrrwItQf0QWLn6wxDxQdCw8J+CokgnDAoehbH6lTAQKBgQCE67T/zpR9279i8CBmIDszBVHkcoALzQtU+H6NpWvATM4WsRWoWUx7AJ56Z+joqtPKG1WztkYdn/L+TyxWADLvn/6Nwd2N79MyKyScKtGNVFeCCJCwoJp4R/UaE5uErBNnOH+gOJvPwHj5HavGC5kYENC1Jb+YCiEDu3CB0S6d4QKBgQDGYGEFMZYWqO6+LrfQZNDBLCI2G4+UFP+8ZEuBKy5NkDVqXQhHRbqr9S/OkFu+kEjHLuYSpQsclh6XSDks5x/hQJNQszLPJoxvGECvz5TN2lJhuyCupS50aGKGqTxKYtiPHpWa8jZyjmanMKnEdOGyw/X4SFyodv8AEloqd81yGg==
-----END RSA PRIVATE KEY-----
"""

    sign = generate_sign(params, timestamp, app_id, private_key_pem)
    print("sign:", sign)

    # Build the full request message
    request_message = {
        "shopId": params["shopId"],
        "t": timestamp,
        "appId": app_id,
        "sign": sign
    }

    print("Request message:")
    print(json.dumps(request_message, indent=2, ensure_ascii=False))
    