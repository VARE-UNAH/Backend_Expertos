const admin = require("firebase-admin");

const serviceAccount = {
  "type": "service_account",
  "project_id": "fitmentor-32097",
  "private_key_id": "6b92c378a9a3cc6eacc105a68a302eaab542d245",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChFWiaYKd3cRYt\nLMzc+E/tljwFA9UYX35E5smhCsjxmi5O1YpuCxI7gtDsjHdYlOkim7di924DfPps\nmpfmHeqqcNHXudY0eNJzg59bkqMkZ6NPYPbHGsXXYoSqR58FUSs+yz93Hqf0qVM2\nJKQxPq6YyTZbH6EAmixd0VulNCFiUGtny5z/0N1m0G2xzqb4npJTeIs4VSD/rhOk\n9BF2U3DxHpys5uc/p6iKXEgD7YTuaAukDc+/RYsYp1HXNVHghxEWZUiaC4PZIwPd\nkWJnGpnPjNBmvdLOGOHRCnpFClnGXS1HBK7POD7VbCyYhxA+l8CiVr03kW92M1pI\nJKDFs7B/AgMBAAECggEAA8Bnju42Au52UW0GrxV1acIi+bbszUQuwP9jA3DTMeqh\nA3hZC1Zkq/rQT4IMptp+Ui5a51993MTvYXzO5tlxhVtaonHojuZKzc1AoTWuvlf6\nPLdfEqSz+4qG2R8RPA13kAnUcOYc4UeERvGJhWrBTuZOHByGImkfeWaOgjAkSubX\nx5SS7xHeCyhTH0tG3f+Fb/5+zIvGWlA6fl89ZvIr+M/CeIVK797nVVXCPnyL6PSk\n6L5Xp45JpX2mt831jgv8jxAG3aOUgjQ61l9AGS0i7/3+EsTxEQ89iRjeF82J+nBw\n6BDyzR/L8owBvq+HZldheiBcbTsUzpTKmWr3lAjDQQKBgQDTA9y5l8OQNGvpvbhY\n05bUMnu5+Im9S28TYoTpljYoDA13b0+/FUo84te5pXldG0lOm7l6IPFlJLD7kUsI\n+eJIr/X4iZNfpC59iSt60S1NFJoo3g7RKMc/pE14SisQ6Luq0Pj8KRkuaerKQeWk\nS3nvbERMYwH0k0bhJcWLy1SMYQKBgQDDbIoc4hNDvovwa/9bLk0366nGD4/ddKNG\nfYRh7pwnBIguTnVP42Ol3q7WOYi4CZe+pQ01mcEFnqdOCMAun5s7nfbmdJShI+Qx\nXH1rLQ+p6AVfV207Hk6SEp4rvf6vdaDyzkq6S8lYmD0vH3W+YQLme5eTSCXPBxt2\nBjX9m8Zo3wKBgQDFSTIfzxWHiItwMPHfEoxM/poRCJ72/UTvccfkgI1HqeUZSlfb\nxnLvNAMPTfeHJlDGju+9kHlA4CocOf5WeRKodONaqH3CCMVyl0GwhUt+aomrNdnS\nkfafuOS5V1ama4GyNcjkMSSa8WoUCcJDdlGdmLLOXC7i1KOLMv5cMhFtYQKBgHNT\n1p38/Ql5pfQYh/YzePaLaQGtpWU3tDOhV0LEIfsUvZk2TBz9QI1ewSdDhN+3KYok\ntYrwVe0PGAUBPQlGv8GLE24lVqFSIRTQVGOvkBLhDmqZmajN1eh2fEmsMmUxse4Y\nuBkBKK3UCieJFV9ouOF0BpuwdD+dHiOkvrAQAiNZAoGAdHDKfIpRjNbLOcZ0pPq2\nMHp6uRSPEfchwiXdkrSdub2rE+0aVfjEz2k0/TWFqqX6OT2hKUi7jFESyMD7v3Pe\nBFxWh+NTy0/TblCyaFVBGnq+M5KYotK83C99ZQifLedSzgUCpAISBVIhnnnPND0i\n+VloP62b5Q2ce9UYoygnW44=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-odu08@fitmentor-32097.iam.gserviceaccount.com",
  "client_id": "110691578603406226587",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-odu08%40fitmentor-32097.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;


