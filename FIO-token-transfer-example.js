const { FIOSDK } = require('@fioprotocol/fiosdk');
const fetch = require('node-fetch');

const fetchJson = async (uri, opts = {}) => {
    return fetch(uri, opts)
}

const privateKey = '';  //sender private key
const publicKey = '';   //sender public key

const baseUrl = 'http://testnet.fioprotocol.io/v1/';

async function main() {
    const fioSdk = new FIOSDK(
        privateKey,
        publicKey,
        baseUrl,
        fetchJson
    );

    try {

        const fee = 500 * FIOSDK.SUFUnit;

        console.log('fee==> ', fee);

        const transferAmount = 1000000000;

        fioSdk.returnPreparedTrx = true;
        
        const result = await fioSdk.pushTransaction(
            'fio.token',
            'trnsfiopubky',
            {
                payee_public_key: '',   //destination public address
                amount: transferAmount,
                max_fee: fee,
                tpid: "rewards@wallet"    
            }
        )
        console.log('Result: ', result);

        const transferResult = await fioSdk.executePreparedTrx(
            'transfer_tokens_pub_key',
            result
        );
        fioSdk.returnPreparedTrx = false;
        
        console.log('transferResult transaction_id===> ', transferResult.transaction_id);

    } catch (e) {
        console.error(e);
    }
}

main();
