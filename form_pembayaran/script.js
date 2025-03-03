function cekVoucher() {
    const voucher = document.getElementById("input_vr").value;
    let totalElement = document.getElementById("total");
    if (voucher === "DISKON50") {
        totalElement.textContent = "100.000";
        alert("Voucher berhasil diterapkan!");
    } else {
        alert("Voucher tidak valid");
    }
}