import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import QRCode from "qrcode";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const generateQRCodePDF = async (tableNumber) => {
	try {
		const qrCodeDataUrl = await QRCode.toDataURL(`Table: ${tableNumber}`);
		const doc = document.createElement("div");
		doc.innerHTML = `
      <div style="padding: 40px; text-align: center;">
        <h1 style="margin-bottom: 20px; font-size: 24px;">Table ${tableNumber}</h1>
        <img src="${qrCodeDataUrl}" style="width: 300px; height: 300px;"/>
      </div>
    `;
		const printWindow = window.open("", "", "width=600,height=600");
		if (printWindow) {
			printWindow.document.write(`
        <html>
          <head>
            <title>QR Code - Table ${tableNumber}</title>
          </head>
          <body>
            ${doc.innerHTML}
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                }
              }
            </script>
          </body>
        </html>
      `);
			printWindow.document.close();
		}

		toast({
			title: "Success",
			description: "QR code generated successfully.",
		});
	} catch (error) {
		toast({
			title: "Error",
			description: "Failed to generate QR code.",
			variant: "destructive",
		});
	}
};
