document.addEventListener("DOMContentLoaded", function () {
    const orderList = document.querySelector(".container_order");
    const totalList = document.querySelector(".totalList");
    const totalPriceElement = document.getElementById("total");
    let totalPrice = parseInt(totalPriceElement.textContent.replace("Rp ", "").replace(".", ""))
    function addToOrder(courseName, price, imageSrc) {
        // Cek apakah kursus sudah ada dalam order list
        if (document.getElementById(courseName)) {
            alert("Kursus ini sudah ada dalam order list!");
            return;
        }

        // Buat elemen baru untuk order list
        let orderItem = document.createElement("div");
        orderItem.classList.add("cont_list");
        orderItem.id = courseName;
        orderItem.innerHTML = `
            <img src="${imageSrc}" alt="" class="img_order">
            <div class="list">
            <span>${courseName}</span>
            <span>${price}</span>
            </div>
            <button class="remove-btn">Hapus</button>
        `;

        let totalOrder = document.createElement("div");
        totalOrder.classList.add("list_total");
        totalOrder.innerHTML = `
            <span>${courseName}</span>
            <span>${price}</span>
        `;

        orderList.appendChild(orderItem);
        totalList.appendChild(totalOrder);

        // Update total harga
        priceValue = parseInt(price.replace("Rp ", "").replace(".", ""));
        totalPrice += priceValue;
        totalPriceElement.textContent = `Rp ${totalPrice.toLocaleString("id-ID")}`;

        // Tambahkan event listener untuk tombol hapus
        orderItem.querySelector(".remove-btn").addEventListener("click", function () {
            orderItem.remove(); //menghapus order dari order list
            totalOrder.remove(); //menghapus order dari total biaya
            totalPrice -= parseInt(price.replace("Rp ", "").replace(".", ""));
            totalPriceElement.textContent = `Rp ${totalPrice.toLocaleString("id-ID")}`;
        });
    }

    // Tambahkan event listener ke tombol order
    document.querySelectorAll(".order-btn").forEach(button => {
        button.addEventListener("click", function () {
            const courseName = this.getAttribute("data-name");
            const price = this.getAttribute("data-price");
            const imageSrc = this.getAttribute("data-image");
            addToOrder(courseName, price, imageSrc);
        });
    });
});

let voucherApplied = false;

document.getElementById("cekVoucher").addEventListener("click", function() {
    let voucherInput = document.getElementById("input_vr").value;
    let totalHarga = parseFloat(document.getElementById("total").innerText.replace("Rp ", "").replace(".", ""));


    if (voucherApplied) {
        alert("Voucher sudah digunakan dan tidak dapat digunakan lagi!");
        return;
    }

    if (voucherInput === "DISKON50") {
        let diskon = totalHarga * 0.5;  // Hitung diskon 50%
        let hargaSetelahDiskon = totalHarga - diskon;
        document.getElementById("total").innerText = "Rp " + hargaSetelahDiskon.toLocaleString("id-ID");
        voucherApplied = true;
        alert("Voucher berhasil digunakan! Anda mendapatkan diskon 50%.");
    } else {
        alert("Kode voucher tidak valid!");
    }
});

