function encryptString(str) {
    if (str) {
        const ciphertext = CryptoJS.AES.encrypt(str, "Bl@ckC0d3r$");
        return ciphertext.toString();
    }  
    return false;
}

function decryptString(str) {
    if (str) {
        const bytes     = CryptoJS.AES.decrypt(str.toString(), 'Bl@ckC0d3r$');
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        return plaintext.toString();
    }
    return false;
}

// ----- PREVENT REFRESH -----
function preventRefresh(flag = false) {
    $("body").attr("refresh", flag);
}

window.addEventListener('beforeunload', function (e) {
    if ($("body").attr("refresh") == "true") {
        e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
        // Chrome requires returnValue to be set
        e.returnValue = '';
    }
});
// ----- END PREVENT REFRESH -----